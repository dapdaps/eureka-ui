/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/',
      destination: '/uniswap/swap',
      permanent: true,
    },
    {
      source: '/uniswap',
      destination: '/uniswap/swap',
      permanent: true,
    },
  ],
  rewrites: async () => [
    {
      source: '/api/dapdap/:path*',
      destination: 'https://api.dapdap.net/api/:path*',
    },
  ],
};

module.exports = nextConfig;
