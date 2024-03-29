import { memo, useMemo } from 'react';
import chains from '@/config/chains';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledChainLogo = styled.img`
  width: 20px;
  height: 20px;
`;

const ChainLogo = ({ chainId }: any) => {
  const chain = useMemo(() => {
    return chains[chainId];
  }, [chainId]);
  return chain ? <StyledChainLogo src={chain.icon} /> : null;
};

const Network = ({ chainIds }: any) => {
  return (
    <StyledContainer>
      {chainIds?.map((chainId: number) => <ChainLogo key={chainId} chainId={chainId} />)}
    </StyledContainer>
  );
};

export default memo(Network);
