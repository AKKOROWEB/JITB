import App from 'next/app';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from '../src/store';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import metrics from '../src/metrics';
import {pageview, event} from '../src/utility/analytics';
import Layout from '../src/components/common/layout';
import {useRouter} from 'next/router';

/**
 * Handles the Vitals and Metrics of the Webapp
 * @param {Object} metric
 */
export const reportWebVitals = (metric) => metrics(metric);

function MyApp({Component, pageProps}) {
  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     pageview(url);
  //   };
  //   if (window !== undefined && window.gtag) {
  //     //When the component is mounted, subscribe to router changes
  //     //and log those page views
  //     router.events.on('routeChangeComplete', handleRouteChange);

  //     // If the component is unmounted, unsubscribe
  //     // from the event with the `off` method
  //   }
  //   return () => {
  //     if (window !== undefined && window.gtag)
  //       router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          key='viewport'
        />
        <meta name='robots' content='index, follow'></meta>
        <meta charset='UTF-8'></meta>
        <meta name='description' content='JITB: Jack In The Blocks' />
        <style
          jsx
          data-href='https://fonts.googleapis.com/css?family=Poppins'>{`
          @font-face {
            font-family: 'Baskerville Old Face';
            src: url('https://ipfs.io/ipfs/QmbYGWGBhUczJNAbof4A3zpaLZQWw7fXASZ22T2bQbjbPY?filename=BASKVILL.ttf')
              format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }

          @font-face {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfedA.woff)
              format('woff');
          }
          @font-face {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2)
              format('woff2');
            unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
              U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
          }
          @font-face {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2)
              format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
              U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
          }
          @font-face {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2)
              format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
              U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
              U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        `}</style>

        <title>
          JITB{' '}
          {router.pathname !== '/'
            ? router.pathname.replace('/[id]', '').toUpperCase()
            : ''}
        </title>
      </Head>

      <Provider session={pageProps.session} store={store}>
        {/* <ThemeProvider theme={theme}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </ThemeProvider> */}
      </Provider>
    </>
  );
}

export default MyApp;
