import { base } from '@/config/tokens/base';

const basic = {
  name: 'Moonwell',
  icon: '/images/apps/moonwell.png',
  data: 'bluebiu.near/widget/Lending.Data.Moonwell',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Base.Lending.MoonwellHandlerClaim',
  loaderName: 'Moonwell',
};

const networks = {
  8453: {
    unitrollerAddress: '0xfBb21d0380beE3312B33c4353c8936a0F13EF26C',
    oracleAddress: '0xEC942bE8A8114bFD0396A5052c36027f2cA6a9d0',
    rewardDistributorAddress: '0xe9005b078701e2A0948D2EaC43010D35870Ad9d2',
    markets: {
      '0x703843C3379b52F9FF486c9f5892218d2a065cC8': {
        decimals: 8,
        symbol: 'mUSDbC',
        address: '0x703843C3379b52F9FF486c9f5892218d2a065cC8',
        underlyingToken: base['usdbc'],
      },
      '0x628ff693426583D9a7FB391E54366292F509D457': {
        decimals: 8,
        symbol: 'mWETH',
        address: '0x628ff693426583D9a7FB391E54366292F509D457',
        underlyingToken: base['weth'],
      },
      '0x73b06D8d18De422E269645eaCe15400DE7462417': {
        decimals: 8,
        symbol: 'mDAI',
        address: '0x73b06D8d18De422E269645eaCe15400DE7462417',
        underlyingToken: base['dai'],
      },
      '0xEdc817A28E8B93B03976FBd4a3dDBc9f7D176c22': {
        decimals: 8,
        symbol: 'mUSDC',
        address: '0xEdc817A28E8B93B03976FBd4a3dDBc9f7D176c22',
        underlyingToken: base['usdc'],
      },
      '0x3bf93770f2d4a794c3d9EBEfBAeBAE2a8f09A5E5': {
        decimals: 8,
        symbol: 'mcbETH',
        address: '0x3bf93770f2d4a794c3d9EBEfBAeBAE2a8f09A5E5',
        underlyingToken: base['cbeth'],
      },
      '0x627Fe393Bc6EdDA28e99AE648fD6fF362514304b': {
        decimals: 8,
        symbol: 'mwstETH',
        address: '0x627Fe393Bc6EdDA28e99AE648fD6fF362514304b',
        underlyingToken: base['wsteth'],
      },
      '0xcb1dacd30638ae38f2b94ea64f066045b7d45f44': {
        decimals: 8,
        symbol: 'mrETH',
        address: '0xcb1dacd30638ae38f2b94ea64f066045b7d45f44',
        underlyingToken: base['reth'],
      },
      '0xb8051464C8c92209C92F3a4CD9C73746C4c3CFb3': {
        decimals: 8,
        symbol: 'mweETH',
        address: '0xb8051464C8c92209C92F3a4CD9C73746C4c3CFb3',
        underlyingToken: base['weeth'],
      },
      '0x73902f619CEB9B31FD8EFecf435CbDf89E369Ba6': {
        decimals: 8,
        symbol: 'mAERO',
        address: '0x73902f619CEB9B31FD8EFecf435CbDf89E369Ba6',
        underlyingToken: base['aero'],
      },
    },
  },
};

export default { basic, networks };
