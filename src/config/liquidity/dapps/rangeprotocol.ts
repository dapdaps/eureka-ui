
const basic = {
  name: 'Rangeprotocol',
  icon: '/images/apps/gamma.png',
  logo: 'https://ipfs.near.social/ipfs/bafkreibgmu62fb5o3n3s54srlzyf7ppn2c42racp5q3gnukcjgkfwkzuse',
  amountOutFn: 'bluebiu.near/widget/Liquidity.STEERPROTOCOL',
  ICON_VAULT_MAP: {
    USDT: 'https://app.rangeprotocol.com/images/coins/56/0x55d398326f99059fF775485246999027B3197955.png',
    USDC: 'https://app.rangeprotocol.com/images/coins/56/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d.png',
    CAKE: 'https://app.rangeprotocol.com/images/coins/56/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png',
    WBNB: 'https://app.rangeprotocol.com/images/coins/56/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png'
  },
};
const networks = {
  // bsc
  56: {
    ALL_DATA_URL: 'https://rangeprotocol-public.s3.ap-southeast-1.amazonaws.com/data/RangeAPY.json',
    FEES_URL: 'https://rangeprotocol-public.s3.ap-southeast-1.amazonaws.com/data/fees-bsc-pancakeswap.json',
    RANGE_URL: 'https://api.thegraph.com/subgraphs/name/0xbateman/range-bsc-pancakeswap',
    ammName: 'Pancake',
    ammImage: 'https://app.rangeprotocol.com/images/exchanges/icon-cake-token.svg',
    defaultPair: 'P USDT-USDC',
    pairs: [
      {
        id: 'P USDT-USDC',
        strategy: 'Dynamic',
        strategy2: 'Pegged',
        token0: 'USDT',
        token1: 'USDC',
        "decimals0": 18,
        "decimals1": 18,
        "poolAddress": "0x92b7807bF19b7DDdf89b706143896d05228f3121",
      },
      {
        id: 'P CAKE-WBNB',
        strategy: 'Dynamic',
        strategy2: 'Passive',
        token0: 'CAKE',
        token1: 'WBNB',
        "decimals0": 18,
        "decimals1": 18,
        "poolAddress": "0x133B3D95bAD5405d14d53473671200e9342896BF",
      }
    ],
    addresses: {
      USDT: '0x55d398326f99059fF775485246999027B3197955',
      USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      CAKE: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',

      'P USDT-USDC': '0xFEB0819A3d00EACf1D8F593D2538C33d34b76274',
      'P CAKE-WBNB': '0x5db61A5f05580Cf620a9d0f9266E7432811DC309',
    },
    proxyAddress: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f'
  },
};

export default { basic, networks };
