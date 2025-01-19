import { NextFederationPlugin } from '@module-federation/nextjs-mf';

process.env.NEXT_PRIVATE_LOCAL_WEBPACK = true;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: '_next/static/chunks/remoteEntry.js',
        remotes: {
          landing: `landing@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
        },
        shared: {},
        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      }),
    );
    return config;
  },
};

export default nextConfig;
