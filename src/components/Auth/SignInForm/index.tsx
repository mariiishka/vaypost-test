import React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FilledInput from '@mui/material/FilledInput';
import app from '../../../common/firebaseApp';
import { UIContext } from '../../Unknown/UIContext';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
  disabledSumbit: boolean;
}

const SignInForm: React.FC = () => {
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    showPassword: false,
    disabledSumbit: false,
  });

  const { setAlert } = React.useContext(UIContext);

  const handleSignIn = React.useCallback(
    async (message) => {
      setAlert({
        show: true,
        severity: 'info',
        message,
      });
    },
    [setAlert],
  );

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const resetForm = React.useCallback(() => {
    setValues({
      ...values,
      email: '',
      password: '',
    });
  }, [values]);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { email, password } = values;
      setValues({ ...values, disabledSumbit: true });

      try {
        await app.auth().signInWithEmailAndPassword(email, password);
        resetForm();
        setValues({
          ...values,
          disabledSumbit: false,
        });
      } catch ({ message }) {
        handleSignIn(message);
        setValues({
          ...values,
          disabledSumbit: false,
        });
      }
    },
    [handleSignIn, resetForm, values],
  );

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mb: 6, width: '100%' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
          <FilledInput
            id="filled-adornment-email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            required
          />
        </FormControl>

        <FormControl sx={{ mb: 6, width: '100%' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          size="large"
          variant="contained"
          type="submit"
          disabled={values.disabledSumbit}
          fullWidth
        >
          Sign in
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
