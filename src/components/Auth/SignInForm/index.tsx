import React from 'react';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { makeStyles } from '@mui/styles';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import app from '../../../common/firebaseApp';
import { UIContext } from '../../Unknown/UIContext';
import theme from '../../../common/theme';

const useStyles = makeStyles({
  textField: {
    marginBottom: '24px',
    [theme.breakpoints.up('md')]: {
      marginBottom: '48px',
    },
  },
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
});

const SignInForm: React.FC = () => {
  const { setAlert } = React.useContext(UIContext);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      showPassword: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
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
    },
  });

  return (
    <>
      <Typography variant="h3" mb={{ xs: 2, md: 4 }}>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="filled-adornment-email"
          label="Email"
          name="email"
          variant="filled"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          className={classes.textField}
          fullWidth
        />

        <TextField
          id="filled-adornment-password"
          label="Password"
          name="password"
          variant="filled"
          type={formik.values.showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          className={classes.textField}
          fullWidth
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    formik.setFieldValue(
                      'showPassword',
                      !formik.values.showPassword,
                    );
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {formik.values.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          size="large"
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
          fullWidth
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
