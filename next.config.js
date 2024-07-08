/** @type {import('next').NextConfig} */

const api_url = process.env.NEXT_PUBLIC_API ? process.env.NEXT_PUBLIC_API : 'https://api.dapdap.net';
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true'
// });
// const withPlugins = require('next-compose-plugins');


const nextConfig = {
  compiler: { styledComponents: true },
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/stackoverflow',
        destination:
          '/near/widget/NearOrg.HomePage?utm_source=stack&utm_medium=podcast&utm_campaign=stackoverflow_evergreen_bos_awareness',
        permanent: false,
      },
      {
        source: '/consensus',
        destination: 'https://nearconsensus2023.splashthat.com/',
        permanent: false,
      },
      {
        source: '/ethcc',
        destination: 'https://www.eventbrite.com/e/near-ethcc-tickets-655229297467',
        permanent: false,
      },
      {
        source: '/pitch',
        destination: 'https://nearpitchfestconsensus.splashthat.com/',
        permanent: false,
      },
      {
        source: '/developer-governance',
        destination: 'https://neardevgov.org/',
        permanent: false,
      },
      {
        source: '/edit/:path*',
        destination: '/sandbox/:path*',
        permanent: true,
      },
    ];
  },
  rewrites: async () => [
    {
      source: '/api/segment',
      destination: 'https://api.segment.io/v1/batch',
    },
    {
      source: '/api/analytics/:path*',
      destination: 'https://near.dataplane.rudderstack.com/:path*',
    },
    {
      source: '/dapdap/:path*',
      destination: api_url + '/:path*',
    },
    {
      source: '/wepiggy/arb/:path*',
      destination: 'https://gateway.arb.bs.fortop.site/:path*',
    },
    {
      source: '/wepiggy/bsc/:path*',
      destination: 'https://gateway.bsc.bs.fortop.site/:path*',
    },
    {
      source: '/wepiggy/optimism/:path*',
      destination: 'https://gateway.optimism.bs.fortop.site/:path*',
    },
    {
      source: '/wepiggy/polygon/:path*',
      destination: 'https://gateway.polygon.bs.fortop.site/:path*',
    },
    {
      source: '/shush/:path*',
      destination: 'https://www.shush.fi/:path*',
    },
    {
      source: '/blast/bridge/:path*',
      destination: 'https://waitlist-api.prod.blast.io/:path*',
    },
    {
      source: '/renzo/:path*',
      destination: 'https://app.renzoprotocol.com/:path*',
    },
    {
      source: '/lido/:path*',
      destination: 'https://stake.lido.fi/:path*',
    },
    {
      source: '/pac/:path*',
      destination: api_url + '/pac/:path*',
    },
    {
      source: '/pool/fee-apr',
      destination: 'https://ro81h8hq6b.execute-api.us-east-1.amazonaws.com/pool/fee-apr',
    },
    {
      source: '/kelpdao/:path*',
      destination: 'https://universe.kelpdao.xyz/:path*',
    },
    {
      source: '/teahouse/:path*',
      destination: 'https://vault-api.teahouse.finance/:path*',
    },
    {
      source: '/beefy/:path*',
      destination: 'https://api.beefy.finance/:path*',
    },
    {
      source: '/duo/exchange/:path*',
      destination: 'https://www.duo.exchange/api/:path*',
    },
    {
      source: '/teahouse/:path*',
      destination: 'https://vault-api.teahouse.finance/:path*',
    },
    {
      source: '/api/app/agentfi/:path*',
      destination: 'https://app.agentfi.io/api/:path*',
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.near.social',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'basename.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['ahooks'],
  experimental: {
    esmExternals: 'loose',
    webpackBuildWorker: true
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    if (!isServer) {
      config.externals.push({
        'react': 'var window.React',
        'react-dom': 'var window.ReactDOM',
        'react-bootstrap': 'var window.ReactBootstrap',
        'axios': 'var window.axios',
        'big.js': 'var window.Big',
        'ahooks': 'var window.ahooks',
        'ethers': 'var window.ethers',
        'lodash': 'var window._',
        'bootstrap': 'var window.bootstrap',
        'd3': 'var window.d3',
        'zustand': 'var window.zustand',
        '@braintree/sanitize-url':'var window["@braintree/sanitize-url"]',
        '@emoji-mart/data':'var window["@emoji-mart/data"]',
        '@emoji-mart/react':'var window["@emoji-mart/react"]',
        '@ensdomains/address-encoder':'var window["@ensdomains/address-encoder"]',
        '@ensdomains/eth-ens-namehash':'var window["@ensdomains/eth-ens-namehash"]',
        '@keypom/selector':'var window["@keypom/selector"]',
        '@lifi/sdk':'var window["@lifi/sdk"]',
        '@monaco-editor/react':'var window["@monaco-editor/react"]',
        '@near-eth/aurora-nep141':'var window["@near-eth/aurora-nep141"]',
        '@near-eth/client':'var window["@near-eth/client"]',
        '@near-eth/near-ether':'var window["@near-eth/near-ether"]',
        '@near-eth/nep141-erc20':'var window["@near-eth/nep141-erc20"]',
        '@near-eth/rainbow':'var window["@near-eth/rainbow"]',
        '@near-js/biometric-ed25519':'var window["@near-js/biometric-ed25519"]',
        '@near-wallet-selector/bitget-wallet':'var window["@near-wallet-selector/bitget-wallet"]',
        '@near-wallet-selector/core':'var window["@near-wallet-selector/core"]',
        '@near-wallet-selector/here-wallet':'var window["@near-wallet-selector/here-wallet"]',
        '@near-wallet-selector/meteor-wallet':'var window["@near-wallet-selector/meteor-wallet"]',
        '@near-wallet-selector/modal-ui':'var window["@near-wallet-selector/modal-ui"]',
        '@near-wallet-selector/my-near-wallet':'var window["@near-wallet-selector/my-near-wallet"]',
        '@near-wallet-selector/near-wallet':'var window["@near-wallet-selector/near-wallet"]',
        '@near-wallet-selector/neth':'var window["@near-wallet-selector/neth"]',
        '@near-wallet-selector/nightly':'var window["@near-wallet-selector/nightly"]',
        '@near-wallet-selector/sender':'var window["@near-wallet-selector/sender"]',
        '@near-wallet-selector/wallet-utils':'var window["@near-wallet-selector/wallet-utils"]',
        '@near-wallet-selector/welldone-wallet':'var window["@near-wallet-selector/welldone-wallet"]',
        '@radix-ui/react-accordion':'var window["@radix-ui/react-accordion"]',
        '@radix-ui/react-dropdown-menu':'var window["@radix-ui/react-dropdown-menu"]',
        '@radix-ui/react-icons':'var window["@radix-ui/react-icons"]',
        '@radix-ui/react-navigation-menu':'var window["@radix-ui/react-navigation-menu"]',
        '@radix-ui/react-toast':'var window["@radix-ui/react-toast"]',
        '@solana/fast-stable-stringify':'var window["@solana/fast-stable-stringify"]','@stitches/react':'var window["@stitches/react"]','@web3-onboard/bitget':'var window["@web3-onboard/bitget"]','@web3-onboard/core':'var window["@web3-onboard/core"]','@web3-onboard/injected-wallets':'var window["@web3-onboard/injected-wallets"]','@web3-onboard/ledger':'var window["@web3-onboard/ledger"]','@web3-onboard/react':'var window["@web3-onboard/react"]',
        '@web3-onboard/walletconnect':'var window["@web3-onboard/walletconnect"]','ahooks':'var window["ahooks"]','analytics-node':'var window["analytics-node"]','animate.css':'var window["animate.css"]','axios':'var window["axios"]','big.js':'var window["big.js"]','bn.js':'var window["bn.js"]','bootstrap':'var window["bootstrap"]','bootstrap-icons':'var window["bootstrap-icons"]','classnames':'var window["classnames"]','cookies-next':'var window["cookies-next"]','crypto':'var window["crypto"]','d3':'var window["d3"]','date-fns':'var window["date-fns"]','emoji-mart':'var window["emoji-mart"]','emoji-regex':'var window["emoji-regex"]','eslint':'var window["eslint"]','eslint-config-next':'var window["eslint-config-next"]','ethers':'var window["ethers"]','find-replacement-tx':'var window["find-replacement-tx"]','firebase':'var window["firebase"]','framer-motion':'var window["framer-motion"]','iframe-resizer-react':'var window["iframe-resizer-react"]','jsbi':'var window["jsbi"]','keccak':'var window["keccak"]','lite-merkle-patricia-tree':'var window["lite-merkle-patricia-tree"]','local-storage':'var window["local-storage"]','lodash':'var window["lodash"]','near-api-js':'var window["near-api-js"]','near-social-vm':'var window["near-social-vm"]','next':'var window["next"]','node-fetch':'var window["node-fetch"]','prettier':'var window["prettier"]','progress-bar-webpack-plugin':'var window["progress-bar-webpack-plugin"]','react':'var window["react"]','react-bootstrap':'var window["react-bootstrap"]','react-bootstrap-typeahead':'var window["react-bootstrap-typeahead"]','react-countup':'var window["react-countup"]','react-device-detect':'var window["react-device-detect"]','react-dom':'var window["react-dom"]','react-hook-form':'var window["react-hook-form"]','react-loading-skeleton':'var window["react-loading-skeleton"]','react-lottie':'var window["react-lottie"]','react-singleton-hook':'var window["react-singleton-hook"]','react-toastify':'var window["react-toastify"]','recharts':'var window["recharts"]','rudder-sdk-js':'var window["rudder-sdk-js"]','speed-measure-webpack-plugin':'var window["speed-measure-webpack-plugin"]','styled-components':'var window["styled-components"]','super-bridge-sdk':'var window["super-bridge-sdk"]','swiper':'var window["swiper"]','uuid':'var window["uuid"]','zustand':'var window["zustand"]'
        // 'super-bridge-sdk': 'var window.super-bridge-sdk'
      })
    }

    // if (!isServer && !dev) {
    //   console.log(config.optimization.splitChunks.cacheGroups)
    //   config.optimization.splitChunks.cacheGroups.framework.minChunks = 2;
    //   config.optimization.splitChunks.cacheGroups.lib.minChunks = 2;
    // }

    // config.cache = false

    // console.log('config:', config)

    return config;
  },
};

// module.exports = withPlugins([withBundleAnalyzer], nextConfig)

module.exports = nextConfig;
