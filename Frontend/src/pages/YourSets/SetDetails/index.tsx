import { QueryResult, useMutation, useQuery } from '@apollo/client';
import { Box, Button, Card, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { GET_SET, useSetQuery } from '../../../graphql/set/queries';
import { SetResponse } from '../../../graphql/set/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Flashcards from '../../../components/Flashcards';
import classNames from 'classnames';
import { TranslationSet } from '../../../graphql/translationSet/types';
import { UPDATE_TRANSLATION_SET } from '../../../graphql/translationSet/mutations';
import { CircularProgressWithLabel } from '../../../components/CircularProgressWithLabel';
import { Link } from 'react-router-dom';
import { useSkill } from '../../../hooks/useSkill';

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
    wordName: {
      flexBasis: '50%',
    },
    studyModeButton: {
      width: '35%',
      margin: '20px 0',
      border: '2px solid',
      '&:hover': {
        border: '2px solid',
      },
    },
    learnLink: {
      textDecoration: 'none',
      color: 'inherit',
      width: '100%',
      height: '100%',
    },
    hideScroll: {
      height: 0,
      overflow: 'hidden',
    },
  })
);

interface IRouterParams {
  id: string;
}

const SetDetails = () => {
  const classes = useStyles();
  const id = parseInt(useParams<IRouterParams>().id);
  const { skillUp, skillDown } = useSkill();

  const [flashcardsActive, setFlashcardsActive] = React.useState(false);

  const [translationSetUpdateMutation] = useMutation(UPDATE_TRANSLATION_SET);

  const { data, loading, refetch } = useSetQuery(id);
  const set = data?.set;
  const translations = data?.set.translationSetGroup || [];

  const sortBySkill = (translations: TranslationSet[], reverse?: boolean) => {
    const sorted = [...translations].sort((a, b) =>
      a.skill < b.skill ? -1 : a.skill > b.skill ? 1 : 0
    );
    return reverse ? sorted.reverse() : sorted;
  };

  const onReject = (translationSet: TranslationSet, value: number) => {
    skillDown!(translationSet, value)?.then(() => refetch());
  };

  const onAccept = (translationSet: TranslationSet, value: number) => {
    skillUp!(translationSet, value)?.then(() => refetch());
  };

  return (
    <div
      className={classNames(
        classes.wordList,
        flashcardsActive ? classes.hideScroll : ''
      )}
    >
      {flashcardsActive && (
        <Flashcards
          translations={translations}
          setActive={setFlashcardsActive}
          onReject={onReject}
          onAccept={onAccept}
        ></Flashcards>
      )}
      <Typography variant="h5">{set?.name}</Typography>
      <Box display="flex" justifyContent="space-between">
        <Button
          className={classes.studyModeButton}
          variant="outlined"
          color="secondary"
          onClick={() => setFlashcardsActive(true)}
        >
          Flashcards
        </Button>
        <Button
          className={classes.studyModeButton}
          variant="outlined"
          color="secondary"
        >
          <Link to={'/learn/' + id} className={classes.learnLink}>
            Learn
          </Link>
        </Button>
      </Box>
      {sortBySkill(translations).map((translationSet) => (
        <Card className={classes.word} key={translationSet.id}>
          <span className={classes.wordName}>
            {translationSet?.translation?.wordFrom.name}{' '}
          </span>
          <span className={classes.wordName}>
            {translationSet?.translation?.wordTo.name}{' '}
          </span>
          <CircularProgressWithLabel value={translationSet?.skill} />
        </Card>
      ))}
    </div>
  );
};

export default SetDetails;
