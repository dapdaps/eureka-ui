import config from '@/config/uniswap/linea';

export default function () {
  return Object.values(config.tokens || {});
}
