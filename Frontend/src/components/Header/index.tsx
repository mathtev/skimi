import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import { navLinks } from '../../configuration';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

export interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <DesktopHeader navLinks={navLinks} />
      <MobileHeader navLinks={navLinks} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Header;
