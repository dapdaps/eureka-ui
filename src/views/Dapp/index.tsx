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
        <DappCom {...props} />
      </div>
    </StyledPage>
  );
};

export default memo(Dapp);
