import { lazy } from 'react';
const Lido = lazy(() => import('./modules/lido'));
const Mantle = lazy(() => import('./modules/mantle'));
const RocketPool = lazy(() => import('./modules/rocket-pool'));
import { StyledModal, StyledModalBody, StyledOverlay } from './styles';

const ComponentMapping: any = {
  Lido,
  Mantle,
  RocketPool,
};
const Index = function (props: {
  dapp: {
    name: string;
    logo: string;
  };
  actionType: 'stake' | 'unstake';
  token0: string; // symbol
  token1: string; // symbol
  chainId: number;
}) {
  const { dapp, actionType } = props;
  const VmComponent = ComponentMapping[dapp.name as any];
  return (
    <StyledModal>
      <StyledOverlay />
      <StyledModalBody>
        <VmComponent actionType={actionType} />
      </StyledModalBody>
    </StyledModal>
  );
};
export default Index;
