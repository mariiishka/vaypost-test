import React from 'react';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AvatarMenu from '../AvatarMenu';

const Header: React.FC = () => {
  return (
    <>
      <Box
        height="60px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap="30px">
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4">Voypost</Typography>
        </Box>

        <AvatarMenu />
      </Box>
    </>
  );
};

export default Header;
