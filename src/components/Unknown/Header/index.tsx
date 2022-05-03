import React from 'react';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AvatarMenu from '../AvatarMenu';

const Header: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 2,
        }}
      >
        <Container maxWidth="xl">
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap="30px">
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <Typography variant="h5">Voypost</Typography>
            </Box>

            <AvatarMenu />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Header;
