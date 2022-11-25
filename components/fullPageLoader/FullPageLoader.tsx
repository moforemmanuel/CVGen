import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import Layout from '../Layout/Layout';

export default function FullPageLoader() {
  return (
    // <Layout>
    <Flex align="center" justify="center" minH="70vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.400"
        size="xl"
      />
    </Flex>
    // </Layout>
  );
}
