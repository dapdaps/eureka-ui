/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createBundleStatsPlugin = require('next-plugin-bundle-stats');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const withBundleStatsPlugin =
  process.env.ANALYZE_STATS === 'true'
    ? createBundleStatsPlugin({
        outDir: './analyze'
      })
    : (conf) => conf;

const api_url = process.env.NEXT_PUBLIC_API ? process.env.NEXT_PUBLIC_API : 'https://api.dapdap.net';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  compiler: { styledComponents: true },
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/stackoverflow',
        destination:
          '/near/widget/NearOrg.HomePage?utm_source=stack&utm_medium=podcast&utm_campaign=stackoverflow_evergreen_bos_awareness',
        permanent: false
      },
      {
        source: '/consensus',
        destination: 'https://nearconsensus2023.splashthat.com/',
        permanent: false
      },
      {
        source: '/ethcc',
        destination: 'https://www.eventbrite.com/e/near-ethcc-tickets-655229297467',
        permanent: false
      },
      {
        source: '/pitch',
        destination: 'https://nearpitchfestconsensus.splashthat.com/',
        permanent: false
      },
      {
        source: '/developer-governance',
        destination: 'https://neardevgov.org/',
        permanent: false
      },
      {
        source: '/edit/:path*',
        destination: '/sandbox/:path*',
        permanent: true
      }
    ];
  },
  rewrites: async () => [
    {
      source: '/api/segment',
      destination: 'https://api.segment.io/v1/batch'
    },
    {
      source: '/api/analytics/:path*',
      destination: 'https://near.dataplane.rudderstack.com/:path*'
    },
    {
      source: '/dapdap/:path*',
      destination: api_url + '/:path*'
    },
    {
      source: '/wepiggy/arb/:path*',
      destination: 'https://gateway.arb.bs.fortop.site/:path*'
    },
    {
      source: '/wepiggy/bsc/:path*',
      destination: 'https://gateway.bsc.bs.fortop.site/:path*'
    },
    {
      source: '/wepiggy/optimism/:path*',
      destination: 'https://gateway.optimism.bs.fortop.site/:path*'
    },
    {
      source: '/wepiggy/polygon/:path*',
      destination: 'https://gateway.polygon.bs.fortop.site/:path*'
    },
    {
      source: '/shush/:path*',
      destination: 'https://www.shush.fi/:path*'
    },
    {
      source: '/blast/bridge/:path*',
      destination: process.env.IS_DEV
        ? 'https://app.dapdap.net/blast/bridge/:path*'
        : 'https://waitlist-api.prod.blast.io/:path*'
    },
    {
      source: '/renzo/:path*',
      destination: 'https://app.renzoprotocol.com/:path*'
    },
    {
      source: '/lido/:path*',
      destination: 'https://stake.lido.fi/:path*'
    },
    {
      source: '/pac/:path*',
      destination: api_url + '/pac/:path*'
    },
    {
      source: '/pool/fee-apr',
      destination: 'https://ro81h8hq6b.execute-api.us-east-1.amazonaws.com/pool/fee-apr'
    },
    {
      source: '/kelpdao/:path*',
      destination: 'https://universe.kelpdao.xyz/:path*'
    },
    {
      source: '/teahouse/:path*',
      destination: 'https://vault-api.teahouse.finance/:path*'
    },
    {
      source: '/beefy/:path*',
      destination: 'https://api.beefy.finance/:path*'
    },
    {
      source: '/duo/exchange/:path*',
      destination: 'https://www.duo.exchange/api/:path*'
    },
    {
      source: '/teahouse/:path*',
      destination: 'https://vault-api.teahouse.finance/:path*'
    },
    {
      source: '/api/app/agentfi/:path*',
      destination: 'https://app.agentfi.io/api/:path*'
    },
    {
      source: '/api/sma-steth-apr',
      destination: 'https://stake.lido.fi/api/sma-steth-apr'
    },
    {
      source: '/api/meth.mantle.xyz/:path*',
      destination: 'https://meth.mantle.xyz/api/:path*'
    },
    {
      source: '/assets/:path*',
      destination: 'https://assets.dapdap.net/:path*'
    },
    {
      source: '/api.dolomite.io/:path*',
      destination: 'https://api.dolomite.io/:path*'
    }
  ],
  images: {
    domains: ['assets.dapdap.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'basename.app',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.db3.app',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.dapdap.net',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'artio-static-asset-public.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.dapdap.net',
        port: '',
        pathname: '/**'
      }
    ]
  },
  transpilePackages: ['ahooks'],
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.stream = 'stream-browserify';

    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    if (!isServer) {
      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = { cacheGroups: {} };
      }
      config.optimization.splitChunks.cacheGroups.srcConfig = {
        test: /[\\/]src[\\/]config[\\/]/,
        name: 'src-config',
        chunks: 'all',
        priority: 15,
        minSize: 0
      };
      config.optimization.splitChunks.cacheGroups.srcHooks = {
        test: /[\\/]src[\\/]hooks[\\/]/,
        name: 'src-hooks',
        chunks: 'all',
        priority: 15,
        minSize: 0
      };
      config.optimization.splitChunks.cacheGroups.srcUtils = {
        test: /[\\/]src[\\/]utils[\\/]/,
        name: 'src-utils',
        chunks: 'all',
        priority: 15,
        minSize: 0
      };
      config.optimization.splitChunks.cacheGroups.srcComponents = {
        test: /[\\/]src[\\/]components[\\/]/,
        name: 'src-components',
        chunks: 'all',
        priority: 15,
        minSize: 0
      };
      config.optimization.splitChunks.cacheGroups.srcStores = {
        test: /[\\/]src[\\/]stores[\\/]/,
        name: 'src-stores',
        chunks: 'all',
        priority: 15,
        minSize: 0
      };
      config.optimization.splitChunks.cacheGroups.nextNavigation = {
        test: /[\\/]node_modules[\\/]next[\\/]dist[\\/]client[\\/]components[\\/]navigation.js/,
        name: 'next-navigation',
        chunks: 'all',
        priority: 15,
        minSize: 0
      };
      config.optimization.splitChunks.cacheGroups.nextRedirect = {
        test: /[\\/]node_modules[\\/]next[\\/]dist[\\/]client[\\/]components[\\/]redirect.js/,
        name: 'next-redirect',
        chunks: 'all',
        priority: 15,
        minSize: 0
      };
      config.optimization.splitChunks.cacheGroups.fixednumber = {
        test: /[\\/]node_modules[\\/]@ethersproject[\\/]bignumber[\\/]lib.esm[\\/]fixednumber.js/,
        name: 'fixednumber',
        chunks: 'all',
        priority: 15,
        minSize: 0
      };
    }
    return config;
  }
};

module.exports = withBundleAnalyzer(withBundleStatsPlugin(nextConfig));
