import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Camelot',
  logo: '/images/apps/camelot.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};

const networks = {
  42161: {
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['grail']
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['weth'],
      arbitrum['usdy'],
      arbitrum['pendle'],
      arbitrum['wstLINK'],
      arbitrum['link'],
      arbitrum['jones dao'],
      arbitrum['sfund'],
      arbitrum['syk'],
      arbitrum['arb'],
      arbitrum['usdc.e'],
      arbitrum['mim'],
      arbitrum['grail'],
      arbitrum['usdt'],
      arbitrum['wst-eth'],
      arbitrum['usdc'],
      arbitrum['fctr'],
      arbitrum['winr'],
      arbitrum['gmx'],
      arbitrum['trove'],
      arbitrum['usde'],
      arbitrum['d2'],
      arbitrum['xd2'],
      arbitrum['wbtc'],
      arbitrum['we-eth'],
      arbitrum['ezeth'],
      arbitrum['gUSDC'],
      arbitrum['PNP'],
      arbitrum['PREMIA'],
      arbitrum['GNS'],
      arbitrum['rseth'],
      arbitrum['sol'],
      arbitrum['peas'],
      arbitrum['dmt'],
      arbitrum['XAI'],
      arbitrum['USDs'],
      arbitrum['zro'],
      arbitrum['dai'],
      arbitrum['PRY'],
      arbitrum['APEX'],
      arbitrum['Bonsai'],
      arbitrum['RDPX'],
      arbitrum['ETHFI'],
      arbitrum['uniETH'],
      arbitrum['GG'],
      arbitrum['RDP'],
      arbitrum['MOZ'],
      arbitrum['MOON'],
      arbitrum['AURY'],
      arbitrum['FLY'],
      arbitrum['flrEUR'],
      arbitrum['ECLIP']
    ]
  }
};

export { basic, networks };
