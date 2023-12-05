import config from '@/config/uniswap';

export default function () {
  return Object.values(config.tokens || {});
}
