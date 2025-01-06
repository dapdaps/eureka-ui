import type { Token } from '@/types';

import arbitrum from './arbitrum';
import linea from './linea';
import scroll from './scroll';

export default {
  59144: linea,
  534352: scroll,
  42161: arbitrum
} as Record<number, Token[]>;
