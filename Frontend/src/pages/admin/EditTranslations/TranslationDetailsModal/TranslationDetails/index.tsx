import {  Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Translation } from '../../../../../graphql/translation/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Language } from '../../../../../graphql/language/types';
import SentenceList from './SentenceList';
import AddSentenceForm from './AddSentenceForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500
    },
    sentence: {
      display: 'flex',
    },
    sentenceText: {
      flex: '50%',
      margin: '2px 0',
    },
  })
);

interface TranslationDetailsProps {
  translation?: Translation;
  languageTo?: Language;
  languageFrom?: Language;
  refetchTranslations: any;
}

const TranslationDetails: React.FC<TranslationDetailsProps> = ({
  translation,
  languageTo,
  languageFrom,
  refetchTranslations,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5">{languageFrom?.name}</Typography>
          <Typography variant="subtitle1">
            {translation?.wordFrom.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{languageTo?.name}</Typography>
          <Typography variant="subtitle1">
            {translation?.wordTo.name}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h5" style={{ marginTop: '10px' }}>
        Level
      </Typography>
      <Typography variant="subtitle1">{translation?.level.code}</Typography>
      <Typography variant="h5" style={{ marginTop: '10px' }}>
        Add sentence
      </Typography>
      {translation && (
        <AddSentenceForm
          translation={translation}
          refetchTranslations={refetchTranslations}
        />
      )}
      {translation?.sentences && (
        <SentenceList
          sentences={translation.sentences}
          languageFrom={languageFrom}
          languageTo={languageTo}
        />
      )}
    </div>
  );
};

export default TranslationDetails;
