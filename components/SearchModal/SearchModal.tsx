/* eslint-disable react/no-children-prop */
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  // ModalCloseButton,
  ModalContent,
  // ModalFooter,
  // ModalHeader,
  ModalOverlay,
  // Text,
  // useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
function SearchModal({ isOpen, onOpen, onClose }: SearchModalProps) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const inputEl = React.useRef<HTMLInputElement | null>(null);

  const onSubmit = () => {
    let q = inputEl?.current?.value;
    // console.log(query);
    onClose();
    router.push(`/search?q=${q}`);
  };

  // const handleInputChange = (e: any) => {
  //   console.log(e.target.value);
  // };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <IconButton
        aria-label="Search Site"
        variant="ghost"
        icon={<SearchIcon />}
        onClick={onOpen}
      />

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay backdropFilter="brightness(20%) blur(0px)" />
        <ModalContent maxW={{ base: '90%', lg: '30%' }} bg="transparent">
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          {/* <ModalCloseButton /> */}
          <IconButton
            aria-label="Close Modal"
            // variant="ghost"
            w="fit-content"
            icon={<CloseIcon />}
            fontWeight="extrabold"
            fontSize="2rem"
            bg="transparent"
            color="whiteAlpha.900"
            onClick={onClose}
            position="absolute"
            left={{ base: '17rem', md: '40rem', lg: '50rem' }}
            bottom={{ base: '18rem', md: '28rem', lg: '18rem' }}
            _hover={{
              bg: 'transparent',
              color: 'primary',
            }}
          />
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
            flexDirection="column"
            pt={6}
            // minH={window.innerHeight - 100}
            w="100%"
            bg="none"
            // border="thin solid red"
          >
            <InputGroup color="whiteAlpha.900">
              <InputRightElement
                mt={1}
                pointerEvents="none"
                color="whiteAlpha.900"
                fontSize="1.2em"
                transform="scaleX(-1)"
                p={3}
                mr={1}
                // eslint-disable-next-line react/no-children-prop
                children={<SearchIcon />}
              />
              <Input
                ref={inputEl}
                borderColor="primary"
                borderWidth="2px"
                borderStyle="solid"
                type="search"
                px={8}
                py={6}
                rounded={0}
                placeholder="Type and hit enter"
                // onChange={handleInputChange}
                // onSubmit={onSubmit}
                onKeyDown={(e) => {
                  if (e.code == 'Enter') {
                    onSubmit();
                    // console.log(e);
                  }
                }}
              />
              {/* <InputRightElement children={<CheckIcon color="green.500" />} /> */}
            </InputGroup>
            {/* </Form> */}

            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="2rem"
            >
              
              <IconButton
                aria-label="cancel"
                colorScheme="red"
                icon={<CloseIcon />}
                onClick={onClose}
              />
              <IconButton
                aria-label="submit"
                colorScheme="green"
                icon={<CheckIcon />}
                onClick={onSubmit}
                type="submit"
              />

            </Box> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SearchModal;
