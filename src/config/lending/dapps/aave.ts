import { scroll } from '@/config/tokens/scroll';

const ETH_TOKEN = { name: 'Ethereum', symbol: 'ETH', decimals: 18 };
const WETH_TOKEN = { name: 'Wrapped Ether', symbol: 'WETH', decimals: 18 };
const MATIC_TOKEN = { name: 'Matic', symbol: 'MATIC', decimals: 18 };
const WMATIC_TOKEN = { name: 'Wrapped Matic', symbol: 'WMATIC', decimals: 18 };
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
const heroData = ['Net Worth', 'Net APY', 'Health Factor'];
const baseConfig = { ownerId, nodeUrl, ipfsPrefix, heroData };
const basic = {
  name: 'AAVE V3',
  icon: 'https://s3.amazonaws.com/dapdap.prod/images/061_094-aave1.png',
  // data: 'bluebiu.near/widget/Lending.Data.Liquity',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'aave-v3',
  loaderName: 'AaveV3'
};

const networks = {
  // scroll
  534352: {
    config: {
      ...baseConfig,
      chainName: 'Scroll',
      nativeCurrency: scroll['eth'],
      nativeWrapCurrency: scroll['weth'],
      rpcUrl: 'https://rpc.ankr.com/scroll',
      aavePoolV3Address: '0x11fCfe756c05AD438e312a7fd934381537D3cFfe',
      PoolDataProvider: '0xa99F4E69acF23C6838DE90dD1B5c02EA928A53ee',
      wrappedTokenGatewayV3Address: '0xFF75A4B698E3Ec95E608ac0f22A03B8368E05F5D',
      balanceProviderAddress: '0xE51642875Af07Fea1B03d821E41a9DB24bC4447E',
      incentivesProxy: '0xa3f3100C4f1D0624DB9DB97b40C13885Ce297799' //CLAIM
    },
    rawMarkets: [
      {
        id: '1',
        underlyingAsset: scroll['weth'].address,
        icon: scroll['eth'].icon,
        decimals: 18,
        name: 'Ethereum',
        symbol: 'ETH',
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xf301805be1df81102c957f6d4ce29d2b8c056b2a',
        variableDebtTokenAddress: '0xfD7344CeB1Df9Cf238EcD667f4A6F99c6Ef44a56',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true
      },
      {
        id: '2',
        underlyingAsset: scroll['weth'].address,
        icon: scroll['weth'].icon,
        decimals: scroll['weth'].decimals,
        symbol: scroll['weth'].symbol,
        name: scroll['weth'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: false,
        aTokenAddress: '0xf301805be1df81102c957f6d4ce29d2b8c056b2a',
        variableDebtTokenAddress: '0xfD7344CeB1Df9Cf238EcD667f4A6F99c6Ef44a56',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: false
      },
      {
        id: '3',
        underlyingAsset: scroll['wsteth'].address,
        icon: scroll['wsteth'].icon,
        decimals: scroll['wsteth'].decimals,
        symbol: scroll['wsteth'].symbol,
        name: scroll['wsteth'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0x5B1322eeb46240b02e20062b8F0F9908d525B09c',
        variableDebtTokenAddress: '0x8a035644322129800C3f747f54Db0F4d3c0A2877',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true
      },
      {
        id: '4',
        underlyingAsset: scroll['usdc'].address,
        icon: scroll['usdc'].icon,
        decimals: scroll['usdc'].decimals,
        symbol: scroll['usdc'].symbol,
        name: scroll['usdc'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0x1D738a3436A8C49CefFbaB7fbF04B660fb528CbD',
        variableDebtTokenAddress: '0x3d2E209af5BFa79297C88D6b57F89d792F6E28EE',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true
      }
    ],
    CONTRACT_ABI
  }
};

export default { basic, networks };
