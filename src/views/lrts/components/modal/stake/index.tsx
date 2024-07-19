// const Lido = lazy(() => import('./modules/lido'));
// const Mantle = lazy(() => import('./modules/mantle'));
// const RocketPool = lazy(() => import('./modules/rocket-pool'));
// const KelpDao = lazy(() => import('./modules/kelp-dao'))
import { useEffect, useState } from 'react';

import Modal from '@/components/Modal';
// const Lido = lazy(() => import('./modules/lido'));
// const Mantle = lazy(() => import('./modules/mantle'));
// const RocketPool = lazy(() => import('./modules/rocket-pool'));
// const KelpDao = lazy(() => import('./modules/kelp-dao'))
import useAddAction from '@/hooks/useAddAction';

import Eigenpie from './modules/eigenpie';
import EtherFi from './modules/ether-fi';
import Frax from './modules/Frax';
import Inception from './modules/inception';
import Karak from './modules/karak';
import KelpDao from './modules/kelp-dao';
import Lido from './modules/lido';
import Mantle from './modules/mantle';
import Puffer from './modules/puffer';
import Renzo from './modules/renzo';
import RestakeFinance from './modules/restake-finance';
import RocketPool from './modules/rocket-pool';
import { ethereum } from '@/config/tokens/ethereum';

const ComponentMapping: any = {
  Lido,
  Mantle,
  'Rocket Pool': RocketPool,
  'Frax Finance': Frax,
  KelpDao,
  Karak,
  Eigenpie,
  RestakeFinance,
  EtherFi,
  'Puffer Finance': Puffer,
  Inception,
  Renzo,
};
const Index = function (props: any) {
  const { addAction } = useAddAction('lrts');
  // const { dapp, gem, box, show, setShow, token0, token1, chainId } = props;
  // const VmComponent = ComponentMapping[gem?.dapp?.name || dapp?.name];
  const { dapp, gem, box, show, setShow, chainId, onSuccess } = props;
  const VmComponent = ComponentMapping["KelpDao"];
  const token0 = ethereum['stETH']
  const token1 = ethereum['rsETH']
  const [actionType, setActionType] = useState(gem ? 'restake' : 'stake');
  const handleChangeActionType = function (_actionType: any) {
    setActionType(_actionType);
  };
  console.log({
    dapp,
    gem,
  });
  useEffect(() => {
    setActionType(gem ? 'restake' : 'stake');
  }, [gem]);
  return (
    <Modal
      display={show}
      showHeader={false}
      width={620}
      modalStyle={{
        border: '1px solid #3f3f3f',
        background: '#2f2f2f',
        borderRadius: '4px',
        overflow: 'unset',
      }}
      content={
        <VmComponent
          gem={gem}
          box={box}
          dapp={dapp}
          addAction={addAction}
          setShow={setShow}
          token0={token0}
          token1={token1}
          chainId={chainId}
          actionType={actionType}
          handleChangeActionType={handleChangeActionType}
          onSuccess={onSuccess}
        />
      }
    />
  );
};
export default Index;
