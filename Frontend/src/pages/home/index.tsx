import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import NewSetModal from './components/NewSetModal';

const useStyles = makeStyles((theme) => ({
  newSetButton: {},
}));

const Home = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <Button
        disableElevation
        variant="contained"
        color="secondary"
        className={classes.newSetButton}
        onClick={handleModalOpen}
      >
        Create new set
      </Button>
      <NewSetModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
    </div>
  );
};

export default Home;
