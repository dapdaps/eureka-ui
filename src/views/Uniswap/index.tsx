import { memo } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Pools from './Pools';

const StyledContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  background-color: #131313;
`;
const StyledConnect = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

const Uniswap = () => {
  return (
    <StyledContainer>
      <Header />
      <StyledConnect>
        <Pools />
      </StyledConnect>
    </StyledContainer>
  );
};

export default memo(Uniswap);
