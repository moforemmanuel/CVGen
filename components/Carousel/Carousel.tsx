import { Box, Heading, Skeleton } from '@chakra-ui/react';
import React from 'react';
import CImage from '../CImage/CImage';
import Swiper from 'swiper';
import { Autoplay, EffectFade } from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';

// Images
import testImage from '../../public/testImage.jpg';
import testImage2 from '../../public/testImage.jpg';
import testImage3 from '../../public/testImage.jpg';
// import testImage4 from '../public/testImage.jpg';
// import { motion } from 'framer-motion';

const Carousel = ({ title = 'Title' }) => {
  const [mounted, setMounted] = React.useState(false);

  // const carouselItems: {
  //   image: any,
  //   title: string,
  //   message: string
  // }[] = [
  //   {
  //     image: testImage,
  //     title: 'Title 1'
  //   }
  // ]

  React.useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.swiper', {
      modules: [Autoplay, EffectFade],
      autoplay: { delay: 5000 },

      direction: 'horizontal',
      loop: true,
      speed: 2000,
      effect: 'fade',
    });

    setMounted(true);
  }, []);
  return (
    <Box>
      <Skeleton isLoaded={mounted} fadeDuration={0.2} speed={0.5}>
        <Box className="swiper">
          <Box className="swiper-wrapper">
            <Box className="swiper-slide" maxH={{ md: '85vh' }}>
              <CImage
                src={testImage.src}
                width={testImage.width}
                height={testImage.height}
                layout="fill"
                priority
                filter={{ md: 'brightness(20%)' }}
              />

              <Box
                className="animate__animated animate__fadeInDown animate_slower"
                display={{ base: 'none', md: 'block' }}
                position="absolute"
                top="4rem"
                left="1%"
                color="whiteAlpha.400"
              >
                <Heading
                  textTransform="capitalize"
                  color="whiteAlpha.900"
                  textAlign="center"
                  fontSize="5xl"
                >
                  Welcome To <br />
                  the Title
                </Heading>
              </Box>

              <Box
                // as={motion.div}
                // animation={animation2}
                className="animate__animated animate__fadeInUp animate_slower"
                display={{ base: 'none', md: 'block' }}
                position="absolute"
                top="18rem"
                left="1%"
                maxW="40%"
                color="whiteAlpha.400"
              >
                <Heading color="whiteAlpha.900" textAlign="center">
                  Some text here and a CTA
                </Heading>
              </Box>
            </Box>

            {/* Next Slider */}

            <Box className="swiper-slide" maxH={{ md: '85vh' }}>
              <CImage
                src={testImage2.src}
                width={testImage2.width}
                height={testImage3.height}
                layout="fill"
                priority
                filter={{ md: 'brightness(20%)' }}
              />

              <Box
                display={{ base: 'none', md: 'block' }}
                position="absolute"
                top="4rem"
                left="1%"
                color="whiteAlpha.400"
              >
                <Heading
                  textTransform="capitalize"
                  color="whiteAlpha.900"
                  textAlign="center"
                  fontSize="5xl"
                >
                  Welcome To <br />
                  the {title}
                </Heading>
              </Box>

              <Box
                display={{ base: 'none', md: 'block' }}
                position="absolute"
                top="18rem"
                left="1%"
                maxW="40%"
                color="whiteAlpha.400"
              >
                <Heading color="whiteAlpha.900" textAlign="center">
                  Some text about {title}
                </Heading>
              </Box>
            </Box>

            {/* Next Slider */}

            <Box className="swiper-slide" maxH={{ md: '85vh' }}>
              <CImage
                src={testImage3.src}
                width={testImage3.width}
                height={testImage3.height}
                layout="fill"
                priority
                filter={{ md: 'brightness(20%)' }}
              />

              <Box
                // as={motion.div}
                // animation={animation}
                className="animate__animated animate__bounce"
                display={{ base: 'none', md: 'block' }}
                position="absolute"
                top="4rem"
                left="1%"
                color="whiteAlpha.400"
              >
                <Heading
                  textTransform="capitalize"
                  color="whiteAlpha.900"
                  textAlign="center"
                  fontSize="5xl"
                >
                  Welcome To <br />
                  the home of cavoodles
                </Heading>
              </Box>

              <Box
                display={{ base: 'none', md: 'block' }}
                position="absolute"
                top="18rem"
                left="1%"
                maxW="40%"
                color="whiteAlpha.400"
              >
                <Heading color="whiteAlpha.900" textAlign="center">
                  Some text about {title}
                </Heading>
              </Box>
            </Box>

            {/* End of Slides */}
          </Box>
        </Box>
      </Skeleton>
    </Box>
  );
};

export default Carousel;

{
  /* <Box
            className="swiper-slide"
            bg="gray.500"
            // h={{ base: '40vh', md: '80vh' }}
            sx={{
              backgroundImage: `url(${img1.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              objectFit: 'fit',
            }}
          >
          </Box> */
}
