import { memo, useMemo } from 'react';
import PoolDapp from './PoolDapp';
import BosDapp from './BosDapp';

const DappCom = (props: any) => {
  const { dapp } = props;
  const isPool = useMemo(() => ['dapp/thruster-liquidity'].includes(dapp?.route), [dapp]);

  if (isPool) return <PoolDapp {...props} />;

  return <BosDapp {...props} />;
};

export default memo(DappCom);
