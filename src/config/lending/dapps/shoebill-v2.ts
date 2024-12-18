import { manta } from '@/config/tokens/manta';
import { metis } from '@/config/tokens/metis';

const basic = {
  name: 'Shoebill V2',
  icon: '/assets/dapps/shoebill-v2.png',
  data: 'bluebiu.near/widget/Lending.Data.ShoeBillV2',
  handler: 'bluebiu.near/widget/Lending.Handler.ShoeBillV2',
  loaderName: 'ShoebillV2'
};

const networks = {
  169: {
    markets: {
      '0x033F5e084a627cC420980ED9B1476C84A92FC5D4': {
        decimals: 8,
        symbol: 'sbSTONE',
        address: '0x033F5e084a627cC420980ED9B1476C84A92FC5D4',
        underlyingToken: manta['stone']
      },
      '0xE103F874B2D144C5B327FA3d57069Bb19c0779e2': {
        decimals: 8,
        symbol: 'sbETH',
        address: '0xE103F874B2D144C5B327FA3d57069Bb19c0779e2',
        underlyingToken: manta['eth']
      },
      '0xc0Ef6DEA74E54689867fDD5F0ab2202F7d8A0D7b': {
        decimals: 8,
        symbol: 'sbwUSDM',
        address: '0xc0Ef6DEA74E54689867fDD5F0ab2202F7d8A0D7b',
        underlyingToken: manta['wusdm']
      },
      '0xfF2033181Cbf7EE2656d9a527d378930b31C3a42': {
        decimals: 8,
        symbol: 'sbUSDC',
        address: '0xfF2033181Cbf7EE2656d9a527d378930b31C3a42',
        underlyingToken: manta['usdc']
      }
    }
  },
  1088: {
    markets: {
      '0x2B6647f63f6Fab5c73e96FBf974f4ed2AB8a4308': {
        decimals: 8,
        symbol: 'sbartMETIS',
        address: '0x2B6647f63f6Fab5c73e96FBf974f4ed2AB8a4308',
        underlyingToken: metis['artMETIS']
      },
      '0x386adCa3c7D5C90523287933B05919aFcC2883dE': {
        decimals: 8,
        symbol: 'sbMETIS',
        address: '0x386adCa3c7D5C90523287933B05919aFcC2883dE',
        underlyingToken: metis['metis']
      },
      '0xb0eee8DAC4E8fA3D73D84101B30aE0Fb359b7A2F': {
        decimals: 8,
        symbol: 'sbseMETIS',
        address: '0xb0eee8DAC4E8fA3D73D84101B30aE0Fb359b7A2F',
        underlyingToken: metis['seMetis']
      }
    }
  }
};

export default { basic, networks };
