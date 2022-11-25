import {
  Avatar,
  Box,
  // Center,
  Flex,
  Heading,
  Text,
  // Image,
  // keyframes,
  // Text,
} from '@chakra-ui/react';
import React from 'react';
// import CImage from '../CImage/CImage';
import Swiper, {
  Autoplay,
  // Navigation,
  // Pagination,
  EffectCards,
  Navigation,
  Pagination,
  // Zoom,
} from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
// import 'swiper/css/zoom';

// Images

// eslint-disable-next-line no-unused-vars
const testimonials: {
  // image: any;
  name: string;
  message: string;
}[] = [
  {
    name: 'Jeson Foxx',
    message:
      "We couldn't be more happy with our Mal puppy named Buddy. Alaskan Malamute King is so helpful & made the process of buying our puppy an easy one! Buddy has brought so much joy to us",
    // image: jackMeld,
  },
  {
    name: 'Jenika & Lily Cowan',
    message:
      'Casper is happy, healthy and smarter than we are. Katherine and I cannot imagine life without him. I check out your site frequently, and it is very tempting to add to our family when I',
    // image: jackMeld,
  },
  {
    name: 'Jack Meld',
    message:
      'I just wish to say thanks for kelvin. He is such a nice puppy. Like to pay and jump around. He is exactly what I want as a puppy. I could not have wish for',
    // image: jackMeld,
  },
];
const Testimonials = () => {
  React.useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.swiper-testimonials', {
      modules: [Autoplay, EffectCards, Pagination, Navigation],
      autoplay: { delay: 5000 },

      // direction: 'horizontal',
      // loop: true,
      speed: 2000,
      effect: 'cards',
      centeredSlides: true,
      pagination: true,
      navigation: true,
    });
  });

  return (
    <Box
      // border="thin solid blue"
      maxW={{ base: '100%', md: '45%' }}
      p="2.7rem"
      mx={3}
      mt={0}
    >
      <Box className="swiper-testimonials">
        {/* <Center> */}
        <Box
          className="swiper-wrapper"
          // border="thin solid green"
          // maxW="50%"
        >
          {testimonials.map((testimonial) => (
            <Box
              rounded="lg"
              shadow="2xl"
              key={testimonial.name}
              p={3}
              className="swiper-slide"
              maxH={{ md: '60vh' }}
              maxW={{ md: '60vw' }}
              // border="thin solid red"

              bgGradient="linear(to-b, whiteAlpha.900 0%, whiteAlpha.900 15%, pink.200 15%, pink.400 100%)"
            >
              <Flex direction="column" align="center" justify="center">
                <Avatar
                  size="xl"
                  // src={testimonial.image.src}
                  name={testimonial.name}
                />
                <Heading as="h3" textAlign="center">
                  {testimonial.name}
                </Heading>
                <Text align="center">&quot;{testimonial.message}&quot;</Text>
              </Flex>
            </Box>
          ))}
        </Box>
        {/* </Center> */}
      </Box>
    </Box>
  );
};

export default Testimonials;
