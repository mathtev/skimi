import {
  alpha,
  AppBar,
  Badge,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { cssVariables } from '../../context/theme/theme';
import HeaderSearch from './HeaderSearch';
import { navLinksType } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.info.dark,
    height: cssVariables.headerHeight,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

interface MobileHeaderProps {
  navLinks: navLinksType;
  toggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  navLinks,
  toggleSidebar,
}) => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar disableGutters={true}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <HeaderSearch />
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton color="inherit">
              <Badge variant="dot" color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
            <p>Settings</p>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MobileHeader;
