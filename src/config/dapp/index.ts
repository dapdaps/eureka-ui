import lending from './lending';
import staking from './staking';
import swap from './swap';
import liquidity from './liquidity';
import pool from './pool';

export default {
  ...swap,
  ...lending,
  ...staking,
  ...liquidity,
  ...pool,
} as { [key: string]: any };
