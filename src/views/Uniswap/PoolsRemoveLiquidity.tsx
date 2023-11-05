import { memo } from 'react';
import styled from 'styled-components';

import PoolRemoveAmount from './components/pools/PoolRemoveAmount';
import PoolRemoveCollect from './components/pools/PoolRemoveCollect';
import PoolRemovePair from './components/pools/PoolRemovePair';
import PoolRemoveToken from './components/pools/PoolRemoveToken';
import RemoveButton from './components/pools/RemoveButton';
import Head from './components/pools/RemoveHead';

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
  background-color: #131313;
`;
const StyledBody = styled.div`
  padding: 20px;
`;

const PoolsAddLiquidity = () => {
  return (
    <StyledContainer>
      <Head />
      <StyledBody>
        <PoolRemovePair />
        <PoolRemoveAmount />
        <PoolRemoveToken />
        <PoolRemoveCollect />
        <RemoveButton />
      </StyledBody>
    </StyledContainer>
  );
};

export default memo(PoolsAddLiquidity);
