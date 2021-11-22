import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TranslationDetails from './TranslationDetails';
import { Translation } from '../../../../graphql/translation/types';
import { Language } from '../../../../graphql/language/types';

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
      padding: '70px 40px',
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

interface TranslationDetailsModalProps {
  modalOpen: boolean;
  languageTo?: Language;
  languageFrom?: Language;
  translation?: Translation;
  handleModalClose: () => void;
  refetchTranslations: any;
}

const TranslationDetailsModal: React.FC<TranslationDetailsModalProps> = ({
  modalOpen,
  handleModalClose,
  translation,
  languageTo,
  languageFrom,
  refetchTranslations
}) => {
  const classes = useStyles();
  return (
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
          <div className="content">
            <TranslationDetails
              translation={translation}
              languageFrom={languageFrom}
              languageTo={languageTo}
              refetchTranslations={refetchTranslations}
            />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default TranslationDetailsModal;
