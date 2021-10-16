import { useMutation, useQuery } from '@apollo/client';
import { ADD_WORD } from '../../../graphql/word/mutations';
import { AddWordRequest, Word, Words } from '../../../graphql/word/types';
import { Levels } from '../../../graphql/level/types';
import { Languages } from '../../../graphql/language/types';
import { GET_ALL_WORDS } from '../../../graphql/word/queries';
import { GET_ALL_LEVELS } from '../../../graphql/level/queries';
import { GET_ALL_LANGUAGES } from '../../../graphql/language/queries';
import { CREATE_TRANSLATION } from '../../../graphql/translation/mutations';
import { useSettings } from '../../../hooks/useSettings';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

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
  })
);

const EditWords = () => {
  const classes = useStyles();

  const words = useQuery<Words>(GET_ALL_WORDS, {
    variables: { language_id: 1 },
  });
  const levels = useQuery<Levels>(GET_ALL_LEVELS);
  const languages = useQuery<Languages>(GET_ALL_LANGUAGES);

  const appSettings = useSettings();

  const [addWordMutation] = useMutation(ADD_WORD, {
    onCompleted(data) {
      console.log('add word completed');
    },
  });
  const [createTranslationMutation] = useMutation(CREATE_TRANSLATION, {
    onCompleted(data) {
      words.refetch();
    },
  });

  const languageFrom = languages.data?.languages.find(
    (language) =>
      language.name.toLowerCase() ===
      appSettings.settings?.nativeLanguage.toLowerCase()
  );
  const languageTo = languages.data?.languages.find(
    (language) =>
      language.name.toLowerCase() ===
      appSettings.settings?.learningLanguage.toLowerCase()
  );

  console.log(languageTo);

  const addWord = (word: AddWordRequest) => {
    return addWordMutation({
      variables: { word },
    }).then((resp) => resp.data.addWord);
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
    Promise.all([addWord(newWord1), addWord(newWord2)]).then((resp) => {
      if (!word1 || !word2) {
        createTranslation(resp[0].id, resp[1].id);
      }
    });
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
      />
      <Typography variant="h5" className={classes.wordListTitle}>
        Word list
      </Typography>
      {words.data?.words.map(
        (word: Word) =>
          word?.translations &&
          word.translations.map((translation: Translation) => (
            <div key={word.id}>
              <EditWordForm
                word={word}
                translation={translation}
                languageFrom={languageFrom?.name}
                languageTo={languageTo?.name}
                levels={levels.data?.levels}
                handleSubmit={handleSubmit}
              />
            </div>
          ))
      )}
    </div>
  );
};

export default EditWords;
