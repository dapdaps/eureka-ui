import { linea } from '@/config/tokens/linea';

const BORROW_TOKEN = 'LYU';
const BORROW_URL = '/assets/tokens/lyu.png';

const MIN_DEBT = 1000;
const ONE_TIME_FEE = 1;
const Liquidation_Reserve = 15;
const _upperHint = '0x5a23bcc42da0129fcf1274428e44fd9e0af8e789';
const _lowerHint = '0xad5d9b9e062555ef621fbed3c8bd86e618f2f0d3';

const basic = {
  name: 'Lyve',
  data: 'bluebiu.near/widget/Lending.Data.Lyve',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'liquity',
  BORROW_TOKEN,
  BORROW_URL
};

const networks = {
  // Linea
  59144: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0x55C42B42661c77809E31f2D06Db1637De8CF7979',
    borrowTokenAddress: '0xb20116ee399f15647bb1eef9a74f6ef3b58bc951', //LYU
    BorrowerOperations: '0xaa098708068b836d52833e656597c1a0dd2bb654',
    VesselManager: '0xd742abb760aac756a7253cc2d58c80450c729b63',
    VesselManagerOperations: '0xAC67A80B0099C55fB17275A9795F66E070F27dC4',
    markets: {
      [linea['wsteth'].address]: {
        decimals: 18,
        underlyingToken: linea['wsteth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.91,
        ONE_TIME_FEE,
        MIN_DEBT,
        MINTED_CAP: 1000000,
        Liquidation_Reserve,
        _upperHint,
        _lowerHint
      },
      [linea['weth'].address]: {
        decimals: 18,
        underlyingToken: linea['weth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.91,
        ONE_TIME_FEE,
        MIN_DEBT,
        MINTED_CAP: 1000000,
        Liquidation_Reserve,
        _upperHint,
        _lowerHint
      },
      [linea['weeth'].address]: {
        decimals: 18,
        underlyingToken: linea['weeth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.91,
        ONE_TIME_FEE,
        MIN_DEBT,
        MINTED_CAP: 1000000,
        Liquidation_Reserve,
        _upperHint,
        _lowerHint
      }
    }
  }
};

export default { basic, networks };
