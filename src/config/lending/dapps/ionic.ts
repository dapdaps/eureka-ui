import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'Ionic',
  icon: 'https://s3.amazonaws.com/dapdap.main/images/ionic.png',
  data: 'bluebiu.near/widget/Lending.Data.Ionic',
  handler: 'bluebiu.near/widget/Lending.Handler.Ionic',
  // handlerClaim: 'bluebiu.near/widget/Linea.Lending.LayerBankHandlerClaim',
  loaderName: 'Ionic'
};

const networks = {
  34443: {
    unitrollerAddress: '0x8b2B6a9dC8Cd73309Cef8d64920831d4C73F43a7',
    oracleAddress: '0x2BAF3A2B667A5027a83101d218A9e8B73577F117',
    rateModelSlopeAddress: '0x21a455cEd9C79BC523D4E340c2B97521F4217817',
    collateralAddress: '0xFB3323E24743Caf4ADD0fDCCFB268565c0685556',
    // distributionAddress: '',
    defaultMarket: '',
    markets: {
      '0x71ef7EDa2Be775E5A7aa8afD02C45F059833e9d2': {
        decimals: 18,
        symbol: 'ionWETH',
        address: '0x71ef7EDa2Be775E5A7aa8afD02C45F059833e9d2', // cToken
        loanToValue: 74,
        COLLATERAL_FACTOR: 0.825,
        underlyingToken: mode['weth']
      },
      '0x49950319aBE7CE5c3A6C90698381b45989C99b46': {
        decimals: 18,
        symbol: 'ionwrsETH',
        address: '0x49950319aBE7CE5c3A6C90698381b45989C99b46', // cToken
        loanToValue: 63,
        COLLATERAL_FACTOR: 0.7,
        underlyingToken: mode['wrseth']
      },
      '0x59e710215d45F584f44c0FEe83DA6d43D762D857': {
        decimals: 18,
        symbol: 'ionezETH',
        address: '0x59e710215d45F584f44c0FEe83DA6d43D762D857', // cToken
        loanToValue: 63,
        COLLATERAL_FACTOR: 0.7,
        underlyingToken: mode['ezeth']
      },
      '0xA0D844742B4abbbc43d8931a6Edb00C56325aA18': {
        decimals: 18,
        symbol: 'ionweETH.mode',
        address: '0xA0D844742B4abbbc43d8931a6Edb00C56325aA18', // cToken
        loanToValue: 63,
        COLLATERAL_FACTOR: 0.7,
        underlyingToken: mode['we-eth.mode']
      },
      '0x94812F2eEa03A49869f95e1b5868C6f3206ee3D3': {
        decimals: 6,
        symbol: 'ionUSDT',
        address: '0x94812F2eEa03A49869f95e1b5868C6f3206ee3D3', // cToken
        loanToValue: 80,
        COLLATERAL_FACTOR: 0.9,
        underlyingToken: mode['usdt']
      },
      '0x2BE717340023C9e14C1Bb12cb3ecBcfd3c3fB038': {
        decimals: 6,
        symbol: 'ionUSDC',
        address: '0x2BE717340023C9e14C1Bb12cb3ecBcfd3c3fB038', // cToken
        loanToValue: 80,
        COLLATERAL_FACTOR: 0.9,
        underlyingToken: mode['usdc']
      },
      '0xd70254C3baD29504789714A7c69d60Ec1127375C': {
        decimals: 8,
        symbol: 'ionWBTC',
        address: '0xd70254C3baD29504789714A7c69d60Ec1127375C', // cToken
        loanToValue: 74,
        COLLATERAL_FACTOR: 0.825,
        underlyingToken: mode['wbtc']
      },
      '0x959FA710CCBb22c7Ce1e59Da82A247e686629310': {
        decimals: 18,
        symbol: 'ionSTONE',
        address: '0x959FA710CCBb22c7Ce1e59Da82A247e686629310', // cToken
        loanToValue: 63,
        COLLATERAL_FACTOR: 0.7,
        underlyingToken: mode['stone']
      },
      '0x9a9072302B775FfBd3Db79a7766E75Cf82bcaC0A': {
        decimals: 18,
        symbol: 'ionweETH (OLD)',
        address: '0x9a9072302B775FfBd3Db79a7766E75Cf82bcaC0A', // cToken
        loanToValue: 63,
        COLLATERAL_FACTOR: 0.7,
        underlyingToken: mode['we-eth']
      },
      '0x19F245782b1258cf3e11Eda25784A378cC18c108': {
        decimals: 18,
        symbol: 'ionM-BTC',
        address: '0x19F245782b1258cf3e11Eda25784A378cC18c108', // cToken
        loanToValue: 74,
        COLLATERAL_FACTOR: 0.64,
        underlyingToken: mode['m-btc']
      }
    }
    // rewardToken: mode['lab'],
  }
};

export default { basic, networks };
