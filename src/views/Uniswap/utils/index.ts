import config from '@/config/uniswap';

export function getTokenAddress(address: string, reverse?: boolean) {
  if (address === config.wethToken.address && !reverse) return 'native';
  if (address === 'native' && reverse) return config.wethToken.address;
  return address;
}
