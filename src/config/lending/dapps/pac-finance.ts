import { blast } from '@/config/tokens/blast';

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
    'https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/WalletBalanceProvider.json',
};
const heroData = ['Blast Points', 'Blast Gold', 'Net Worth', 'Health Factor'];
const baseConfig = { ownerId, nodeUrl, ipfsPrefix, heroData };
const basic = {
  name: 'Pac Finance',
  data: 'bluebiu.near/widget/Lending.Data.Pac',
  type: 'aave-v3',
};

const networks = {
  // blast
  81457: {
    config: {
      ...baseConfig,
      chainName: 'Blast',
      nativeCurrency: blast['eth'],
      nativeWrapCurrency: blast['weth'],
      rpcUrl: 'https://rpc.blastblockchain.com',
      aavePoolV3Address: '0xd2499b3c8611e36ca89a70fda2a72c49ee19eaa8',
      PoolDataProvider: '0x742316f430002d067dc273469236d0f3670be446',
      wrappedTokenGatewayV3Address: '0x9aBc8648C0527e2d7035a4aE9E00Cb4809F8E627',
      balanceProviderAddress: '0xce3c0026d3c7aa5ec2e8488efb95688b9543fe4e',
      incentivesProxy: '0x13c836bd2dec4ae49e7f865baafe02b402013795', //CLAIM
      // rewardAddress: '',
    },
    rawMarkets: [
      {
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        borrowingEnabled: true,
        decimals: 18,
        icon: 'https://ipfs.near.social/ipfs/bafkreibmo3leq3youcg4o2fxe6pjxajkz4rfee4u5qbcxrx4puebx46psy',
        id: '1',
        isIsolated: false,
        name: 'Ethereum',
        supplyAPY: '',
        supportPermit: true,
        symbol: 'ETH',
        usageAsCollateralEnabled: true,
        variableBorrowAPY: '',
        supportBorrow: true,
        aTokenAddress: '0x63749b03bdB4e86E5aAF7E5a723bF993DBf0c1c5',
        underlyingAsset: '0x4300000000000000000000000000000000000004',
        stableDebtTokenAddress: '0xDc1C1257637d5e9dE85F66d14030809A4dB16456',
        variableDebtTokenAddress: '0x7cB8a894b163848bccee03fD71b098693eE7a77D',
        LEVERAGE: 3,
        LTV: 0.7,
        EXTRA_RADIO: 0.3,
      },
      {
        id: '2',
        underlyingAsset: blast['weth'].address,
        name: blast['weth'].name,
        symbol: blast['weth'].symbol,
        decimals: blast['weth'].decimals,
        icon: blast['weth'].icon,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0x63749b03bdB4e86E5aAF7E5a723bF993DBf0c1c5',
        stableDebtTokenAddress: '0xDc1C1257637d5e9dE85F66d14030809A4dB16456',
        variableDebtTokenAddress: '0x7cB8a894b163848bccee03fD71b098693eE7a77D',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        supportBorrow: false,
        LEVERAGE: 3,
        LTV: 0.7,
        EXTRA_RADIO: 0.3,
      },
      {
        id: '3',
        underlyingAsset: blast['usdb'].address,
        name: blast['usdb'].name,
        symbol: blast['usdb'].symbol,
        decimals: blast['usdb'].decimals,
        icon: blast['usdb'].icon,
        supplyAPY: '',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        aTokenAddress: '0xc7206216F28C23B2Da6537d296e789CFB81b31Ef',
        stableDebtTokenAddress: '0x3FDda42F3be9b827ECd17786b4bDcb4466F7F15F',
        variableDebtTokenAddress: '0x325261d7bD4BDa7bAF38d08217793e94B19C8fC7',
        isIsolated: false,
        availableLiquidity: 0,
        availableLiquidityUSD: '',
        variableBorrowAPY: '',
        supportPermit: false,
        supportBorrow: true,
        LEVERAGE: 5,
        LTV: 0.8,
        EXTRA_RADIO: 0.3,
      },
    ],
    CONTRACT_ABI,
  },
};

export default { basic, networks };
