import { linea } from '@/config/tokens/linea';

const BORROW_TOKEN = 'LYU';
const BORROW_URL = 'https://ipfs.near.social/ipfs/bafkreigeatxpoa3mn2dbhgmbhltia2wqonqsaesafvyhxsugeiyno2rryi';

const MIN_DEBT = 1000;
const ONE_TIME_FEE = 1;

const basic = {
  name: 'Lyve',
  data: 'bluebiu.near/widget/Lending.Data.Lyve',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'liquity',
  BORROW_TOKEN,
  BORROW_URL,
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
      },
    },
  },
};

export default { basic, networks };
