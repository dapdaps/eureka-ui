import { memo, useMemo } from 'react';
import PoolDapp from './PoolDapp';
import BosDapp from './BosDapp';
import KimExchangePoolDapp from './KimExchangePool';

const DappCom = (props: any) => {
  const { dapp } = props;
  const isPool = useMemo(() => ['dapp/thruster-liquidity'].includes(dapp?.route), [dapp]);
  const isKimExchangePool = useMemo(() => ['dapp/kim-exchange-liquidity'].includes(dapp?.route), [dapp]);

  if (isPool) return <PoolDapp {...props} />;

  if (isKimExchangePool) return <KimExchangePoolDapp {...props} />;

  return <BosDapp {...props} />;
};

export default memo(DappCom);
