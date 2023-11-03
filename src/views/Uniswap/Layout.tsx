import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './components/Header';

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

const Uniswap = ({ children }: { children?: ReactNode }) => {
  return (
    <StyledContainer>
      <Header />
      <StyledConnect>{children}</StyledConnect>
    </StyledContainer>
  );
};

export default Uniswap;
