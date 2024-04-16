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
const heroData = ['Net Worth', 'Net APY', 'Health Factor'];
const baseConfig = { ownerId, nodeUrl, ipfsPrefix, heroData };
const basic = {
  name: 'Pac Finance',
  // data: 'bluebiu.near/widget/AAVE.Data.Zerolend',
  // handlerClaim: 'bluebiu.near/widget/Lending.RewardClaim.Zerolend',
  type: 'aave-v3',
};

// const rewardToken = [
//   {
//     address: '',
//     // decimals: 18,
//     symbol: 'earlyZERO',
//     name: 'earlyZERO',
//     icon: '',
//     unclaimed: '',
//   },
// ];

const networks = {
  // blast
  238: {
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
      },
      // {
      //   id: '3',
      //   underlyingAsset: blast['usdc'].address,
      //   name: blast['usdc'].name,
      //   symbol: blast['usdc'].symbol,
      //   decimals: blast['usdc'].decimals,
      //   icon: blast['usdc'].icon,
      //   supplyAPY: '',
      //   usageAsCollateralEnabled: true,
      //   borrowingEnabled: true,
      //   aTokenAddress: '0x016341e6Da8da66b33Fd32189328c102f32Da7CC',
      //   stableDebtTokenAddress: '0x5faC4FD2e4bCE392d34600d94Aa1114274e54Dff',
      //   variableDebtTokenAddress: '0xE60E1953aF56Db378184997cab20731d17c65004',
      //   isIsolated: false,
      //   availableLiquidity: 0,
      //   availableLiquidityUSD: '',
      //   variableBorrowAPY: '',
      //   supportPermit: false,
      //   supportBorrow: true,
      // },
    ],
    CONTRACT_ABI,
    // rewardToken,
  },
};

export default { basic, networks };
