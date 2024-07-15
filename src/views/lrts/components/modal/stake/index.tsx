import { lazy } from 'react';
import Lido from './modules/lido';
import Mantle from './modules/mantle';
import RocketPool from './modules/rocket-pool';
import KelpDao from './modules/kelp-dao';
import Karak from './modules/karak';
// const Lido = lazy(() => import('./modules/lido'));
// const Mantle = lazy(() => import('./modules/mantle'));
// const RocketPool = lazy(() => import('./modules/rocket-pool'));
// const KelpDao = lazy(() => import('./modules/kelp-dao'))

import { StyledModal, StyledModalBody, StyledOverlay } from './styles';

const ComponentMapping: any = {
  Lido,
  Mantle,
  RocketPool,
  KelpDao,
  Karak,
};
const Index = function (props: {
  dapp: {
    name: string;
    logo: string;
  };
  setShow: (value: boolean) => void;
  actionType: 'stake' | 'unstake';
  token0: object; // symbol
  token1: object; // symbol
  chainId: number;
}) {
  const { dapp, setShow, actionType, token0, token1, chainId } = props;
  const VmComponent = ComponentMapping[dapp?.name];
  console.log('==props', props);
  return (
    <StyledModal>
      <StyledOverlay />
      <StyledModalBody>
        <VmComponent actionType={actionType} setShow={setShow} token0={token0} token1={token1} chainId={chainId} />
      </StyledModalBody>
    </StyledModal>
  );
};
export default Index;
