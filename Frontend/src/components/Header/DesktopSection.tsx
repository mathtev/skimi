import React from 'react';
import { Badge, IconButton, makeStyles } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
}));

interface DesktopToolBarProps {
  menuId: string;
  navLinks: string[];
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

const DesktopToolBar: React.FC<DesktopToolBarProps> = ({
  menuId,
  handleProfileMenuOpen,
  navLinks,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.sectionDesktop}>
      <IconButton color="inherit">
        <PeopleIcon />
      </IconButton>
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
    </div>
  );
};

export default DesktopToolBar;
