import { memo } from 'react';
import styled from 'styled-components';
import Breadcrumb from '@/components/Breadcrumb';
import DappCom from './DappCom';

const StyledPage = styled.div`
  padding: 50px 80px 0px;
`;

const DappName = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const StyledPowerHints = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 10px;
`;

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
        <DappCom {...props} />
      </div>
    </StyledPage>
  );
};

export default memo(Dapp);
