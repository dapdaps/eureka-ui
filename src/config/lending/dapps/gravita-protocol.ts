import { arbitrum } from '@/config/tokens/arbitrum';
import { linea } from '@/config/tokens/linea';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';
import { zkSync } from '@/config/tokens/zkSync';

const BORROW_TOKEN = 'GRAI';
const BORROW_URL = '/assets/tokens/grai.svg';

const MIN_DEBT = 200;
const _upperHint = '0x544f96434f77437425d5aC40fd4755C0cf39399A';
const _lowerHint = '0xA1B7bbade134DB3B14B56056480e81c60Ab77377';

const basic = {
  name: 'Gravita Protocol',
  // icon: '/assets/dapps/granary.png',
  data: 'bluebiu.near/widget/Lending.Data.Liquity',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'liquity',
  BORROW_TOKEN,
  BORROW_URL
};

const networks = {
  //  arb
  42161: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0x0a3137E103a8F268Fa065f6d5922ed6173B7BDFA',
    borrowTokenAddress: '0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487',
    BorrowerOperations: '0x89F1ecCF2644902344db02788A790551Bb070351',
    VesselManager: '0x6AdAA3eBa85c77e8566b73AEfb4C2f39Df4046Ca',
    VesselManagerOperations: '0x15f74458aE0bFdAA1a96CA1aa779D715Cc1Eefe4',
    markets: {
      [arbitrum['reth'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['reth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.85,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 993251,
        MINTED_CAP: 2000000,
        _upperHint,
        _lowerHint
      },
      [arbitrum['weth'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['weth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.9,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 327697,
        MINTED_CAP: 500000,
        _upperHint,
        _lowerHint
      },
      [arbitrum['wst-eth'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['wst-eth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.85,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 2380000,
        MINTED_CAP: 3000000,
        _upperHint,
        _lowerHint
      },
      [arbitrum['sfrxETH'].address]: {
        decimals: 18,
        underlyingToken: arbitrum['sfrxETH'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.8,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 184280,
        MINTED_CAP: 500000,
        _upperHint,
        _lowerHint
      }
    }
  },
  // zkevm
  1101: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0x5Bd5b45f6565762928A79779F6C2DD43c15c92EE',
    borrowTokenAddress: '0xCA68ad4EE5c96871EC6C6dac2F714a8437A3Fe66',
    BorrowerOperations: '0xC818f878F27D0273Fb53B71d281C82921F0aF15c',
    VesselManager: '0x57a1953bF194A1EF73396e442Ac7Dc761dCd23cc',
    VesselManagerOperations: '0x9D8bB5496332cbeeD59f1211f28dB8b5Eb214B6D',
    markets: {
      [polygonZkevm['weth'].address]: {
        decimals: 18,
        underlyingToken: polygonZkevm['weth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.9,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 2980,
        MINTED_CAP: 1000000,
        _upperHint,
        _lowerHint
      },
      [polygonZkevm['reth'].address]: {
        decimals: 18,
        underlyingToken: polygonZkevm['reth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.85,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 50530,
        MINTED_CAP: 500000,
        _upperHint,
        _lowerHint
      }
    }
  },
  // Linea
  59144: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0x42865C7FA0b84cf76C8e8256f3356226EDC3b1be',
    borrowTokenAddress: '0x894134a25a5faC1c2C26F1d8fBf05111a3CB9487',
    BorrowerOperations: '0x40E0e274A42D9b1a9D4B64dC6c46D21228d45C20',
    VesselManager: '0xdC44093198ee130f92DeFed22791aa8d8df7fBfA',
    VesselManagerOperations: '0x53525a62e55B6002792B993a2C27Af70d12443e4',
    markets: {
      [linea['wsteth'].address]: {
        decimals: 18,
        underlyingToken: linea['wsteth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.85,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 23822,
        MINTED_CAP: 1000000,
        _upperHint,
        _lowerHint
      },
      [linea['weth'].address]: {
        decimals: 18,
        underlyingToken: linea['weth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.9,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 22897,
        MINTED_CAP: 1000000,
        _upperHint,
        _lowerHint
      }
    }
  },
  324: {
    // wethGateway: '0x4d8d90FAF90405b9743Ce600E98A2Aa8CdF579a0',
    StabilityPool: '0xDAce04E411D9916169c0401033a7f76994eF5A0f',
    borrowTokenAddress: '0x5FC44E95eaa48F9eB84Be17bd3aC66B6A82Af709',
    BorrowerOperations: '0xd085Fd2338Cefb9cBD212F74d479072C1E7A25bf',
    VesselManager: '0x8D9CDd9372740933702d606EaD3BB55dFfDC6303',
    VesselManagerOperations: '0x03569d4c117f94e72e9f63B06F406c5bc7caddE9',
    markets: {
      [zkSync['weth'].address]: {
        decimals: 18,
        underlyingToken: zkSync['weth'],
        BORROW_TOKEN,
        BORROW_URL,
        MAX_LTV: 0.9,
        ONE_TIME_FEE: 2,
        MIN_DEBT,
        MINTED: 255355,
        MINTED_CAP: 1000000,
        _upperHint,
        _lowerHint
      }
    }
  }
};

export default { basic, networks };
