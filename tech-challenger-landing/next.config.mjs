import { NextFederationPlugin } from '@module-federation/nextjs-mf';

process.env.NEXT_PRIVATE_LOCAL_WEBPACK = true;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'landing',
        filename: 'static/chunks/remoteEntry.js',
         exposes: {
          './LandingComponent': './components/landing/landing-page',
        },
        shared: {},
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          publicPath: 'http://localhost:3001/_next/static/',
          enableUrlLoaderFix: true,
        },
      }),
    );
    return config;
  },
};

export default nextConfig;
