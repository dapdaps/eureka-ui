import PoolV2 from './V2';
import PoolV3 from './V3';

const Pool = ({ poolVersion, ...rest }: any) => {
  return poolVersion === 'V3' ? (
    <PoolV3 {...rest} poolVersion={poolVersion} />
  ) : (
    <PoolV2 {...rest} poolVersion={poolVersion} />
  );
};

export default Pool;
