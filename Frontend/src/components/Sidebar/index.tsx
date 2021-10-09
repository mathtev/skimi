import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { cssVariables } from '../../context/theme/theme';
import { navLinks } from '../../configuration';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: cssVariables.sidebarWidth,
  },
  toolbar: {
    height: cssVariables.headerHeight,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    left: 10,
    right: 10,
  },
  item: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '& span': {
      paddingLeft: 10,
    }
  },
}));

export interface SidebarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, sidebarOpen }) => {
  const classes = useStyles();

  const drawerContent = (
    <div>
      <div className={classes.toolbar}>
        <IconButton
          disableRipple
          className={classes.closeIcon}
          onClick={() => toggleSidebar()}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <NavLink
            key={link.title}
            className={classes.item}
            onClick={() => toggleSidebar()}
            to={link.path}
          >
            <ListItem button key={link.title}>
              <ListItemText primary={link.title} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      anchor={'left'}
      open={sidebarOpen}
      onClose={(e) => toggleSidebar()}
      classes={{
        paper: classes.paper,
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
