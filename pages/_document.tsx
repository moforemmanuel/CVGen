// pages/_document.js

import theme from '../Theme/theme';

import Document, {
  // DocumentContext,
  // DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-us">
        <Head />
        <body>
          <Main />
          <ColorModeScript initialColorMode={theme.config?.intialColorMode} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// import Document, { DocumentContext, DocumentInitialProps } from 'next/document';

// class MyDocument extends Document {
//   static async getInitialProps(
//     ctx: DocumentContext
//   ): Promise<DocumentInitialProps> {
//     const initialProps = await Document.getInitialProps(ctx);

//     return initialProps;
//   }
// }

// export default MyDocument;
