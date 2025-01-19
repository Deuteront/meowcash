import { NextFederationPlugin } from '@module-federation/nextjs-mf';

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
          publicPath: 'http://localhost:3002/_next/static/',
          enableUrlLoaderFix: true,
        },
      }),
    );
    return config;
  },
};

export default nextConfig;
