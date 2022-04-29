import { Box, Grid } from '@mui/material';
import React from 'react';
import Header from '../Header';

const HomeScreen: React.FC = () => {
  return (
    <Box height="100vh">
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
