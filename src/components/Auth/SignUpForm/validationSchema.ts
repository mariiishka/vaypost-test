import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  fullName: yup
    .string()
    .matches(/(^|\s)\S/, 'Error')
    .matches(
      /\b[A-Z]\w+\s+\b[A-Z]\w+/,
      'Full name should be of minimum 2 capitilized words',
    )
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

export default validationSchema;
