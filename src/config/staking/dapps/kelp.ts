import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Kelp',
  data: 'bluebiu.near/widget/Staking.Kelp.Data',
};

const networks = {
  // Linea
  59144: {
    DepositPool: '0x057297e44a3364139edcf3e1594d6917ed7688c2',
    StakeTokens: [
      {
        ...linea['eth'],
      },
      // {
      //   ...linea['weth'],
      // },
    ],
    ExchangeToken: {
      ...linea['wrseth'],
    },
  },
  1: {
    //TODO
    DepositPool: '0x036676389e48133B63a802f8635AD39E752D375D',
    StakeTokens: [
      {
        ...linea['eth'],
      },
      // {
      //   ...linea['weth'],
      // },
    ],
    ExchangeToken: {
      ...linea['wrseth'],
    },
  },
};

export default { basic, networks };
