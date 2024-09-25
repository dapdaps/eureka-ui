import { gnosis } from '@/config/tokens/gnosis';
import { metis } from '@/config/tokens/metis';
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
  icon: 'https://s3.amazonaws.com/dapdap.main/images/061_094-aave1.png',
  // data: 'bluebiu.near/widget/Lending.Data.Liquity',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'aave-v3',
  loaderName: 'AaveV3'
};

const rewardToken = [
  {
    address: '',
    // decimals: 18,
    symbol: 'METIS',
    name: 'METIS',
    icon: '',
    unclaimed: ''
  }
];

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
      wrappedTokenGatewayV3Address: '0xd91d1331db4F436DaF47Ec9Dd86deCb8EEF946B4',
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
  },
  // metis
  1088: {
    config: {
      ...baseConfig,
      chainName: 'Metis',
      nativeCurrency: metis['eth'],
      nativeWrapCurrency: metis['weth'],
      rpcUrl: 'https://metis-pokt.nodies.app',
      aavePoolV3Address: '0x90df02551bB792286e8D4f13E0e357b4Bf1D6a57',
      PoolDataProvider: '0x99411FC17Ad1B56f49719E3850B2CDcc0f9bBFd8',
      wrappedTokenGatewayV3Address: '0xFF75A4B698E3Ec95E608ac0f22A03B8368E05F5D',
      balanceProviderAddress: '0x1df710eb1E2FD9C21494aF2BFb1F210a4185885b',
      incentivesProxy: '0x30C1b8F0490fa0908863d6Cbd2E36400b4310A6B', //CLAIM
      rewardAddress: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
    },
    rawMarkets: [
      {
        id: '1',
        underlyingAsset: metis['metis'].address,
        icon: metis['metis'].icon,
        decimals: metis['metis'].decimals,
        symbol: metis['metis'].symbol,
        name: metis['metis'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0x7314Ef2CA509490f65F52CC8FC9E0675C66390b8',
        variableDebtTokenAddress: '0x0110174183e13D5Ea59D7512226c5D5A47bA2c40',
        isIsolated: true,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true
      },
      {
        id: '2',
        underlyingAsset: metis['m.usdc'].address,
        icon: metis['m.usdc'].icon,
        decimals: metis['m.usdc'].decimals,
        symbol: metis['m.usdc'].symbol,
        name: metis['m.usdc'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0x885C8AEC5867571582545F894A5906971dB9bf27',
        variableDebtTokenAddress: '0x571171a7EF1e3c8c83d47EF1a50E225E9c351380',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true,
        isStableForIsolated: true
      },
      {
        id: '3',
        underlyingAsset: metis['m.usdt'].address,
        icon: metis['m.usdt'].icon,
        decimals: metis['m.usdt'].decimals,
        symbol: metis['m.usdt'].symbol,
        name: metis['m.usdt'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xd9fa75D14c26720d5ce7eE2530793a823e8f07b9',
        variableDebtTokenAddress: '0x6B45DcE8aF4fE5Ab3bFCF030d8fB57718eAB54e5',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true,
        isStableForIsolated: true
      },
      {
        id: '4',
        underlyingAsset: metis['weth'].address,
        icon: metis['weth'].icon,
        decimals: metis['weth'].decimals,
        symbol: metis['weth'].symbol,
        name: metis['weth'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0x8acAe35059C9aE27709028fF6689386a44c09f3a',
        variableDebtTokenAddress: '0x8Bb19e3DD277a73D4A95EE434F14cE4B92898421',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true
      },
      {
        id: '5',
        underlyingAsset: metis['m.dai'].address,
        icon: metis['m.dai'].icon,
        decimals: metis['m.dai'].decimals,
        symbol: metis['m.dai'].symbol,
        name: metis['m.dai'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0x85ABAdDcae06efee2CB5F75f33b6471759eFDE24',
        variableDebtTokenAddress: '0x13Bd89aF338f3c7eAE9a75852fC2F1ca28B4DDbF',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true
      }
    ],
    CONTRACT_ABI,
    rewardToken
  },
  // gnosis
  100: {
    config: {
      ...baseConfig,
      chainName: 'Gnosis',
      nativeCurrency: gnosis['xdai'],
      nativeWrapCurrency: gnosis['weth'],
      rpcUrl: 'https://gnosis.drpc.org',
      aavePoolV3Address: '0xb50201558B00496A145fE76f7424749556E326D8',
      PoolDataProvider: '0x501B4c19dd9C2e06E94dA7b6D5Ed4ddA013EC741',
      wrappedTokenGatewayV3Address: '0xfE76366A986B72c3f2923e05E6ba07b7de5401e4',
      balanceProviderAddress: '0x4172E6aAEC070ACB31aaCE343A58c93E4C70f44D',
      incentivesProxy: '0xaD4F91D26254B6B0C6346b390dDA2991FDE2F20d' //CLAIM
    },
    rawMarkets: [
      {
        id: '0',
        underlyingAsset: gnosis['wxdai'].address,
        icon: gnosis['xdai'].icon,
        decimals: gnosis['xdai'].decimals,
        symbol: gnosis['xdai'].symbol,
        name: gnosis['xdai'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xd0Dd6cEF72143E22cCED4867eb0d5F2328715533',
        variableDebtTokenAddress: '0x281963D7471eCdC3A2Bd4503e24e89691cfe420D',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true
      },
      {
        id: '1',
        underlyingAsset: gnosis['wsteth'].address,
        icon: gnosis['wsteth'].icon,
        decimals: gnosis['wsteth'].decimals,
        symbol: gnosis['wsteth'].symbol,
        name: gnosis['wsteth'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0x23e4E76D01B2002BE436CE8d6044b0aA2f68B68a',
        variableDebtTokenAddress: '0x9D881f67F20B49243c98f53d2B9E91E39d02Ae09',
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
        underlyingAsset: gnosis['wxdai'].address,
        icon: gnosis['wxdai'].icon,
        decimals: gnosis['wxdai'].decimals,
        symbol: gnosis['wxdai'].symbol,
        name: gnosis['wxdai'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xd0Dd6cEF72143E22cCED4867eb0d5F2328715533',
        variableDebtTokenAddress: '0x281963D7471eCdC3A2Bd4503e24e89691cfe420D',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        supportBorrow: true
      },
      {
        id: '3',
        underlyingAsset: gnosis['usdc'].address,
        icon: gnosis['usdc'].icon,
        decimals: gnosis['usdc'].decimals,
        symbol: gnosis['usdc'].symbol,
        name: gnosis['usdc'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xc6B7AcA6DE8a6044E0e32d0c841a89244A10D284',
        variableDebtTokenAddress: '0x5F6f7B0a87CA3CF3d0b431Ae03EF3305180BFf4d',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        isStableForIsolated: true,
        supportBorrow: true
      },
      {
        id: '4',
        underlyingAsset: gnosis['eure'].address,
        icon: gnosis['eure'].icon,
        decimals: gnosis['eure'].decimals,
        symbol: gnosis['eure'].symbol,
        name: gnosis['eure'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xEdBC7449a9b594CA4E053D9737EC5Dc4CbCcBfb2',
        variableDebtTokenAddress: '0xb96404e475f337A7E98e4a541C9b71309BB66c5A',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        isStableForIsolated: true,
        supportBorrow: true
      },
      {
        id: '5',
        underlyingAsset: gnosis['usdc.e'].address,
        icon: gnosis['usdc.e'].icon,
        decimals: gnosis['usdc.e'].decimals,
        symbol: gnosis['usdc.e'].symbol,
        name: gnosis['usdc.e'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xC0333cb85B59a788d8C7CAe5e1Fd6E229A3E5a65',
        variableDebtTokenAddress: '0x37B9Ad6b5DC8Ad977AD716e92F49e9D200e58431',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        LTV: 0,
        isStableForIsolated: true,
        supportBorrow: true
      },
      {
        id: '6',
        underlyingAsset: gnosis['gno'].address,
        icon: gnosis['gno'].icon,
        decimals: gnosis['gno'].decimals,
        symbol: gnosis['gno'].symbol,
        name: gnosis['gno'].name,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xA1Fa064A85266E2Ca82DEe5C5CcEC84DF445760e',
        variableDebtTokenAddress: '0xBc59E99198DbA71985A66E1713cC89FFEC53f7FC',
        isIsolated: true,
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
