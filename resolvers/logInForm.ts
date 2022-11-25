import * as yup from 'yup';

const loginResolver = yup.object().shape({
  matricule: yup
    .string()
    .required('Please Enter a matricule')
    .matches(/^uba\d{2}\w\d{4}$/gim, 'Please Enter a valid Matricule'),

  password: yup
    .string()
    .required('Please enter a password')
    .min(6, 'Password should be atleast 6 characters'),

  rememberMe: yup.boolean(),
});

export default loginResolver;