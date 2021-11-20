import {
  makeStyles,
  Theme,
  createStyles,
  Typography,

} from '@material-ui/core';

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
import { useSearchWordsQuery } from '../../../graphql/word/queries';
import CustomAsyncSelect, {
  SelectOption,
} from '../../../components/CustomAsyncSelect';
import React from 'react';
import TranslationsTable from './TranslationsTable';

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
  const { searchWords } = useSearchWordsQuery();
  const [selectedWordFrom, setSelectedWordFrom] =
    React.useState<SelectOption>();
  const [selectedWordTo, setSelectedWordTo] = React.useState<SelectOption>();

  const [createTranslationMutation] = useMutation(CREATE_TRANSLATION);
  const [deleteTranslationMutation] = useMutation(DELETE_TRANSLATION);

  const translationsCopy = translations.data && [
    ...translations.data.translations,
  ];
  const sortedTranslations = translationsCopy?.sort((a, b) =>
    // prettier-ignore
    a.wordFrom.name > b.wordFrom.name ? 1 : b.wordFrom.name > a.wordFrom.name ? -1 : 0
  );

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
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Add new word</Typography>
      {languageFrom && (
        <CustomAsyncSelect
          name="selectWord"
          getData={searchWords}
          languageId={languageFrom.id}
          selectedValue={selectedWordFrom}
          handleSelectChange={setSelectedWordFrom}
        />
      )}
      {languageTo && (
        <CustomAsyncSelect
          name="selectWord"
          getData={searchWords}
          languageId={languageTo.id}
          selectedValue={selectedWordTo}
          handleSelectChange={setSelectedWordTo}
        />
      )}
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
