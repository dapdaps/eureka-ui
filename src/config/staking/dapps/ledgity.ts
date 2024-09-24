import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Ledgity',
  data: 'bluebiu.near/widget/Staking.Ledgity.Data'
};

const networks = {
  // Linea
  59144: {
    DepositPool: '0x4AF215DbE27fc030F37f73109B85F421FAB45B7a', //LUSDC
    WithdrawalContract: '0x4AF215DbE27fc030F37f73109B85F421FAB45B7a', //LUSDC
    StakeTokens: [
      {
        ...linea['usdc']
      }
    ],
    ExchangeToken: {
      ...linea['lusdc']
    }
  }
};

export default { basic, networks };
