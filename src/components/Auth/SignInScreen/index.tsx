import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import SignInForm from '../SignInForm';

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
  loginForm: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '375px',
    },
  },
});

const SignInScreen: React.FC = () => {
  const classes = useStyles();

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
              <Box className={classes.loginForm}>
                <Box mb={{ xs: 2, md: 5 }}>
                  <img src={voypostLogo} alt="Voypost logo" />
                </Box>

                <Typography variant="h3" mb={{ xs: 4, md: 8 }}>
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
