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
import TranslationDetailsModal from './TranslationDetailsModal';
import { Translation } from '../../../graphql/translation/types';

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

  const [modalOpen, setModalOpen] = React.useState(false);
  const [translation, setTranslation] = React.useState<Translation>();

  const translationsCopy = translations.data && [
    ...translations.data.translations,
  ];
  const sortedTranslations = translationsCopy?.sort((a, b) =>
    // prettier-ignore
    a.wordFrom.name > b.wordFrom.name ? 1 : b.wordFrom.name > a.wordFrom.name ? -1 : 0
  );

  const loaded = languageFrom && languageTo && levels && translations;

  const handleModalOpen = (translation: Translation) => {
    setModalOpen(true);
    setTranslation(translation);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const deleteTranslation = (id: number) => {
    return deleteTranslationMutation({
      variables: { id },
    }).then(() => translations.refetch());
  };

  const createTranslation = (data: FormValues) => {
    return createTranslationMutation({
      variables: {
        levelId: +data.levelId,
        nameFrom: data.nameFrom,
        nameTo: data.nameTo,
        languageFromId: languageFrom!.id,
        languageToId: languageTo!.id,
      },
    }).then((resp) => resp.data.createTranslation);
  };

  const handleSubmit = async (formData: FormValues) => {
    if (!languageFrom || !languageTo) {
      console.error('languages undefined');
      return;
    }
    createTranslation(formData)
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
        handleModalOpen={handleModalOpen}
      />
      <TranslationDetailsModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        translation={translation}
        languageTo={languageTo}
        languageFrom={languageFrom}
        refetchTranslations={translations.refetch}
      />
    </div>
  );
};

export default EditTranslations;
