import { useQuery } from '@apollo/client';
import {
  alpha,
  Box,
  Button,
  Card,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Set as SetType, Sets } from '../../graphql/set/types';
import { GET_ALL_TRANSLATIONS } from '../../graphql/translation/queries';
import { Translations } from '../../graphql/translation/types';
import { TRANSLATION_SET_GROUP as TRANSLATION_SET_LIST } from '../../graphql/translationSet/queries';
import {
  TranslationSet,
  TranslationSetList,
} from '../../graphql/translationSet/types';
import { useAuth } from '../../hooks/useAuth';
import { useLevels } from '../../hooks/useLevels';
import CreateSetModal from './CreateSetModal';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useLanguages } from '../../hooks/useLanguages';
import { cssVariables } from '../../context/theme/theme';
import LabelledProgress from './LabelledProgress';
import Hero from './Hero';
import {
  GET_ALL_SETS,
} from '../../graphql/set/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: cssVariables.headerHeight,
  },
  container: {
    display: 'flex',
    margin: '5%',
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
    width: '100%',
  },
  ellipsisText: {
    overflow: 'hidden',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
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
    maxWidth: 170,
    textDecoration: 'none',
  },
  subtitle: {
    marginBottom: 15,
    fontWeight: 'bolder',
  },
}));

const Home = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { userLevel } = useLevels();
  const { languageFrom, languageTo } = useLanguages();

  const _translations = useQuery<Translations>(GET_ALL_TRANSLATIONS);
  const _sets = useQuery<Sets>(GET_ALL_SETS);

  const translations = _translations.data?.translations || [];
  const sets = _sets.data?.sets || [];

  const [modalOpen, setModalOpen] = React.useState(false);

  const countWordsMastered = () => {
    let count = 0;

    for (let set of sets) {
      for (let translation of set.translationSetList || []) {
        if (translation.skill === 100) {
          count += 1;
        }
      }
    }

    return count;
  };

  const getRecentlyCreatedSets = (n: number) => {
    //prettier-ignore
    const sorted = [...sets].sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
    );

    return sorted.slice(0, n);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const refetchSets = (set: SetType) => {
    _sets.refetch();
  };

  const wordsMastered = countWordsMastered();
  const recentSets = getRecentlyCreatedSets(3);

  return (
    <div className={classes.root}>
      <Hero handleModalOpen={handleModalOpen} />
      <div className={classes.container}>
        <Typography variant="h4">Welcome {currentUser?.name}</Typography>
        <Grid className={classes.mainGrid} container>
          <Grid item sm={6} xs={12} className={classes.gridLeft}>
            <Box height="100%" display="flex" flexDirection="column">
              <Typography variant="h6" className={classes.subtitle}>
                Daily goal
              </Typography>
              <LabelledProgress
                label="Words learned: 4/10"
                color="red"
                value={4 / 10}
              />
              <LabelledProgress
                label="Repeated words: 10/20"
                color="blue"
                value={10 / 20}
              />
              <LabelledProgress
                label="Words studied: 5/20"
                color="green"
                value={5 / 20}
              />
            </Box>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.gridRight}>
            <Typography variant="h6" className={classes.subtitle}>
              Recently created
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
          refetchSets={refetchSets}
        />
      </div>
    </div>
  );
};

export default Home;
