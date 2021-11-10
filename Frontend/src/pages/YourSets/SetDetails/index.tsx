import { QueryResult, useQuery } from '@apollo/client';
import { Button, Card, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { GET_SET } from '../../../graphql/set/queries';
import { SetResponse } from '../../../graphql/set/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Flashcards from '../../../components/Flashcards';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    wordList: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 500,
      margin: 'auto',
      padding: '0 20px',
    },
    word: {
      padding: '0 20px',
      fontSize: 16,
      minHeight: 60,
      margin: '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flashCards: {
      width: '35%',
      margin: '20px 0',
      border: '2px solid',
      '&:hover': {
        border: '2px solid',
      }
    },
  })
);

interface IRouterParams {
  id: string;
}

const SetDetails = () => {
  const classes = useStyles();
  const id = parseInt(useParams<IRouterParams>().id);
  const { data, loading, refetch } = useQuery<SetResponse>(GET_SET, {
    variables: { id },
  });
  const set = data?.set;
  return (
    <div className={classes.wordList}>
      {set?.translations && <Flashcards translations={set.translations} />}
      <Typography variant="h5">{set?.name}</Typography>
      <Button
        className={classes.flashCards}
        variant="outlined"
        color="secondary"
      >
        Flashcards
      </Button>
      {set?.translations?.map((translation) => (
        <Card className={classes.word} key={translation.id}>
          <span>{translation.wordFrom?.name} </span>
          <span>{translation.wordTo?.name}</span>
        </Card>
      ))}
    </div>
  );
};

export default SetDetails;
