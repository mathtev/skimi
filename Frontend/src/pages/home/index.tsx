import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Set as SetType } from '../../graphql/set/types';
import { GET_ALL_TRANSLATIONS } from '../../graphql/translation/queries';
import { Translations } from '../../graphql/translation/types';
import { TRANSLATION_SET_GROUP as TRANSLATION_SET_LIST } from '../../graphql/translationSet/queries';
import { TranslationSetList } from '../../graphql/translationSet/types';
import { useAuth } from '../../hooks/useAuth';
import { useLevels } from '../../hooks/useLevels';
import CreateSetModal from './CreateSetModal';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useLanguages } from '../../hooks/useLanguages';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: '0 5%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  mainGrid: {},
  gridRight: {
    marginTop: 30,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '7%',
    },
  },
  gridLeft: {
    marginTop: 30,
    [theme.breakpoints.up('sm')]: {
      paddingRight: '7%',
    },
  },
  setCard: {
    height: 70,
    padding: 10,
    margin: 5,
  },
  cardsContainer: {
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    paddingBottom: 7,
    maxWidth: '80%',
    width: '100%'
  },
  ellipsisText: {
    overflow: 'hidden',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
  },
  newSetButton: {
    width: 200,
    height: 40,

    '&:hover': {
      boxShadow: '0 0 20px 2px #c5e7ff',
    },
  },
  stats: {
    padding: 10,
  },
  stat: {
    display: 'flex',
    margin: '5px 0',

    '&>*': {
      flex: '50%',
    },
  },
  link: {
    flex: '1 1 0px',
    width: 0,
    textDecoration: 'none',
  },
  subtitle: {
    marginBottom: 15
  }
}));

const Home = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { userLevel } = useLevels();
  const { languageFrom, languageTo } = useLanguages();

  const _translations = useQuery<Translations>(GET_ALL_TRANSLATIONS);
  const _translationSetList =
    useQuery<TranslationSetList>(TRANSLATION_SET_LIST);

  const translations = _translations.data?.translations || [];
  const translationSetList = _translationSetList.data?.translationSetList || [];

  const wordsMastered =
    translationSetList.filter((ts) => ts.skill === 100).length || undefined;

  const [modalOpen, setModalOpen] = React.useState(false);

  const getRecentlyCreatedSets = (n: number) => {
    const sets = [...new Set(translationSetList.map((ts) => ts.set))];
    //prettier-ignore
    const sorted = sets.sort((a, b) =>
      a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
    );

    return sorted.slice(0, n);
  };

  const recentSets = getRecentlyCreatedSets(3);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">Welcome {currentUser?.name}</Typography>
      <Grid className={classes.mainGrid} container>
        <Grid item sm={6} xs={12} className={classes.gridLeft}>
          <Typography variant="h6" className={classes.subtitle}>
            Your stats
          </Typography>
          <Card className={classes.stats}>
            <Typography variant="subtitle1" className={classes.stat}>
              <b>Learning language:</b>
              <span className={classes.ellipsisText}>{languageTo?.name}</span>
            </Typography>
            <Typography variant="subtitle1" className={classes.stat}>
              <b>Estimated level:</b>
              <span>{userLevel?.code}</span>
            </Typography>
            <Typography variant="subtitle1" className={classes.stat}>
              <b>Words mastered:</b>
              <span>{wordsMastered}</span>
            </Typography>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.gridRight}>
          <Typography variant="h6" className={classes.subtitle}>
            Recently created sets
          </Typography>
          <div className={classes.cardsContainer}>
            {recentSets.map((set: SetType) => (
              <Link
                className={classes.link}
                to={'/your-sets/' + set.id}
                key={set.id}
              >
                <Card className={clsx(classes.setCard, classes.ellipsisText)}>
                  {set.name}
                </Card>
              </Link>
            ))}
          </div>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.gridLeft}>
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h6" className={classes.subtitle}>
              Start adaptive search and
            </Typography>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              className={classes.newSetButton}
              onClick={handleModalOpen}
            >
              Create new set
            </Button>
          </Box>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.gridRight}>
          <Typography variant="h6" className={classes.subtitle}>
            Chosen for revision
          </Typography>
          <div className={classes.cardsContainer}>
            {recentSets.map((set: SetType) => (
              <Link
                className={classes.link}
                to={'/your-sets/' + set.id}
                key={set.id}
              >
                <Card className={clsx(classes.setCard, classes.ellipsisText)}>
                  {set.name}
                </Card>
              </Link>
            ))}
          </div>
        </Grid>
      </Grid>
      <CreateSetModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        translations={translations}
      />
    </div>
  );
};

export default Home;
