import { Box, Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import React from 'react';
import clsx from 'clsx';
import { Sentence } from '../../graphql/sentence/types';

const useStyles = (isCorrect: boolean) =>
  makeStyles((theme: Theme) => ({
    feedback: {
      position: 'fixed',
      bottom: 0,
      height: 130,
      width: '100%',
      boxShadow: '0 0 0 100vmax rgba(0,0,0,.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      background: isCorrect ? '#91eb1a' : '#c75656',
    },
    feedbackTitle: {
      fontWeight: 600,
      color: isCorrect ? '#1f6d0c' : '#552323',
    },
    feedbackButton: {
      background: isCorrect ? '#1f6d0c' : '#552323',
      width: 133,
      height: 43,
      color: '#fff',
      borderRadius: 17,

      '&:hover': {
        backgroundColor: isCorrect ? '#26810f' : '#662929',
      },
    },
  }));

interface AnswerFeedbackProps {
  sentence?: Sentence;
  isCorrect: boolean;
  handleContinue: (event: any) => void;
}

const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  sentence,
  isCorrect,
  handleContinue,
}) => {
  const classes = useStyles(isCorrect)();
  return (
    <div className={classes.feedback}>
      <Box display="flex" flexDirection="column">
        <Typography className={classes.feedbackTitle} variant="h5">
          {isCorrect ? 'You are correct' : 'You are incorrect'}
        </Typography>
        <Typography variant="subtitle1">{sentence?.textTo}</Typography>
      </Box>
      <Button
        disableRipple
        className={classes.feedbackButton}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};

export default AnswerFeedback;
