import { memo, Suspense, lazy } from 'react';
import DappCom from './DappCom';
import ExtraWard from './components/ExtraReward';
import {
  StyledPage,
  DappName,
  StyledPowerHints,
  StyledDappWrapper,
  StyledLoadingWrapper,
  StyledDAppContent,
} from './styles';
import DappDetailScroll from './components/DappDetail/Scroll';
import DappBack from '@/components/PageBack';
import DappFallback from '@/views/Dapp/components/Fallback';
import useScrollMore from '@/views/Dapp/components/DappDetail/useScrollMore';

export { default as Empty } from './Empty';

const DappDetail = lazy(() => import('./components/DappDetail'));

const Dapp = (props: any) => {
  const { dapp } = props;

  const { viewHeight } = useScrollMore();

  return (
    <StyledPage>
      <DappBack defaultPath="/alldapps" />
      <StyledDAppContent style={{ minHeight: viewHeight }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', justifyContent: 'center' }}>
          <img src={dapp.logo} style={{ width: '32px', height: '31px' }} />
          <DappName>{dapp.name}</DappName>
        </div>
        {dapp.name === 'Kim Exchange' && (
          <StyledPowerHints>
            <span>Powered by</span>
            <img src="/images/powers/algebra.png" style={{ width: '14px' }} />
            <span>Algebra</span>
          </StyledPowerHints>
        )}
        <StyledDappWrapper>
          <DappCom {...props} />
        </StyledDappWrapper>
      </StyledDAppContent>
      <DappDetailScroll />
      <Suspense fallback={<DappFallback />}>
        <DappDetail {...dapp}/>
      </Suspense>
    </StyledPage>
  );
};

export default memo(Dapp);
