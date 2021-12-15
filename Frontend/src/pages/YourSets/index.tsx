import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Set } from '../../graphql/set/types';
import { GET_ALL_SETS, GET_SET } from '../../graphql/set/queries';
import { Sets } from '../../graphql/set/types';
import {
  Box,
  Button,
  Card,
  IconButton,
  LinearProgress,
  Popover,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { Link, useRouteMatch } from 'react-router-dom';
import { Height } from '@material-ui/icons';
import { DELETE_SET } from '../../graphql/set/mutations';
import SetCardMenu from './SetCardMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      maxWidth: 1100,
      padding: '0px 50px',
      margin: 'auto',
    },
    link: {
      textDecoration: 'none',
      margin: '20px 10px',
      maxWidth: 300,
    },
    card: {
      position: 'relative',
      height: 100,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: 15,
    },
    setProgress: {
      width: '100%',
      left: 0,
      right: 0,
      bottom: 0,
      height: '6px !important',
      position: 'absolute',
      margin: 0,
      background: '#d4fffd',

      '& .MuiLinearProgress-bar': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    bottomText: {},
  })
);

const YourSets = () => {
  const classes = useStyles();
  let { path } = useRouteMatch();

  const { data, loading, refetch } = useQuery<Sets>(GET_ALL_SETS);

  const [deleteSetMutation] = useMutation(DELETE_SET);
  
  const deleteSet = (id: number) => {
    deleteSetMutation({ variables: { id } }).then(() => refetch());
  };

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={classes.container}>
      {data?.sets &&
        data.sets.map((set: Set) => (
          <Link className={classes.link} to={path + '/' + set.id} key={set.id}>
            <Card className={classes.card}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">{set.name}</Typography>
                <SetCardMenu id={set.id} deleteSet={deleteSet} />
              </Box>
              <span className={classes.bottomText}>
                {set.translationSetList?.length} words
              </span>
              <LinearProgress
                className={classes.setProgress}
                variant="determinate"
                value={set.progress}
              />
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default YourSets;
