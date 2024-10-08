const basic = {
  name: 'arrakis-finance',
  icon: '/assets/images/096-arrakis.png',
  dappSrc: 'bluebiu.near/widget/Liquidity.ARRAKIS',
  amountOutFn: 'bluebiu.near/widget/Liquidity.ARRAKIS',
  ICON_VAULT_MAP: {
    THALES: 'https://assets.dex.guru/icons/0x217d47011b23bb961eb6d93ca9945b7501a5bb11-optimism.png',
    WETH: 'https://assets.dex.guru/icons/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth.png',
    HAN: 'https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg',
    OP: 'https://assets.dex.guru/icons/0x4200000000000000000000000000000000000042-optimism.png',
    LYRA: 'https://assets.dex.guru/icons/0x50c5725949a6f0c72e6c4a641f24049a917db0cb-optimism.png'
  }
};
const networks = {
  // op
  10: {
    ALL_DATA_URL:
      'https://indexer.api.arrakis.finance/api/vault/all?version=V1&networks=optimism&sortDirection=desc&sort=tvl',
    pairs: [
      {
        id: 'B THALES-WETH',
        strategy: 'Dynamic',
        strategy2: 'Balanced',
        token0: 'THALES',
        token1: 'WETH',
        decimals0: 18,
        decimals1: 18
      },
      {
        id: 'B WETH-HAN',
        strategy: 'Dynamic',
        strategy2: 'Balanced',
        token0: 'WETH',
        token1: 'HAN',
        decimals0: 18,
        decimals1: 18
      },
      {
        id: 'B WETH-OP',
        strategy: 'Dynamic',
        strategy2: 'Balanced',
        token0: 'WETH',
        token1: 'OP',
        decimals0: 18,
        decimals1: 18
      },
      {
        id: 'B WETH-LYRA',
        strategy: 'Dynamic',
        strategy2: 'Balanced',
        token0: 'WETH',
        token1: 'LYRA',
        decimals0: 18,
        decimals1: 18
      }
    ],
    addresses: {
      THALES: '0x217d47011b23bb961eb6d93ca9945b7501a5bb11',
      WETH: '0x4200000000000000000000000000000000000006',
      HAN: '0x50bce64397c75488465253c0a034b8097fea6578',
      OP: '0x4200000000000000000000000000000000000042',
      LYRA: '0x50c5725949a6f0c72e6c4a641f24049a917db0cb',

      'B THALES-WETH': '0xac6705BC7f6a35eb194bdB89066049D6f1B0B1b5',
      'B WETH-HAN': '0x3fa8CEE6795220Ac25DD35D4d39ec306a3e4fb3f',
      'B WETH-OP': '0xD1DCE56F7D8300D43d8b7d3b67650ddF9b2CAF54',
      'B WETH-LYRA': '0x70535C46ce04181adf749f34B65B6365164d6B6E'
    }
  }
};

export default { basic, networks };
