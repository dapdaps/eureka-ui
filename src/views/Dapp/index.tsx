import { lazy, memo, Suspense } from 'react';

import DappBack from '@/components/PageBack';
import useScrollMore from '@/hooks/useScrollMore';
import DappFallback from '@/views/Dapp/components/Fallback';

import DappDetailScroll from './components/DappDetail/Scroll';
import DappCom from './DappCom';
import { DappName, StyledDAppContent, StyledDappWrapper, StyledPage, StyledPowerHints } from './styles';
export { default as Empty } from './Empty';

const DappDetail = lazy(() => import('./components/DappDetail'));

const Dapp = (props: any) => {
  const { dapp, localConfig } = props;
  const { viewHeight } = useScrollMore({ gap: 42 });

  return (
    <StyledPage>
      <DappBack
        defaultPath="/alldapps"
        style={{
          maxWidth: 1260,
          minWidth: 1060,
          margin: '0 auto'
        }}
      />
      <StyledDAppContent style={{ minHeight: viewHeight }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', justifyContent: 'center' }}>
          <img
            src={dapp.logo || localConfig.basic?.logo || '/assets/dapps/default_token.png'}
            style={{ width: '32px', height: '31px' }}
          />
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
        <DappDetail {...dapp} />
      </Suspense>
    </StyledPage>
  );
};

export default memo(Dapp);
