import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import CImage from '../components/CImage/CImage';
import FullPageLoader from '../components/fullPageLoader/FullPageLoader';
import getError from '../utils/error';
import placeholderImage from '../public/images/image-placeholder.jpeg';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { BiWorld } from 'react-icons/bi';
import handleDownload from '../handlers/handleDownload';

const CV = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  // const [user, setUser] = React.useState(undefined);
  const [CV, setCV] = React.useState<any>(undefined);

  let user: any;

  React.useEffect(() => {
    console.log('user: ', user);
    user = JSON.parse(Cookies.get('user') as string);
    axios
      .get(`/api/${user.cvID}/${user._id}/getCV`)
      .then((data) => {
        console.log('found cv: ', data.data);
        setCV(data.data);
      })
      .catch((err) => toast.error(getError(err)));
    console.log(CV);
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <FullPageLoader />;
  }

  return (
    isMounted && (
      <Flex>
        {!CV ? (
          <Flex
            align="center"
            justify="center"
            direction="column"
            gap={6}
            h="70vh"
            w="100%"
          >
            <Heading>No CV data found</Heading>
            <Button
              colorScheme="blue"
              rounded={0}
              onClick={() => router.push('/?redirect=/cv')}
            >
              Create One
            </Button>
          </Flex>
        ) : (
          <Flex
            align="center"
            justify="center"
            w="100%"
            h="auto"
            direction="column"
            gap={6}
            id="parent"
            p={8}
          >
            <Flex
              align="center"
              justify="center"
              w="100%"
              h="auto"
              id="cvContent"
            >
              <Flex
                align="center"
                justify="center"
                direction="column"
                // w="100%"
                gap={6}
                // width="xl"
              >
                <SimpleGrid columns={3} w="100%" border="thin solid blue">
                  <GridItem
                    bg="#253847"
                    color="white"
                    colSpan={1}
                    p={3}
                    border={'thin solid red'}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      direction="column"
                      gap={6}
                    >
                      <Box w="90%" h={'auto'}>
                        <CImage
                          src={placeholderImage.src}
                          rounded="full"
                          width={placeholderImage.width}
                          height={placeholderImage.height}
                          layout="responsive"
                        />
                      </Box>

                      <Box
                        p={1}
                        fontFamily={'var(chakra-fonts-manjari)'}
                        fontSize="md"
                      >
                        <Heading>CONTACT</Heading>
                        <Box
                          mt={3}
                          border={'2px solid white'}
                          w={['90%', '75%', '40%']}
                        ></Box>
                        <Flex
                          align="flex-start"
                          justify="center"
                          direction="column"
                          my={3}
                          gap={1}
                        >
                          {CV.phone && (
                            <HStack>
                              <PhoneIcon />
                              <Text>{CV.phone}</Text>
                            </HStack>
                          )}
                          {CV.email && (
                            <HStack>
                              <EmailIcon />
                              <Text>{CV.email}</Text>
                            </HStack>
                          )}
                          {CV.website && (
                            <HStack>
                              <BiWorld />
                              <Text>{CV.website}</Text>
                            </HStack>
                          )}
                        </Flex>
                      </Box>

                      <Box>
                        <Heading>EDUCATION</Heading>
                        <Box
                          mt={3}
                          border={'2px solid white'}
                          w={['100%', '90%', '50%']}
                        ></Box>
                        <Flex
                          align="flex-start"
                          justify="center"
                          direction="column"
                          my={3}
                          gap={1}
                        >
                          {CV.certificate && (
                            <Text fontWeight="bolder">{CV.certificate}</Text>
                          )}
                          {CV.collegeStartDate && CV.collegeEndDate && (
                            <Text>
                              {CV.collegeStartDate} to {CV.collegeEndDate}
                            </Text>
                          )}
                          {CV.collegeName && <Text>{CV.collegeName}</Text>}
                        </Flex>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2} color="blackAlpha.800">
                    <Flex
                      align="center"
                      justify="center"
                      direction="column"
                      gap={1}
                    >
                      <Box
                        p={4}
                        py={12}
                        alignSelf="flex-end"
                        bg="gray.100"
                        w="90%"
                        h="30%"
                      >
                        <VStack>
                          <Heading fontSize="3rem" textAlign="center">
                            {CV.firstName} {CV.lastName || ''}
                          </Heading>
                          <Box
                            mt={8}
                            top={10}
                            border={'2px solid black'}
                            w="15%"
                          ></Box>
                          <Heading as="h3">{CV.title}</Heading>
                        </VStack>
                      </Box>

                      <Flex
                        p={4}
                        px={8}
                        align="space-around"
                        justify="flex-start"
                        direction="column"
                        gap={6}
                        // border="thin solid red"
                        w="100%"
                      >
                        <Box>
                          <Heading>PROFILE</Heading>
                          <Box
                            mt={3}
                            border={'2px solid black'}
                            borderColor="blackAlpha.800"
                            w={['100%', '35%', '20%']}
                          ></Box>
                          <Text>{CV.profileSummary}</Text>
                        </Box>

                        <Box>
                          <Heading>WORK EXPERIENCE</Heading>
                          <Box
                            mt={3}
                            border={'2px solid black'}
                            borderColor="blackAlpha.800"
                            w={['100%', '90%', '70%']}
                          ></Box>

                          <Flex
                            mt={3}
                            align="flex-start"
                            justify="space-between"
                            direction="row"
                            gap={6}
                            minW="100%"
                            px={0}
                          >
                            <VStack spacing={-1} p={0} m={0}>
                              <Text fontWeight="bolder" textAlign="left">
                                {CV.jobTitle}
                              </Text>
                              <Text>{CV.companyName}</Text>
                            </VStack>

                            <Text>
                              {CV.jobStartDate} to {CV.jobEndDate}
                            </Text>
                          </Flex>

                          <Text mt={3}>{CV.jobDescription}</Text>
                        </Box>

                        <SimpleGrid columns={2}>
                          <GridItem>
                            <Flex
                              align="space-around"
                              justify="center"
                              direction="column"
                              gap={4}
                            >
                              <Box>
                                <Heading>Skills</Heading>
                                <Box
                                  mt={3}
                                  border={'2px solid black'}
                                  borderColor="blackAlpha.800"
                                  w={['30%', '20%', '10%']}
                                ></Box>

                                {CV.skills &&
                                  CV.skills
                                    .split(', ')
                                    .map((skill: string) => (
                                      <Text key={skill}>{skill}</Text>
                                    ))}
                              </Box>
                            </Flex>
                          </GridItem>
                          <GridItem>
                            <Flex
                              align="space-around"
                              justify="center"
                              direction="column"
                              gap={4}
                            >
                              <Box>
                                <Heading>Hubbies</Heading>
                                <Box
                                  mt={3}
                                  border={'2px solid black'}
                                  borderColor="blackAlpha.800"
                                  w={['30%', '20%', '10%']}
                                ></Box>

                                {CV.skills &&
                                  CV.skills
                                    .split(', ')
                                    .map((skill: string) => (
                                      <Text key={skill}>{skill}</Text>
                                    ))}
                              </Box>
                            </Flex>
                          </GridItem>
                        </SimpleGrid>

                        <SimpleGrid columns={2}>
                          <GridItem>
                            <Flex
                              align="space-around"
                              justify="center"
                              direction="column"
                              gap={4}
                            >
                              <Box>
                                <Heading>Interests</Heading>
                                <Box
                                  mt={3}
                                  border={'2px solid black'}
                                  borderColor="blackAlpha.800"
                                  w={['30%', '20%', '10%']}
                                ></Box>

                                {CV.skills &&
                                  CV.skills
                                    .split(', ')
                                    .map((skill: string) => (
                                      <Text key={skill}>{skill}</Text>
                                    ))}
                              </Box>
                            </Flex>
                          </GridItem>
                          <GridItem>
                            <Flex
                              align="space-around"
                              justify="center"
                              direction="column"
                              gap={4}
                            >
                              <Box>
                                <Heading>Dislikes</Heading>
                                <Box
                                  mt={3}
                                  border={'2px solid black'}
                                  borderColor="blackAlpha.800"
                                  w={['30%', '20%', '10%']}
                                ></Box>

                                {CV.skills &&
                                  CV.skills
                                    .split(', ')
                                    .map((skill: string) => (
                                      <Text key={skill}>{skill}</Text>
                                    ))}
                              </Box>
                            </Flex>
                          </GridItem>
                        </SimpleGrid>
                      </Flex>
                    </Flex>
                  </GridItem>
                </SimpleGrid>
              </Flex>
            </Flex>
            <Button colorScheme="green" onClick={handleDownload}>
              Download CV
            </Button>
          </Flex>
        )}
      </Flex>
    )
  );
};

export default CV;
