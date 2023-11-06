import config from '@/config/uniswap/linea';

export function getTokenAddress(address: string) {
  if (address === config.contracts.wethAddress) return 'native';
  return address;
}
