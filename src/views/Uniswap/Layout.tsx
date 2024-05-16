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
  background-repeat: no-repeat;
  background-position: right top;
  @media (max-width: 768px) {
    background-position: left 20px;
  }
`;
const StyledContent = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    padding-top: 0px;
  }
`;

const Uniswap = ({ children }: { children?: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [requestData, setRequestData] = useState<any>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
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
      {ready && (
        <ToastContainer
          position={window.innerWidth > 768 ? 'top-right' : 'bottom-right'}
          autoClose={5000}
          hideProgressBar={true}
          theme="dark"
          newestOnTop
          rtl={false}
          pauseOnFocusLoss
          closeButton={false}
        />
      )}
    </PoolContext.Provider>
  );
};

export default Uniswap;
