import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

import { useLanguages } from '../../../hooks/useLanguages';
import { useLevels } from '../../../hooks/useLevels';
import { useTranslationsQuery } from '../../../graphql/translation/queries';
import {
  CREATE_TRANSLATION,
  DELETE_TRANSLATION,
} from '../../../graphql/translation/mutations';
import { useMutation } from '@apollo/client';
import React from 'react';
import TranslationsTable from './TranslationsTable';
import CreateTranslationForm, { FormValues } from './CreateTranslationForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 'auto'),
      overflowX: 'hidden',
      maxWidth: '800px',
    },
    wordListTitle: {
      marginTop: 40,
    },
    translation: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    word: {
      width: '100%',
    },
  })
);

const EditTranslations = () => {
  const classes = useStyles();

  const levels = useLevels();
  const { languageFrom, languageTo } = useLanguages();
  const translations = useTranslationsQuery();

  const [createTranslationMutation] = useMutation(CREATE_TRANSLATION);
  const [deleteTranslationMutation] = useMutation(DELETE_TRANSLATION);

  const translationsCopy = translations.data && [
    ...translations.data.translations,
  ];
  const sortedTranslations = translationsCopy?.sort((a, b) =>
    // prettier-ignore
    a.wordFrom.name > b.wordFrom.name ? 1 : b.wordFrom.name > a.wordFrom.name ? -1 : 0
  );

  const loaded = languageFrom && languageTo && levels && translations;

  //searchWords(1,'wo')

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

  const handleSubmit = async (
    wordFromId: number,
    wordToId: number,
    formData: FormValues
  ) => {
    createTranslation(wordFromId, wordToId, +formData.levelId)
      .then(() => {
        translations.refetch();
      })
      .catch((e: Error) => console.error('server error:', e.message));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Add new word</Typography>

      {loaded && (
        <CreateTranslationForm
          languageFrom={languageFrom!}
          languageTo={languageTo!}
          levels={levels.data}
          handleSubmit={handleSubmit}
        />
      )}
      <Typography variant="h5" className={classes.wordListTitle}>
        Word list
      </Typography>
      <TranslationsTable
        translations={sortedTranslations}
        languageFrom={languageFrom}
        languageTo={languageTo}
        deleteTranslation={deleteTranslation}
      />
    </div>
  );
};

export default EditTranslations;
