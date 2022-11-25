import {
  // Avatar,
  Box,
  // Center,
  Flex,
  GridItem,
  // Heading,
  IconButton,
  SimpleGrid,
  // Text,
  // Image,
  // keyframes,
  // Text,
} from '@chakra-ui/react';
import React from 'react';

import '@fancyapps/ui/dist/fancybox.css';
import { Fancybox } from '@fancyapps/ui';

import testImage from '../../public/testImage.jpg';
import CImage from '../CImage/CImage';
import { BiPlusCircle } from 'react-icons/bi';
// import NextImage from 'next/image';

const galleryItems = [
  {
    image: testImage,
    name: 'John Doe',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas incidunt dolor totam ducimus facilis quia optio. Rerum voluptas, expedita provident autem illo qui, itaque, nesciunt distinctio ipsam unde numquam quo!',
  },
  {
    image: testImage,
    name: 'Many C',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas incidunt dolor totam ducimus facilis quia optio. Rerum voluptas, expedita provident autem illo qui, itaque, nesciunt distinctio ipsam unde numquam quo!',
  },
  {
    image: testImage,
    name: 'John Doe',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas incidunt dolor totam ducimus facilis quia optio. Rerum voluptas, expedita provident autem illo qui, itaque, nesciunt distinctio ipsam unde numquam quo!',
  },
  {
    image: testImage,
    name: 'Many C',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas incidunt dolor totam ducimus facilis quia optio. Rerum voluptas, expedita provident autem illo qui, itaque, nesciunt distinctio ipsam unde numquam quo!',
  },
  {
    image: testImage,
    name: 'John Doe',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas incidunt dolor totam ducimus facilis quia optio. Rerum voluptas, expedita provident autem illo qui, itaque, nesciunt distinctio ipsam unde numquam quo!',
  },
  {
    image: testImage,
    name: 'Many C',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas incidunt dolor totam ducimus facilis quia optio. Rerum voluptas, expedita provident autem illo qui, itaque, nesciunt distinctio ipsam unde numquam quo!',
  },
];
const Gallery = () => {
  React.useEffect(() => {
    // eslint-ignore-
    window.Fancybox = Fancybox;
  });

  return (
    <Box
      // border="thin solid blue"
      // maxW={{ base: '100%', md: '45%' }}
      minW="100%"
      p="2rem"
      mt={0}
    >
      <Box>
        <SimpleGrid
          columns={[1, 2, 4]}
          // minChildWidth="300px"
          spacing="1rem"
          // border="thin solid green"
          // maxW="90vw"

          // maxW="50%"
        >
          {galleryItems.map((item) => (
            <GridItem
              key={item.name}
              // p={3}
              // border="thin solid red"
              // maxW="100%"
            >
              <Flex
                //  w={['100%', '50%', '33%', '25%', '20%']}
                // h="auto"
                // border="thin solid green"
                position="relative"
                sx={{
                  '&:hover > .icon': {
                    display: 'block',
                  },
                }}
                transition="all 0.5s"
              >
                <CImage
                  className="image"
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  alt={item.name}
                  layout="responsive"
                  quality={10}
                  // style={{ position: 'relative' }}
                  _hover={{
                    filter: 'brightness(50%)',
                  }}
                  transition="all 0.5s"
                />

                <IconButton
                  bgColor="transparent"
                  color="whiteAlpha.900"
                  className="icon"
                  borderRadius="50%"
                  position="absolute"
                  top="40%"
                  left="40%"
                  variant="ghost"
                  aria-label="image-icon"
                  icon={<BiPlusCircle size="2.5rem" />}
                  display="none"
                  _hover={{
                    transform: 'scale(1.1)',
                    color: 'whiteAlpha.900',
                    bgColor: 'transparent',
                    '.image': {
                      filter: 'brightness(30%)',
                    },
                  }}
                  data-fancybox="gallery"
                  data-caption={item.name}
                  data-src={item.image.src}
                />
              </Flex>
            </GridItem>
          ))}
        </SimpleGrid>

        <Box className="swiper-gallery-pagination"></Box>
      </Box>
    </Box>
  );
};

export default Gallery;
