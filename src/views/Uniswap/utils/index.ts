import config from '@/config/uniswap/linea';

export function getTokenAddress(address: string, reverse?: boolean) {
  if (address === config.wethToken.address && !reverse) return 'native';
  if (address === 'native' && reverse) return config.wethToken.address;
  return address;
}
