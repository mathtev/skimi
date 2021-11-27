import React from 'react';
import { useParams } from 'react-router';
import { GET_SET } from '../../../../graphql/set/queries';
import {
  compareObjects,
  getRandom,
  shuffleArray,
  weightedRandom,
} from '../../../../utils/helperFunctions';
import { DragDropContext } from 'react-beautiful-dnd';
import { useQuery } from '@apollo/client';
import { SetResponse } from '../../../../graphql/set/types';
import { Sentence } from '../../../../graphql/sentence/types';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';

import WordsDnd, { IWordDnd, IWordsDnd } from './WordsDnd';
import { Translation } from '../../../../graphql/translation/types';
import { TranslationSet } from '../../../../graphql/translationSet/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    dragAndDrop: {
      width: 600,
      height: 400,
    },
  })
);

interface IRouterParams {
  id: string;
}

const LearnMode: React.FC = () => {
  const id = +useParams<IRouterParams>().id;
  const classes = useStyles();

  const maxExercises = 10;
  const defaultWords = {
    wordsFrom: [],
    wordsTo: [],
  };

  const [isCorrect, setCorrect] = React.useState<boolean | undefined>();
  const [translation, setTranslation] = React.useState<Translation>();
  const [words, setWords] = React.useState<IWordsDnd>(defaultWords);
  const [sentence, setSentence] = React.useState<Sentence>();
  const [value, setValue] = React.useState(0);

  const correctSequence = React.useRef<IWordDnd[]>([]);

  const allMoved = words.wordsFrom.length === correctSequence.current.length;

  const { data } = useQuery<SetResponse>(GET_SET, {
    variables: { id },
    onCompleted: (data) => {
      loadNewExercise(data);
    },
  });

  const getRandomTranslation = (
    translationSetGroup: TranslationSet[]
  ): Translation => {
    const weigtedTranslations = getWeightedTranslations(translationSetGroup);
    const result = weightedRandom(weigtedTranslations);

    return result.translationSet.translation;
  };

  const getWeightedTranslations = (translationSetGroup: TranslationSet[]) => {
    return translationSetGroup.map((translationSet) => {
      const result = {
        translationSet,
        weight: 10 - translationSet.skill,
      };

      if (translationSet.translation.id === translation?.id) {
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
    const randomSentence = getRandomSentence(randomTranslation);
    const scatteredWords = getWordsArray(randomSentence?.textTo);
    const newWords = {
      wordsFrom: [],
      wordsTo: scatteredWords || [],
    };

    setWords(newWords);
    setSentence(randomSentence);
    setTranslation(randomTranslation);
  };

  const handleNext = (event: any) => {
    const newValue = value + 100 / maxExercises;

    if (newValue <= 100) {
      loadNewExercise(data);
      setValue(newValue);
      return;
    }
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

    setCorrect(isCorrect);
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
      <LinearProgress variant="determinate" value={value} />
      <Typography variant="h5">{sentence?.textFrom}</Typography>
      <div className={classes.dragAndDrop}>
        {sentence && (
          <WordsDnd
            words={words}
            sentence={sentence}
            handleSetWords={handleSetWords}
          />
        )}
      </div>
      <Button onClick={showHint}>Hint</Button>
      {allMoved && <Button onClick={checkAnswer}>Check answer</Button>}
      {isCorrect !== undefined && <Button onClick={handleNext}>Next</Button>}
    </div>
  );
};

export default LearnMode;
