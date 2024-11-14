import { bsc } from '@/config/tokens/bsc';
import { zkSync } from '@/config/tokens/zkSync';

const basic = {
  name: 'Venus',
  icon: '/assets/dapps/venus.png',
  data: 'bluebiu.near/widget/Lending.Data.Venus',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Lending.RewardClaim.Venus',
  loaderName: 'Venus'
};

const networks = {
  56: {
    unitrollerAddress: '0xfD36E2c2a6789Db23113685031d7F16329158384',
    oracleAddress: '0x6592b5DE802159F3E74B2486b091D11a8256ab8A',
    rewardPrimeAddress: '0xBbCD063efE506c3D42a0Fa2dB5C08430288C71FC',
    rewardAddress: '0xfB0f09dB330dC842a6637BfB959209424BbFE8C7',
    markets: {
      '0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B': {
        decimals: 8,
        symbol: 'vBTC',
        address: '0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B',
        underlyingToken: bsc['btcb']
      },
      '0xA07c5b74C9B40447a954e1466938b865b6BBea36': {
        decimals: 8,
        symbol: 'vBNB',
        address: '0xA07c5b74C9B40447a954e1466938b865b6BBea36',
        underlyingToken: bsc['bnb']
      },
      '0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0': {
        decimals: 8,
        symbol: 'vWBETH',
        address: '0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0',
        underlyingToken: bsc['wbeth']
      },
      '0xfD5840Cd36d94D7229439859C0112a4185BC0255': {
        decimals: 8,
        symbol: 'vUSDT',
        address: '0xfD5840Cd36d94D7229439859C0112a4185BC0255',
        underlyingToken: bsc['usdt']
      },
      '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8': {
        decimals: 8,
        symbol: 'vUSDC',
        address: '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8',
        underlyingToken: bsc['usdc']
      },
      '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8': {
        decimals: 8,
        symbol: 'vETH',
        address: '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8',
        underlyingToken: bsc['eth']
      },
      '0xB248a295732e0225acd3337607cc01068e3b9c10': {
        decimals: 8,
        symbol: 'vXRP',
        address: '0xB248a295732e0225acd3337607cc01068e3b9c10',
        underlyingToken: bsc['xrp']
      },
      '0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B': {
        decimals: 8,
        symbol: 'vLTC',
        address: '0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B',
        underlyingToken: bsc['ltc']
      },
      '0x650b940a1033B8A1b1873f78730FcFC73ec11f1f': {
        decimals: 8,
        symbol: 'vLINK',
        address: '0x650b940a1033B8A1b1873f78730FcFC73ec11f1f',
        underlyingToken: bsc['link']
      },
      '0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec': {
        decimals: 8,
        symbol: 'vADA',
        address: '0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec',
        underlyingToken: bsc['ada']
      },
      '0x86aC3974e2BD0d60825230fa6F355fF11409df5c': {
        decimals: 8,
        symbol: 'vCAKE',
        address: '0x86aC3974e2BD0d60825230fa6F355fF11409df5c',
        underlyingToken: bsc['cake']
      }
    },
    rewardsPrimeData: {
      '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8': {
        borrow: '2405.43',
        supply: '13068.75',
        stake: '3265.30'
      },
      '0xfD5840Cd36d94D7229439859C0112a4185BC0255': { borrow: '10009.21', supply: '5003.94', stake: '3731.33' },
      '0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B': { borrow: '0.04', supply: '0.71', stake: '4124.59' },
      '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8': { borrow: '0.49', supply: '9.86', stake: '4788.05' }
    },
    rewardToken: bsc['xvs']
  },
  324: {
    unitrollerAddress: '0xddE4D098D9995B659724ae6d5E3FB9681Ac941B1',
    oracleAddress: '0xDe564a4C887d5ad315a19a96DC81991c98b12182',
    rewardPrimeAddress: '0xdFe62Dcba3Ce0A827439390d7d45Af8baE599978',
    rewardAddress: '0xbbb3c88192a5b0db759229bef49dcd1f168f326f',
    markets: {
      '0xAF8fD83cFCbe963211FAaf1847F0F217F80B4719': {
        decimals: 8,
        symbol: 'vWBTC',
        address: '0xAF8fD83cFCbe963211FAaf1847F0F217F80B4719',
        underlyingToken: zkSync['wbtc']
      },
      '0x1Fa916C27c7C2c4602124A14C77Dbb40a5FF1BE8': {
        decimals: 8,
        symbol: 'vWETH',
        address: '0x1Fa916C27c7C2c4602124A14C77Dbb40a5FF1BE8',
        underlyingToken: zkSync['weth']
      },
      '0x69cDA960E3b20DFD480866fFfd377Ebe40bd0A46': {
        decimals: 8,
        symbol: 'vUSDT',
        address: '0x69cDA960E3b20DFD480866fFfd377Ebe40bd0A46',
        underlyingToken: zkSync['usdt']
      },
      '0x1aF23bD57c62A99C59aD48236553D0Dd11e49D2D': {
        decimals: 8,
        symbol: 'vUSDC_E',
        address: '0x1aF23bD57c62A99C59aD48236553D0Dd11e49D2D',
        underlyingToken: zkSync['usdc.e']
      },
      '0x697a70779C1A03Ba2BD28b7627a902BFf831b616': {
        decimals: 8,
        symbol: 'vZK',
        address: '0x697a70779C1A03Ba2BD28b7627a902BFf831b616',
        underlyingToken: zkSync['zk']
      }
    },
    rewardsPrimeData: {},
    rewardToken: zkSync['xvs']
  }
};

export default { basic, networks };
