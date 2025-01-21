import { NextFederationPlugin } from '@module-federation/nextjs-mf';

process.env.NEXT_PRIVATE_LOCAL_WEBPACK = true;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: '_next/static/chunks/remoteEntry.js',
        remotes: {
          landing: `landing@http://localhost:80/components/_next/static/chunks/remoteEntry.js`,
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
