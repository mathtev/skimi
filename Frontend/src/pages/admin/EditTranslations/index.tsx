import { AddWordRequest, Word } from '../../../graphql/word/types';
import { useSettings } from '../../../hooks/useSettings';

import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

import { Translation } from '../../../graphql/translation/types';
import EditTranslationForm, { FormValues } from './EditTranslationForm';
import { useLanguages } from '../../../hooks/useLanguages';
import { useLevels } from '../../../hooks/useLevels';
import { useTranslationsQuery } from '../../../graphql/translation/queries';
import { ADD_WORD } from '../../../graphql/word/mutations';
import {
  CREATE_TRANSLATION,
  DELETE_TRANSLATION,
} from '../../../graphql/translation/mutations';
import { useMutation } from '@apollo/client';
import { compareStrings } from '../../../utils/helperFunctions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 'auto'),
      width: '50%',
      overflowX: 'hidden',
    },
    wordListTitle: {
      marginTop: 40,
    },
    wordList: {
      display: 'flex',
    },
  })
);

const EditTranslations = () => {
  const classes = useStyles();

  const levels = useLevels();
  const {languages, languageFrom, languageTo} = useLanguages();
  const translations = useTranslationsQuery();

  //const [addWordMutation] = useMutation(ADD_WORD);
  const [createTranslationMutation] = useMutation(CREATE_TRANSLATION);
  const [deleteTranslationMutation] = useMutation(DELETE_TRANSLATION);

  const translationsCopy = translations.data && [
    ...translations.data.translations,
  ];
  const sortedTranslations = translationsCopy?.sort((a, b) =>
    a.wordFrom.name > b.wordFrom.name
      ? 1
      : b.wordFrom.name > a.wordFrom.name
      ? -1
      : 0
  );

  const appSettings = useSettings();

  // const addWord = (word: AddWordRequest) => {
  //   return addWordMutation({
  //     variables: { word },
  //   }).then((resp) => resp.data.addWord);
  // };

  const deleteTranslation = (id: number) => {
    return deleteTranslationMutation({
      variables: { id },
    }).then(() => translations.refetch());
  };

  const createTranslation = (
    enWordId: number,
    deWordId: number,
    levelId: number
  ) => {
    return createTranslationMutation({
      variables: {
        translation: {
          enWordId,
          deWordId,
          levelId,
        },
      },
    }).then((resp) => resp.data.createTranslation);
  };

  const handleSubmit = async (formData: FormValues) => {
    if (!languageTo || !languageFrom) {
      console.error('language undefined');
      return;
    }
    createTranslation(1, 2, +formData.levelId)
      .then(() => {
        levels.refetch!();
        translations.refetch();
      })
      .catch((e: Error) => console.error('server error:', e.message));
    // const newWord1: AddWordRequest = {
    //   id: word1?.id,
    //   name: formData.word1,
    //   languageId: languageFrom.id,
    // };
    // const newWord2: AddWordRequest = {
    //   id: word2?.id,
    //   name: formData.word2,
    //   languageId: languageTo.id,
    // };
    // Promise.all([addWord(newWord1), addWord(newWord2)])
    //   .then((resp) => {
    //     createTranslation(resp[0].id, resp[1].id, parseInt(formData.levelId));
    //   })
    //   .then(() => {
    //     levels.refetch!();
    //     translations.refetch();
    //   })
    //   .catch((e: Error) => console.error('server error:', e.message));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Add new word</Typography>
      <EditTranslationForm
        word={undefined}
        translation={undefined}
        languageFrom={languageFrom?.name}
        languageTo={languageTo?.name}
        levels={levels.data}
        handleSubmit={handleSubmit}
        deleteTranslation={deleteTranslation}
      />
      <Typography variant="h5" className={classes.wordListTitle}>
        Word list
      </Typography>
      {sortedTranslations?.map((translation: Translation) => (
        <div key={translation.id} className={classes.wordList}>
          <EditTranslationForm
            word={translation.wordFrom}
            translation={translation}
            languageFrom={languageFrom?.name}
            languageTo={languageTo?.name}
            levels={levels.data}
            handleSubmit={handleSubmit}
            deleteTranslation={deleteTranslation}
          />
        </div>
      ))}
    </div>
  );
};

export default EditTranslations;
