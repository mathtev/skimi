import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { WordDnd } from '.';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordsFromContainer: {
      display: 'flex',
    },
  })
);

interface WordsListProps {
  id: string;
  type: string;
  words: WordDnd[];
}

const WordsList: React.FC<WordsListProps> = ({ id, type, words }) => {
  const classes = useStyles();

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  });

  return (
    <Droppable
      droppableId={id}
      type={type}
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <div
          className={classes.wordsFromContainer}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {words.map((word, index) => {
            return (
              <Draggable key={word.id} draggableId={word.id} index={index}>
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
  );
};

export default WordsList;
