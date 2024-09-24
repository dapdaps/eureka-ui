const basic = {
  name: 'RangeProtocol',
  icon: 'https://s3.amazonaws.com/dapdap.prod/images/090-rageprotocal.png',
  dappSrc: 'bluebiu.near/widget/Liquidity.RANGEPROTOCOL',
  amountOutFn: 'bluebiu.near/widget/Liquidity.RANGEPROTOCOL',
  ICON_VAULT_MAP: {
    USDT: 'https://app.rangeprotocol.com/images/coins/56/0x55d398326f99059fF775485246999027B3197955.png',
    CAKE: 'https://app.rangeprotocol.com/images/coins/56/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.png',
    WBNB: 'https://app.rangeprotocol.com/images/coins/56/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png',
    ZETA: 'https://app.rangeprotocol.com/images/coins/56/0x0000028a2eB8346cd5c0267856aB7594B7a55308.png',
    USDV: 'https://app.rangeprotocol.com/images/coins/56/0x323665443CEf804A3b5206103304BD4872EA4253.png',
    WETH: 'https://app.rangeprotocol.com/images/coins/169/0x0Dc808adcE2099A9F62AA87D9670745AbA741746.png',
    STONE: 'https://app.rangeprotocol.com/images/coins/169/0xEc901DA9c68E90798BbBb74c11406A32A70652C3.png',
    wUSDM: 'https://app.rangeprotocol.com/images/coins/169/0xbdAd407F77f44F7Da6684B416b1951ECa461FB07.png',
    MANTA: 'https://app.rangeprotocol.com/images/coins/169/0x95CeF13441Be50d20cA4558CC0a27B601aC544E5.png',
    USDC: 'https://app.rangeprotocol.com/images/coins/169/0xb73603C5d87fA094B7314C74ACE2e64D165016fb.png',
    WEBMI: 'https://app.rangeprotocol.com/images/coins/169/0x19585009Ce333efCC4a383c28B27A0Eb2e8497Ea.png'
  }
};
const networks = {
  // bsc
  56: {
    ALL_DATA_URL: 'https://skate-fi.s3.ap-northeast-1.amazonaws.com/data/RangeAPY.json',
    FEES_URL: 'https://rangeprotocol-public.s3.ap-southeast-1.amazonaws.com/data/fees-bsc-pancakeswap.json',
    RANGE_URL: 'https://api.goldsky.com/api/public/project_clm97huay3j9y2nw04d8nhmrt/subgraphs/pancakeswap-bsc/0.2/gn',
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
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x92b7807bF19b7DDdf89b706143896d05228f3121'
      },
      {
        id: 'P CAKE-WBNB',
        strategy: 'Dynamic',
        strategy2: 'Passive',
        token0: 'CAKE',
        token1: 'WBNB',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x133B3D95bAD5405d14d53473671200e9342896BF'
      },
      {
        id: 'P ZETA-WBNB',
        strategy: 'Dynamic',
        strategy2: 'Passive',
        token0: 'ZETA',
        token1: 'WBNB',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0xF2B438694e2DD17a24c970435460de58B5785cFD'
      },
      {
        id: 'P USDT-WBNB',
        strategy: 'Dynamic',
        strategy2: 'Passive',
        token0: 'USDT',
        token1: 'WBNB',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x36696169C63e42cd08ce11f5deeBbCeBae652050'
      },
      {
        id: 'P USDV-USDT',
        strategy: 'Dynamic',
        strategy2: 'Pegged',
        token0: 'USDV',
        token1: 'USDT',
        decimals0: 6,
        decimals1: 18,
        poolAddress: '0x589a5062e47202bB994cD354913733a14b54e8Dc'
      }
    ],
    addresses: {
      USDT: '0x55d398326f99059fF775485246999027B3197955',
      USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      CAKE: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      ZETA: '0x0000028a2eB8346cd5c0267856aB7594B7a55308',
      USDV: '0x323665443CEf804A3b5206103304BD4872EA4253',

      'P USDT-USDC': '0xFEB0819A3d00EACf1D8F593D2538C33d34b76274',
      'P CAKE-WBNB': '0x5db61A5f05580Cf620a9d0f9266E7432811DC309',
      'P ZETA-WBNB': '0xa5f84725C8c88F14E583f94b9968DE94a8903FC5',
      'P USDT-WBNB': '0xB99F1Ce0f1C95422913FAF5b1ea980BbC580c14a',
      'P USDV-USDT': '0x80273A7E636a20546F2be21636C4771F51A3A580'
    },
    proxyAddress: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f'
  },
  // manta
  169: {
    ALL_DATA_URL: 'https://skate-fi.s3.ap-northeast-1.amazonaws.com/data/RangeAPY.json',
    FEES_URL: 'https://rangeprotocol-public.s3.ap-southeast-1.amazonaws.com/data/fees-manta-izumi.json',
    RANGE_URL: 'https://api.goldsky.com/api/public/project_clm97huay3j9y2nw04d8nhmrt/subgraphs/pancakeswap-bsc/0.2/gn',
    ammName: 'iZUMi',
    ammImage: 'https://app.rangeprotocol.com/images/exchanges/icon-izumi.svg',
    defaultPair: 'P WETH-STONE',
    pairs: [
      {
        id: 'P WETH-STONE',
        strategy: 'Dynamic',
        strategy2: 'Pegged',
        token0: 'WETH',
        token1: 'STONE',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0xb0A6C5Fac88b1D0F2CA6B1Df2dbB06FF0D227800'
      },
      {
        id: 'P wUSDM-STONE',
        strategy: 'Dynamic',
        strategy2: 'Passive',
        token0: 'wUSDM',
        token1: 'STONE',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x5FE8B6Ed86703e66Ea727cD06C44ac5a6DF9076f'
      },
      {
        id: 'P WETH-MANTA',
        strategy: 'Dynamic',
        strategy2: 'Passive',
        token0: 'WETH',
        token1: 'MANTA',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x8515bd9D9F5AF69775787175E398da16201a2fF2'
      },
      {
        id: 'P WETH-USDC',
        strategy: 'Dynamic',
        strategy2: 'Passive',
        token0: 'WETH',
        token1: 'USDC',
        decimals0: 18,
        decimals1: 6,
        poolAddress: '0x92930F343c8Fb1da3656D4908d2F59b543A54056'
      }
      // {
      //   id: 'A WETH-WEBMI',
      //   strategy: 'Dynamic',
      //   strategy2: 'Active',
      //   token0: 'WETH',
      //   token1: 'WEBMI',
      //   "decimals0": 18,
      //   "decimals1": 18,
      //   "poolAddress": "0x96b70fa6666fd35b5d99330b6167466684267f81",
      // },
    ],
    addresses: {
      WETH: '0x0Dc808adcE2099A9F62AA87D9670745AbA741746',
      STONE: '0xEc901DA9c68E90798BbBb74c11406A32A70652C3',
      wUSDM: '0xbdAd407F77f44F7Da6684B416b1951ECa461FB07',
      MANTA: '0x95CeF13441Be50d20cA4558CC0a27B601aC544E5',
      USDC: '0xb73603C5d87fA094B7314C74ACE2e64D165016fb',
      WEBMI: '0x19585009Ce333efCC4a383c28B27A0Eb2e8497Ea',

      'P WETH-STONE': '0xC69Aa5d11B9B3B8Af0699603F4B8779a1eF200a3',
      'P wUSDM-STONE': '0x4D6EA621A4Ce8f85b627f6Ca0D036E01ac8a4dDB',
      'P WETH-MANTA': '0xD500D8f7481bfb24A8E260E698Ee4911C6CD48E1',
      'P WETH-USDC': '0x08F4539f91faA96b34323c11C9B00123bA19eef3',
      'A WETH-WEBMI': '0x5b7F97545584E67C077C2b051E3c5CFfA67379D5'
    },
    proxyAddress: '0x1cc4eE0cB063e9db36E51F5d67218ff1f8dbfA0f'
  }
};

export default { basic, networks };
