import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Sentence } from '../../../../../graphql/sentence/types';
import { reorderWords } from './reorder';
import WordsList from './WordsList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordsList: {
      background: '#d3f7ff',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      justifyContent: 'space-between',
    },
  })
);

export interface IWordDnd {
  id: string;
  name: string;
}

export interface IWordsDnd {
  [key: string]: IWordDnd[];
  wordsFrom: IWordDnd[];
  wordsTo: IWordDnd[];
}

interface WordsDndProps {
  words: IWordsDnd;
  sentence: Sentence;
  handleSetWords: (data: IWordsDnd)=>void;
}

const WordsDnd: React.FC<WordsDndProps> = ({ words, sentence, handleSetWords }) => {
  const classes = useStyles();

  return (
    <DragDropContext
      key={sentence.id}
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }

        handleSetWords(reorderWords(words, source, destination));
      }}
    >
      <div className={classes.container}>
        {Object.entries(words).map(([key, value], index: number) => (
          <div className={classes.wordsList} key={key}>
            <WordsList children id={key} type="CARD" words={value} />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default WordsDnd;
