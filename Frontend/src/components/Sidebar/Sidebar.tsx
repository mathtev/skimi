import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Inbox } from '@material-ui/icons';
import { cssVariables } from '../../theme/theme';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: cssVariables.sidebarWidth,
  },
  toolbar: {
    height: cssVariables.headerHeight
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
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{<Inbox />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
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
        paper: classes.paper
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
