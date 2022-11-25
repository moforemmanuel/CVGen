import { Text, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
// import dynamic from 'next/dynamic';
import React from 'react';
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <VStack
      zIndex="sticky"
      position="fixed"
      minW="100%"
      gap={0}
      top={0}
      overflow="hidden"
      spacing={0}
      boxShadow="sm"
    >
      <Flex
        minW="100%"
        bg="gray.900"
        align="center"
        justify="center"
        h="max-content"
        color="whiteAlpha.800"
        m={0}
        // border="thin solid red"
      >
        <Text
          fontSize="md"
          margin={1}
          fontWeight="lighter"
          fontFamily="var(--chakra-fonts-manjari)"
        >
          With hay comes health
        </Text>
      </Flex>
      <Navbar />
    </VStack>
  );
};

// export default dynamic(() => Promise.resolve(Header));
export default Header;
