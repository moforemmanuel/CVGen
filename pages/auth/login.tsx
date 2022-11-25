import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import loginFormValues from '../../interfaces/loginForm';
import loginHandler from '../../handlers/loginHandler';
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import loginResolver from '../../resolvers/logInForm';

export default function SimpleCard() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<loginFormValues>({ resolver: yupResolver(loginResolver) });

  React.useEffect(() => {
    if (Cookies.get('user')) {
      toast.success('Already signed in');
      router.push((router.query.redirect as string) || '/');
    }
    if (Cookies.get('rememberMe')) {
      let formData: loginFormValues | undefined = undefined;
      if (Cookies.get('rememberLoginValues')) {
        formData = JSON.parse(Cookies.get('rememberLoginValues') as string);
      }

      if (formData) {
        setValue('matricule', formData.matricule);
        setValue('password', formData.password);
        setValue('rememberMe', formData.rememberMe);
      }
    }
  }, []);
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <form onSubmit={handleSubmit(loginHandler)} noValidate>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link>{' '}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl
                id="matricule"
                // @ts-ignore
                isInvalid={errors.matricule}
                isRequired
              >
                <FormLabel>Matricule</FormLabel>
                <Input {...register('matricule')} type="text" />
                <FormErrorMessage>
                  {errors.matricule && errors.matricule.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                // @ts-ignore
                isInvalid={errors.password}
                isRequired
              >
                <FormLabel>Password</FormLabel>
                <Input {...register('password')} type="password" />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox {...register('rememberMe')}>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
