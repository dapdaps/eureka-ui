import { bsc } from '@/config/tokens/bsc';

const basic = {
  name: 'Venus',
  icon: '/images/apps/venus.png',
  data: 'bluebiu.near/widget/Lending.Data.Venus',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Lending.RewardClaim.Venus',
  loaderName: 'Venus',
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
        underlyingToken: bsc['btcb'],
      },
      '0xA07c5b74C9B40447a954e1466938b865b6BBea36': {
        decimals: 8,
        symbol: 'vBNB',
        address: '0xA07c5b74C9B40447a954e1466938b865b6BBea36',
        underlyingToken: bsc['bnb'],
      },
      '0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0': {
        decimals: 8,
        symbol: 'vWBETH',
        address: '0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0',
        underlyingToken: bsc['wbeth'],
      },
      '0xfD5840Cd36d94D7229439859C0112a4185BC0255': {
        decimals: 8,
        symbol: 'vUSDT',
        address: '0xfD5840Cd36d94D7229439859C0112a4185BC0255',
        underlyingToken: bsc['usdt'],
      },
      '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8': {
        decimals: 8,
        symbol: 'vUSDC',
        address: '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8',
        underlyingToken: bsc['usdc'],
      },
      '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8': {
        decimals: 8,
        symbol: 'vETH',
        address: '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8',
        underlyingToken: bsc['eth'],
      },
      '0xB248a295732e0225acd3337607cc01068e3b9c10': {
        decimals: 8,
        symbol: 'vXRP',
        address: '0xB248a295732e0225acd3337607cc01068e3b9c10',
        underlyingToken: bsc['xrp'],
      },
      '0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B': {
        decimals: 8,
        symbol: 'vLTC',
        address: '0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B',
        underlyingToken: bsc['ltc'],
      },
      '0x650b940a1033B8A1b1873f78730FcFC73ec11f1f': {
        decimals: 8,
        symbol: 'vLINK',
        address: '0x650b940a1033B8A1b1873f78730FcFC73ec11f1f',
        underlyingToken: bsc['link'],
      },
      '0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec': {
        decimals: 8,
        symbol: 'vADA',
        address: '0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec',
        underlyingToken: bsc['ada'],
      },
      '0x86aC3974e2BD0d60825230fa6F355fF11409df5c': {
        decimals: 8,
        symbol: 'vCAKE',
        address: '0x86aC3974e2BD0d60825230fa6F355fF11409df5c',
        underlyingToken: bsc['cake'],
      },
      '0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1': {
        decimals: 8,
        symbol: 'vDAI',
        address: '0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1',
        underlyingToken: bsc['dai'],
      },
      '0xC5D3466aA484B040eE977073fcF337f2c00071c1': {
        decimals: 8,
        symbol: 'vTRX',
        address: '0xC5D3466aA484B040eE977073fcF337f2c00071c1',
        underlyingToken: bsc['trx'],
      },
      '0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E': {
        decimals: 8,
        symbol: 'vTUSD',
        address: '0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E',
        underlyingToken: bsc['tusd'],
      },
      '0x1610bc33319e9398de5f57B33a5b184c806aD217': {
        decimals: 8,
        symbol: 'vDOT',
        address: '0x1610bc33319e9398de5f57B33a5b184c806aD217',
        underlyingToken: bsc['dot'],
      },
      '0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba': {
        decimals: 8,
        symbol: 'vFDUSD',
        address: '0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba',
        underlyingToken: bsc['fdusd'],
      },
      '0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8': {
        decimals: 8,
        symbol: 'vMATIC',
        address: '0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8',
        underlyingToken: bsc['matic'],
      },
      '0x26DA28954763B92139ED49283625ceCAf52C6f94': {
        decimals: 8,
        symbol: 'vAAVE',
        address: '0x26DA28954763B92139ED49283625ceCAf52C6f94',
        underlyingToken: bsc['aave'],
      },
      '0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176': {
        decimals: 8,
        symbol: 'vBCH',
        address: '0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176',
        underlyingToken: bsc['bch'],
      },
      '0x27FF564707786720C71A2e5c1490A63266683612': {
        decimals: 8,
        symbol: 'vUNI',
        address: '0x27FF564707786720C71A2e5c1490A63266683612',
        underlyingToken: bsc['uni'],
      },
      '0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343': {
        decimals: 8,
        symbol: 'vFIL',
        address: '0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343',
        underlyingToken: bsc['fil'],
      },
      '0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71': {
        decimals: 8,
        symbol: 'vDOGE',
        address: '0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71',
        underlyingToken: bsc['doge'],
      },
      '0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D': {
        decimals: 8,
        symbol: 'vXVS',
        address: '0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D',
        underlyingToken: bsc['xvs'],
      },
      '0x972207A639CC1B374B893cc33Fa251b55CEB7c07': {
        decimals: 8,
        symbol: 'vBETH',
        address: '0x972207A639CC1B374B893cc33Fa251b55CEB7c07',
        underlyingToken: bsc['beth'],
      },
    },
    rewardsPrimeData: {
      '0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8': {
        borrow: '2405.43',
        supply: '13068.75',
        stake: '3265.30',
      },
      '0xfD5840Cd36d94D7229439859C0112a4185BC0255': { borrow: '10009.21', supply: '5003.94', stake: '3731.33' },
      '0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B': { borrow: '0.04', supply: '0.71', stake: '4124.59' },
      '0xf508fCD89b8bd15579dc79A6827cB4686A3592c8': { borrow: '0.49', supply: '9.86', stake: '4788.05' },
    },
    rewardToken: bsc['xvs'],
  },
};

export default { basic, networks };
