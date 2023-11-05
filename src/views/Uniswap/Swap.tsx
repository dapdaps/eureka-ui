import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';

import { useLayoutStore } from '@/stores/layout';

const testnet = {
  chainId: 59140,
  explor: 'https://goerli.lineascan.build',
  tokens: {
    native: {
      chainId: 59140,
      address: 'native',
      decimals: 18,
      symbol: 'ETH',
      name: 'Ether',
      icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
      isUp: true,
      isImport: false,
    },
    '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068': {
      chainId: 59140,
      address: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin',
      icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla',
      isUp: true,
      isImport: false,
    },
  },
  contracts: {
    routerAddress: '0x6aa397CAB00a2A40025Dbf839a83f16D5EC7c1eB',
    quoterAddress: '0x2Dd5C9E53d6467E13d77037d4a9E9b84571eAE2e',
    wethAddress: '0x2c1b868d6596a18e32e61b901e4060c872647b6c',
  },
};
const mainnet = {
  chainId: 59144,
  explor: 'https://lineascan.build',
  tokens: {},
  contracts: {
    routerAddress: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
    quoterAddress: '0x42bE4D6527829FeFA1493e1fb9F3676d2425C3C1',
    wethAddress: '',
  },
};
const IS_DEV = true;
const config = IS_DEV ? testnet : mainnet;

export default function Swap() {
  const setLayoutStore = useLayoutStore((store) => store.set);
  return (
    <>
      <ComponentWrapperPage
        componentProps={{
          ...config,
          onOpenBridge: () => {
            setLayoutStore({
              showAccountSider: true,
              defaultTab: 'bridge',
            });
          },
          onOpenCode: () => {
            window.open(
              'https://near.org/near/widget/ComponentDetailsPage?src=dapdapbos.near/widget/Linea.Uniswap.Swap.Dex&tab=source',
              '_blank',
            );
          },
        }}
        src={'dapdapbos.near/widget/Linea.Uniswap.Swap.Dex'}
      />
    </>
  );
}
