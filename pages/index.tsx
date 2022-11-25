import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { chakra } from '@chakra-ui/react';
import logoutHandler from '../handlers/logoutHandler';
import submitCVHandler from '../handlers/submitCVHandler';
import SubmitCVResolver from '../resolvers/submitCV';

import { useForm } from 'react-hook-form';
import CV from '../interfaces/cv';
import { yupResolver } from '@hookform/resolvers/yup';
import FullPageLoader from '../components/fullPageLoader/FullPageLoader';
import CImage from '../components/CImage/CImage';
import { toast } from 'react-toastify';

const Home = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<any>(undefined);
  const imageRef = React.useRef();
  // @ts-ignore
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>();
  const [preview, setPreview] = React.useState<string | undefined>();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CV>();
  // { resolver: yupResolver(SubmitCVResolver) }

  React.useEffect(() => {
    if (Cookies.get('user')) {
      setUser(JSON.parse(Cookies.get('user') as string));
    }
    //  else {
    //   router.push(`/auth/login?redirect=${router.pathname}`);
    // }

    setIsMounted(true);

    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory whenever component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (
    e: React.FormEvent<HTMLInputElement>
    // files: FileList
  ) => {
    let files = e.target.files;
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    const image = files[0];
    console.log(image);

    if (
      image.type === 'image/png' ||
      image.type === 'image/svg' ||
      image.type === 'image/jpeg' ||
      image.type === 'image/gif' ||
      image.type === 'image/tiff'
    ) {
      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(files[0]);
      return;
    }

    toast.error('Please select an Image file');
    // clear files on error
    // e.currentTarget.value = '';
    return;
  };

  if (!isMounted) {
    return <FullPageLoader />;
  }
  return (
    isMounted && (
      <>
        <chakra.header
          id="header"
          className="w-100 d-flex align-items-center justify-content-center text-white flex-column text-center p-4"
          bg="blue.400"
          h="30vh"
        >
          <Heading as="h1" className="fw-bolder">
            CV Generator App
          </Heading>
          <Heading className="fs-3 fw-light">
            Fill all fields and get your CV with one click
          </Heading>
        </chakra.header>

        <main>
          {!user ? (
            <Flex
              my={3}
              align="center"
              justify="center"
              gap={3}
              direction="column"
              h="60vh"
            >
              <Heading> Please Sign In to use our Services</Heading>
              <Button
                colorScheme="blue"
                onClick={() =>
                  router.push(`/auth/login?redirect=${router.pathname}`)
                }
              >
                Sign In
              </Button>
            </Flex>
          ) : (
            <>
              <Flex
                my={3}
                align="center"
                justify="center"
                gap={3}
                direction="column"
              >
                <Heading>
                  Hey there{' '}
                  <Text as="span" color="blue.400">
                    {user.firstName}
                  </Text>
                </Heading>
                <Text>Fill the form below to get started</Text>
                <Text>or</Text>
                <Button
                  rounded={0}
                  transition={'all 0.5s'}
                  _hover={{
                    color: 'blue.400',
                    bg: 'white',
                    borderWidth: 'thin',
                    borderColor: 'blue.400',
                    borderStyle: 'solid',
                    transform: 'scale(1.1)',
                  }}
                  colorScheme="blue"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </Flex>
              <Box bg="gray.50" p={3}>
                <chakra.form
                  p={2}
                  my={3}
                  className="needs-validation my-3"
                  onSubmit={handleSubmit(submitCVHandler)}
                  action=""
                  noValidate
                  bg="white"
                  shadow="lg"
                >
                  <div
                    className="container col-md-6"
                    // style={{ border: 'thin solid red' }}
                  >
                    <div className="row" id="personal-details">
                      <Heading textAlign="center">Personal Details</Heading>
                      <div
                        className="col-12 col-md-4 p-2 text-center"
                        // style={{ border: 'thin solid red' }}
                      >
                        <div>
                          <div className="d-flex justify-content-center mb-2">
                            <CImage
                              // ref={imageRef}
                              src={preview || '/images/image-placeholder.jpeg'}
                              id="profile"
                              // className="rounded-circle img-fluid p-0"
                              alt="example placeholder"
                              layout="responsive"
                              width="150"
                              height="150"
                              rounded="full"
                              style={{ border: 'thin solid gray' }}
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <FormControl
                              // @ts-ignore
                              isInvalid={errors.profilePhoto}
                              isRequired
                            >
                              <div className="btn btn-primary btn-rounded">
                                <label
                                  className="form-label text-white m-1"
                                  htmlFor="profilePicture"
                                >
                                  Choose Photo
                                </label>
                                <Input
                                  {...register('profilePhoto')}
                                  type="file"
                                  className="form-control d-none"
                                  id="profilePicture"
                                  // onChange={(e) => {
                                  //   console.log(
                                  //     'before: ',
                                  //     e.currentTarget.files
                                  //   );
                                  //   // console.log(e.target.value);
                                  //   // console.log(imageRef.current.src);
                                  //   onSelectFile(e);
                                  //   console.log(
                                  //     'after: ',
                                  //     e.currentTarget.files
                                  //   );
                                  //   console.log('other: ', e.target.files);

                                  //   // imageRef.current?.src = preview;
                                  // }}
                                  // value={selectedFile}
                                />
                              </div>
                              <Center>
                                <FormErrorMessage>
                                  {errors.profilePhoto &&
                                    errors.profilePhoto.message}
                                </FormErrorMessage>
                              </Center>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-6 col-md-4 p-2 text-center"
                        // style={{ border: 'thin solid red' }}
                      >
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.firstName}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              {...register('firstName')}
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder="John"
                              required
                            />
                            <label htmlFor="firstName">First Name</label>
                            <FormErrorMessage>
                              {errors.firstName && errors.firstName.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>

                        <FormControl>
                          <div className="form-floating mb-3">
                            <input
                              {...register('lastName')}
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder="Doe"
                            />
                            <label htmlFor="lastName">Last Name</label>
                          </div>
                        </FormControl>

                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.title}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              {...register('title')}
                              type="text"
                              className="form-control"
                              id="title"
                              placeholder="Engr."
                              required
                            />
                            <label htmlFor="title">Title</label>
                            <FormErrorMessage>
                              {errors.title && errors.title.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>

                      <div
                        className="col-12 col-sm-6 col-md-4  p-2 text-center"
                        // style={{ border: 'thin solid red' }}
                      >
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.email}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="johndoe@gmail.com"
                              required
                              {...register('email')}
                            />
                            <label htmlFor="email">Email</label>
                            <FormErrorMessage>
                              {errors.email && errors.email.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>

                        <FormControl>
                          <div className="form-floating mb-3">
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              placeholder="683710542"
                              required
                              {...register('phone')}
                            />
                            <label htmlFor="phone">Phone</label>
                          </div>
                        </FormControl>

                        <FormControl>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="website"
                              placeholder="johndoe.com"
                              {...register('website')}
                            />
                            <label htmlFor="website">Website</label>
                          </div>
                        </FormControl>
                      </div>
                    </div>

                    <div
                      className="row my-2 py-2"
                      // style={{ border: 'thin solid red' }}
                      id="previousJob"
                    >
                      <Heading textAlign="center" my={2}>
                        Previous Job
                      </Heading>
                      <div className="col-12 col-sm-6">
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.companyName}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="companyName"
                              placeholder="Innov Tech"
                              required
                              {...register('companyName')}
                            />
                            <label htmlFor="companyName">Company Name</label>
                            <FormErrorMessage>
                              {errors.companyName && errors.companyName.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>

                      <div className="col-12 col-sm-6">
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.jobTitle}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="jobTitle"
                              placeholder="CTO"
                              required
                              {...register('jobTitle')}
                            />
                            <label htmlFor="jobTitle">Job Title</label>
                            <FormErrorMessage>
                              {errors.jobTitle && errors.jobTitle.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>

                      {/* <!-- <div className="row" style={{"border":"thin solid red"}}> --> */}
                      <div className="col-12 col-sm-6">
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.jobStartDate}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="date"
                              className="form-control"
                              id="jobStartDate"
                              placeholder="09/09/2009"
                              required
                              {...register('jobStartDate')}
                            />
                            <label htmlFor="jobStartDate">Start Date</label>
                            <FormErrorMessage>
                              {errors.jobStartDate &&
                                errors.jobStartDate.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>

                      <div className="col-12 col-sm-6">
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.jobEndDate}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="date"
                              className="form-control"
                              id="jobEndDate"
                              placeholder="09/09/2009"
                              required
                              {...register('jobEndDate')}
                            />
                            <label htmlFor="jobEndDate">End Date</label>
                            <FormErrorMessage>
                              {errors.jobEndDate && errors.jobEndDate.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>

                      <FormControl
                        // @ts-ignore
                        isInvalid={errors.jobDescription}
                        isRequired
                      >
                        <div className="col-12">
                          <label htmlFor="jobDescription">
                            Job Description
                          </label>
                          <textarea
                            className="form-control"
                            id="jobDescription"
                            placeholder="Tell us about the job ..."
                            rows={6}
                            required
                            {...register('jobDescription')}
                          ></textarea>
                          <FormErrorMessage>
                            {errors.jobDescription &&
                              errors.jobDescription.message}
                          </FormErrorMessage>
                        </div>
                      </FormControl>
                      {/* <!-- </div> --> */}
                    </div>

                    {/* <!-- Education Summary  --> */}

                    <div
                      className="row my-2 py-2"
                      // style={{ border: 'thin solid red' }}
                      id="education"
                    >
                      <Heading textAlign="center" my={2}>
                        Education
                      </Heading>

                      <div className="col-12 col-sm-6">
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.collegeName}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="collegeName"
                              placeholder="UBa"
                              required
                              {...register('collegeName')}
                            />
                            <label htmlFor="collegeName">College Name</label>
                            <FormErrorMessage>
                              {errors.collegeName && errors.collegeName.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>
                      <div className="col-12 col-sm-6">
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.certificate}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="certificate"
                              placeholder="Beng"
                              required
                              {...register('certificate')}
                            />
                            <label htmlFor="certificate">Certificate</label>
                            <FormErrorMessage>
                              {errors.certificate && errors.certificate.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>

                      <div className="col-12 col-sm-6">
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.collegeStartDate}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="date"
                              className="form-control"
                              id="collegeStartDate"
                              placeholder="09/09/2009"
                              required
                              {...register('collegeStartDate')}
                            />
                            <label htmlFor="collegeStartDate">Start Date</label>
                            <FormErrorMessage>
                              {errors.collegeStartDate &&
                                errors.collegeStartDate.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>

                      <div className="col-12 col-sm-6">
                        <FormControl
                          // @ts-ignore
                          isInvalid={errors.collegeEndDate}
                          isRequired
                        >
                          <div className="form-floating mb-3">
                            <input
                              type="date"
                              className="form-control"
                              id="collegeEndDate"
                              placeholder="09/09/2009"
                              required
                              {...register('collegeEndDate')}
                            />
                            <label htmlFor="collegeEndDate">End Date</label>
                            <FormErrorMessage>
                              {errors.collegeEndDate &&
                                errors.collegeEndDate.message}
                            </FormErrorMessage>
                          </div>
                        </FormControl>
                      </div>
                    </div>

                    {/* <!-- Profile Summary --> */}

                    <div
                      className="row"
                      // style={{ border: 'thin solid red' }}
                    >
                      <Heading textAlign="center" my={2}>
                        Profile Summary
                      </Heading>
                      <FormControl
                        // @ts-ignore
                        isInvalid={errors.profileSummary}
                        isRequired
                      >
                        <div className="col-12 mb-3">
                          <label htmlFor="profileSummary">Summary</label>
                          <textarea
                            {...register('profileSummary')}
                            className="form-control"
                            id="profileSummary"
                            placeholder="Tell us about yourself ..."
                            rows={3}
                            required
                          ></textarea>
                          <FormErrorMessage>
                            {errors.profileSummary &&
                              errors.profileSummary.message}
                          </FormErrorMessage>
                        </div>
                      </FormControl>

                      <div className="col-6 col-md-3">
                        <FormControl>
                          <div className=" mb-3">
                            <label htmlFor="hubbies">Hubbies</label>
                            <input
                              type="text"
                              className="form-control"
                              id="hubbies"
                              placeholder="Football, Gaming"
                              required
                              {...register('hubbies')}
                            />
                            <div className="invalid-feedback">
                              Please Enter A Hubby
                            </div>
                          </div>
                        </FormControl>
                      </div>

                      <div className="col-6 col-md-3">
                        <FormControl>
                          <div className=" mb-3">
                            <label htmlFor="skills">Skills</label>
                            <input
                              type="text"
                              className="form-control"
                              id="skills"
                              placeholder="Leadership, Programming"
                              required
                              {...register('skills')}
                            />
                            <div className="invalid-feedback">
                              Please Enter A Skill
                            </div>
                          </div>
                        </FormControl>
                      </div>

                      <div className="col-6 col-md-3">
                        <FormControl>
                          <div className=" mb-3">
                            <label htmlFor="interests">Interests</label>
                            <input
                              type="text"
                              className="form-control"
                              id="interests"
                              placeholder="Drumming, Skiing"
                              required
                              {...register('interests')}
                            />
                            <div className="invalid-feedback">
                              Please Enter An Interest
                            </div>
                          </div>
                        </FormControl>
                      </div>

                      <div className="col-6 col-md-3">
                        <FormControl>
                          <div className=" mb-3">
                            <label htmlFor="dislikes">Dislikes</label>
                            <input
                              type="text"
                              className="form-control"
                              id="dislikes"
                              placeholder="Swimming"
                              required
                              {...register('dislikes')}
                            />
                            <div className="invalid-feedback">
                              Please Enter A Dislike
                            </div>
                          </div>
                        </FormControl>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12  my-3 d-flex align-items-center justify-content-center">
                        <Button
                          colorScheme="blue"
                          type="submit"
                          isLoading={isSubmitting}
                          loadingText="Submitting"
                        >
                          Generate CV
                        </Button>
                      </div>
                    </div>
                  </div>
                </chakra.form>
              </Box>
            </>
          )}
        </main>

        <footer></footer>
      </>
    )
  );
};

export default Home;
