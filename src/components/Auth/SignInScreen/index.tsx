import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SignInForm from '../SignInForm';

import voypostLogo from '../../../images/voypost-logo.png';
import heroImage from '../../../images/hero.png';

const SignInScreen: React.FC = () => {
  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Container fixed maxWidth="xl">
          <Grid container>
            <Grid item xs={12} md={6} display={{ xs: 'none', md: 'block' }}>
              <Box
                sx={{
                  width: '100%',
                  height: '100vh',
                  backgroundImage: `url(${heroImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  maxWidth: { xs: '100%', md: '375px' },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto',
                }}
              >
                <Box mb={5}>
                  <img src={voypostLogo} alt="Voypost logo" />
                </Box>

                <Typography variant="h3" mb={8}>
                  Login
                </Typography>

                <SignInForm />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SignInScreen;
