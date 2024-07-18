import { memo } from 'react';
import PoolV3 from './V3';
import PoolV2 from './V2';

const Pool = ({ poolVersion, ...rest }: any) => {
  return poolVersion === 'V3' ? (
    <PoolV3 {...rest} poolVersion={poolVersion} />
  ) : (
    <PoolV2 {...rest} poolVersion={poolVersion} />
  );
};

export default memo(Pool);
