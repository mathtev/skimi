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

import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

import { Translation, Translations } from '../../../graphql/translation/types';
import EditWordForm, { FormValues } from './EditWordForm';
import { GET_ALL_TRANSLATIONS } from '../../../graphql/translation/queries';
import { useEditWordMutation, useEditWordQuery } from './graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 'auto'),
      width: '50%',
      overflowX: 'hidden'
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


  const {translationsQuery, levelsQuery, languagesQuery} = useEditWordQuery()
  const {addWordMutation, createTranslationMutation, deleteTranslationMutation} = useEditWordMutation()

  const translationsCopy = translationsQuery.data && [...translationsQuery.data.translations];
  const sortedTranslations = translationsCopy?.sort((a, b) =>
    a.wordFrom.name > b.wordFrom.name ? 1 : b.wordFrom.name > a.wordFrom.name ? -1 : 0
  );

  const appSettings = useSettings();

  const compareStrings = (s1?: string, s2?: string): boolean => {
    if (!s1 || !s2) {
      return false;
    }
    return s1.toLowerCase() === s2.toLowerCase();
  };

  const languageFrom = languagesQuery.data?.languages.find((language) =>
    compareStrings(language.name, appSettings.settings?.nativeLanguage)
  );
  const languageTo = languagesQuery.data?.languages.find((language) =>
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
    }).then(() => translationsQuery.refetch());
  };

  const createTranslation = (
    enWordId: number,
    deWordId: number,
    levelId: number
  ) => {
    return createTranslationMutation({
      variables: {
        translation: {
          enWordId: enWordId,
          deWordId: deWordId,
          levelId: levelId,
        },
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
      languageId: languageFrom.id,
    };
    const newWord2: AddWordRequest = {
      id: word2?.id,
      name: formData.word2,
      languageId: languageTo.id,
    };
    // this is not good and causes 5 rerenders, should make one request
    Promise.all([addWord(newWord1), addWord(newWord2)])
      .then((resp) => {
        createTranslation(resp[0].id, resp[1].id, parseInt(formData.levelId));
      })
      .then(() => {
        levelsQuery.refetch();
        translationsQuery.refetch();
      })
      .catch((e: Error) => console.error('server error:', e.message));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Add new word</Typography>
      <EditWordForm
        word={undefined}
        translation={undefined}
        languageFrom={languageFrom?.name}
        languageTo={languageTo?.name}
        levels={levelsQuery.data?.levels}
        handleSubmit={handleSubmit}
        deleteTranslation={deleteTranslation}
      />
      <Typography variant="h5" className={classes.wordListTitle}>
        Word list
      </Typography>
      {sortedTranslations?.map((translation: Translation) => (
        <div key={translation.id} className={classes.wordList}>
          <EditWordForm
            word={translation.wordFrom}
            translation={translation}
            languageFrom={languageFrom?.name}
            languageTo={languageTo?.name}
            levels={levelsQuery.data?.levels}
            handleSubmit={handleSubmit}
            deleteTranslation={deleteTranslation}
          />
        </div>
      ))}
    </div>
  );
};

export default EditWords;
