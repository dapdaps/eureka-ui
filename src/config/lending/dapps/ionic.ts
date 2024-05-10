import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'Ionic',
  data: 'bluebiu.near/widget/Lending.Data.Ionic',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  // handlerClaim: 'bluebiu.near/widget/Linea.Lending.LayerBankHandlerClaim',
};

const networks = {
  34443: {
    unitrollerAddress: '0x8b2B6a9dC8Cd73309Cef8d64920831d4C73F43a7',
    oracleAddress: '0x2BAF3A2B667A5027a83101d218A9e8B73577F117',
    rateModelSlopeAddress: '0x21a455cEd9C79BC523D4E340c2B97521F4217817',
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
    // rewardToken: mode['lab'],
  },
};

export default { basic, networks };
