import lending from './lending';
import liquidity from './liquidity';
import pool from './pool';
import staking from './staking';
import swap from './swap';

export default {
  ...swap,
  ...lending,
  ...staking,
  ...liquidity,
  ...pool,
} as { [key: string]: any };
