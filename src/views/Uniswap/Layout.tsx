import type { ReactNode } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import AccountSider from '@/components/AccountSider';
import Header from './components/Header';
import RequestModal from './components/RequestModal';
import PoolContext from './context';

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
  const [isOpen, setIsOpen] = useState(false);
  const [requestData, setRequestData] = useState<any>({});
  return (
    <PoolContext.Provider
      value={{
        isOpenRequestModal: isOpen,
        openRequestModal: ({ open, ...info }: any) => {
          setRequestData(info);
          setTimeout(() => {
            setIsOpen(open);
          }, 500);
        },
      }}
    >
      <StyledContainer>
        <Header />
        <StyledContent>{children}</StyledContent>
        <AccountSider isMultiChain={false} />
        <RequestModal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
          }}
          data={requestData}
        />
      </StyledContainer>
    </PoolContext.Provider>
  );
};

export default Uniswap;
