import { IconButton, makeStyles } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

interface MobileToolbarBarProps {
  mobileMenuId: string;
  navLinks: string[];
  handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

const MobileToolbarBar: React.FC<MobileToolbarBarProps> = ({mobileMenuId, handleMobileMenuOpen, navLinks}) => {
  const classes = useStyles();
  return (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    </div>
  );
};

export default MobileToolbarBar;
