import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';

interface DesktopMenuProps {
  setAnchorEl: (value: null | HTMLElement) => void;
  anchorEl: null | HTMLElement;
  handleMobileMenuClose: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  setAnchorEl,
  anchorEl,
  handleMobileMenuClose,
}) => {
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
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
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
};

export default DesktopMenu;
