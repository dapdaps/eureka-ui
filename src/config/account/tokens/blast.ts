import type { Token } from '@/components/Bridge/types';
import { blast } from '@/config/tokens/blast';

export const blastTokens = {
  native: blast.eth,
  usdb: blast.usdb,
} as { [key: string]: Token };
