import React from 'react';
import '@cloudscape-design/global-styles';

if (typeof window === 'undefined') React.useLayoutEffect = () => {};

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
