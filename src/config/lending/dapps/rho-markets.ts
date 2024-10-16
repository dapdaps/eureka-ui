import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'RhoMarkets',
  icon: '/assets/dapps/layer-bank.png',
  data: 'bluebiu.near/widget/Lending.Data.LayerBank',
  handler: 'bluebiu.near/widget/Lending.Handler.LayerBank',
  handlerClaim: 'bluebiu.near/widget/Linea.Lending.LayerBankHandlerClaim',
  loaderName: 'RhoMarkets'
};

const networks = {
  534352: {
    unitrollerAddress: '0x8a67AB98A291d1AEA2E1eB0a79ae4ab7f2D76041',
    oracleAddress: '0x653C2D3A1E4Ac5330De3c9927bb9BDC51008f9d5',
    markets: {
      '0x639355f34Ca9935E0004e30bD77b9cE2ADA0E692': {
        decimals: 18,
        symbol: 'rETH',
        address: '0x639355f34Ca9935E0004e30bD77b9cE2ADA0E692',
        underlyingToken: scroll['eth']
      },
      '0xAD3d07d431B85B525D81372802504Fa18DBd554c': {
        decimals: 18,
        symbol: 'rSTONE',
        address: '0xAD3d07d431B85B525D81372802504Fa18DBd554c',
        underlyingToken: scroll['stone']
      },
      '0xAE1846110F72f2DaaBC75B7cEEe96558289EDfc5': {
        decimals: 6,
        symbol: 'rUSDC',
        address: '0xAE1846110F72f2DaaBC75B7cEEe96558289EDfc5',
        underlyingToken: scroll['usdc']
      },
      '0x855CEA8626Fa7b42c13e7A688b179bf61e6c1e81': {
        decimals: 6,
        symbol: ' rUSDT',
        address: '0x855CEA8626Fa7b42c13e7A688b179bf61e6c1e81',
        underlyingToken: scroll['usdt']
      },
      '0xe4FC4C444efFB5ECa80274c021f652980794Eae6': {
        decimals: 18,
        symbol: ' rwstETH',
        address: '0xe4FC4C444efFB5ECa80274c021f652980794Eae6',
        underlyingToken: scroll['wsteth']
      },
      '0x8966993138b95b48142f6ecB590427eb7e18a719': {
        decimals: 18,
        symbol: ' rsolvBTC',
        address: '0x8966993138b95b48142f6ecB590427eb7e18a719',
        underlyingToken: scroll['wsteth']
      },
      '0x65a5dBEf0D1Bff772822E4652Aed2829718DC43F': {
        decimals: 18,
        symbol: ' rweETH',
        address: '0x65a5dBEf0D1Bff772822E4652Aed2829718DC43F',
        underlyingToken: scroll['we-eth']
      },
      '0x52Fef2B9040BA81e40421660335655D70Fe8Cf03': {
        decimals: 18,
        symbol: ' rwrsETH',
        address: '0x52Fef2B9040BA81e40421660335655D70Fe8Cf03',
        underlyingToken: scroll['wrseth']
      },
      '0x5fF1926507f6e71bFbd5f9897fBaeF021E2F77CA': {
        decimals: 18,
        symbol: ' rUSDe',
        address: '0x5fF1926507f6e71bFbd5f9897fBaeF021E2F77CA',
        underlyingToken: scroll['usde']
      }
    }
  }
};

export default { basic, networks };
