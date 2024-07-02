import { linea } from '@/config/tokens/linea';
import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'Kelp',
};

const networks = {
  59144: {
    tokenPairs: [linea['rseth'], linea['wrseth']],
  },
  34443: {
    tokenPairs: [mode['rseth'], mode['wrseth']],
  },
};

export default { basic, networks };
