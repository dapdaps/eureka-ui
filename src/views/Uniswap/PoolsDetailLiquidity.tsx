import { memo } from 'react';
import styled from 'styled-components';

import Back from './components/pools/Back';

const StyledContainer = styled.div`
  width: 810px;
`;

const PoolsDetailLiquidity = () => {
  return (
    <StyledContainer>
      <Back />
    </StyledContainer>
  );
};

export default memo(PoolsDetailLiquidity);
