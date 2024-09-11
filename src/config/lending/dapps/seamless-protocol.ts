import { base } from '@/config/tokens/base';

const ownerId = 'bluebiu.near';
const nodeUrl = 'https://rpc.mainnet.near.org';
const ipfsPrefix = 'https://ipfs.near.social/ipfs';

const CONTRACT_ABI = {
  wrappedTokenGatewayV3ABI:
    'https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/WrappedTokenGatewayV3ABI.json',
  erc20Abi: 'https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/ERC20Permit.json',
  aavePoolV3ABI: 'https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/AAVEPoolV3.json',
  variableDebtTokenABI: 'https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/VariableDebtToken.json',
  walletBalanceProviderABI:
    'https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/WalletBalanceProvider.json'
};
// const heroData = ['Total market size', 'Total available', 'Total borrows'];
const heroData = ['Net Worth', 'Net APY', 'Health Factor'];

const baseConfig = { ownerId, nodeUrl, ipfsPrefix, heroData };
const basic = {
  name: 'Seamless Protocol',
  data: 'bluebiu.near/widget/AAVE.Data.Seamless',
  handlerClaim: 'bluebiu.near/widget/Lending.RewardClaim.Zerolend',
  type: 'aave-v3',
  loaderName: 'AaveV3'
};
const rewardToken = [
  {
    address: '0x5607718c64334eb5174cb2226af891a6ed82c7c6',
    // decimals: 18,
    symbol: 'OG Points',
    name: 'OG Points',
    icon: 'https://ipfs.near.social/ipfs/bafkreiez74jwccvehead67kbbi2r5b5tibtk23vuo3aamuhyllfvujczhu'
  },
  base['seam'],
  base['esseam'],
  base['usdc']
];

const networks = {
  // base
  8453: {
    config: {
      ...baseConfig,
      chainName: 'Base',
      nativeCurrency: base['eth'],
      nativeWrapCurrency: base['weth'],
      rpcUrl: 'https://base-pokt.nodies.app',
      aavePoolV3Address: '0x8F44Fd754285aa6A2b8B9B97739B79746e0475a7',
      PoolDataProvider: '0x2A0979257105834789bC6b9E1B00446DFbA8dFBa',
      wrappedTokenGatewayV3Address: '0xaeeB3898edE6a6e86864688383E211132BAa1Af3',
      balanceProviderAddress: '0xDb0f02421f830398d7b59dae8d385e2Cd5ed5CF7',
      incentivesProxy: '0x91Ac2FfF8CBeF5859eAA6DdA661feBd533cD3780', //CLAIM
      rewardAddress: '0x998e44232BEF4F8B033e5A5175BDC97F2B10d5e5'
    },
    rawMarkets: [
      {
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        borrowingEnabled: true,
        decimals: 18,
        icon: base['eth'].icon,
        id: '1',
        isIsolated: false,
        name: 'Ethereum',
        supplyAPY: '',
        supportPermit: true,
        symbol: 'ETH',
        underlyingAsset: '0x4200000000000000000000000000000000000006',
        usageAsCollateralEnabled: true,
        variableBorrowAPY: '',
        aTokenAddress: '0x48bf8fCd44e2977c8a9A744658431A8e6C0d866c',
        variableDebtTokenAddress: '0x4cebC6688faa595537444068996ad9A207A19f13',
        supportBorrow: true
      },
      {
        id: '2',
        underlyingAsset: base['wsteth'].address,
        name: base['wsteth'].name,
        symbol: base['wsteth'].symbol,
        decimals: base['wsteth'].decimals,
        icon: base['wsteth'].icon,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: false,
        aTokenAddress: '0xfA48A40DAD139e9B1aF8dc82F37Da58cC3cA2867',
        variableDebtTokenAddress: '0x51fB9021d61c464674b419C0e3082B5b9223Fc17',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        supportBorrow: true
      },
      {
        id: '3',
        underlyingAsset: base['cbeth'].address,
        name: base['cbeth'].name,
        symbol: base['cbeth'].symbol,
        decimals: base['cbeth'].decimals,
        icon: base['cbeth'].icon,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: false,
        aTokenAddress: '0x2c159A183d9056E29649Ce7E56E59cA833D32624',
        variableDebtTokenAddress: '0x72Dbdbe3423cdA5e92A3cC8ba9BFD41F67EE9168',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        supportBorrow: true
      },
      {
        id: '4',
        underlyingAsset: base['usdc'].address,
        name: base['usdc'].name,
        symbol: base['usdc'].symbol,
        decimals: base['usdc'].decimals,
        icon: base['usdc'].icon,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: false,
        aTokenAddress: '0x53E240C0F985175dA046A62F26D490d1E259036e',
        variableDebtTokenAddress: '0x27Ce7E89312708FB54121ce7E44b13FBBB4C7661',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        supportBorrow: true
      },
      {
        id: '5',
        underlyingAsset: base['usdbc'].address,
        name: base['usdbc'].name,
        symbol: base['usdbc'].symbol,
        decimals: base['usdbc'].decimals,
        icon: base['usdbc'].icon,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: false,
        aTokenAddress: '0x13A13869B814Be8F13B86e9875aB51bda882E391',
        variableDebtTokenAddress: '0x326441fA5016d946e6E82e807875fDfdc3041B3B',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        supportBorrow: true
      },
      {
        id: '6',
        underlyingAsset: base['dai'].address,
        name: base['dai'].name,
        symbol: base['dai'].symbol,
        decimals: base['dai'].decimals,
        icon: base['dai'].icon,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: false,
        aTokenAddress: '0x37eF72fAC21904EDd7e69f7c7AC98172849efF8e',
        variableDebtTokenAddress: '0x2733e1DA7d35c5ea3ed246ed6b613DC3dA97Ce2E',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,

        supportBorrow: true
      }
    ],
    CONTRACT_ABI,
    rewardToken
  }
};

export default { basic, networks };
