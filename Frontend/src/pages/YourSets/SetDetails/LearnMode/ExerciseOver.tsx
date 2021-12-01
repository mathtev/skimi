import {
  Box,
  Button,
  Card,
  LinearProgress,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'fixed',
      zIndex: 9999,
      inset: 0,
      background: '#fafafa',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: 300,
      height: 400,
    },
  })
);

interface ExerciseOverProps {
  oldProgress: number;
  newProgress: number;
  handleClose: () => void;
}

const ExerciseOver: React.FC<ExerciseOverProps> = ({
  oldProgress,
  newProgress,
  handleClose
}) => {
  const classes = useStyles();
  const history = useHistory();

  const diff = newProgress - oldProgress;

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          alignItems="center"
          p={4}
        >
          <Typography variant="h6">Progress: {diff}%</Typography>
          <LinearProgress variant="determinate" value={oldProgress} />
          <Button onClick={handleClose}>Go back</Button>
        </Box>
      </Card>
    </div>
  );
};

export default ExerciseOver;
