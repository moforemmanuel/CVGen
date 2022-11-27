import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import placeholderImage from '../../../public/images/image-placeholder.jpeg';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { BiWorld } from 'react-icons/bi';
// import { Context } from '../../../context/Context';
import { GetServerSidePropsContext, NextApiRequest } from 'next';
import FullPageLoader from '../../../components/fullPageLoader/FullPageLoader';
import getError from '../../../utils/error';
import CImage from '../../../components/CImage/CImage';
import handleDownload from '../../../handlers/handleDownload';

const CVView = ({ CV, error }: any) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  // const [user, setUser] = React.useState<any>(undefined);
  // const [CV, setCV] = React.useState<any>(undefined);

  // let user: any;

  // const { state } = React.useContext(Context);
  // const { user } = state;

  // const user = JSON.parse(Cookies.get('user') as string);

  // console.log('from cooks: ', user);

  React.useEffect(() => {
    // console.log('user: ', user);
    // user = JSON.parse(Cookies.get('user') as string);
    // setUser(JSON.parse(Cookies.get('user') as string));

    // console.log('before: ', user);
    setIsMounted(true);
  }, []);

  // React.useEffect(() => {
  //   if (user) {
  //     // alert('alive');
  //     axios
  //       .get(`/api/${user?.cvID}/${user?._id}/getCV`)
  //       .then((data) => {
  //         console.log('found cv: ', data.data);
  //         setCV(data.data);
  //       })
  //       .catch((err) => toast.error(getError(err)));
  //     console.log(CV);
  //   }
  // }, []);

  if (!isMounted) {
    return <FullPageLoader />;
  }

  if (error) {
    toast.error(getError(error));
  }

  return (
    isMounted && (
      <Flex bg="gray.50" fontFamily={'var(--chakra-fonts-manjari)'}>
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
              border="thin solid #ccc"
              align="center"
              justify="center"
              w="100%"
              h="auto"
              id="cvContent"
              shadow="lg"
            >
              <Flex
                align="center"
                justify="center"
                direction="column"
                // w="100%"
                gap={6}
                // width="xl"
              >
                <SimpleGrid columns={3} w="100%">
                  <GridItem
                    bg="#253847"
                    color="white"
                    colSpan={1}
                    p={3}
                    // border={'thin solid red'}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      direction="column"
                      gap={6}
                    >
                      <Flex
                        align="center"
                        justify="center"
                        direction="column"
                        w="90%"
                        h={'auto'}
                        m="0 auto"
                        // border="thin solid red"
                      >
                        <CImage
                          src={placeholderImage.src}
                          rounded="full"
                          width={placeholderImage.width}
                          height={placeholderImage.height}
                          layout="responsive"
                        />
                      </Flex>

                      <Box p={1} fontSize="md" m="0 auto">
                        <Heading
                          pb={3}
                          w="fit-content"
                          borderBottom={'3px solid white'}
                          fontWeight="thin"
                        >
                          CONTACT
                        </Heading>

                        <Flex
                          align="flex-start"
                          justify="center"
                          direction="column"
                          my={3}
                          gap={1}
                          fontSize="sm"
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
                              <Text maxW="min-content">{CV.email}</Text>
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

                      <Box margin="0 auto">
                        <Heading
                          w="fit-content"
                          borderBottom="3px solid white"
                          pb={3}
                          fontWeight="thin"
                        >
                          EDUCATION
                        </Heading>

                        <Flex
                          align="flex-start"
                          justify="center"
                          direction="column"
                          my={3}
                          gap={1}
                          fontSize="sm"
                        >
                          {CV.certificate && (
                            <Text fontWeight="bolder" fontSize="md">
                              {CV.certificate}
                            </Text>
                          )}
                          {CV.collegeStartDate && CV.collegeEndDate && (
                            <Text>
                              {CV.collegeStartDate} to {CV.collegeEndDate}
                            </Text>
                          )}
                          {CV.collegeName && (
                            <Text fontSize="md">{CV.collegeName}</Text>
                          )}
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
                        py={10}
                        alignSelf="flex-end"
                        bg="gray.100"
                        w="90%"
                        h="30%"
                      >
                        <VStack>
                          <Heading
                            fontSize="3rem"
                            // borderBottom="3px solid black"
                            // borderBottomColor="blackAlpha.800"
                            textAlign="center"
                            fontFamily="var(--chakra-fonts-roboto)"
                            fontWeight="normal"
                            position="relative"
                            // _after={{
                            //   content: '""',
                            //   background: 'blackAlpha.800',
                            //   transform: 'rotate(90deg)',
                            //   position: 'absolute',
                            //   bottom: '-40%',
                            //   left: '50%',
                            //   height: '90%',
                            //   width: '3px',
                            // }}
                          >
                            {CV.firstName} {CV.lastName || ''}
                          </Heading>

                          <Heading as="h3" fontWeight="thin" fontSize="2xl">
                            {CV.title}
                          </Heading>
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
                          <Heading
                            fontWeight="bold"
                            fontFamily="var(--chakra-fonts-roboto)"
                            borderBottom="3px solid black"
                            borderBottomColor="blackAlpha.800"
                            w="fit-content"
                            mb={3}
                            pb={3}
                          >
                            PROFILE
                          </Heading>

                          <Text>{CV.profileSummary}</Text>
                        </Box>

                        <Box>
                          <Heading
                            fontWeight="bold"
                            fontFamily="var(--chakra-fonts-roboto)"
                            borderBottom="3px solid black"
                            borderBottomColor="blackAlpha.800"
                            w="fit-content"
                            mb={3}
                            pb={3}
                          >
                            WORK EXPERIENCE
                          </Heading>

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
                                <Heading
                                  fontWeight="bold"
                                  fontFamily="var(--chakra-fonts-roboto)"
                                  borderBottom="3px solid black"
                                  borderBottomColor="blackAlpha.800"
                                  w="fit-content"
                                  mb={3}
                                  pb={3}
                                >
                                  Skills
                                </Heading>

                                {CV.skills && (
                                  <UnorderedList>
                                    {CV.skills
                                      .split(', ')
                                      .map((skill: string) => (
                                        <ListItem key={skill}>{skill}</ListItem>
                                      ))}
                                  </UnorderedList>
                                )}
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
                                <Heading
                                  fontWeight="bold"
                                  fontFamily="var(--chakra-fonts-roboto)"
                                  borderBottom="3px solid black"
                                  borderBottomColor="blackAlpha.800"
                                  w="fit-content"
                                  mb={3}
                                  pb={3}
                                >
                                  Hubbies
                                </Heading>

                                {CV.hubbies && (
                                  <UnorderedList>
                                    {CV.hubbies
                                      .split(', ')
                                      .map((hubby: string) => (
                                        <ListItem key={hubby}>{hubby}</ListItem>
                                      ))}
                                  </UnorderedList>
                                )}
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
                                <Heading
                                  fontWeight="bold"
                                  fontFamily="var(--chakra-fonts-roboto)"
                                  borderBottom="3px solid black"
                                  borderBottomColor="blackAlpha.800"
                                  w="fit-content"
                                  mb={3}
                                  pb={3}
                                >
                                  Interests
                                </Heading>

                                {CV.interests && (
                                  <UnorderedList>
                                    {CV.interests
                                      .split(', ')
                                      .map((interest: string) => (
                                        <ListItem key={interest}>
                                          {interest}
                                        </ListItem>
                                      ))}
                                  </UnorderedList>
                                )}
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
                                <Heading
                                  fontWeight="bold"
                                  fontFamily="var(--chakra-fonts-roboto)"
                                  borderBottom="3px solid black"
                                  borderBottomColor="blackAlpha.800"
                                  w="fit-content"
                                  mb={3}
                                  pb={3}
                                >
                                  Dislikes
                                </Heading>

                                {CV.dislikes && (
                                  <UnorderedList>
                                    {CV.dislikes
                                      .split(', ')
                                      .map((dislike: string) => (
                                        <ListItem key={dislike}>
                                          {dislike}
                                        </ListItem>
                                      ))}
                                  </UnorderedList>
                                )}
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
            <Stack direction={['column', 'row']}>
              <Button colorScheme="green" onClick={handleDownload}>
                Download CV
              </Button>
              <Button colorScheme="blue" onClick={() => router.push('/')}>
                Go Back
              </Button>
            </Stack>
          </Flex>
        )}
      </Flex>
    )
  );
};

export default CVView;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const userID = ctx?.params?.userID;
  const cvID = ctx?.params?.cvID;
  // let CV, error;

  // axios
  //   .get(`http://localhost:3000/api/${cvID}/${userID}/getCV`)
  //   .then((data) => (CV = data.data))
  //   .catch((err) => (error = err));

  const response = await axios.get(
    `http://localhost:3000/api/${cvID}/${userID}/getCV`
  );
  // console.log('res: ', response);
  const CV = await response.data;

  // if (!CV) {
  //   return {
  //     props: {
  //       error: response,
  //     },
  //   };
  // }

  return {
    props: {
      CV,

      // CV: JSON.parse(JSON.stringify(CV)),
      // error: JSON.parse(JSON.stringify(error)),
    },
  };
}
