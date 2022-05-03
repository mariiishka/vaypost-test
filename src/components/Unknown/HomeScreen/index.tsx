import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box py={5} display="flex" justifyContent="center">
        <Button component={Link} to="/flats" variant="contained">
          explore flats
        </Button>
      </Box>
    </Container>
  );
};

export default HomeScreen;
