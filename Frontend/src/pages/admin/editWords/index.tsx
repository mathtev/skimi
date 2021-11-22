import { useMutation } from '@apollo/client';
import { Box, MenuItem, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { Language } from '../../../graphql/language/types';
import { ADD_WORD, DELETE_WORD } from '../../../graphql/word/mutations';
import { useWordsQuery } from '../../../graphql/word/queries';
import { AddWordRequest } from '../../../graphql/word/types';
import { useLanguages } from '../../../hooks/useLanguages';
import EditWordForm, { FormValues } from './EditWordForm';

import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '350px',
      margin: 'auto',
    },
    languageSelect: {
      width: 100,
      flexShrink: 0,
      marginRight: 20,
      justifyContent: 'center',
    },
    addNewWord: {
      marginBottom: 30,
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

const EditWords = () => {
  const classes = useStyles();

  const [addWordMutation] = useMutation(ADD_WORD);
  const [deleteWordMutation] = useMutation(DELETE_WORD);

  const { languages, languageFrom } = useLanguages();
  // prettier-ignore
  const [languageId, setlanguageId] = React.useState<number | undefined>(languageFrom?.id);

  const _words = useWordsQuery(languageId);
  const words = _words?.data?.words;

  const addWord = (word: AddWordRequest) => {
    return addWordMutation({
      variables: { word },
    }).then(() => _words.refetch());
  };

  const deleteWord = (wordId: number) => {
    return deleteWordMutation({
      variables: { wordId },
    }).then(() => _words.refetch());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = +e.target.value;
    setlanguageId(id);
  };

  const handleSubmit = async (formData: FormValues, id?: number) => {
    if (!languageId) return;
    const newWord = { id, name: formData.name, languageId };
    addWord(newWord);
  };

  return (
    <div className={classes.container}>
      <Box mb={2}>
        <Typography variant="h5">Add new word</Typography>
      </Box>
      <div className={classes.addNewWord}>
        <TextField
          className={classes.languageSelect}
          select
          defaultValue={languageFrom?.id}
          size="small"
          onChange={handleChange}
        >
          {languages.map((language: Language) => (
            <MenuItem key={language.id} value={`${language.id}`}>
              {language.code}
            </MenuItem>
          ))}
        </TextField>
        <EditWordForm handleSubmit={handleSubmit} />
      </div>
      <Box mb={2}>
        <Typography variant="h5">Edit words</Typography>
      </Box>
      {words &&
        words.map((word) => (
          <EditWordForm
            key={word.id}
            word={word}
            handleSubmit={handleSubmit}
            deleteWord={deleteWord}
          />
        ))}
    </div>
  );
};

export default EditWords;
