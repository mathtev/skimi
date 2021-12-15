import { Box, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressbar: {
      color: theme.palette.secondary.light,
    },
    text: {
      fontSize: '0.6rem',
      fontWeight: 'bolder',
    },
  })
);

export function CircularProgressWithLabel(props: any) {
  const classes = useStyles();
  const value = props.value || 0;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        className={classes.progressbar}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          className={classes.text}
          variant="caption"
          component="span"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
