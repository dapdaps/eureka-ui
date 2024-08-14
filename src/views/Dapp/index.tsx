import { memo, Suspense, lazy } from 'react';
import DappCom from './DappCom';
import {
  StyledPage,
  DappName,
  StyledPowerHints,
  StyledDappWrapper,
  StyledDAppContent,
} from './styles';
import DappDetailScroll from './components/DappDetail/Scroll';
import DappBack from '@/components/PageBack';
import DappFallback from '@/views/Dapp/components/Fallback';
export { default as Empty } from './Empty';

const DappDetail = lazy(() => import('./components/DappDetail'));

const Dapp = (props: any) => {
  const { dapp } = props;

  return (
    <StyledPage>
      <DappBack
        defaultPath="/alldapps"
        style={{
          maxWidth: 1260,
          minWidth: 1060,
          margin: '0 auto',
        }}
      />
      <StyledDAppContent>
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
