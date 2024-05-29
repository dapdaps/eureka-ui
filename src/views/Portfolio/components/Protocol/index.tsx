import { memo, useMemo, useState } from 'react';
import ChartComponent from '@/views/Portfolio/components/Protocol/Chart';
import { StyledContainer } from '@/views/Portfolio/components/Protocol/styles';
import Distribution from '@/views/Portfolio/components/Protocol/Distribution';
import { StyledFlex } from '@/styled/styles';
import { CategoryList } from '@/views/Portfolio/config';
import Category from '@/views/Portfolio/components/Protocol/Category';
import Title from '@/views/Portfolio/components/Protocol/Title';
import ChainCard from '@/views/Portfolio/components/Protocol/ChainCard';
import DAppCard from '@/views/Portfolio/components/Protocol/DAppCard';
import DetailCard from '@/views/Portfolio/components/Protocol/DetailCard';

const Protocol = ({ dapps, filterFunc, loading }: any) => {

  const chainData = [
    { chain_id: 1, name: 'Polygon zkEVM', usd: 215.78, bgColor: '#3C225F' },
    { chain_id: 2, name: 'Chain2', usd: 150.22, bgColor: '#5D4D39' },
    { chain_id: 3, name: 'Chain3', usd: 100.33, bgColor: '#4C4C03' },
    { chain_id: 4, name: 'Chain4', usd: 50.45, bgColor: '#001880' },
    { chain_id: 5, name: 'Chain5', usd: 45.67, bgColor: '#0E4658' },
    { chain_id: 6, name: 'Chain6', usd: 30.12, bgColor: '#163719' },
    { chain_id: 7, name: 'Chain7', usd: 10.50, bgColor: '#454E00' },
    { chain_id: 8, name: 'Chain8', usd: 1.23, bgColor: '#ff5f00' },
  ];
  const dAppData = [
    { id: 1, name: 'PenPad', usd: 515.78, category: 'Staking' },
    { id: 2, name: 'DApp2', usd: 450.22, category: 'Bridge' },
    { id: 3, name: 'DApp3', usd: 200.33, category: 'Bridge' },
    { id: 4, name: 'DApp4', usd: 150.45, category: 'Bridge' },
    { id: 5, name: 'DApp5', usd: 95.67, category: 'Staking' },
    { id: 6, name: 'DApp6', usd: 60.12, category: 'Staking' },
    { id: 7, name: 'DApp7', usd: 40.50, category: 'Staking' },
  ];

  return (
    <StyledContainer>
      <StyledFlex justifyContent="space-between" alignItems="stretch" gap="16px" style={{ flexWrap: 'wrap' }}>
        <ChartComponent />
        <Distribution chainData={chainData} dAppData={dAppData} />
      </StyledFlex>
      <StyledFlex justifyContent="space-between" alignItems="stretch" gap="10px" style={{ flexWrap: 'wrap', marginTop: 16 }}>
        {
          Object.values(CategoryList).map((cate) => (
            <Category
              key={cate.key}
              title={cate.label}
              icon={cate.icon}
              usd={cate.usd}
              executions={cate.executions}
            />
          ))
        }
      </StyledFlex>
      <Title title="Chain Distribution" style={{ marginTop: 50 }}>
        <StyledFlex justifyContent="flex-start" alignItems="stretch" gap="12px" style={{ flexWrap: 'wrap' }}>
          {
            chainData.map((chain) => (
              <ChainCard key={chain.chain_id} chain={chain} />
            ))
          }
        </StyledFlex>
      </Title>
      <Title title="dApp Distribution" style={{ marginTop: 50 }}>
        <StyledFlex justifyContent="flex-start" alignItems="stretch" gap="10px" style={{ flexWrap: 'wrap' }}>
          {
            dAppData.map((dapp) => (
              <DAppCard key={dapp.id} dapp={dapp} />
            ))
          }
        </StyledFlex>
      </Title>
      <Title title="Detail" style={{ marginTop: 50 }}>
        {
          dAppData.map((dapp) => (
            <DetailCard key={dapp.id} dapp={dapp} style={{ marginBottom: 20 }} />
          ))
        }
      </Title>
    </StyledContainer>
  );
};

export default memo(Protocol);
