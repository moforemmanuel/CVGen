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
  // // montserrat: `'Montserrat', sans-serif`,
  // // heading: `'Open Sans', sans-serif`,
  // // body: `'Montserrat', sans-serif`,
};

const textStyles = {
  h1: {
    'font-family': 'var(--chakra-fonts-playfairDisplay)',
    'font-size': {
      base: '2rem',
      md: '3rem',
    },
    // fontWeight: 'lighter',
    margin: '1rem auto auto',
    // backgroundColor: 'red',
    'text-align': 'center',
  },
  h2: {
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
};

const layerStyles = {
  primaryBtn: {
    padding: '1.5rem',
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

const theme = extendTheme({
  config,
  fonts,
  textStyles,
  layerStyles,
  components,
});

export default theme;
