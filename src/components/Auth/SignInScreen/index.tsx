import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';

import { ReactComponent as VoypostLogo } from './voypost-logo.svg';
import useStyles from './useStyles';

const SignInScreen: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

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
            <Grid item xs={12} md={6}>
              <Box className={classes.boxWithImage} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid
                container
                direction="column"
                className={classes.boxWithForm}
              >
                <Grid item>
                  <Box mb={{ xs: 2, md: 5 }}>
                    <VoypostLogo />
                  </Box>
                  {location.pathname === '/login' ? (
                    <SignInForm />
                  ) : (
                    <SignUpForm />
                  )}
                </Grid>

                <Grid item>
                  {location.pathname === '/login' ? (
                    <>
                      <Typography variant="h6">
                        Don’t have an account?
                      </Typography>
                      <Button component={Link} to="/register">
                        Register
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">
                        Already have account?
                      </Typography>
                      <Button component={Link} to="/login">
                        Login
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SignInScreen;
