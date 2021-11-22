import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { Sentence } from '../../../../../graphql/sentence/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Language } from '../../../../../graphql/language/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sentence: {
      display: 'flex',
    },
    sentenceText: {
      flex: '50%',
      margin: '2px 0',
    }
  })
);

interface SentenceListProps {
  sentences: Sentence[];
  languageFrom?: Language;
  languageTo?: Language;
}

const SentenceList: React.FC<SentenceListProps> = ({
  sentences,
  languageFrom,
  languageTo
}) => {
  const classes = useStyles();
  return (
    <div>
      <Box my={2}>
       <Typography variant="h5">Sentences</Typography>
      </Box>
      <div className={classes.sentence}>
        <b className={classes.sentenceText}>{languageFrom?.name}</b>
        <b className={classes.sentenceText}>{languageTo?.name}</b>
      </div>
      {sentences.map((sentence) => (
        <div className={classes.sentence}>
          <span className={classes.sentenceText}>{sentence.textFrom}</span>
          <span className={classes.sentenceText}>{sentence.textTo}</span>
        </div>
      ))}
    </div>
  );
};

export default SentenceList;
