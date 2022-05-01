import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import app from '../../../common/firebaseApp';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext } from '../UIContext';

const AvatarMenu: React.FC = () => {
  const [userInitials, setUserInitials] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setAlert } = React.useContext(UIContext);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      const injectDisplayName = () => {
        if (app.auth().currentUser?.displayName === null) {
          setTimeout(() => {
            injectDisplayName();
          }, 500);
        } else if (user && user.displayName) {
          setUserInitials(
            user.displayName
              .split(' ')
              .map((name) => name[0])
              .join(''),
          );
        }
      };
      injectDisplayName();
    });
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toLogOut = React.useCallback(async () => {
    try {
      await app.auth().signOut();
      clearFirestoreCache();
    } catch (error) {
      let message = 'Somthing went wrong';

      if (error instanceof Error) {
        message = error.message;
      }

      setAlert({
        show: true,
        severity: 'error',
        message,
      });
    }
  }, [setAlert]);

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar>{userInitials || 'U'}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={toLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
