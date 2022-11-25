import {
  Box,
  Flex,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import CImage from '../CImage/CImage';

import NextLink from 'next/link';

// import type { IPuppy } from '../../storage/puppies';
import type { IGrass } from '../../storage/grasses';

interface GrassViewProps {
  grass: IGrass;
}
const GrassView = ({ grass }: GrassViewProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="row"
      overflow="auto"
      maxW="100%"
      mb="1rem"
    >
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">Image</Th>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Sex</Th>
              <Th textAlign="center">Age</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <NextLink href={`/available-puppies#${puppy.name}`} passHref>
                  <Link>
                    <Box p={0} w={70} h={50}>
                      <CImage
                        src={puppy.image.src}
                        width={puppy.image.width}
                        height={puppy.image.height}
                        // width={70}
                        // height={50}
                        alt={puppy.name}
                        layout="intrinsic"
                        // objectFit="cover"
                        // objectPosition="center"
                        quality={30}
                        priority
                      />
                    </Box>
                  </Link>
                </NextLink>
              </Td>
              <Td>
                <NextLink href={`/available-puppies#${puppy.name}`} passHref>
                  <Link>
                    <Text>{puppy.name}</Text>
                  </Link>
                </NextLink>
              </Td>
              <Td>
                <Text>{puppy.sex}</Text>
              </Td>
              <Td>
                <Text>{puppy.age} Weeks</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default PuppyView;
