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
// const Lido = lazy(() => import('./modules/lido'));
// const Mantle = lazy(() => import('./modules/mantle'));
// const RocketPool = lazy(() => import('./modules/rocket-pool'));
// const KelpDao = lazy(() => import('./modules/kelp-dao'))
import useAddAction from '@/hooks/useAddAction';
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
  Inception,
};
const Index = function (props: {
  dapp: {
    name: string;
    logo: string;
  };
  setShow: (value: boolean) => void;
  token0: object; // symbol
  token1: object; // symbol
  chainId: number;
}) {
  const { addAction } = useAddAction('lrts');
  const { dapp, setShow, token0, token1, chainId } = props;
  const VmComponent = ComponentMapping[dapp?.name];
  return (
    <StyledModal>
      <StyledOverlay />
      <StyledModalBody>
        <VmComponent
          dapp={dapp}
          addAction={addAction}
          setShow={setShow}
          token0={token0}
          token1={token1}
          chainId={chainId}
        />
      </StyledModalBody>
    </StyledModal>
  );
};
export default Index;
