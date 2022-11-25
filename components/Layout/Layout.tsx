import {
  Box,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

import { NextSeo } from 'next-seo';
// import dynamic from 'next/dynamic';
import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import NextLink from 'next/link';

// import frontImage from '../../public/front.png';
// import Head from 'next/head';

type LayoutProps = {
  children?: React.ReactNode;
  breadcrumb?: {
    label: string;
    link: string;
  } | null;
  pageTitle?: string;
  description?: string;
  pageLink?: string;
  // og: {
  //   type?: string;
  //   images?: {
  //     url: string;
  //     width: number;
  //     height: number;
  //     alt: string;
  //     type: string;
  //   }[];
  // };
};
const Layout = ({
  children,
  breadcrumb = null,
  pageTitle,
  pageLink,
  description = 'Home loved and raised alaskan malamute puppies, living with adults, kids, visitors and other pets, looking for new forever homes. Do you have what it takes?',
}: // og = {},
LayoutProps) => {
  let title: string = pageTitle
    ? `Livestock Hay Farm - ${pageTitle}`
    : 'Livestock Hay Farm';
  const canonical: string = pageLink
    ? `https://alaskanmalamuteking.com${pageLink}/`
    : 'https://alaskanmalamuteking.com/';
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title: title,
          description: description,
          site_name: 'Livestock Hay Farm',
          type: 'website',
          images: [
            {
              url: 'https://alaskanmalamuteking.com/front.jpg',
              alt: 'Alaskan Malamute Puppy',
              type: 'image/jpg',
            },
          ],
        }}
        twitter={{
          site: 'alaskanmalamuteking.com',
          cardType: 'summary_large_image',
          handle: '@alaskanmalamute',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'alaskan malamute puppy, giant alaskan malamute, alaskan malamute for sale, alaskan malamute price, alaskan malamute, alaskan malamute puppy for sale, alaskan malamute puppies for sale, alaskan, malamute, alaskan malamute for adoption, white alaskan malamute, alaskan malamute puppy america, Livestock Hay Farm',
          },
          {
            name: 'revisit-after',
            content: '5 days',
          },
          {
            name: 'author',
            content: 'alaskanmalamuteking',
          },
          {
            name: 'language',
            content: 'English',
          },
          {
            name: 'http-equiv',
            content: 'text/html; charset=utf-8',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'https://alaskanmalamuteking.com/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '60x60',
            href: 'https://alaskanmalamuteking.com/apple-touch-icon-iphone-60x60.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '76x76',
            href: 'https://alaskanmalamuteking.com/apple-touch-icon-ipad-76x76.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '114x114',
            href: 'https://alaskanmalamuteking.com/apple-touch-icon-iphone-retina-120x120.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '144x144',
            href: 'https://alaskanmalamuteking.com/apple-touch-icon-ipad-retina-152x152.png',
          },
        ]}
      />

      <Container
        // border={'thin solid red'}
        minW="100%"
        maxW="100%"
        w="100%"
        h="50vh"
        m={0}
        p={0}
        mt={{ base: '6.7rem', md: '7rem' }}
      >
        <Box as="header">
          <Header />
        </Box>

        <Box minH="60vh" p={{ base: 1, md: 0 }} as="main">
          {breadcrumb && (
            <Box>
              <Flex
                align="center"
                justify="space-between"
                direction={{ base: 'column', md: 'row' }}
                bg="gray.50"
                minW="100%"
                p="2rem"
              >
                <Heading
                  textTransform="uppercase"
                  as="p"
                  textStyle="h2"
                  fontWeight="500"
                  fontSize={{ base: '1.7rem', md: '3xl' }}
                >
                  {breadcrumb.label}
                </Heading>
                <Breadcrumb
                  spacing="8px"
                  separator={<ArrowRightIcon fontSize="xs" color="primary" />}
                  fontFamily="var(--chakra-fonts-manjari)"
                  fontSize="xl"
                >
                  <BreadcrumbItem>
                    <NextLink href="/" passHref>
                      <BreadcrumbLink>Home</BreadcrumbLink>
                    </NextLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <NextLink href={breadcrumb.link} passHref>
                      <BreadcrumbLink textTransform="capitalize">
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    </NextLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
            </Box>
          )}
          {children}
        </Box>
        <Box border="thin solid black" m={0} maxW="100%" as="footer">
          <Footer />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
// export default dynamic(() => Promise.resolve(Layout), { ssr: false });
