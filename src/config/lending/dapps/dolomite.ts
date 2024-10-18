import { arbitrum } from '@/config/tokens/arbitrum';
import { beraB } from '@/config/tokens/bera-bArtio';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'Dolomite',
  icon: '/images/apps/dolomite.png',
  data: 'bluebiu.near/widget/Lending.Data.Cream',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  type: 'dolomite',
  defaultTab: 'yours',
  loaderName: 'Dolomite'
};

const API_HOST = 'https://subgraphapi.dolomite.io/api/public';
const API_ID = '1301d2d1-7a9d-4be4-9e9a-061cb8611549';
const API_VERSION = 'v0.1.2';

const graphConfig = {
  blockNumberApiQuery: () => ({
    operationName: 'getLatestBlockNumber',
    variables: {},
    query:
      'query getLatestBlockNumber {\n  _meta {\n    block {\n      number\n      __typename\n    }\n    __typename\n  }\n}\n'
  }),
  marketInfoApiQuery: ({ blockNumber }: { blockNumber: number }) => ({
    operationName: 'allMarketInfos',
    variables: {
      blockNumber
    },
    query:
      'query allMarketInfos($blockNumber: Int!) {\n  marketRiskInfos(block: {number_gte: $blockNumber}) {\n    id\n    token {\n      id\n      marketId\n      __typename\n    }\n    isBorrowingDisabled\n    marginPremium\n    liquidationRewardPremium\n    oracle\n    supplyMaxWei\n    __typename\n  }\n}\n'
  }),
  allTokensApiQuery: ({ blockNumber }: { blockNumber: number }) => ({
    operationName: 'allTokens',
    variables: {
      blockNumber
    },
    query:
      'query allTokens($blockNumber: Int!) {\n  tokens(\n    first: 1000\n    orderBy: symbol\n    orderDirection: asc\n    block: {number_gte: $blockNumber}\n  ) {\n    id\n    chainId\n    marketId\n    symbol\n    name\n    decimals\n    __typename\n  }\n}\n'
  }),
  allTotalParsApiQuery: ({ blockNumber }: { blockNumber: number }) => ({
    operationName: 'allTotalPars',
    variables: {
      blockNumber
    },
    query:
      'query allTotalPars($blockNumber: Int!) {\n  totalPars(block: {number_gte: $blockNumber}) {\n    id\n    borrowPar\n    supplyPar\n    __typename\n  }\n}\n'
  }),
  positionListApiQuery: ({ walletAddress, blockNumber }: { walletAddress: string; blockNumber: number }) => ({
    operationName: 'borrowPositions',
    variables: { walletAddress: walletAddress, blockNumber: blockNumber },
    query:
      'query borrowPositions($blockNumber: Int!, $walletAddress: String!) {\n  borrowPositions(\n    block: {number_gte: $blockNumber}\n    where: {effectiveUser: $walletAddress, status_not: "CLOSED", marginAccount_: {accountNumber_not: 0}}\n    orderBy: openTimestamp\n    orderDirection: desc\n    first: 50\n  ) {\n    id\n    marginAccount {\n      id\n      user {\n        id\n        __typename\n      }\n      accountNumber\n      lastUpdatedTimestamp\n      lastUpdatedBlockNumber\n      __typename\n    }\n    openTransaction {\n      id\n      blockNumber\n      timestamp\n      __typename\n    }\n    closeTransaction {\n      id\n      blockNumber\n      timestamp\n      __typename\n    }\n    status\n    openTimestamp\n    closeTimestamp\n    effectiveSupplyTokens {\n      id\n      symbol\n      name\n      decimals\n      marketId\n      __typename\n    }\n    effectiveBorrowTokens {\n      id\n      symbol\n      name\n      decimals\n      marketId\n      __typename\n    }\n    effectiveUser {\n      id\n      __typename\n    }\n    amounts {\n      token {\n        id\n        symbol\n        name\n        decimals\n        marketId\n        __typename\n      }\n      expirationTimestamp\n      amountPar\n      amountWei\n      __typename\n    }\n    __typename\n  }\n}\n'
  })
};

