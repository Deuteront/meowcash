import { AppProps } from 'next/app';
import '../styles/global.scss';
import { QueryProvider } from '@/components/organisms/providers/query-provider';
import React from 'react';
import { AuthProvider } from '@/context/auth-context';

function MyApp({Component, pageProps}: AppProps) {
  return (

    <QueryProvider>
      <AuthProvider>
        <Component {...pageProps} /></AuthProvider>
    </QueryProvider>
  );
}

export default MyApp;
