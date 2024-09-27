import { gnosis } from '@/config/tokens/gnosis';

const basic = {
  name: 'Elk',
  logo: '/assets/dapps/elk.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  100: {
    defaultCurrencies: {
      input: gnosis['wxdai'],
      output: gnosis['usdc']
    },
    tokens: [
      gnosis['wxdai'],
      gnosis['usdc'],
      gnosis['usdt'],
      gnosis['wbtc'],
      gnosis['dai'],
      gnosis['gno'],
      gnosis['elk']
    ]
  }
};

export { basic, networks };
