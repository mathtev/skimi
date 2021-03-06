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
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { cssVariables } from '../../context/theme/theme';
import HeaderSearch from './HeaderSearch';
import { Link, NavLink } from 'react-router-dom';
import { navLinksType } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      boxShadow: 'none',
      justifyContent: 'center',
      background: theme.palette.primary.main,
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
    fontWeight: 'bold',
    color: theme.palette.secondary.light,
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
    backgroundColor: theme.palette.primary.light,
    opacity: 1,
  },
  dropdownLink: {
    color: '#000',
    textDecoration: 'none'
  }
}));

interface DesktopToolBarProps {
  navLinks: navLinksType;
  logout: () => Promise<any>;
}

const DesktopHeader: React.FC<DesktopToolBarProps> = ({ navLinks, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dropdownAnchor, setDropdownAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownAnchor(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const isDropdownOpen = Boolean(dropdownAnchor);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDropdownClose = () => {
    setDropdownAnchor(null);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <NavLink to="" className={classes.titleButton}>
          <Typography className={classes.title} variant="h6" color="error">
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
          <Button onClick={handleDropdownMenuOpen} className={classes.link}>
            Admin
          </Button>
          <Menu
            id="menu-dropdown"
            getContentAnchorEl={null}
            anchorEl={dropdownAnchor}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isDropdownOpen}
            onClose={handleDropdownClose}
          >
            <Link to="/admin/edit-translations" className={classes.dropdownLink}>
              <MenuItem onClick={handleDropdownClose}>
                Edit translations
              </MenuItem>
            </Link>
            <Link to="/admin/edit-words" className={classes.dropdownLink}>
              <MenuItem onClick={handleDropdownClose}>
                Edit words
              </MenuItem>
            </Link>
          </Menu>
        </div>
        <div className={classes.grow} />
        <HeaderSearch />
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge variant="dot" color="error">
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
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopHeader;
