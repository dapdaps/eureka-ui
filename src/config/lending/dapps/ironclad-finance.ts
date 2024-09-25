import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'Ironclad Finance',
  icon: 'https://s3.amazonaws.com/dapdap.main/images/ironclad.png',
  data: 'bluebiu.near/widget/Lending.Data.Ironclad',
  handler: 'bluebiu.near/widget/Lending.Handler.IronClad',
  // handlerClaim: 'bluebiu.near/widget/Arbitrum.Lending.RadiantClaimHandler',
  type: 'aave2',
  loaderName: 'IroncladFinance'
};

const networks = {
  34443: {
    oracleAddress: '0xE4F4F36FcBb2D53c0bAB95F5D117489579553CaA', // Oracle
    poolAddressProvider: '0xEDc83309549e36f3c7FD8c2C5C54B4c8e5FA00FC', // Provider
    aaveProtocolDataProviderAddress: '0x29563f73De731Ae555093deb795ba4D1E584e42E', //Protocol Data Provider
    lendingPoolAddress: '0xB702cE183b4E1Faa574834715E5D4a6378D0eEd3', //Lending Pool
    wethGateway: '0x6387c7193B5563DD17d659b9398ACd7b03FF0080', //WETH Gateway
    // walletBalanceProvider: '',
    // incentiveController: '',
    markets: {
      [mode['weth'].address]: {
        decimals: 18,
        symbol: 'ironETH',
        address: '0x9c29a8eC901DBec4fFf165cD57D4f9E03D4838f7', //atoken
        underlyingToken: mode['eth'],
        stableDebtTokenAddress: '0x6f66C5C5e2FF94929582EaBfc19051F19ed9EB70',
        variableDebtTokenAddress: '0x06D38c309d1dC541a23b0025B35d163c25754288'
      },
      [mode['wrseth'].address]: {
        decimals: 18,
        symbol: 'ironWrsETH',
        address: '0xe3f709397e87032E61f4248f53Ee5c9a9aBb6440', //atoken
        underlyingToken: mode['wrseth'],
        stableDebtTokenAddress: '0x383995FD2E86a2e067Ffb31674aa0d1B370B39bD',
        variableDebtTokenAddress: '0x083E519E76fe7e68C15A6163279eAAf87E2addAE'
      },
      [mode['usdt'].address]: {
        decimals: 6,
        symbol: 'ironUSDT',
        address: '0x02CD18c03b5b3f250d2B29C87949CDAB4Ee11488', //atoken
        underlyingToken: mode['usdt'],
        stableDebtTokenAddress: '0x73C177510cb7b5c6a7C770376Fc6EBD29eF9e1A7',
        variableDebtTokenAddress: '0xBcE07537DF8AD5519C1d65e902e10aA48AF83d88'
      },
      [mode['usdc'].address]: {
        decimals: 6,
        symbol: 'ironUSDC',
        address: '0xe7334Ad0e325139329E747cF2Fc24538dD564987', //atoken
        underlyingToken: mode['usdc'],
        stableDebtTokenAddress: '0xC40709470139657E6D80249c5cC998eFb44898C9',
        variableDebtTokenAddress: '0xe5415Fa763489C813694D7A79d133F0A7363310C'
      },
      [mode['mode'].address]: {
        decimals: 18,
        symbol: 'ironMODE',
        address: '0x0F4f2805a6d15dC534d43635314444181A0e82CD', //atoken
        underlyingToken: mode['mode'],
        stableDebtTokenAddress: '0x2E714eB72cD8f709993B9fAF4347E1072ab17c8A',
        variableDebtTokenAddress: '0xe57Bf381Fc0a7C5e6c2A3A38Cc09de37b29CC4C3'
      }
    }
    // rewardToken: arbitrum['rdnt'],
  }
};

export default { basic, networks };
