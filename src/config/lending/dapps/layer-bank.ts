import { linea } from '@/config/tokens/linea';
import { manta } from '@/config/tokens/manta';
import { mode } from '@/config/tokens/mode';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'LayerBank',
  icon: '/images/apps/layer-bank.png',
  data: 'bluebiu.near/widget/Lending.Data.LayerBank',
  handler: 'bluebiu.near/widget/Lending.Handler.LayerBank',
  handlerClaim: 'bluebiu.near/widget/Linea.Lending.LayerBankHandlerClaim',
  loaderName: 'LayerBank'
};

const networks = {
  59144: {
    unitrollerAddress: '0x43Eac5BFEa14531B8DE0B334E123eA98325de866',
    oracleAddress: '0x35A8C6050591C2f65B3e926B4b2eF825E3766bd6',
    // Upgrade to v2, and get the rateModelAddress from the cToken contract
    // rateModelSlopeAddress: '0xC690549E0215192D1fFB527BB3ca4D4Ba638Cad2',
    distributionAddress: '0x5D06067f86946620C326713b846DdC8B97470957',
    defaultMarket: '0x9E9aec6a296f94C8530e2dD01FF3E9c61555D39a',
    markets: {
      '0x9E9aec6a296f94C8530e2dD01FF3E9c61555D39a': {
        decimals: 18,
        symbol: 'lETH',
        address: '0x9E9aec6a296f94C8530e2dD01FF3E9c61555D39a',
        underlyingToken: linea['eth']
      },
      '0x5924117c4a5e000312684A5e76E90cC93AdDdE6b': {
        decimals: 18,
        symbol: 'lUSDC',
        address: '0x5924117c4a5e000312684A5e76E90cC93AdDdE6b',
        underlyingToken: linea['usdc']
      },
      '0xCCba9Ac94531E15aA55D9065e398812F06B84F14': {
        decimals: 18,
        symbol: 'lWBTC',
        address: '0xCCba9Ac94531E15aA55D9065e398812F06B84F14',
        underlyingToken: linea['wbtc']
      },
      '0x8FeFABe1b9A530D9d0f0Ef25e84a9D8B56aB2053': {
        decimals: 18,
        symbol: 'lwstETH',
        address: '0x8FeFABe1b9A530D9d0f0Ef25e84a9D8B56aB2053',
        underlyingToken: linea['wsteth']
      },
      '0x2c88A441418E06b9F3e565c2f866Fcb03c9409E2': {
        decimals: 18,
        symbol: 'lezETH',
        address: '0x2c88A441418E06b9F3e565c2f866Fcb03c9409E2',
        underlyingToken: linea['ezeth']
      },
      '0x9F8B5dE4191DB60e7b1d2Ed448084657C0B46c19': {
        decimals: 18,
        symbol: 'lwrsETH',
        address: '0x9F8B5dE4191DB60e7b1d2Ed448084657C0B46c19',
        underlyingToken: linea['wrseth']
      },
      // This asset cannot be used as collateral at this time
      '0x67492784Ec588681e55b2BFC0118d882a8F23E48': {
        decimals: 18,
        symbol: 'lSTONE',
        address: '0x67492784Ec588681e55b2BFC0118d882a8F23E48',
        underlyingToken: linea['stone']
      },
      '0xB01F9DE93374a6b287372008AB8739C7dDB7Ce28': {
        decimals: 18,
        symbol: 'lSolvBTC',
        address: '0xB01F9DE93374a6b287372008AB8739C7dDB7Ce28',
        underlyingToken: linea['solv-btc']
      },
      '0xb81b1E2EE4C867c95eC7041f6c22E0e89328D890': {
        decimals: 18,
        symbol: 'lMBTC',
        address: '0xb81b1E2EE4C867c95eC7041f6c22E0e89328D890',
        underlyingToken: linea['m-btc']
      },
      // This asset cannot be used as collateral at this time
      '0xF46680E9987f334041656AbEb83B87c2494dc751': {
        decimals: 18,
        symbol: 'luniETH',
        address: '0xF46680E9987f334041656AbEb83B87c2494dc751',
        underlyingToken: linea['uni-eth']
      },
      '0x14ABc603b6471aAe51f92e6f7cC5bE7cc6EEFD14': {
        decimals: 18,
        symbol: 'lweETH',
        address: '0x14ABc603b6471aAe51f92e6f7cC5bE7cc6EEFD14',
        underlyingToken: linea['weeth']
      }
    },
    rewardToken: linea['lab']
  },
  169: {
    unitrollerAddress: '0xB7A23Fc0b066051dE58B922dC1a08f33DF748bbf',
    oracleAddress: '0x6e3661519025D6cBcAFD3013D5BDB7aB71741B99',
    rateModelSlopeAddress: '0x27F85bD47740139a56e34124B33481ea6e1e660D',
    distributionAddress: '0x67c10B7b8eEFe92EB4DfdEeedd94263632E483b0',
    markets: {
      '0x472D43A8f00A41c3431e549367d2DE2E07c5e388': {
        decimals: 18,
        symbol: 'lwUSDM',
        address: '0x472D43A8f00A41c3431e549367d2DE2E07c5e388',
        underlyingToken: manta['wusdm']
      },
      '0x71384B2c17433Ba1D8F6Fe895E9B2E7953dCED68': {
        decimals: 18,
        symbol: 'lSTONE',
        address: '0x71384B2c17433Ba1D8F6Fe895E9B2E7953dCED68',
        underlyingToken: manta['stone']
      },
      '0x7479c717f2B72116D15B4eaF8D540C497E07e0B6': {
        decimals: 18,
        symbol: 'lETH',
        address: '0x7479c717f2B72116D15B4eaF8D540C497E07e0B6',
        underlyingToken: manta['eth']
      },
      '0x7Def25c6C2b4Bc9e9fB5122D22650F8EcdFeff45': {
        decimals: 18,
        symbol: 'lUSDC',
        address: '0x7Def25c6C2b4Bc9e9fB5122D22650F8EcdFeff45',
        underlyingToken: manta['usdc']
      },
      '0x9d8Ecb502d2Ac290644D70A096165188D47e21A4': {
        decimals: 18,
        symbol: 'lTIA',
        address: '0x9d8Ecb502d2Ac290644D70A096165188D47e21A4',
        underlyingToken: manta['tia']
      },
      '0xDF4b60ce539648AB05541827A3bf0a079a5fc1C2': {
        decimals: 18,
        symbol: 'lwstETH',
        address: '0xDF4b60ce539648AB05541827A3bf0a079a5fc1C2',
        underlyingToken: manta['wsteth']
      },
      '0x604ddc9c59572D197B983F0578e58e61026765eD': {
        decimals: 18,
        symbol: 'lMANTA',
        address: '0x604ddc9c59572D197B983F0578e58e61026765eD',
        underlyingToken: manta['manta']
      }
    },
    rewardToken: manta['lab']
  },
  534352: {
    unitrollerAddress: '0xEC53c830f4444a8A56455c6836b5D2aA794289Aa',
    oracleAddress: '0x760bd7Fc100F217678D1b521404D2E93Db7Bec5F',
    rateModelSlopeAddress: '0x18941f10B29a7F6d5290F3B1D5fcC7ae9f6f8DF4',
    distributionAddress: '0xF1F897601A525F57c5EA751a1F3ec5f9ADAc0321',
    markets: {
      '0x274C3795dadfEbf562932992bF241ae087e0a98C': {
        decimals: 18,
        symbol: 'lETH',
        address: '0x274C3795dadfEbf562932992bF241ae087e0a98C',
        underlyingToken: { ...scroll['eth'], address: '0x0000000000000000000000000000000000000000' }
      },
      '0x0D8F8e271DD3f2fC58e5716d3Ff7041dBe3F0688': {
        decimals: 18,
        symbol: 'lUSDC',
        address: '0x0D8F8e271DD3f2fC58e5716d3Ff7041dBe3F0688',
        underlyingToken: scroll['usdc']
      },
      '0xB6966083c7b68175B4BF77511608AEe9A80d2Ca4': {
        decimals: 18,
        symbol: 'lwstETH',
        address: '0xB6966083c7b68175B4BF77511608AEe9A80d2Ca4',
        underlyingToken: scroll['wsteth']
      },
      '0xec0AD3f43E85fc775a9C9b77f0F0aA7FE5A587d6': {
        decimals: 18,
        symbol: 'lwrsETH',
        address: '0xec0AD3f43E85fc775a9C9b77f0F0aA7FE5A587d6',
        underlyingToken: scroll['wrseth']
      },
      '0xE5C40a3331d4Fb9A26F5e48b494813d977ec0A8E': {
        decimals: 18,
        symbol: 'lSTONE',
        address: '0xE5C40a3331d4Fb9A26F5e48b494813d977ec0A8E',
        underlyingToken: scroll['stone']
      },
      '0xBd1d62e74c6d165ccae6d161588a3768023DCc18': {
        decimals: 18,
        symbol: 'luniETH',
        address: '0xBd1d62e74c6d165ccae6d161588a3768023DCc18',
        underlyingToken: scroll['uniETH']
      },
      '0xc40D6957B8110eC55f0F1A20d7D3430e1d8Aa4cf': {
        decimals: 18,
        symbol: 'lWBTC',
        address: '0xc40D6957B8110eC55f0F1A20d7D3430e1d8Aa4cf',
        underlyingToken: scroll['wbtc']
      },
      '0xE0Cee49cC3C9d047C0B175943ab6FCC3c4F40fB0': {
        decimals: 18,
        symbol: 'lUSDT',
        address: '0xE0Cee49cC3C9d047C0B175943ab6FCC3c4F40fB0',
        underlyingToken: scroll['usdt']
      },
      '0x576D2072403Cc35a2d5CdA140C07Fef557065Dd2': {
        decimals: 18,
        symbol: 'lpufETH',
        address: '0x576D2072403Cc35a2d5CdA140C07Fef557065Dd2',
        underlyingToken: scroll['pufETH']
      },
      '0x3335dbeFE7d40d43B1891109294938336f429a4C': {
        decimals: 18,
        symbol: 'lweETH',
        address: '0x3335dbeFE7d40d43B1891109294938336f429a4C',
        underlyingToken: scroll['we-eth']
      },
      '0x0EB776F939BC1eF2dd8efb4B4e01729f43a24148': {
        decimals: 18,
        symbol: 'lUSDe',
        address: '0x0EB776F939BC1eF2dd8efb4B4e01729f43a24148',
        underlyingToken: scroll['usde']
      }
    },
    rewardToken: scroll['lab']
  },
  34443: {
    unitrollerAddress: '0x80980869D90A737aff47aBA6FbaA923012C1FF50',
    oracleAddress: '0x310E183416d7f266C150e7244733d1DcB1470172',
    rateModelSlopeAddress: '0x16Cd8DAcE8569c7bd4e903c864444367b9F7b1af',
    distributionAddress: '0xe8C3BA0c2AC39F9d97BCEBf913e480b55d4C1AeC',
    defaultMarket: '',
    markets: {
      '0xe855B8018C22A05F84724e93693caf166912aDD5': {
        decimals: 18,
        symbol: 'lETH',
        address: '0xe855B8018C22A05F84724e93693caf166912aDD5',
        underlyingToken: mode['eth']
      },
      '0xd97905cC56030a6E9b618d6e26Cc9Ee2eAA15948': {
        decimals: 18,
        symbol: 'lezETH',
        address: '0xd97905cC56030a6E9b618d6e26Cc9Ee2eAA15948',
        underlyingToken: mode['ezeth']
      },
      '0x66a5e18E36bfeA86074A047954fEC7c94ced366E': {
        decimals: 18,
        symbol: 'lwrsETH',
        address: '0x66a5e18E36bfeA86074A047954fEC7c94ced366E',
        underlyingToken: mode['wrseth']
      },
      '0xBa6e89c9cDa3d72B7D8D5B05547a29f9BdBDBaec': {
        decimals: 18,
        symbol: 'lUSDC',
        address: '0xBa6e89c9cDa3d72B7D8D5B05547a29f9BdBDBaec',
        underlyingToken: mode['usdc']
      },
      '0xC5b9CB1A26Fb1f9b8e26D8D357Cb950f53Df4959': {
        decimals: 18,
        symbol: 'lUSDT',
        address: '0xC5b9CB1A26Fb1f9b8e26D8D357Cb950f53Df4959',
        underlyingToken: mode['usdt']
      },
      '0xfd160B6818254AF48171a7731EbA26deE6F16902': {
        decimals: 18,
        symbol: 'lweETH',
        address: '0xfd160B6818254AF48171a7731EbA26deE6F16902',
        underlyingToken: mode['we-eth']
      },
      '0x6A0d9584D88D22BcaD7D4F83E7d6AB7949895DDF': {
        decimals: 18,
        symbol: 'lSTONE',
        address: '0x6A0d9584D88D22BcaD7D4F83E7d6AB7949895DDF',
        underlyingToken: mode['stone']
      },
      '0x59dd441184024a77fd17e68f07E242622806c256': {
        decimals: 18,
        symbol: 'lMBTC',
        address: '0x59dd441184024a77fd17e68f07E242622806c256',
        underlyingToken: mode['m-btc']
      },
      '0x7c57DBA8512E2EbeeAc37Aa65F51256B9326cc4d': {
        decimals: 18,
        symbol: 'lMODE',
        address: '0x7c57DBA8512E2EbeeAc37Aa65F51256B9326cc4d',
        underlyingToken: mode['mode']
      },
      '0xbd9eDF764BC1f219c124aD5CFa7084BbeD124aa8': {
        decimals: 18,
        symbol: 'lweETH.mode',
        address: '0xbd9eDF764BC1f219c124aD5CFa7084BbeD124aa8',
        underlyingToken: mode['we-eth.mode']
      }
    },
    rewardToken: mode['lab']
  }
};

export default { basic, networks };
