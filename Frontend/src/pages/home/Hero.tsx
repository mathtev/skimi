import { Box, makeStyles, Typography, Button, alpha } from '@material-ui/core';
import React from 'react';
import heroImg from '../../assets/images/onlineLearning.svg';

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    background: theme.palette.primary.light,
    color: '#fff',
  },
  hero: {
    height: 350,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '75em',
    padding: '0 40px',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      height: 'auto',
      padding: 40,

      '& img': {
        display: 'none',
      },
    },
  },
  heroImg: {
    height: '100%',
    width: '100%',
  },
  heroText: {
    marginBottom: 15,
  },
  heroBtn: {
    width: 200,
    height: 40,
    textTransform: 'none',
    fontWeight: 'bold',
    background: theme.palette.secondary.main,

    '&:hover': {
      background: alpha(theme.palette.secondary.main, 0.8),
    },
  },
}));

interface HeroProps {
  handleModalOpen: () => void;
}

const Hero: React.FC<HeroProps> = ({ handleModalOpen }) => {
  const classes = useStyles();

  return (
    <div className={classes.heroContainer}>
      <div className={classes.hero}>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          maxWidth="400px"
        >
          <Typography variant="h4" className={classes.heroText}>
            <b>Adaptive mode</b>
          </Typography>
          <Typography variant="subtitle1" className={classes.heroText}>
            <b>Create a new set of word faster at any level</b>
          </Typography>
          <Typography variant="subtitle1" className={classes.heroText}>
            Find new words in a list adjusting to your current knowledge and
            providing personalized experience.
          </Typography>
          <Button
            disableElevation
            variant="contained"
            color="secondary"
            className={classes.heroBtn}
            onClick={handleModalOpen}
          >
            Try it out
          </Button>
        </Box>
        <Box width="100%" height="70%">
          <img src={heroImg} alt="onlineLearning" className={classes.heroImg} />
        </Box>
      </div>
    </div>
  );
};

export default Hero;
