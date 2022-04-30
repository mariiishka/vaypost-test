import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';

import voypostLogo from './voypost-logo.svg';
import heroImage from './hero.png';
import theme from '../../../common/theme';

const useStyles = makeStyles({
  boxWithImage: {
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${heroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  boxWithForm: {
    maxWidth: '100%',
    height: '100%',
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingTop: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '375px',
      paddingTop: '100px',
      paddingBottom: '70px',
    },
  },
});

const SignScreen: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

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
                    <img src={voypostLogo} alt="Voypost logo" />
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
                      <Button
                        onClick={() => {
                          history.push('/register');
                        }}
                      >
                        Register
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">
                        Already have account?
                      </Typography>
                      <Button
                        onClick={() => {
                          history.push('/login');
                        }}
                      >
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

export default SignScreen;
