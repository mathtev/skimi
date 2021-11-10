import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField } from '@material-ui/core';
import WordSelection from './WordSelection';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      position: 'relative',
      overflowY: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '100%',
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '60%',
        height: '80%',
        border: '2px solid #000',
      },
    },
    closeButton: {
      position: 'absolute',
      right: 10,
      top: 10,
    },
  })
);

interface CreateSetModalProps {
  modalOpen: boolean;
  handleModalClose: () => void;
}

const CreateSetModal: React.FC<CreateSetModalProps> = ({
  modalOpen,
  handleModalClose,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <Button className={classes.closeButton} onClick={handleModalClose}>
              Close &#10006;
            </Button>
            <WordSelection minWords={10} displayRows={6} handleModalClose={handleModalClose} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateSetModal;
