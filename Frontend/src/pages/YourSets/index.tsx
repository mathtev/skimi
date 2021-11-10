import { useQuery } from '@apollo/client';
import React from 'react';
import { Set } from '../../graphql/set/types';
import { GET_ALL_SETS, GET_SET } from '../../graphql/set/queries';
import { Sets } from '../../graphql/set/types';
import { Card, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      maxWidth: 1100,
      padding: '0px 50px',
      margin: 'auto'
    },
    link: {
      textDecoration: 'none',
      margin: '20px 10px',
    },
    card: {
      height: 100,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    bottomText: {

    }
  })
);

const YourSets = () => {
  const classes = useStyles();
  let { path } = useRouteMatch();
  const { data, loading, refetch } = useQuery<Sets>(GET_ALL_SETS);
  console.log(data)
  return (
    <div className={classes.container}>
      {data?.sets &&
        data.sets.map((set: Set) => (
          <Link className={classes.link} to={path + '/' + set.id} key={set.id}>
            <Card className={classes.card}>
              <Typography variant="h6">{set.name}</Typography>
              <span className={classes.bottomText}>{set.translations?.length} words</span>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default YourSets;
