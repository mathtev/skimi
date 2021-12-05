import { alpha, Box, LinearProgress } from '@material-ui/core';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = (color: string) =>
  makeStyles((theme: Theme) => ({
    progress: {
      marginTop: 3,
      background: '#d7e9ff',

      '& .MuiLinearProgress-bar': {
        backgroundColor: color,
      },
    },
  })
);

interface LabelledProgressProps {
  color: string;
  label: string;
  value: number;
}

const LabelledProgress: React.FC<LabelledProgressProps> = ({
  color,
  label,
  value,
}) => {
  const classes = useStyles(color)();

  return (
    <Box display="flex" flexDirection="column" fontSize="12px" >
      <b>{label}</b>
      <LinearProgress
        className={classes.progress}
        variant="determinate"
        value={value * 100}
      />
    </Box>
  );
};

export default LabelledProgress;
