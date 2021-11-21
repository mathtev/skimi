import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import { navLinks } from '../../configuration';
import { useAuth } from '../../hooks/useAuth';

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

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout!().then(
      () => (window.location.href = 'http://localhost:3000')
    );
  };

  return (
    <div className={classes.grow}>
      <DesktopHeader navLinks={navLinks} logout={handleLogout} />
      <MobileHeader
        navLinks={navLinks}
        logout={handleLogout}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default Header;
