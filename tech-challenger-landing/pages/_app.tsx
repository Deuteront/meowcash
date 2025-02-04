import React from 'react';
import './global.scss';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (

    <Component {...pageProps} />
  );
}
