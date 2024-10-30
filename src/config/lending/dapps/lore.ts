import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Lore Finance',
  icon: '/assets/dapps/lore.png',
  data: 'bluebiu.near/widget/Lending.Data.Radiant',
  handler: 'bluebiu.near/widget/Lending.Handler.Radiant',
  type: 'aave2',
  loaderName: 'LoreFinance'
};

const networks = {
  // scroll
  534352: {
    oracleAddress: '0x1958be6b2DabEfF36FF0665149E667717F5E573a',
    poolAddressProvider: '0x86f53066645DFfF98FD8CE64220f2A93B55518ce',
    aaveProtocolDataProviderAddress: '0xb17844F6E50f4eE8f8FeC7d9BA200B0E034b8236',
    lendingPoolAddress: '0x4cE1A1eC13DBd9084B1A741b036c061b2d58dABf',
    wethGateway: '0x204f5ccC7b5217B8477C8FA45708144FB0a61831',
    wethAddress: '0x5300000000000000000000000000000000000004',
    markets: {
      [scroll['weth'].address]: {
        decimals: 18,
        symbol: 'WETH',
        address: '0xF1792Ec678E2c90f44b8FcD137cc373280894927',
        underlyingToken: scroll['weth'],
        stableDebtTokenAddress: '0xB6A1bf12b59D7009637AdD07d3e5002382Fe218D',
        variableDebtTokenAddress: '0xb41aDc2a1189810989D45d92417cc558E8EEe66D'
      },
      [scroll['usdc'].address]: {
        decimals: 6,
        symbol: 'USDC',
        address: '0x19624e5e4aD3F8de2ab516C67645Bb5B79EcfFE6',
        underlyingToken: scroll['usdc'],
        stableDebtTokenAddress: '0xC852ee24d51EbD1cd9371ed2dADDB46feBc2b0FA',
        variableDebtTokenAddress: '0x8eC1B2570809cb5C6b10a85d952D40B8cF0DeDDC'
      },
      [scroll['usdt'].address]: {
        decimals: 6,
        symbol: 'USDT',
        address: '0xC5776416Ea3e88e04E95bCd3fF99b27902da7892',
        underlyingToken: scroll['usdt'],
        stableDebtTokenAddress: '0x7Be4c4DEFB1c9Fe04a48150F0e5e416Ba3171F28',
        variableDebtTokenAddress: '0x63591C6bDE1dEB1FcA7FCEA7b1AAeF96e8260f39'
      },
      [scroll['stone'].address]: {
        decimals: 18,
        symbol: 'STONE',
        address: '0x4f908f7E51E5f03C937452F74c467Bf071858Aaf',
        underlyingToken: scroll['stone'],
        stableDebtTokenAddress: '0xA0ffE748e72507B89FDAB163241a9D76FE2B6456',
        variableDebtTokenAddress: '0xF2A1fC52D4cFb59789faA7625C481984D44D6D21'
      },
      [scroll['wsteth'].address]: {
        decimals: 18,
        symbol: 'wstETH',
        address: '0xa847eaa620c3ddd8E25909eaA0CC94659ABE8939',
        underlyingToken: scroll['wsteth'],
        stableDebtTokenAddress: '0x5431D6a6CAbECBFA5f0bBf1b9529382D375eE919',
        variableDebtTokenAddress: '0xF38164575228DbC6EC4e38E460EDB4B8Ece86c33'
      },
      [scroll['we-eth'].address]: {
        decimals: 18,
        symbol: 'weETH',
        address: '0x80E0Fb6B416E1Ae9bBD02A9bC6A6D10C9E9D51B7',
        underlyingToken: scroll['we-eth'],
        stableDebtTokenAddress: '0xdC80674646De58A89702301a14C5b0C435816D3e',
        variableDebtTokenAddress: '0x9d4725c7E14bFcaE7CfB03925cbc3c1C1dE6CDB0'
      },
      [scroll['wrseth'].address]: {
        decimals: 18,
        symbol: 'wrsETH',
        address: '0xc28A5a35e98bCaC257440A4759B0E7Da3b35Ed69',
        underlyingToken: scroll['wrseth'],
        stableDebtTokenAddress: '0xa0ACB749F120Ab37bCBa371D2031B80C9f656421',
        variableDebtTokenAddress: '0xBD5e7Ae1dBF72FE0ea15207Fae21A4396246468c'
      }
    }
  }
};

export default { basic, networks };
