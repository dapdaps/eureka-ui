import { memo, useMemo } from 'react';
import { useChainsStore } from '@/stores/chains';
import styled from 'styled-components';

const StyledNetworkWithName = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
const StyledLogo = styled.img`
  width: 14.72px;
  height: 14.72px;
`;
const StyledName = styled.div`
  color: #7c7f96;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const NetworkWithName = ({ chainId }: any) => {
  const chains = useChainsStore((store: any) => store.chains);
  const chain = useMemo(() => {
    return chains.find((chain: any) => chain.chain_id === chainId);
  }, [chainId]);
  return chain ? (
    <StyledNetworkWithName>
      <StyledLogo src={chain.logo} />
      <StyledName>{chain.name}</StyledName>
    </StyledNetworkWithName>
  ) : null;
};

export default memo(NetworkWithName);
