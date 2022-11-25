import { Flex, GridItem, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import CountUp from 'react-countup';
import { useParallax } from 'react-scroll-parallax';
// const ParaBanner = chakra(ParallaxBanner);
import parallaxImage from '../../public/parallax/parallax.jpg';
const Statistics = () => {
  const target = React.useRef(null);
  const train = useParallax({
    speed: 500,
    targetElement: target.current,
  });
  return (
    <Flex
      data-aos="fade-up"
      align="center"
      justify="center"
      minW="100%"
      minH="20vh"
      color="whiteAlpha.900"
      ref={target}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,100,0,0.8), rgba(0,100,0,0.8)),url(${parallaxImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // filter: 'blur(1px)',
        // width: '90vh',
      }}
      className="h-screen"
      p="3rem"
    >
      <SimpleGrid columns={[1, 2, 4]} minW="100%" spacing={6}>
        {[
          {
            count: 3000,
            label: 'BALES SOLD',
          },
          {
            count: 2000,
            label: 'POSITIVE REVIEWS',
          },
          {
            count: 12,
            label: 'AWARDS',
          },
          {
            count: 3,
            label: 'BAD REVIEWS',
          },
        ].map((item) => (
          <GridItem data-aos="zoom-in" key={item.label}>
            <Flex
              align="center"
              direction={{ base: 'column', md: 'row' }}
              justify="center"
              gap="2rem"
              fontSize="3rem"
              fontWeight="bolder"
              color="whiteAlpha.900"
            >
              <VStack spacing={0}>
                <CountUp
                  start={0}
                  end={item.count}
                  duration={5}
                  suffix="+"
                  separator=" "
                  enableScrollSpy={true}
                />
                <Heading
                  as="h3"
                  fontSize="2xl"
                  fontWeight="bolder"
                  color="whiteAlpha.900"
                  textStyle="h2"
                >
                  {item.label}
                </Heading>
              </VStack>
            </Flex>
          </GridItem>
        ))}
      </SimpleGrid>

      <div
        ref={train.ref}
        className="absolute"
        style={{
          top: '11vh',
          left: '30vw',
        }}
      ></div>
    </Flex>
  );
};

export default Statistics;

{
  /* <>
      <Box
        minW="100%"
        className="parallax-window"
        data-parallax="scroll"
        data-image-src="../../public/parallax/parallax.jpg"
        sx={{
          minH: '400px',
          background: 'transparent',
          border: 'thin solid red',
        }}
      >
        Hello
      </Box>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js" />
      <Script src="../../plugins/parallax.min.js" />
    </> */
}
