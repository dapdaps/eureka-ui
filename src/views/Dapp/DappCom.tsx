import { memo, useMemo } from 'react';
import { find } from 'lodash';
import PoolDapp from './PoolDapp';
import BosDapp from './BosDapp';

const DappCom = (props: any) => {
  const { dapp } = props;
  const isPool = useMemo(() => {
    if (!dapp?.dapp_category) return false;
    if (!dapp.dapp_category.length) return false;
    return find(dapp.dapp_category, { category_id: 7 });
  }, [dapp]);

  if (isPool) return <PoolDapp {...props} />;

  return <BosDapp {...props} />;
};

export default memo(DappCom);
