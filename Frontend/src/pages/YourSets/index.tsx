import { useQuery } from '@apollo/client';
import React from 'react';
import { Set } from '../../graphql/set/types';
import { GET_ALL_SETS, GET_SET } from '../../graphql/set/queries';
import { Sets } from '../../graphql/set/types';
import { Card, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      padding: '0 50px'
    },
    card: {
      height: 100,
      margin: '20px 10px',
    },
  })
);

const YourSets = () => {
  const classes = useStyles();
  const { data, loading, refetch } = useQuery<Sets>(GET_ALL_SETS);
  //const set = useQuery<Set>(GET_SET, { variables: { id: 1 } });

  return (
    <div className={classes.container}>
      {data?.sets &&
        data.sets.map((set: Set) => (
          <Card className={classes.card}>
            <Typography variant="h6">{set.name}</Typography>
          </Card>
        ))}
    </div>
  );
};

export default YourSets;
