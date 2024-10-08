const basic = {
  name: 'SteakHut',
  icon: '/assets/images/087-steakhut.png',
  dappSrc: 'bluebiu.near/widget/Liquidity.STEAKHUT',
  amountOutFn: 'bluebiu.near/widget/Liquidity.STEAKHUT',
  ICON_VAULT_MAP: {
    CAI: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x48f88A3fE843ccb0b5003e70B4192c1d7448bEf0/logo.png',
    AVAX: 'https://old.steakhut.finance/avalancheIcon.svg',
    USDC: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xB6076C93701D6a07266c31066B298AeC6dd65c2d/logo.png',
    JOE: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd/logo.png',
    MONEY:
      'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x0f577433Bf59560Ef2a79c124E9Ff99fCa258948/logo.png',
    GMX: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x62edc0692BD897D2295872a9FFCac5425011c661/logo.png',
    USDT: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xAb231A5744C8E6c45481754928cCfFFFD4aa0732/logo.png',
    'WETH.e':
      'https://github.com/traderjoe-xyz/joe-tokenlists/blob/main/logos/0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB/logo.png?raw=true',
    'USDC.e':
      'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xB6076C93701D6a07266c31066B298AeC6dd65c2d/logo.png',
    'BTC.b':
      'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x152b9d0FdC40C096757F570A51E494bd4b943E50/logo.png',
    'USDT.e':
      'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xAb231A5744C8E6c45481754928cCfFFFD4aa0732/logo.png'
  }
};
const networks = {
  // avalanche
  43114: {
    ALL_DATA_URL: 'https://api.thegraph.com/subgraphs/name/0xsirloin/steakhutlb',
    defaultPair: 'B CAI-AVAX',
    pairs: [
      {
        id: 'B CAI-AVAX',
        strategy: 'Dynamic',
        strategy2: 'Balanced',
        token0: 'CAI',
        token1: 'AVAX',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0xffe588ac8d94c758afac5c50a4b4bf4bc1887ffd'
      },
      {
        id: 'BW AVAX-USDC',
        strategy: 'Dynamic',
        strategy2: 'Balanced-Wide',
        token0: 'AVAX',
        token1: 'USDC',
        decimals0: 18,
        decimals1: 6,
        poolAddress: '0xdf35f3a364079fd49d71253a4d858889de484f4a'
      },
      {
        id: 'B JOE-AVAX',
        strategy: 'Dynamic',
        strategy2: 'BALANCED',
        token0: 'JOE',
        token1: 'AVAX',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x89547441489262feb5cee346fdacb9037c2574db'
      },
      {
        id: 'B MONEY-AVAX',
        strategy: 'Dynamic',
        strategy2: 'V2.1-BALANCED',
        token0: 'MONEY',
        token1: 'AVAX',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x2d8d49fb07a43ceb793f3bc46af1c81c96e31a0e'
      },
      {
        id: 'B GMX-AVAX',
        strategy: 'Dynamic',
        strategy2: 'BALANCED',
        token0: 'GMX',
        token1: 'AVAX',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x9bdda0c0cd56d98a8165fddabdeb7f9aee2d993e'
      },
      {
        id: 'B WETH.e-AVAX',
        strategy: 'Dynamic',
        strategy2: 'BALANCED',
        token0: 'WETH.e',
        token1: 'AVAX',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x9c9cea14731821f4d08889717043977e6dee766a'
      },
      {
        id: 'B USDC.e-USDC',
        strategy: 'Dynamic',
        strategy2: 'BALANCED',
        token0: 'USDC.e',
        token1: 'USDC',
        decimals0: 6,
        decimals1: 6,
        poolAddress: '0x3b27aee8df3a3791eb57b59a770a530a93dc0221'
      },
      {
        id: 'B BTC.b-AVAX',
        strategy: 'Dynamic',
        strategy2: 'BALANCED',
        token0: 'BTC.b',
        token1: 'AVAX',
        decimals0: 8,
        decimals1: 18,
        poolAddress: '0x536d7e7423e8fb799549caf574cfa12aae95ffcd'
      },
      {
        id: 'B USDT.e-USDT',
        strategy: 'Dynamic',
        strategy2: 'BALANCED',
        token0: 'USDT.e',
        token1: 'USDT',
        decimals0: 6,
        decimals1: 6,
        poolAddress: '0x07462883abb2350e5243b94aeb27f4d37e3238e8'
      }
    ],
    addresses: {
      CAI: '0x48f88A3fE843ccb0b5003e70B4192c1d7448bEf0',
      AVAX: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      USDC: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
      JOE: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd',
      MONEY: '0x0f577433bf59560ef2a79c124e9ff99fca258948',
      GMX: '0x62edc0692bd897d2295872a9ffcac5425011c661',
      USDT: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
      'WETH.e': '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
      'USDC.e': '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
      'BTC.b': '0x152b9d0fdc40c096757f570a51e494bd4b943e50',
      'USDT.e': '0xc7198437980c041c805a1edcba50c1ce5db95118'
    },
    proxyAddress: '0xddbfbd5dc3ba0feb96cb513b689966b2176d4c09'
  }
};

export default { basic, networks };
