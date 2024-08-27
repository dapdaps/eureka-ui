import { memo, useMemo } from 'react';
import styled from 'styled-components';

import chains from '@/config/chains';

import { getChainLogo } from '../../helpers';

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
  const chain = useMemo(() => {
    return chains[chainId];
  }, [chainId]);
  return chain ? (
    <StyledNetworkWithName>
      <StyledLogo src={getChainLogo(chain?.chainName)} />
      <StyledName>{chain?.chainName}</StyledName>
    </StyledNetworkWithName>
  ) : null;
};

export default memo(NetworkWithName);
