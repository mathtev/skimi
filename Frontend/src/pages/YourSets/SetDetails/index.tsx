import { QueryResult, useMutation, useQuery } from '@apollo/client';
import { Button, Card, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import { GET_SET } from '../../../graphql/set/queries';
import { SetResponse } from '../../../graphql/set/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Flashcards from '../../../components/Flashcards';
import classNames from 'classnames';
import { Translation } from '../../../graphql/translation/types';
import { TranslationSet } from '../../../graphql/translationSet/types';
import { UPDATE_TRANSLATION_SET } from '../../../graphql/translationSet/mutations';
import { CircularProgressWithLabel } from '../../../components/CircularProgressWithLabel';

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
      flexBasis: '50%'
    },
    flashCards: {
      width: '35%',
      margin: '20px 0',
      border: '2px solid',
      '&:hover': {
        border: '2px solid',
      },
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

const skillColors = [
  '#ffffff',
  '#f53c3c',
  '#f53c3c',
  '#ffb413',
  '#ffb413',
  '#f7f306',
  '#f7f306',
  '#b0f83d',
  '#b0f83d',
  '#37d637',
  '#373ad6',
];

// dodac kolumny tarnalationid, textfrom i textto w sentence
// stworzyć relację one translation to many sentences
// skill na flashcardsskill 
// dodać przycisk learn przenoszący do nowej podstrony
// dodać learnSkill

const SetDetails = () => {
  const classes = useStyles();
  const id = parseInt(useParams<IRouterParams>().id);
  const [flashcardsActive, setFlashcardsActive] = React.useState(false);

  const [translationSetUpdateMutation] = useMutation(UPDATE_TRANSLATION_SET);
  const { data, loading, refetch } = useQuery<SetResponse>(GET_SET, {
    variables: { id },
  });

  const set = data?.set;
  const translationSets = data?.set.translationSets || [];

  const sortBySkill = (translations: TranslationSet[], reverse?: boolean) => {
    const sorted = [...translations].sort((a, b) =>
      a.skill < b.skill ? -1 : a.skill > b.skill ? 1 : 0
    );
    return reverse ? sorted.reverse() : sorted;
  };


  const updateSkill = (id: number, skill: number) => {
    console.log(skill, id);
    return translationSetUpdateMutation({
      variables: { id, input: { skill } },
      onCompleted: () => refetch(),
    });
  };

  const onReject = (translationSetId: number) => {
    let skill = translationSets.find((x) => x.id === translationSetId)?.skill;
    if (skill === undefined) return;
    skill -= 1;
    if (skill === -1) skill = 1; 
    else if (skill <= 0) return;
    updateSkill(translationSetId, skill);
  };

  const onAccept = (translationSetId: number) => {
    let skill = translationSets.find((x) => x.id === translationSetId)?.skill;
    if (skill === undefined) return;
    skill += 1;
    if (skill > 10) return;
    updateSkill(translationSetId, skill);
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
          translations={translationSets}
          setActive={setFlashcardsActive}
          onReject={onReject}
          onAccept={onAccept}
        >

        </Flashcards>
      )}
      <Typography variant="h5">{set?.name}</Typography>
      <Button
        className={classes.flashCards}
        variant="outlined"
        color="secondary"
        onClick={() => setFlashcardsActive(true)}
      >
        Flashcards
      </Button>
      {sortBySkill(translationSets).map((translationSet) => (
        <Card
          className={classes.word}
          key={translationSet.id}
        >
          <span className={classes.wordName}>{translationSet?.translation?.wordFrom.name} </span>
          <span className={classes.wordName}>{translationSet?.translation?.wordTo.name} </span>
          <CircularProgressWithLabel value={translationSet?.skill * 10} />
        </Card>
      ))}
    </div>
  );
};

export default SetDetails;
