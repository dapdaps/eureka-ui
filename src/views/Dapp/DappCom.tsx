import { memo, useMemo } from 'react';
import PoolDapp from './PoolDapp';
import BosDapp from './BosDapp';
import KimExchangePoolDapp from './KimExchangePool';
import SwapDapp from './SwapDapp';

const DappCom = (props: any) => {
  const { dapp, localConfig } = props;

  console.log(props);

  const isPool = useMemo(() => ['dapp/thruster-liquidity'].includes(dapp?.route), [dapp]);
  const isKimExchangePool = useMemo(() => ['dapp/kim-exchange-liquidity'].includes(dapp?.route), [dapp]);

  if (isPool) return <PoolDapp {...props} />;

  if (isKimExchangePool) return <KimExchangePoolDapp {...props} />;

  if (localConfig.type === 'swap') return <SwapDapp {...props} />;

  return <BosDapp {...props} />;
};

export default memo(DappCom);
