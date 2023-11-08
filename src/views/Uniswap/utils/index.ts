import config from '@/config/uniswap/linea';

export function getTokenAddress(address: string, reverse?: boolean) {
  if (address === config.contracts.wethAddress && !reverse) return 'native';
  if (address === 'native' && reverse) return config.contracts.wethAddress;
  return address;
}