const networks = {
  1101: {
    depositWithdrawalProxy: '0xDfB6BAA334712cBBeb26B7537f62B81C2a87B1E8',
    borrowPositionProxyV1: '0xc28A4EC9f09E4071E3707eAACa5c3754fA4f5Faa',
    marginAddress: '0x836b557Cf9eF29fcF49C776841191782df34e4e5',
    spenderAddress: '0x836b557Cf9eF29fcF49C776841191782df34e4e5',
    // if your debt is $100, Liquidation Treshold = when collateral assets < $115 OR debt assets > $104.35
    // $120 / ($100 * liquidationRatio) = ~1.043 Health Factor
    liquidationRatio: '1.15',
    interestRatesApi: '/api.dolomite.io/tokens/1101/interest-rates',
    pricesApi: '/api.dolomite.io/tokens/1101/prices',
    graphApi: `${API_HOST}/${API_ID}/subgraphs/dolomite-polygon-zkevm/${API_VERSION}/gn`,
    ...graphConfig,
    approveMax: true,
    wrappedToken: polygonZkevm['weth'],
    markets: {
      [polygonZkevm['weth'].address]: {
        ...polygonZkevm['weth'],
        marketId: '0',
        underlyingToken: polygonZkevm['weth']
      },
      [polygonZkevm['eth'].address]: {
        ...polygonZkevm['eth'],
        marketId: '0',
        underlyingToken: polygonZkevm['eth']
      },
      [polygonZkevm['dai'].address]: {
        ...polygonZkevm['dai'],
        underlyingToken: polygonZkevm['dai']
      },
      [polygonZkevm['link'].address]: {
        ...polygonZkevm['link'],
        underlyingToken: polygonZkevm['link']
      },
      [polygonZkevm['wbtc'].address]: {
        ...polygonZkevm['wbtc'],
        underlyingToken: polygonZkevm['wbtc']
      },
      [polygonZkevm['usdt'].address]: {
        ...polygonZkevm['usdt'],
        underlyingToken: polygonZkevm['usdt']
      },
      [polygonZkevm['matic'].address]: {
        ...polygonZkevm['matic'],
        underlyingToken: polygonZkevm['matic']
      },
      [polygonZkevm['usdc.e'].address]: {
        ...polygonZkevm['usdc.e'],
        underlyingToken: polygonZkevm['usdc.e']
      }
    }
  },
  80084: {
    depositWithdrawalProxy: '0x36864DB0396B1aC36c5d6609deD5Cc7F8073d08c',
    borrowPositionProxyV1: '0xe99A7e4556CaF7925fbac52765128e524E9Dd793',
    marginAddress: '0x07d163861EB93e6A1f985d0caF0f505F66F11D13',
    spenderAddress: '0x07d163861EB93e6A1f985d0caF0f505F66F11D13',
    // if your debt is $100, Liquidation Treshold = when collateral assets < $115 OR debt assets > $104.35
    // $120 / ($100 * liquidationRatio) = ~1.043 Health Factor
    liquidationRatio: '1.25',
    interestRatesApi: '/api.dolomite.io/tokens/80084/interest-rates',
    pricesApi: '/api.dolomite.io/tokens/80084/prices',
    graphApi: `${API_HOST}/${API_ID}/subgraphs/dolomite-berachain/${API_VERSION}/gn`,
    ...graphConfig,
    approveMax: true,
    wrappedToken: beraB['wbera'],
    markets: {
      [beraB['wbera'].address]: {
        ...beraB['wbera'],
        underlyingToken: beraB['wbera']
      },
      [beraB['bera'].address]: {
        ...beraB['bera'],
        underlyingToken: beraB['bera']
      },
      [beraB['honey'].address]: {
        ...beraB['honey'],
        underlyingToken: beraB['honey']
      },
      [beraB['usdc'].address]: {
        ...beraB['usdc'],
        underlyingToken: beraB['usdc']
      },
      [beraB['unibtc'].address]: {
        ...beraB['unibtc'],
        underlyingToken: beraB['unibtc']
      },
      [beraB['eth'].address]: {
        ...beraB['eth'],
        marketId: '0',
        underlyingToken: beraB['eth']
      }
    }
  },
  42161: {
    depositWithdrawalProxy: '0xAdB9D68c613df4AA363B42161E1282117C7B9594',
    borrowPositionProxyV1: '0xe43638797513ef7A6d326a95E8647d86d2f5a099',
    marginAddress: '0x6Bd780E7fDf01D77e4d475c821f1e7AE05409072',
    spenderAddress: '0x6Bd780E7fDf01D77e4d475c821f1e7AE05409072',
    // if your debt is $100, Liquidation Treshold = when collateral assets < $115 OR debt assets > $104.35
    // $120 / ($100 * liquidationRatio) = ~1.043 Health Factor
    liquidationRatio: '1.15',
    interestRatesApi: '/api.dolomite.io/tokens/42161/interest-rates',
    pricesApi: '/api.dolomite.io/tokens/42161/prices',
    graphApi: `${API_HOST}/${API_ID}/subgraphs/dolomite-arbitrum/${API_VERSION}/gn`,
    ...graphConfig,
    approveMax: true,
    wrappedToken: arbitrum['weth'],
    markets: {
      [arbitrum['eth'].address]: {
        ...arbitrum['eth'],
        marketId: '0',
        underlyingToken: arbitrum['eth']
      },
      [arbitrum['weth'].address]: {
        ...arbitrum['weth'],
        underlyingToken: arbitrum['weth']
      },
      [arbitrum['usdc'].address]: {
        ...arbitrum['usdc'],
        underlyingToken: arbitrum['usdc']
      },
      [arbitrum['arb'].address]: {
        ...arbitrum['arb'],
        underlyingToken: arbitrum['arb']
      },
      [arbitrum['dai'].address]: {
        ...arbitrum['dai'],
        underlyingToken: arbitrum['dai']
      },
      [arbitrum['ezeth'].address]: {
        ...arbitrum['ezeth'],
        underlyingToken: arbitrum['ezeth']
      },
      [arbitrum['gmx'].address]: {
        ...arbitrum['gmx'],
        underlyingToken: arbitrum['gmx']
      },
      [arbitrum['grail'].address]: {
        ...arbitrum['grail'],
        underlyingToken: arbitrum['grail']
      },
      [arbitrum['jones dao'].address]: {
        ...arbitrum['jones dao'],
        underlyingToken: arbitrum['jones dao']
      },
      [arbitrum['link'].address]: {
        ...arbitrum['link'],
        underlyingToken: arbitrum['link']
      },
      [arbitrum['magic'].address]: {
        ...arbitrum['magic'],
        underlyingToken: arbitrum['magic']
      },
      [arbitrum['mim'].address]: {
        ...arbitrum['mim'],
        underlyingToken: arbitrum['mim']
      },
      [arbitrum['pendle'].address]: {
        ...arbitrum['pendle'],
        underlyingToken: arbitrum['pendle']
      },
      [arbitrum['PREMIA'].address]: {
        ...arbitrum['PREMIA'],
        underlyingToken: arbitrum['PREMIA']
      },
      [arbitrum['rdnt'].address]: {
        ...arbitrum['rdnt'],
        underlyingToken: arbitrum['rdnt']
      },
      [arbitrum['reth'].address]: {
        ...arbitrum['reth'],
        underlyingToken: arbitrum['reth']
      },
      [arbitrum['rseth'].address]: {
        ...arbitrum['rseth'],
        underlyingToken: arbitrum['rseth']
      },
      [arbitrum['uni'].address]: {
        ...arbitrum['uni'],
        underlyingToken: arbitrum['uni']
      },
      [arbitrum['usdc'].address]: {
        ...arbitrum['usdc'],
        underlyingToken: arbitrum['usdc']
      },
      [arbitrum['usdc.e'].address]: {
        ...arbitrum['usdc.e'],
        underlyingToken: arbitrum['usdc.e']
      },
      [arbitrum['usde'].address]: {
        ...arbitrum['usde'],
        underlyingToken: arbitrum['usde']
      },
      [arbitrum['usdt'].address]: {
        ...arbitrum['usdt'],
        underlyingToken: arbitrum['usdt']
      },
      [arbitrum['wbtc'].address]: {
        ...arbitrum['wbtc'],
        underlyingToken: arbitrum['wbtc']
      },
      [arbitrum['we-eth'].address]: {
        ...arbitrum['we-eth'],
        underlyingToken: arbitrum['we-eth']
      },
      [arbitrum['wst-eth'].address]: {
        ...arbitrum['wst-eth'],
        underlyingToken: arbitrum['wst-eth']
      },
      [arbitrum['XAI'].address]: {
        ...arbitrum['XAI'],
        underlyingToken: arbitrum['XAI']
      }
    }
  }
};

export default { basic, networks };
