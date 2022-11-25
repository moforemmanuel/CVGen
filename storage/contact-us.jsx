/* eslint-disable react/no-children-prop */
import React from 'react';
// import CheckoutWizard from '../components/checkoutWizard/CheckoutWizard.js';
// import Form from '../components/Form/Form.js';
import Layout from '../components/Layout/Layout';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  // InputGroup,
  // HStack,
  // InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  // Link,
  FormErrorMessage,
  Select,
  SimpleGrid,
  GridItem,
  Divider,
  // InputGroup,
  // InputLeftAddon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router.js';
// import { Store } from '../utils/Store.js';
import dynamic from 'next/dynamic.js';
// import Cookies from 'js-cookie';
// import FullPageLoader from '../components/fullPageLoader/FullPageLoader.js';
// import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Context } from '../context/Context';
import Puppy
import { Puppies } from '../storage/puppies';
// import getError from '../utils/error.js';

// import 'react-phone-number-input/style.css';
// import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/input';

function Contact() {
  const {
    handleSubmit,
    // control,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = React.useContext(Context);
  const { contactInfo } = state;
  const { puppyName } = state;

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(true);

  const [selectedState, setSelectedState] = React.useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [selectedCity, setSelectedCity] = React.useState(undefined);
  const [selectedPuppy, setSelectedPuppy] = React.useState(null);

  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  // const [phone, setPhone] = React.useState();

  React.useEffect(() => {
    setLoading(false);

    async function fetchStates() {
      try {
        const response = await axios.get(
          `https://api.countrystatecity.in/v1/countries/US/states`,
          {
            headers: {
              'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_CSC_KEY,
            },
          }
        );

        const states = await response.data;
        setStates(states);

        // console.log('states: ', states);
      } catch (err) {
        console.log(err);
      }
    }

    if (states.length == 0) {
      fetchStates();
    }

    async function fetchCities(state) {
      if (state) {
        try {
          const response = await axios.get(
            `https://api.countrystatecity.in/v1/countries/US/states/${state.iso2}/cities`,
            {
              headers: {
                'X-CSCAPI-KEY': process.env.NEXT_PUBLIC_CSC_KEY,
              },
            }
          );

          const cities = await response.data;
          setCities(cities);
          // console.log('cities: ', cities);
        } catch (err) {
          console.log(err);
        }
      } else {
        return;
      }
    }

    // if (cities.length == 0) {
    fetchCities(selectedState);
    // }

    // console.log(selectedCountry, selectedState);

    if (puppyName && !selectedPuppy) {
      // alert('true');
      // console.log(puppyName);
      setSelectedPuppy(Puppies.find((puppy) => puppy.name == puppyName));
    }

    if (selectedPuppy) {
      // console.log(selectedPuppy);
    }
  }, [
    selectedPuppy,
    // cities,
    contactInfo,
    selectedState,
    setValue,
    state,
    states,
    puppyName,
    // selectedCity,
  ]);

  const boxBgColor = useColorModeValue('white', 'gray.700');
  const flexBgColor = useColorModeValue('gray.50', 'gray.800');

  const submitHandler = async ({
    firstName,
    lastName,
    email,
    state,
    city,
    zip,
    phone,
    puppy,
  }) => {
    const puppyData = Puppies.find((puppyItem) => puppyItem.name == puppy);
    const details = {
      firstName,
      lastName,
      email,
      state,
      city,
      zip,
      phone,
      puppyData,
    };

    Swal.fire('Please wait');
    Swal.showLoading();
    try {
      console.log(details);

      axios
        .post('/api/sendmail', details)
        .then((result) => {
          console.log(result);
          Swal.fire({
            title: 'Thank you!',
            text: 'We have successfully received your enquiry.\nPlease check your mailbox, for a confirmation email, and we will reply soonest!',
            icon: 'success',
            confirmButtonText: 'Cool',
          }).then((result) => {
            if (result.value) {
              router.push('/');
            }
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'An Error occured.\nPlease make sure you have an active internet connection and try again!',
            icon: 'error',
            confirmButtonText: 'close',
          });
        });
    } catch (err) {
      console.log(err);
      // toast.error(getError(err));
    }
  };

  // if (loading) {
  //   return <FullPageLoader />;
  // }

  return (
    <Layout
      pageTitle="Contact Us"
      pageLink="/contact-us"
      description="Reach out to us by filling the form below, secure your forever lovely alaskan malamute puppy."
      breadcrumb={{ label: 'Contact Us', link: '/contact-us' }}
    >
      {/* <CheckoutWizard activeStep={1}></CheckoutWizard> */}
      <form id="form" onSubmit={handleSubmit(submitHandler)} noValidate>
        <Flex
          minH={'80vh'}
          align={'center'}
          justify={'center'}
          bg={flexBgColor}
        >
          <Stack
            spacing={8}
            mx={'auto'}
            // data-aos="zoom-in"
            maxW={{ base: '100%', md: 'lg' }}
            py={12}
            px={6}
          >
            <Stack align={'center'} data-aos="fade-down">
              <Heading
                as="p"
                textTransform="uppercase"
                fontSize={'4xl'}
                textAlign={'center'}
                color="primary"
              >
                Contact Info
              </Heading>
              <Text as="h1" fontSize={'lg'} color={'gray.600'}>
                please enter your contact details
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              data-aos="zoom-in"
              bg={boxBgColor}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <SimpleGrid columns={[1, 2]} spacing={3}>
                  <Box>
                    <FormControl isInvalid={errors.firstName} isRequired>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...register('firstName', {
                          required: 'First Name is required',
                          minLength: {
                            value: 2,
                            message: 'Should be atleast 2 characters',
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.firstName && errors.firstName.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl>
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...register('lastName', {
                          maxLength: {
                            value: 50,
                            message:
                              'Last Name should not be greater than 50 characters',
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.lastName && errors.lastName.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                </SimpleGrid>

                <Box>
                  <FormControl isInvalid={errors.email} isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      placeholder="johndoe@gmail.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: 'Please input a valid email',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <SimpleGrid columns={[1, 2]} spacing={3}>
                  <Box>
                    <FormControl isInvalid={errors.state} isRequired>
                      <FormLabel htmlFor="state">State</FormLabel>
                      <Select
                        id="state"
                        placeholder="Select a state"
                        {...register('state', {
                          required: 'State is required',
                        })}
                        onChange={(e) => {
                          // alert(e.target.value);
                          // if (selectedCity) {
                          //   console.log('city set');
                          //   setSelectedCity(undefined);
                          // }
                          // setCities([]);

                          setSelectedState(
                            states.find(
                              (state) => state.name === e.target.value
                            )
                          );
                          // console.log(selectedCity);

                          errors.state = undefined;
                        }}
                        // value={selectedState?.name}
                      >
                        {states &&
                          states.map((state) => (
                            <option key={state.name} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                      </Select>
                      <FormErrorMessage>
                        {errors.state && errors.state.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl isInvalid={errors.city} isRequired>
                      <FormLabel htmlFor="state">City</FormLabel>
                      <Select
                        id="city"
                        placeholder="Select a city"
                        {...register('city', {
                          required: 'City is required',
                        })}
                        onChange={(e) => {
                          // alert(e.target.value);
                          setSelectedCity(
                            cities.find((city) => city.name === e.target.value)
                          );
                          // console.log(selectedCity);

                          errors.city = undefined;
                        }}
                        // value={selectedCity?.name}
                      >
                        {cities &&
                          cities.map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                      </Select>
                      <FormErrorMessage>
                        {errors.city && errors.city.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={[1, 2]} spacing={3}>
                  <GridItem
                  // colSpan={{ sm: 1 }}
                  >
                    <FormControl isInvalid={errors.zip} isRequired>
                      <FormLabel htmlFor="zip">Zip Code</FormLabel>

                      <Input
                        id="zip"
                        placeholder="12345"
                        {...register('zip', {
                          required: 'Zip is required',
                          pattern: {
                            value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                            message: 'Invalid Zip',
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.zip && errors.zip.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isInvalid={errors.phone} isRequired>
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      {/* <InputGroup>
                        <InputLeftAddon
                          bg="white"
                          width="min-content"
                          p={0}
                          m={0}
                        >
                          <Text
                            fontSize="xl"
                            px={1}
                            py={0}
                            m={0}
                            // border="thin solid red"
                          >
                            🇺🇸
                          </Text>
                        </InputLeftAddon> */}
                      <Input
                        type="tel"
                        id="phone"
                        placeholder="(123) 456-7890"
                        {...register('phone', {
                          required: 'Phone is required as a backup contact',
                        })}
                      />
                      {/* <PhoneInput
                        country="US"
                        value={phone}
                        onChange={setPhone}
                        
                        {...register('phone', {
                          required: 'Phone is required as a backup contact',
                        })}
                      /> */}
                      {/* </InputGroup> */}

                      <FormErrorMessage>
                        {errors.phone && errors.phone.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                </SimpleGrid>

                <Divider />
                <Text textAlign="center" fontSize={'lg'} color={'gray.600'}>
                  Puppy Summary
                </Text>
                <Box>
                  {selectedPuppy ? (
                    <PuppyView puppy={selectedPuppy} />
                  ) : (
                    <Text>Please select a puppy</Text>
                  )}
                </Box>
                <Box>
                  <FormControl isInvalid={errors.puppy} isRequired>
                    <FormLabel htmlFor="puppy">Puppy</FormLabel>
                    <Select
                      id="puppy"
                      placeholder="Select a puppy"
                      {...register('puppy', {
                        required: 'Puppy must be selected',
                      })}
                      onChange={(e) => {
                        // alert(e.target.value);
                        // console.log('e: ', e.target);
                        // console.log('val: ', e.target.value);
                        setSelectedPuppy(
                          Puppies.find((puppy) => puppy.name === e.target.value)
                        );
                        errors.puppy = undefined;
                      }}
                      value={selectedPuppy?.name}
                    >
                      {Puppies &&
                        Puppies.map((puppy) => (
                          <option key={puppy.name} value={puppy.name}>
                            {/* <PuppyView puppy={puppy} /> */}
                            {puppy.name}
                          </option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                      {errors.puppy && errors.puppy.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Divider />

                <Stack spacing={10} pt={2}>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    // onClick={() => alert('clicked')}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Continue
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </Layout>
  );
}

export default dynamic(Promise.resolve(Contact), { ssr: false });
