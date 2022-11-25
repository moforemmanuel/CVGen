import { chakra } from '@chakra-ui/react';
// import dynamic from 'next/dynamic';
import NextImage from 'next/image';

const CImage = chakra(NextImage, {
  baseStyles: {
    display: 'block',
    margin: 0,
    padding: 0,
    w: 'auto',
    h: 'auto',
  },

  shouldForwardProp: (prop) =>
    [
      'src',
      'sizes',
      'unoptimized',
      'priority',
      'loading',
      'lazyRoot',
      'lazyBoundary',
      'className',
      'quality',
      'width',
      'height',
      'style',
      'objectFit',
      'objectPosition',
      'onLoadingComplete',
      'placeholder',
      'blurDataURL',
      'alt',
    ].includes(prop),
});

// export default dynamic(() => Promise.resolve(CImage), { ssr: false });
export default CImage;

// export default NextImage;
