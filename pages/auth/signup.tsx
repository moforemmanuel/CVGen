// @ts-nocheck
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormValues from '../../interfaces/form';
import registerHandler from '../../handlers/registerHandler';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import AddUserSchema from '../../resolvers/signUpForm';

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values:
//       values.firstName &&
//       values.matricule &&
//       values.email &&
//       values.password &&
//       values.confirmPassword
//         ? values
//         : {},
//     errors: !(
//       values.firstName &&
//       values.matricule &&
//       values.email &&
//       values.password &&
//       values.confirmPassword
//     )
//       ? {
//           firstName: {
//             type: 'required',
//             message: 'First Name is required',
//           },
//           email: {
//             // type: 'required',
//             // message: 'Email is required',
//             type: 'pattern',
//             value:
//               /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//             message: 'Please enter a valid email',
//           },
//           matricule: {
//             type: 'pattern',
//             // ignore prettier - to preserve regex
//             // prettier-ignore
//             value: /uba\d{2}\w\d{4}/gmi,
//             message: 'Please enter a valid matricule',
//           },
//           password: {
//             type: 'required',
//             message: 'Please enter a password',
//           },
//           confirmPassword: {
//             type: 'required',
//             message: 'Please enter a password',
//           },
//         }
//       : {},
//   };
// };

export default function SignupCard() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: yupResolver(AddUserSchema) });

  React.useEffect(() => {
    if (Cookies.get('user')) {
      toast.success('Already signed in');
      router.push((router.query.redirect as string) || '/');
    }
  }, []);
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <form
        // className="needs-validation"
        onSubmit={handleSubmit(registerHandler)}
        noValidate
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isInvalid={errors.firstName} isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      id="firstName"
                      placeholder="John"
                      {...register('firstName')}
                    />
                    <FormErrorMessage>
                      {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      id="lastName"
                      placeholder="Doe"
                      {...register('lastName')}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl
                isInvalid={errors.matricule}
                id="matricule"
                isRequired
              >
                <FormLabel>Matricule</FormLabel>
                <Input id="matricule" {...register('matricule')} type="text" />
                <FormErrorMessage>
                  {errors?.matricule && errors.matricule.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email} id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input id="email" {...register('email')} type="email" />
                <FormErrorMessage>
                  {errors?.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password} id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors?.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={errors.confirmPassword}
                id="confirmPassword"
                isRequired
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register('confirmPassword')}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors?.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  // onSubmit={() => alert('submit')}
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
