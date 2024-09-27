import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'Mute',
  logo: '/assets/apps/mute.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.AmountOut'
};
const networks = {
  324: {
    defaultCurrencies: {
      input: zkSync['eth'],
      output: zkSync['usdc']
    },
    tokens: [zkSync['eth'], zkSync['usdc'], zkSync['wbtc'], zkSync['space'], zkSync['usdt'], zkSync['cebusd']]
  }
};

export { basic, networks };
