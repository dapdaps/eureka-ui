import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import AccountSider from '@/components/AccountSider';
import Header from './components/Header';
import RequestModal from '@/components/RequestModal';
import PoolContext from '../../contexts/requestModalContext';

import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  background-color: #131313;
  background-image: url(/images/uniswap/right_bg.png);
  background-repeat: no-repeat;
  background-position: right top;
`;
const StyledContent = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Uniswap = ({ children }: { children?: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [requestData, setRequestData] = useState<any>({});

  return (
    <PoolContext.Provider
      value={{
        isOpenRequestModal: isOpen,
        openRequestModal: ({ open, ...info }: any) => {
          console.log({ open, ...info });
          setRequestData(info);
          setTimeout(() => {
            setIsOpen(open);
          }, 500);
        },
      }}
    >
      <StyledContainer>
        <Header />
        <StyledContent>{children} </StyledContent>
        <AccountSider />
        <RequestModal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
          }}
          data={requestData}
        />
      </StyledContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        theme="dark"
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        closeButton={false}
      />
    </PoolContext.Provider>
  );
};

export default Uniswap;
