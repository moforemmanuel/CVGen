import * as yup from 'yup';

// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

// export const validateImageType = (value) => {
//   if(value) {
//     let type = value.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
//     return SUPPORTED_FORMATS.includes(type)
//   }
// }

export function checkIfFilesAreTooBig(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      const size = file.size / 1024 / 1024
      if (size > 10) {
        valid = false
      }
    })
  }
  return valid
}

export function checkIfFilesAreCorrectType(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map(file => {
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        valid = false
      }
    })
  }
  return valid
}

const SubmitCVResolver = yup.object().shape({
  // personal info
  // profilePhoto: yup.mixed().test('fileSize', "File is too large", value => value.size <= 20000000).test('fileType', "Your Error Message", value => SUPPORTED_FORMATS.includes(value.type)),
  // profilePhoto: yup.array()
  // .nullable()
  // .required('VALIDATION_FIELD_REQUIRED')
  // .test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG', checkIfFilesAreTooBig)
  // .test(
  //   'is-big-file',
  //   'VALIDATION_FIELD_FILE_WRONG_TYPE',
  //   checkIfFilesAreCorrectType
  // ),
  profilePhoto: yup
    .mixed()
    // .required("You need to provide a file")
    // .test("fileSize", "The file is too large", (value) => {
    //     return value && value.size <= 200;
    // })
    // .test("type", "Only the following formats are accepted: .jpeg, .jpg, .png, .bmp, .svg", (value) => {
    //     return value && (
    //         value.type === "image/jpeg" ||
    //         value.type === "image/bmp" ||
    //         value.type === "image/png" ||
    //         value.type === 'image/jpg' ||
    //         value.type === "image/svg"
    //     );
    // }),
    ,
  firstName: yup.string().required("Please enter First Name"),
  lastName: yup.string(),
  email: yup
    .string()
    .required('Please enter an email')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please Enter a valid email'
    ),
  phone: yup.string(),
  title: yup.string().required("Please enter a title"),
  website: yup.string(),

  // previous job
  companyName: yup.string().required("Please enter the company name"),
  jobTitle: yup.string().required("Please enter job title"),
  jobStartDate: yup.date().transform((curr, orig) => orig === '' ? undefined : curr).required("Please select start date"),
  jobEndDate: yup.date().transform((curr, orig) => orig === '' ? undefined : curr).required("Please select end date").when("jobStartDate", (jobStartDate, yup) => jobStartDate && yup.min(jobStartDate, "End date cannot be before Start Date")),
  jobDescription: yup.string().required("Please enter job description"),

  // education
  collegeName: yup.string().required("Please enter college name"),
  certificate: yup.string().required("Please enter certificate name"),
  collegeStartDate: yup.date().transform((curr, orig) => orig === '' ? undefined : curr).required("Please enter start date"),
  collegeEndDate: yup.date().transform((curr, orig) => orig === '' ? undefined : curr).required("Please enter end date").when("collegeStartDate", (collegeStartDate, yup) => collegeStartDate && yup.min(collegeStartDate, "End date cannot be before Start Date")),

  // profile summary
  profileSummary: yup.string().required("Please enter profile summary"),
  hubbies: yup.string(),
  skills: yup.string(),
  interests: yup.string(),
  dislikes: yup.string(),
})

export default SubmitCVResolver;