import { memo, useMemo } from 'react';
import styled from 'styled-components';

import chains from '@/config/chains';

import { getChainLogo } from '../../helpers';

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
  return chain ? <StyledChainLogo src={getChainLogo(chain.chainName)} /> : null;
};

const Network = ({ chainIds }: any) => {
  return (
    <StyledContainer>
      {chainIds?.map((chainId: number) => <ChainLogo key={chainId} chainId={chainId} />)}
    </StyledContainer>
  );
};

export default memo(Network);
