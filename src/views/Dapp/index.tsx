import { memo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import DappCom from './DappCom';
import ExtraWard from './components/ExtraReward';
import { StyledPage, DappName, StyledPowerHints, StyledDappWrapper } from './styles';
import DappDetail from './components/DappDetail';

export { default as Empty } from './Empty';

const Dapp = (props: any) => {
  const { dapp } = props;
  return (
    <StyledPage>
      <Breadcrumb
        navs={[
          { name: 'Home', path: '/' },
          { name: 'dApps', path: '/alldapps' },
          { name: dapp.name, path: '' },
        ]}
      />
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
        <DappDetail {...dapp}/>
      </div>
    </StyledPage>
  );
};

export default memo(Dapp);
