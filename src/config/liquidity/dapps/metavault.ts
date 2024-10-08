const basic = {
  name: 'Metavault',
  icon: '/assets/images/metavault.png',
  dappSrc: 'bluebiu.near/widget/Liquidity.METAVAULT',
  amountOutFn: 'bluebiu.near/widget/Liquidity.METAVAULT',
  ICON_VAULT_MAP: {
    ETH: 'https://res.cloudinary.com/metavault/image/upload/q_100/v1/website-assets/coins/eth?_a=BATAV5AA0',
    'USDC.e': 'https://res.cloudinary.com/metavault/image/upload/q_100/v1/website-assets/coins/usdc.e?_a=BATAV5AA0'
  }
};
const networks = {
  // Linea
  59144: {
    storeAddress: '0xb514Ee8a1e00B102cE2312048abcbc3E57bfED94',
    defaultPair: 'ETH',
    pairs: [
      {
        id: 'ETH',
        strategy: 'Dynamic',
        strategy2: '',
        token: 'ETH',
        decimals: 18
      },
      {
        id: 'USDC.e',
        strategy: 'Dynamic',
        strategy2: '',
        token: 'USDC.e',
        decimals: 6
      }
    ],
    addresses: {
      ETH: '0x0000000000000000000000000000000000000000',
      'USDC.e': '0x176211869ca2b568f2a7d4ee941e073a821ee1ff'
    }
  }
};

export default { basic, networks };
