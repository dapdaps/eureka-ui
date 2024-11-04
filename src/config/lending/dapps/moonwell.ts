import { base } from '@/config/tokens/base';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Moonwell',
  icon: '/assets/dapps/moonwell.png',
  data: 'bluebiu.near/widget/Lending.Data.Moonwell',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  handlerClaim: 'bluebiu.near/widget/Base.Lending.MoonwellHandlerClaim',
  loaderName: 'Moonwell'
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
        underlyingToken: base['usdbc']
      },
      '0x628ff693426583D9a7FB391E54366292F509D457': {
        decimals: 8,
        symbol: 'mWETH',
        address: '0x628ff693426583D9a7FB391E54366292F509D457',
        underlyingToken: base['weth']
      }
    }
  },
  10: {
    unitrollerAddress: '0xCa889f40aae37FFf165BccF69aeF1E82b5C511B9',
    oracleAddress: '0x2f1490bD6aD10C9CE42a2829afa13EAc0b746dcf',
    rewardDistributorAddress: '0xF9524bfa18C19C3E605FbfE8DFd05C6e967574Aa',
    markets: {
      '0x8E08617b0d66359D73Aa11E11017834C29155525': {
        decimals: 8,
        symbol: 'mUSDC',
        address: '0x8E08617b0d66359D73Aa11E11017834C29155525',
        underlyingToken: optimism['usdc']
      },
      '0xa3A53899EE8f9f6E963437C5B3f805FEc538BF84': {
        decimals: 8,
        symbol: 'mUSDT',
        address: '0xa3A53899EE8f9f6E963437C5B3f805FEc538BF84',
        underlyingToken: optimism['usdt']
      },
      '0x3FE782C2Fe7668C2F1Eb313ACf3022a31feaD6B2': {
        decimals: 8,
        symbol: 'mDAI',
        address: '0x3FE782C2Fe7668C2F1Eb313ACf3022a31feaD6B2',
        underlyingToken: optimism['dai']
      },
      '0xb4104C02BBf4E9be85AAa41a62974E4e28D59A33': {
        decimals: 8,
        symbol: 'mWETH',
        address: '0xb4104C02BBf4E9be85AAa41a62974E4e28D59A33',
        underlyingToken: optimism['weth']
      },
      '0x6e6CA598A06E609c913551B729a228B023f06fDB': {
        decimals: 8,
        symbol: 'mWBTC',
        address: '0x6e6CA598A06E609c913551B729a228B023f06fDB',
        underlyingToken: optimism['wbtc']
      },
      '0xbb3b1aB66eFB43B10923b87460c0106643B83f9d': {
        decimals: 8,
        symbol: 'mwstETH',
        address: '0xbb3b1aB66eFB43B10923b87460c0106643B83f9d',
        underlyingToken: optimism['wstETH']
      },
      '0x95C84F369bd0251ca903052600A3C96838D78bA1': {
        decimals: 8,
        symbol: 'mcbETH',
        address: '0x95C84F369bd0251ca903052600A3C96838D78bA1',
        underlyingToken: optimism['cbETH']
      },
      '0x4c2E35E3eC4A0C82849637BC04A4609Dbe53d321': {
        decimals: 8,
        symbol: 'mrETH',
        address: '0x4c2E35E3eC4A0C82849637BC04A4609Dbe53d321',
        underlyingToken: optimism['reth']
      },
      '0xb8051464C8c92209C92F3a4CD9C73746C4c3CFb3': {
        decimals: 8,
        symbol: 'mweETH',
        address: '0xb8051464C8c92209C92F3a4CD9C73746C4c3CFb3',
        underlyingToken: optimism['weeth']
      },
      '0x9fc345a20541Bf8773988515c5950eD69aF01847': {
        decimals: 8,
        symbol: 'mOP',
        address: '0x9fc345a20541Bf8773988515c5950eD69aF01847',
        underlyingToken: optimism['op']
      },
      '0x866b838b97Ee43F2c818B3cb5Cc77A0dc22003Fc': {
        decimals: 8,
        symbol: 'mVELO',
        address: '0x866b838b97Ee43F2c818B3cb5Cc77A0dc22003Fc',
        underlyingToken: optimism['velo']
      },
      '0x181bA797ccF779D8aB339721ED6ee827E758668e': {
        decimals: 8,
        symbol: 'mwrsETH',
        address: '0x181bA797ccF779D8aB339721ED6ee827E758668e',
        underlyingToken: optimism['wrseth']
      }
    }
  }
};

export default { basic, networks };
