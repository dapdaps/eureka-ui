import { memo, Suspense, lazy } from 'react';
import DappCom from './DappCom';
import ExtraWard from './components/ExtraReward';
import { StyledPage, DappName, StyledPowerHints, StyledDappWrapper, StyledLoadingWrapper } from './styles';
import Loading from '@/components/Icons/Loading';
import DappBack from '@/components/DappBack';
import DappFallback from '@/views/Dapp/components/Fallback';

export { default as Empty } from './Empty';

const DappDetail = lazy(() => import('./components/DappDetail'));

const Dapp = (props: any) => {
  const { dapp } = props;
  return (
    <StyledPage>
      <DappBack />
      <div style={{ margin: '0 auto', padding: '20px 0px' }}>
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
          {dapp.name === 'Ring Protocol' && <ExtraWard dapp={dapp} />}
          <DappCom {...props} />
        </StyledDappWrapper>
        <Suspense fallback={<DappFallback />}>
          <DappDetail {...dapp}/>
        </Suspense>
      </div>
    </StyledPage>
  );
};

export default memo(Dapp);
