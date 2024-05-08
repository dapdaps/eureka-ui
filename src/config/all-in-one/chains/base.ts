export default {
  title: 'Base',
  path: 'base',
  icon: 'https://assets.dapdap.net/images/bafkreientyvw2l6v2jvtcq5pptg5xftj2dyobnk3yaykbu5mb6tpomzc3q.svg',
  bgColor: '#0038FF',
  bgIcon: '/images/chains/base_white.svg',
  selectBgColor: '#0038FF',
  chainId: 8453,
  rpcUrls: ['https://developer-access-mainnet.base.org'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Base.Bridge',
      description: 'Trade by best price on Base',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Base.BaseDex',
      description: 'Trade by best price on Base',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Base.Lending',
      description: 'Trade by best price on Base',
    },
  },
};
