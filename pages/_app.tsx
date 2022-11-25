import '../styles/globals.css';
import '../plugins/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import theme from '../Theme/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from '../context/Context';
import React from 'react';
import AOS from 'aos';

import 'aos/dist/aos.css';
import 'animate.css';

// fonts
import '@fontsource/open-sans/400.css';
import '@fontsource/poppins/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/viaoda-libre/';
import '@fontsource/caveat-brush/';
import '@fontsource/montserrat/700.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/manjari';
import { ParallaxProvider } from 'react-scroll-parallax';
import Script from 'next/script';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  React.useEffect(() => {
    AOS.init({
      // easing: 'ease-out-cubic',
      once: false,
      offset: 120,
      startEvent: 'DOMContentLoaded',
      // placement: 'top-top',
      // offset: 50,
      duration: 1000,
      // easing: 'ease-in-sine',
      delay: 400,
      mirror: true,
    });

    // console.log(router);

    // check user auth
    // if (router.pathname == '/auth/login' || router.pathname == '/auth/signup') {
    // } else {
    //   if (!Cookies.get('user')) {
    //     toast.warn('Please Login to continue');
    //     router.push(`/auth/login?redirect=${router.pathname}`);
    //   }
    // }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <ParallaxProvider>
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
            // integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
          />
          <Script>
            {`
          (() => {
            'use strict';
          
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation');
          
            // Loop over them and prevent submission
            Array.from(forms).forEach((form) => {
              form.addEventListener(
                'submit',
                (event) => {
                  if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
          
                  form.classList.add('was-validated');
                },
                false
              );
            });
          })();
          
        `}
          </Script>
          <Component {...pageProps} />
          <ToastContainer theme="colored" />
        </ParallaxProvider>
      </ContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
