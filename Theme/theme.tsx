import { extendTheme } from '@chakra-ui/react';
import { ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const fonts = {
  // heading: `'Poppins', sans-serif`,
  body: `'Open Sans', sans-serif`,
  // h1: `'Playfair Display', serif`,
  // // h2: `''Caveat Brush', cursive`,
  montserrat: `'Montserrat', sans-serif`,
  poppins: `'Poppins', sans-serif`,
  openSans: `'Open Sans', sans-serif`,
  playfairDisplay: `'Playfair Display', serif`,
  caveatBrush: `'Caveat Brush', cursive`,
  manjari: `'Manjari', sans-serif`,
};

const textStyles = {
  h1: {
    'font-family': 'var(--chakra-fonts-manjari)',
    // 'font-size': {
    //   base: '2rem',
    //   md: '3rem',
    // },
    // fontWeight: 'lighter',
    margin: '1rem auto auto',
    // backgroundColor: 'red',
    'text-align': 'center',
  },

  h2: {
    'font-family': 'var(--chakra-fonts-manjari)',
  },

  h3: {
    'font-family': 'var(--chakra-fonts-caveatBrush)',
    color: 'pink.400',
    'text-align': 'center',
  },

  descriptiveText: {
    'font-family': 'var(--chakra-fonts-poppins)',
    'text-align': 'center',
  },

  spacedText: {
    fontSize: 'larger',
    lineHeight: '{{ base: 8, md: 10 }}',
  },

  // navLink: {
  //   color: 'green',
  //   '&:active': {
  //     color: 'primary',
  //   },
  // },
};

const layerStyles = {
  primaryBtn: {
    padding: '1.5rem',
  },

  sideNavBox: {
    margin: 0,
    padding: '1rem 1rem 1rem 0',
    // paddingLeft: '1.4rem',
    // color: 'red',
    // border: 'thin solid green',
    transition: 'all 0.5s',
    fontWeight: 'bolder',
    letterSpacing: '0.085rem',

    '&:hover': {
      backgroundColor: 'blue.50',
    },
  },
};

const components = {
  Link: {
    baseStyle: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
};

const colors = {
  // primary: '#6AB43E',
  primary: '#358100',
};

const theme = extendTheme({
  colors,
  config,
  fonts,
  textStyles,
  layerStyles,
  components,
});

export default theme;
