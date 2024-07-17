import Eigenpie from './modules/eigenpie';
import EtherFi from './modules/ether-fi';
import Inception from './modules/inception';
import Karak from './modules/karak';
import KelpDao from './modules/kelp-dao';
import Lido from './modules/lido';
import Mantle from './modules/mantle';
import Puffer from './modules/puffer';
import RestakeFinance from './modules/restake-finance';
import RocketPool from './modules/rocket-pool';
import Renzo from './modules/renzo';
// const Lido = lazy(() => import('./modules/lido'));
// const Mantle = lazy(() => import('./modules/mantle'));
// const RocketPool = lazy(() => import('./modules/rocket-pool'));
// const KelpDao = lazy(() => import('./modules/kelp-dao'))
import useAddAction from '@/hooks/useAddAction';
import { StyledModal, StyledModalBody, StyledOverlay } from './styles';
import { useState } from 'react';

const ComponentMapping: any = {
  Lido,
  Mantle,
  RocketPool,
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
  const { dapp, gem, box, setShow, token0, token1, chainId } = props;
  console.log('=gem?.dapp?.name', gem?.dapp?.name || dapp?.name)
  const VmComponent = ComponentMapping[gem?.dapp?.name || dapp?.name];

  console.log('=dapp', dapp)
  console.log('=token0', token0)
  console.log('=token1', token1)
  console.log('=gem', gem)
  console.log('=box', box)
  const [actionType, setActionType] = useState(gem ? 'restake' : 'stake');
  const handleChangeActionType = function (_actionType: any) {
    setActionType(_actionType);
  };

  return (
    <StyledModal>
      <StyledOverlay />
      <StyledModalBody>
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
        />
      </StyledModalBody>
    </StyledModal>
  );
};
export default Index;
