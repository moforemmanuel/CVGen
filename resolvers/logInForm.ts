import * as yup from 'yup';

const loginResolver = yup.object().shape({
  email: yup
    .string()
    .required('Please enter an email')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please Enter a valid email'
    ),

  password: yup
  .string()
  .required('Please Enter a password with matricule format')
  .matches(/^uba\d{2}\w\d{4}$/gim, 'Please Enter a valid password'),

  rememberMe: yup.boolean(),
});

export default loginResolver;