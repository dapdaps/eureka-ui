import Eigenpie from './modules/eigenpie';
import EtherFi from './modules/ether-fi';
import Karak from './modules/karak';
import KelpDao from './modules/kelp-dao';
import Lido from './modules/lido';
import Mantle from './modules/mantle';
import RestakeFinance from './modules/restake-finance';
import RocketPool from './modules/rocket-pool';
import Puffer from './modules/puffer';
// const Lido = lazy(() => import('./modules/lido'));
// const Mantle = lazy(() => import('./modules/mantle'));
// const RocketPool = lazy(() => import('./modules/rocket-pool'));
// const KelpDao = lazy(() => import('./modules/kelp-dao'))

import { ethereum } from '@/config/tokens/ethereum';
import { StyledModal, StyledModalBody, StyledOverlay } from './styles';

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
  // const actionType = "restake"
  // const token0 = ethereum['stETH']
  // const token1 = ethereum['eETH']
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
