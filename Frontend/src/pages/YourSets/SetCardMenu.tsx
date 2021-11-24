import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    moreIcon: {
      fill: '#a2a2a2',
      width: 20,
      height: 20,
    },
    moreIconBtn: {
      width: 10,
      height: 10,
    },
    menu: {},
    paper: {
      height: 30,
      overflow: 'hidden',
    },
    deleteBtn: {
      fontSize: 12,
      height: 20,
      width: 50,
    },
  })
);

interface SetCardMenuProps {
  id: number;
  deleteSet: (id: number) => void;
}

const SetCardMenu: React.FC<SetCardMenuProps> = ({ id, deleteSet }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const menuId = open ? 'simple-Menu' : undefined;

  const handleClose = (event: any) => {
    setAnchorEl(null);
  };

  const handleDeleteSet = (event: any) => {
    deleteSet(id);
    handleClose(event);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton onClick={handleMoreClick} className={classes.moreIconBtn}>
        <MoreVertOutlinedIcon className={classes.moreIcon} />
      </IconButton>
      <Menu
        id={menuId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.menu}
        onClick={e=>e.stopPropagation()}
        classes={{
          paper: classes.paper,
        }}
      >
        <MenuItem>
          <Button
            className={classes.deleteBtn}
            onClick={handleDeleteSet}
          >
            Delete
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SetCardMenu;
