import React from 'react';
import { useHistory, useParams } from 'react-router';
import { GET_SET } from '../../graphql/set/queries';
import {
  compareObjects,
  getRandom,
  shuffleArray,
  weightedRandom,
} from '../../utils/helperFunctions';
import { useQuery } from '@apollo/client';
import { SetResponse } from '../../graphql/set/types';
import { Sentence } from '../../graphql/sentence/types';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  LinearProgress,
  Box,
  IconButton,
} from '@material-ui/core';

import WordsDnd, { IWordDnd, IWordsDnd } from './WordsDnd';
import { Translation } from '../../graphql/translation/types';
import { TranslationSet } from '../../graphql/translationSet/types';
import AnswerFeedback from './AnswerFeedback';
import { useSkill } from '../../hooks/useSkill';
import ExerciseOver from './ExerciseOver';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      width: '100%',
      maxWidth: 800,
      margin: 'auto',
    },
    dragAndDrop: {
      width: '100%',
      height: '100%',
    },
    progressBar: {
      borderRadius: 10,
      width: '100%',
      height: '15px !important',
      margin: 'auto',
    },
    sentence: {
      marginRight: 'auto',
      fontWeight: 'bolder',
      marginBottom: 25,
    },
    exercise: {
      height: '100%',
      maxHeight: 250,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100%',
      minWidth: 550,
    },
    buttons: {
      width: '80%',
      display: 'flex',
      justifyContent: 'space-evenly',
      marginBottom: '6%',
    },
    closeBtn: {
      width: 50,
      height: 50,
    },
  })
);

interface IRouterParams {
  id: string;
}

const LearnMode: React.FC = () => {
  const id = +useParams<IRouterParams>().id;
  const classes = useStyles();
  const history = useHistory();
  const { skillUp, skillDown } = useSkill();

  const maxExercises = 5;
  const defaultWords = {
    wordsTo: [],
    wordsFrom: [],
  };

  const [feedbackVisible, setFeedbackVisible] = React.useState(false);
  const [isCorrect, setCorrect] = React.useState<boolean>(false);
  const [value, setValue] = React.useState(0);

  const [translation, setTranslation] = React.useState<TranslationSet>();
  const [words, setWords] = React.useState<IWordsDnd>(defaultWords);
  const [sentence, setSentence] = React.useState<Sentence>();
  const [isOver, setOver] = React.useState(false);

  const prevSetProgress = React.useRef<number>();
  const correctSequence = React.useRef<IWordDnd[]>([]);

  const { data, refetch } = useQuery<SetResponse>(GET_SET, {
    variables: { id },
    onCompleted: (data) => {
      prevSetProgress.current = data.set.progress;
      loadNewExercise(data);
    },
  });

  const allMoved = words.wordsFrom.length === correctSequence.current.length;
  const finished = isOver && prevSetProgress.current && data?.set.progress;

  const handleClose = () => {
    history.goBack();
  };

  const getRandomTranslation = (
    translationSetGroup: TranslationSet[]
  ): TranslationSet => {
    const weigtedTranslations = getWeightedTranslations(translationSetGroup);
    const result = weightedRandom(weigtedTranslations);

    return result.translationSet;
  };

  const getWeightedTranslations = (translationSetGroup: TranslationSet[]) => {
    return translationSetGroup.map((translationSet) => {
      const result = {
        translationSet,
        weight: 100 - translationSet.skill,
      };

      if (translationSet.id === translation?.id) {
        result.weight = 0;
      }

      return result;
    });
  };

  const getRandomSentence = (translation: Translation) => {
    if (!translation || !translation.sentences) {
      return;
    }
    const sentence = getRandom(translation.sentences) as Sentence;
    return sentence;
  };

  const loadNewExercise = (data?: SetResponse) => {
    if (!data) return;

    const translations = data.set.translationSetGroup;
    const randomTranslation = getRandomTranslation(translations);
    const randomSentence = getRandomSentence(randomTranslation.translation);
    const scatteredWords = getWordsArray(randomSentence?.textTo);
    const newWords = {
      wordsFrom: [],
      wordsTo: scatteredWords || [],
    };

    setWords(newWords);
    setFeedbackVisible(false);
    setSentence(randomSentence);
    setTranslation(randomTranslation);
  };

  const handleContinue = (event: any) => {
    const newValue = value + 100 / maxExercises;

    setValue(newValue);

    if (newValue < 100) {
      loadNewExercise(data);
      return;
    }

    refetch().then(() => setOver(true));
  };

  const handleSetWords = (data: IWordsDnd) => {
    setWords(data);
  };

  const getWordsArray = (sentence?: string) => {
    if (!sentence) return;

    let array = sentence.split('.').join('').split(' ');

    const wordArray = array.map((wordName, index) => ({
      id: wordName + index,
      name: wordName,
    }));
    correctSequence.current = wordArray;

    return shuffleArray(wordArray);
  };

  const checkAnswer = () => {
    const correct = correctSequence.current;
    const answer = words.wordsFrom;
    const isCorrect = compareObjects(answer, correct, 'id');

    if (translation) {
      isCorrect ? skillUp!(translation, 10) : skillDown!(translation, 10);
    }

    setCorrect(isCorrect);
    setFeedbackVisible(true);
  };

  const showHint = () => {
    const answeredWords = words.wordsFrom;
    const correctWords = correctSequence.current;
    let i: number;

    for (i = 0; i < correctWords.length; i++) {
      if (answeredWords[i]?.id !== correctWords[i].id) {
        break;
      }
    }

    const hintWord = correctWords[i];
    if (!hintWord) return;

    const removed = answeredWords.slice(i);
    const wordsFrom = answeredWords.slice(0, i).concat(hintWord);
    const wordsTo = words.wordsTo
      .concat(removed)
      .filter((word) => word.id !== hintWord.id);

    setWords({ wordsFrom, wordsTo });
  };

  return (
    <div className={classes.root}>
      <Box display="flex" alignItems="center" width="100%">
        <IconButton className={classes.closeBtn} onClick={handleClose}>
          &#10006;
        </IconButton>
        <LinearProgress
          variant="determinate"
          value={value}
          color="secondary"
          className={classes.progressBar}
        />
      </Box>
      <div className={classes.exercise}>
        <Typography variant="h6" className={classes.sentence}>
          {sentence?.textFrom}
        </Typography>
        <div className={classes.dragAndDrop}>
          {sentence && (
            <WordsDnd
              words={words}
              sentence={sentence}
              handleSetWords={handleSetWords}
            />
          )}
        </div>
      </div>
      <div className={classes.buttons}>
        <Button onClick={showHint}>Hint</Button>
        {allMoved && <Button onClick={checkAnswer}>Check answer</Button>}
      </div>
      {feedbackVisible && (
        <AnswerFeedback
          sentence={sentence}
          isCorrect={isCorrect}
          handleContinue={handleContinue}
        />
      )}
      {finished && (
        <ExerciseOver
          oldProgress={prevSetProgress.current!}
          newProgress={data!.set.progress}
          handleClose={handleClose}
        >
          Go back
        </ExerciseOver>
      )}
    </div>
  );
};

export default LearnMode;
