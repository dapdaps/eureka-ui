import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'Ionic',
  data: 'bluebiu.near/widget/Lending.Data.LayerBank',
  handler: 'bluebiu.near/widget/Lending.Handler.LayerBank',
  handlerClaim: 'bluebiu.near/widget/Linea.Lending.LayerBankHandlerClaim',
};

const networks = {
  34443: {
    unitrollerAddress: '0x80980869D90A737aff47aBA6FbaA923012C1FF50',
    oracleAddress: '0x310E183416d7f266C150e7244733d1DcB1470172',
    rateModelSlopeAddress: '0x16Cd8DAcE8569c7bd4e903c864444367b9F7b1af',
    // distributionAddress: '',
    defaultMarket: '',
    markets: {
      // '0xe855B8018C22A05F84724e93693caf166912aDD5': {
      //   decimals: 18,
      //   symbol: 'lETH',
      //   address: '0xe855B8018C22A05F84724e93693caf166912aDD5',
      //   underlyingToken: mode['eth'],
      // },
      // '0xd97905cC56030a6E9b618d6e26Cc9Ee2eAA15948': {
      //   decimals: 18,
      //   symbol: 'lezETH',
      //   address: '0xd97905cC56030a6E9b618d6e26Cc9Ee2eAA15948',
      //   underlyingToken: mode['ezeth'],
      // },
      // '0x66a5e18E36bfeA86074A047954fEC7c94ced366E': {
      //   decimals: 18,
      //   symbol: 'lwrsETH',
      //   address: '0x66a5e18E36bfeA86074A047954fEC7c94ced366E',
      //   underlyingToken: mode['wrseth'],
      // },
      // '0xBa6e89c9cDa3d72B7D8D5B05547a29f9BdBDBaec': {
      //   decimals: 18,
      //   symbol: 'lUSDC',
      //   address: '0xBa6e89c9cDa3d72B7D8D5B05547a29f9BdBDBaec',
      //   underlyingToken: mode['usdc'],
      // },
      '0x94812F2eEa03A49869f95e1b5868C6f3206ee3D3': {
        decimals: 6,
        symbol: 'ionUSDT',
        address: '0x94812F2eEa03A49869f95e1b5868C6f3206ee3D3', // cToken
        underlyingToken: mode['usdt'],
      },
    },
    rewardToken: mode['lab'],
  },
};

export default { basic, networks };
