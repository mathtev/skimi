import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IWordDnd } from '.';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordsFromContainer: {
      display: 'flex',
      flexWrap: 'wrap'
    },
  })
);

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#f0f8ff' : '#fafafa',
  borderBottom: '2px solid #bfbfbf',
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  margin: '0 3px',
  border: '1px solid #a09d9d',
  padding: 7,
  borderRadius: 8,
  //color: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

interface WordsListProps {
  id: string;
  type: string;
  words: IWordDnd[];
}

const WordsList: React.FC<WordsListProps> = ({ id, type, words }) => {
  const classes = useStyles();

  return (
    <Droppable droppableId={id} type={type} direction="horizontal">
      {(provided, snapshot) => (
        <div
          className={classes.wordsFromContainer}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {words.map((word, index) => {
            return (
              <Draggable key={word.id} draggableId={word.id} index={index}>
                {(provided, snapshot) => (
                  <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
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
