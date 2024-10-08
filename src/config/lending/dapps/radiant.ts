import { arbitrum } from '@/config/tokens/arbitrum';
import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Radiant',
  icon: '/assets/dapps/radiant.png',
  data: 'bluebiu.near/widget/Lending.Data.Radiant',
  handler: 'bluebiu.near/widget/Lending.Handler.Radiant',
  handlerClaim: 'bluebiu.near/widget/Arbitrum.Lending.RadiantClaimHandler',
  type: 'aave2',
  loaderName: 'Radiant'
};

const networks = {
  42161: {
    oracleAddress: '0xC0cE5De939aaD880b0bdDcf9aB5750a53EDa454b',
    poolAddressProvider: '0x091d52CacE1edc5527C99cDCFA6937C1635330E4',
    walletBalanceProvider: '0xE36D523Ad4feBAa09B9Bc043999252f96375C621',
    aaveProtocolDataProviderAddress: '0x596B0cc4c5094507C50b579a662FE7e7b094A2cC',
    lendingPoolAddress: '0xF4B1486DD74D07706052A33d31d7c0AAFD0659E1',
    wethGateway: '0xBb5cA40b2F7aF3B1ff5dbce0E9cC78F8BFa817CE',
    incentiveController: '0xebC85d44cefb1293707b11f707bd3CEc34B4D5fA',
    wethAddress: arbitrum['weth'].address,
    markets: {
      [arbitrum['dai'].address]: {
        decimals: 18,
        symbol: 'rDAI',
        address: '0x0D914606f3424804FA1BbBE56CCC3416733acEC6',
        underlyingToken: arbitrum['dai'],
        stableDebtTokenAddress: '0xd085657Fc2e2046463e9c918A30D5F29114E7958',
        variableDebtTokenAddress: '0x04A8fAEd05C97290Ab4d793A971AdEe97cD1cBbD'
      },
      [arbitrum['wst-eth'].address]: {
        decimals: 18,
        symbol: 'rWSTETH',
        address: '0x42C248D137512907048021B30d9dA17f48B5b7B2',
        underlyingToken: arbitrum['wst-eth'],
        stableDebtTokenAddress: '0xc8598d86D4F829CaB345F619e5db12042DD5f73E',
        variableDebtTokenAddress: '0x97B81aA985115953Ba31D59781e2D8159A50F488'
      },
      [arbitrum['arb'].address]: {
        decimals: 18,
        symbol: 'rARB',
        address: '0x2dADe5b7df9DA3a7e1c9748d169Cd6dFf77e3d01',
        underlyingToken: arbitrum['arb'],
        stableDebtTokenAddress: '0xbf0D23Fb0B471415f0b332780e69A0c019399a34',
        variableDebtTokenAddress: '0x295b97012945bD4a1A79ec7f679e16761a437e5C'
      },
      [arbitrum['usdc.e'].address]: {
        decimals: 18,
        symbol: 'rUSDC',
        address: '0x48a29E756CC1C097388f3B2f3b570ED270423b3d',
        underlyingToken: arbitrum['usdc.e'],
        stableDebtTokenAddress: '0x21F01f6bc5F6D8Fa2dcF67b9Ff2C163211874951',
        variableDebtTokenAddress: '0x107583ADAA37Dfd1CC0bf577183Bf91351d07413'
      },
      [arbitrum['usdt'].address]: {
        decimals: 18,
        symbol: 'rUSDT',
        address: '0xd69D402D1bDB9A2b8c3d88D98b9CEaf9e4Cd72d9',
        underlyingToken: arbitrum['usdt'],
        stableDebtTokenAddress: '0xC6277B25076770dd408979346b81d0373E9bba5a',
        variableDebtTokenAddress: '0x7C2E0F792ea5B4a4Dbd7fA7f949CF39A5c0ba185'
      },
      [arbitrum['weth'].address]: {
        decimals: 18,
        symbol: 'rWETH',
        address: '0x0dF5dfd95966753f01cb80E76dc20EA958238C46',
        underlyingToken: arbitrum['eth'],
        stableDebtTokenAddress: '0xfe91B5A00506944ae9D09Fd6249eA0363CD88809',
        variableDebtTokenAddress: '0xab04c0841f39596C9F18A981a2BD32F63AB7a817'
      },
      [arbitrum['wbtc'].address]: {
        decimals: 18,
        symbol: 'rWBTC',
        address: '0x727354712BDFcd8596a3852Fd2065b3C34F4F770',
        underlyingToken: arbitrum['wbtc'],
        stableDebtTokenAddress: '0x9Ee73b7dD519F89168592ef97b29C97d844bEFb0',
        variableDebtTokenAddress: '0x3EEaFa33625DF20837eD0Cb83Ae4D1E34788b141'
      }
    },
    rewardToken: arbitrum['rdnt']
  },
  56: {
    oracleAddress: '0x0BB5c1Bc173b207cBf47CDf013617087776F3782',
    poolAddressProvider: '0x63764769dA006395515c3f8afF9c91A809eF6607',
    walletBalanceProvider: '0xa04a72E1D93a327d54262E5D1Ccba99de6b8891B',
    aaveProtocolDataProviderAddress: '0x2f9D57E97C3DFED8676e605BC504a48E0c5917E9',
    lendingPoolAddress: '0xd50Cf00b6e600Dd036Ba8eF475677d816d6c4281',
    wethGateway: '0x8a226b70dcEB9656Eb75545424400128fCEF9d9e',
    incentiveController: '0x7C16aBb090d3FB266E9d17F60174B632f4229933',
    wethAddress: bsc['wbnb'].address,
    markets: {
      [bsc['btcb'].address]: {
        decimals: 18,
        symbol: 'rBTCB',
        address: '0x34d4F4459c1b529BEbE1c426F1e584151BE2C1e5',
        underlyingToken: bsc['btcb'],
        stableDebtTokenAddress: '0x10db119731a6AF08C3BB4207F2ee04E256Ab9085',
        variableDebtTokenAddress: '0x3c84437794A5515150982A6F69DE5b3e017004a1'
      },
      [bsc['wbnb'].address]: {
        decimals: 18,
        symbol: 'rWBNB',
        address: '0x58b0BB56CFDfc5192989461dD43568bcfB2797Db',
        underlyingToken: bsc['bnb'],
        stableDebtTokenAddress: '0x1e64705ee26ef366C1C9EB7C087351b4FC5c8509',
        variableDebtTokenAddress: '0xCbB96324f77a66e276f80B843ECdB3fADC551bfF'
      },
      [bsc['busd'].address]: {
        decimals: 18,
        symbol: 'rBUSD',
        address: '0x89d763e8532D256a3e3e60c1C218Ac71E71cF664',
        underlyingToken: bsc['busd'],
        stableDebtTokenAddress: '0x85132Fb9F670E582ba65e7873B3879e804270c89',
        variableDebtTokenAddress: '0x8D3308e14A48f0681CeA94D7C6995Ec73b3973f1'
      },
      [bsc['usdt'].address]: {
        decimals: 18,
        symbol: 'rUSDT',
        address: '0x4Ff2DD7c6435789E0BB56B0553142Ad00878a004',
        underlyingToken: bsc['usdt'],
        stableDebtTokenAddress: '0xBfb720ed33EAAc7ed5A6B4D3e002A28166523E35',
        variableDebtTokenAddress: '0x437F3dF56eCeE512E407b6eC368523C911D4A283'
      },
      [bsc['usdc'].address]: {
        decimals: 18,
        symbol: 'rUSDC',
        address: '0x3bDCEf9e656fD9D03eA98605946b4fbF362C342b',
        underlyingToken: bsc['usdc'],
        stableDebtTokenAddress: '0xB6b0C18FA6Cc0F0332843DF95dc4750f68EAf7B2',
        variableDebtTokenAddress: '0x81FdA3BE7F3Ca6aCDAe20a8d2B4Ce54B78d70ED0'
      },
      [bsc['eth'].address]: {
        decimals: 18,
        symbol: 'rWETH',
        address: '0x455a281D508B4e34d55b31AC2e4579BD9b77cA8E',
        underlyingToken: bsc['eth'],
        stableDebtTokenAddress: '0x0D9a266047eCC79442c99A588874d4240bf34FC4',
        variableDebtTokenAddress: '0xDCB45a8aA72854e06C826B16Fd5038f33E2CB4b0'
      }
    },
    rewardToken: bsc['rdnt']
  }
};

export default { basic, networks };
