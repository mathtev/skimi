import { useMutation, useQuery } from '@apollo/client';
import { ADD_WORD } from '../../../graphql/word/mutations';
import { AddWordRequest, Word, Words } from '../../../graphql/word/types';
import { Levels } from '../../../graphql/level/types';
import { Languages } from '../../../graphql/language/types';
import { GET_ALL_WORDS } from '../../../graphql/word/queries';
import { GET_ALL_LEVELS } from '../../../graphql/level/queries';
import { GET_ALL_LANGUAGES } from '../../../graphql/language/queries';
import {
  CREATE_TRANSLATION,
  DELETE_TRANSLATION,
} from '../../../graphql/translation/mutations';
import { useSettings } from '../../../hooks/useSettings';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';

import { Translation } from '../../../graphql/translation/types';
import EditWordForm, { FormValues } from './EditWordForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 'auto'),
      width: '50%',
    },
    wordListTitle: {
      marginTop: 40,
    },
    wordList: {
      display: 'flex',
    },
  })
);

const EditWords = () => {
  const classes = useStyles();

  const words = useQuery<Words>(GET_ALL_WORDS);
  const levels = useQuery<Levels>(GET_ALL_LEVELS);
  const languages = useQuery<Languages>(GET_ALL_LANGUAGES);

  const [addWordMutation] = useMutation(ADD_WORD);
  const [createTranslationMutation] = useMutation(CREATE_TRANSLATION);
  const [deleteTranslationMutation] = useMutation(DELETE_TRANSLATION);

  const wordsCopy = words.data && [...words.data.words];
  const sortedWords = wordsCopy?.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  const appSettings = useSettings();

  const compareStrings = (s1?: string, s2?: string): boolean => {
    if (!s1 || !s2) {
      return false;
    }
    return s1.toLowerCase() === s2.toLowerCase();
  };

  const languageFrom = languages.data?.languages.find((language) =>
    compareStrings(language.name, appSettings.settings?.nativeLanguage)
  );
  const languageTo = languages.data?.languages.find((language) =>
    compareStrings(language.name, appSettings.settings?.learningLanguage)
  );

  const addWord = (word: AddWordRequest) => {
    return addWordMutation({
      variables: { word },
    }).then((resp) => resp.data.addWord);
  };

  const deleteTranslation = (id: number) => {
    return deleteTranslationMutation({
      variables: { id },
    }).then(() => words.refetch());
  };

  const createTranslation = (enWordId: number, deWordId: number) => {
    return createTranslationMutation({
      variables: {
        translation: { en_word_id: enWordId, de_word_id: deWordId },
      },
    }).then((resp) => resp.data.createTranslation);
  };

  const handleSubmit = async (
    formData: FormValues,
    word1?: Word,
    word2?: Word
  ) => {
    if (!languageTo || !languageFrom) {
      console.error('language undefined');
      return;
    }
    const newWord1: AddWordRequest = {
      id: word1?.id,
      name: formData.word1,
      level_id: parseInt(formData.levelId),
      language_id: languageFrom.id,
    };
    const newWord2: AddWordRequest = {
      id: word2?.id,
      name: formData.word2,
      level_id: parseInt(formData.levelId),
      language_id: languageTo.id,
    };
    // creates or updates words
    Promise.all([addWord(newWord1), addWord(newWord2)])
      .then((resp) => {
        if (!word1 || !word2) {
          createTranslation(resp[0].id, resp[1].id);
        }
      })
      .then(() => words.refetch());
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Add new word</Typography>
      <EditWordForm
        word={undefined}
        translation={undefined}
        languageFrom={languageFrom?.name}
        languageTo={languageTo?.name}
        levels={levels.data?.levels}
        handleSubmit={handleSubmit}
        deleteTranslation={deleteTranslation}
      />
      <Typography variant="h5" className={classes.wordListTitle}>
        Word list
      </Typography>
      {sortedWords &&
        sortedWords.map(
          (word: Word) =>
            word?.translations &&
            word.translations.map((translation: Translation) => (
              <div key={translation.id} className={classes.wordList}>
                <EditWordForm
                  word={word}
                  translation={translation}
                  languageFrom={languageFrom?.name}
                  languageTo={languageTo?.name}
                  levels={levels.data?.levels}
                  handleSubmit={handleSubmit}
                  deleteTranslation={deleteTranslation}
                />
              </div>
            ))
        )}
    </div>
  );
};

export default EditWords;
