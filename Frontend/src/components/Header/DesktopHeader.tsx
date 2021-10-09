import React from 'react';
import {
  alpha,
  AppBar,
  Badge,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { cssVariables } from '../../context/theme/theme';
import HeaderSearch from './HeaderSearch';
import { NavLink } from 'react-router-dom';
import { navLinksType } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      background: theme.palette.info.dark,
      height: cssVariables.headerHeight,
    },
  },
  grow: {
    flexGrow: 1,
  },
  titleButton: {
    color: 'inherit',
    textDecoration: 'none',
  },
  title: {
    display: 'block',
    letterSpacing: '3px',
    fontWeight: 600,
    fontFamily: 'cursive',
    color: '#ffe5b4',
    padding: 0,
  },
  linksContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '38px',
  },
  link: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#fff',
    opacity: 0.8,
    textDecoration: 'none',
    textTransform: 'capitalize',
    fontSize: 16,
    padding: '0 20px',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.07),
    },
  },
  linkActive: {
    fontWeight: 'bold',
    opacity: 1,
  },
}));

interface DesktopToolBarProps {
  navLinks: navLinksType;
}

const DesktopHeader: React.FC<DesktopToolBarProps> = ({ navLinks }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = 'primary-search-account-menu';

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <NavLink to="" className={classes.titleButton}>
          <Typography className={classes.title} variant="h6">
            SKIMI
          </Typography>
        </NavLink>
        <div className={classes.linksContainer}>
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={classes.link}
              activeClassName={classes.linkActive}
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        <div className={classes.grow} />
        <HeaderSearch />
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge variant="dot" color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopHeader;
