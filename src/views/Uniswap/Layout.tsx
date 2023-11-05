import { ReactNode } from 'react';
import styled from 'styled-components';
import AccountSider from '@/components/AccountSider';
import Header from './components/Header';

const StyledContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  background-color: #131313;
`;
const StyledContent = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

const Uniswap = ({ children }: { children?: ReactNode }) => {
  return (
    <StyledContainer>
      <Header />
      <StyledContent>{children}</StyledContent>
      <AccountSider isMultiChain={false} />
    </StyledContainer>
  );
};

export default Uniswap;
