/** @type {import('next').NextConfig} */
import { NextFederationPlugin } from '@module-federation/nextjs-mf';


export default {
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'remoteEntry/js',
        remotes: {
          landing: `landing@${
            isServer
              ? 'http://localhost:3000/server/remoteEntry.js'
              : 'http://localhost:3000/remoteEntry.js'
          }`,
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
      }),
    );
    return config;
  },
};
