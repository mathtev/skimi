import React, { useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, IconButton, InputBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
    opacity: 0.6,
    [theme.breakpoints.up('sm')]: {
      opacity: 1
    }
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
    '&:focus': {
      backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
    [theme.breakpoints.up('sm')]: {
      width: 0,
      '&:focus': {
        width: '20ch',
        [theme.breakpoints.down(750)]: {
          width: '50px',
        }
      },
    },
  },
  inputNotFocused: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      width: 0,
    },
  },
  searchNotFocused: {
    [theme.breakpoints.up('sm')]: {
      position: 'static',
    },
  },
}));

const HeaderSearch = () => {
  const classes = useStyles();
  const [searchFocus, setSearchFocus] = React.useState(false);

  const useFocus = () => {
    const htmlElRef = useRef<HTMLElement>(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef?.current?.querySelector('input')?.focus();
    };

    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();
  const setFocus = (isFocus: boolean) => {
    setSearchFocus(isFocus);
  };
  React.useEffect(() => {
    if (searchFocus === true && typeof setInputFocus === 'function') {
      setInputFocus();
    }
  }, [searchFocus, setInputFocus]);

  return (
    <IconButton
      disableRipple
      onClick={() => setFocus(true)}
      color="inherit"
      className={classes.search}
    >
      <SearchIcon
        className={`${searchFocus ? '' : classes.searchNotFocused} ${
          classes.searchIcon
        }`}
      />
      <InputBase
        ref={inputRef}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        className={searchFocus ? '' : classes.inputNotFocused}
        onBlur={() => setFocus(false)}
        fullWidth
        inputProps={{ 'aria-label': 'search' }}
      />
    </IconButton>
  );
};

export default HeaderSearch;
