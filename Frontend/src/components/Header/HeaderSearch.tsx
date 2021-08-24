import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, InputBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    margin: theme.spacing(0, 2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      background: 'transparent',
      margin: 0
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 0,
      '&:focus': {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        width: '20ch',
      },
    },
  },
}));

const HeaderSearch = () => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        fullWidth
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default HeaderSearch;
