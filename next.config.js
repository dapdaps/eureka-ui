/** @type {import('next').NextConfig} */

const api_url = process.env.NEXT_PUBLIC_API ? process.env.NEXT_PUBLIC_API : 'https://api.dapdap.net';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
    {
      source: '/api/sma-steth-apr',
      destination: 'https://stake.lido.fi/api/sma-steth-apr',
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
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.stream = 'stream-browserify'

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )
    fileLoaderRule.exclude = /\.svg$/i
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        VmInitializer: {
          test: /[\\/]src[\\/]components[\\/]vm[\\/]VmInitializer\.tsx$/,
          name: 'VmInitializer',
          chunks: 'initial',
          enforce: true,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
