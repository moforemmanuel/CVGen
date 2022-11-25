import * as yup from 'yup';


const AddUserSchema = yup.object().shape({
  firstName: yup.string().required('Please Enter First Name'),
  lastName: yup.string(),
  matricule: yup
    .string()
    .required('Please Enter a matricule')
    .matches(/^uba\d{2}\w\d{4}$/gim, 'Please Enter a valid Matricule'),

  email: yup
    .string()
    .required('Please enter an email')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please Enter a valid email'
    ),
  password: yup
    .string()
    .required('Please enter a password')
    .min(6, 'Password should be atleast 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please enter a password')
    .min(6, 'Password should be atleast 6 characters'),
});

export default AddUserSchema;