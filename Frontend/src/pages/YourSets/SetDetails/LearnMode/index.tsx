import React from 'react';
import { useParams } from 'react-router';
import { GET_SET } from '../../../../graphql/set/queries';
import { getRandom, weightedRandom } from '../../../../utils/helperFunctions';
import { DragDropContext } from 'react-beautiful-dnd';
import { useQuery } from '@apollo/client';
import { SetResponse } from '../../../../graphql/set/types';
import { Sentence } from '../../../../graphql/sentence/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import WordsList from './WordsList';
import { reorderWords } from './reorder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordsList: {
      background: '#d3f7ff',
      height: 50
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: 300,
      justifyContent: 'space-between',
    },
  })
);

interface IRouterParams {
  id: string;
}

export interface WordDnd {
  id: string;
  name: string;
}

export interface WordsDnd {
  [key: string]: WordDnd[];
  wordsFrom: WordDnd[];
  wordsTo: WordDnd[];
}

const LearnMode: React.FC = () => {
  const id = +useParams<IRouterParams>().id;
  const classes = useStyles();

  const [words, setWords] = React.useState<WordsDnd>({
    wordsFrom: [],
    wordsTo: [],
  });

  useQuery<SetResponse>(GET_SET, {
    variables: { id },
    onCompleted: (data) => {
      handleSetWordArrays(data);
    },
  });

  const handleSetWordArrays = (data: SetResponse) => {
    const translationSetGroup = data?.set.translationSetGroup || [];
    const weigtedTranslations = translationSetGroup.map((translationSet) => ({
      translationSet,
      weight: 10 - translationSet.skill,
    }));
    const translation =
      weightedRandom(weigtedTranslations)?.translationSet.translation;
    const sentence = translation?.sentences
      ? (getRandom(translation.sentences) as Sentence)
      : undefined;

    if (!sentence) return;
    const wordsTo = sentenceToArray(sentence.textTo, 'wordsTo');

    if (wordsTo) {
      setWords({ ...words, wordsTo });
    }
  };

  const sentenceToArray = (sentence: string, key: string) => {
    const array = sentence.toLowerCase().split('.').join('').split(' ');
    const wordArray = array.map((wordName, index) => ({
      id: key + index,
      name: wordName,
    }));
    return wordArray;
  };

  return (
    <div>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          // // dropped outside the list
          if (!destination) {
            return;
          }

          setWords(reorderWords(words, source, destination));
        }}
      >
        <div className={classes.container}>
          {Object.entries(words).map(([key, value], index: number) => (
            <div className={classes.wordsList}>
              <WordsList children id={key} type="CARD" words={value} />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default LearnMode;
