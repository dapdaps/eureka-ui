import { blast } from '@/config/tokens/blast';
const basic = {
  name: 'Thruster Finance',
  logo: '/images/apps/thruster-finance.png',
  amountOutFn: 'bluebiu.near/widget/Swap.Data.ThrusterFinance',
};
const networks = {
  81457: {
    routerAddress: '0x337827814155ECBf24D20231fCA4444F530C0555',
    defaultCurrencies: {
      input: blast['eth'],
      output: blast['usdb'],
    },
    tokens: [
      blast['eth'],
      blast['usdb'],
      blast['weth'],
      blast['yes'],
      blast['ezeth'],
      blast['mwstETH-WPUNKS:20'],
      blast['mwstETH-WPUNKS:40'],
      blast['wrseth'],
      blast['orbit'],
      blast['axlusdc'],
      blast['juice'],
      blast['yield'],
      blast['$wai'],
      blast['ole'],
      blast['andy'],
    ],
  },
};

export { basic, networks };
