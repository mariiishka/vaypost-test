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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    [theme.breakpoints.up('md')]: {
      gap: '32px',
    },
  },
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  fullName: yup
    .string()
    .matches(/\w+\s+\w+/, 'Full name should be of minimum 2 words')
    .required('Full name is required'),
  password: yup
    .string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password is required'),
});

const SignUpForm: React.FC = () => {
  const { setAlert } = React.useContext(UIContext);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
      showPasswordConfirmation: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const createUser = await app
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password);

        await createUser.user?.updateProfile({
          displayName: values.fullName,
        });
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
        Register
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          name="email"
          variant="filled"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
        />

        <TextField
          label="Full name"
          name="fullName"
          variant="filled"
          type="text"
          value={formik.values.fullName}
          onChange={(event) => {
            const validatedValue = event.target.value.replace(
              /(^|\s)\S/g,
              (a) => {
                return a.toUpperCase();
              },
            );

            formik.setFieldValue('fullName', validatedValue);
          }}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
          fullWidth
        />

        <TextField
          label="Password"
          name="password"
          variant="filled"
          type={formik.values.showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
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

        <TextField
          label="Repeat password"
          name="passwordConfirmation"
          variant="filled"
          type={formik.values.showPasswordConfirmation ? 'text' : 'password'}
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          fullWidth
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    formik.setFieldValue(
                      'showPasswordConfirmation',
                      !formik.values.showPasswordConfirmation,
                    );
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {formik.values.showPasswordConfirmation ? (
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
          Register
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
