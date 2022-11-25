type CV = {
  // personal info
  profilePhoto: File;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  website: string;

  // previous job
  companyName: string;
  jobTitle: string;
  jobStartDate: Date;
  jobEndDate: Date;
  jobDescription: string;

  // education
  collegeName: string;
  certificate: string;
  collegeStartDate: Date;
  collegeEndDate: Date;

  // profile summary
  profileSummary: string;
  hubbies: string;
  skills: string;
  interests: string;
  dislikes: string;
}

export default CV;