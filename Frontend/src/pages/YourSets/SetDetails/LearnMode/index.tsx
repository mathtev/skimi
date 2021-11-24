import React from 'react';
import { useParams } from 'react-router';
import { GET_SET, useSetQuery } from '../../../../graphql/set/queries';
import { getRandom, weightedRandom } from '../../../../utils/helperFunctions';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useQuery } from '@apollo/client';
import { Set, SetResponse } from '../../../../graphql/set/types';
import { Translation } from '../../../../graphql/translation/types';
import { Sentence } from '../../../../graphql/sentence/types';
import { Box } from '@material-ui/core';
import { classNames } from 'react-select/dist/declarations/src/utils';

import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordsFromContainer: {
      display: 'flex'
    },
  })
);

interface IRouterParams {
  id: string;
}

interface Word {
  id: string;
  name: string;
}

const LearnMode: React.FC = () => {
  const id = +useParams<IRouterParams>().id;
  const classes = useStyles();

  const [wordsFrom, setWordsFrom] = React.useState<Word[]>([]);
  const [wordsTo, setWordsTo] = React.useState<Word[]>([]);

  const { data, loading, refetch } = useQuery<SetResponse>(GET_SET, {
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
    const wordsFromArray = sentenceToArray(sentence.textFrom);
    const wordsToArray = sentenceToArray(sentence.textTo);

    wordsFromArray && setWordsFrom(wordsFromArray);
    wordsToArray && setWordsTo(wordsToArray);
  };

  const sentenceToArray = (sentence: string) => {
    const array = sentence.toLowerCase().split('.').join('').split(' ');
    const wordArray = array.map((wordName, index) => ({
      id: wordName + index,
      name: wordName,
    }));
    return wordArray;
  };

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(wordsFrom);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWordsFrom(items);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="wordsFrom" direction="horizontal">
          {(provided) => (
            <div className={classes.wordsFromContainer} {...provided.droppableProps} ref={provided.innerRef}>
              {wordsFrom?.map((word: Word, index: number) => {
                return (
                    <Draggable
                      key={word.id}
                      draggableId={word.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {word.name}
                        </div>
                      )}
                    </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default LearnMode;
