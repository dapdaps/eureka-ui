import { memo, useEffect } from 'react';
import styled from 'styled-components';
import { useLayoutStore } from '@/stores/layout';
import useAuth from '@/hooks/useAuth';
import useAccount from '@/hooks/useAccount';

const StyledSubtractItem = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: space-between;
    flex-grow: 1;
  }
`;
const Item = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(115, 119, 155, 0.5);
  border-radius: 8px;
  cursor: pointer;
`;

const StyledDisconnect = styled(Item)`
  position: relative;
  .tips {
    padding: 10px;
    border-radius: 8px;
    background-color: rgba(55, 58, 83, 0.5);
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    color: #ff61d3;
    position: absolute;
    bottom: -41px;
    right: 0px;
    display: none;
  }
  &:hover .tips {
    display: block;
  }
  @media (max-width: 768px) {
    border-radius: 10px;
    border: 1px solid #343838;
    background: #242424;
    svg {
      width: 20px;
    }
  }
`;
const StyledCloseButton = styled.div`
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const SubtractItem = () => {
  const { account } = useAccount();
  const { wallet, connect, disconnect } = useAuth();
  const setLayoutStore = useLayoutStore((store) => store.set);

  useEffect(() => {
    const hideCode = () => {};
    document.addEventListener('click', hideCode);
    return () => {
      document.removeEventListener('click', hideCode);
    };
  }, []);

  return (
    <StyledSubtractItem>
      <StyledDisconnect
        onClick={async () => {
          if (account && wallet) {
            disconnect(wallet);
            setLayoutStore({ showAccountSider: false });
          } else {
            connect();
          }
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.1 6.0998C7.7 5.6998 7.1 5.6998 6.7 6.0998C6.3 6.4998 6.3 7.0998 6.7 7.4998L16.6 17.3998C16.8 17.5998 17.05 17.6998 17.3 17.6998C17.55 17.6998 17.8 17.5998 18 17.3998C18.4 16.9998 18.4 16.3998 18 15.9998L8.1 6.0998ZM12.15 16.1998L11.25 17.0998C10.9 17.4498 10.55 17.6998 10.1 17.8498C9.25 18.1998 8.3 18.1998 7.45 17.8498C7 17.6498 6.65 17.3998 6.3 17.0998C5.95 16.7498 5.7 16.3998 5.55 15.9498C5.4 15.5498 5.3 15.0998 5.3 14.6498C5.3 14.1998 5.4 13.7498 5.55 13.3498C5.75 12.8998 6 12.5498 6.3 12.1998L7.2 11.2998C7.6 10.8998 7.6 10.2998 7.2 9.89981C6.8 9.4998 6.2 9.4998 5.8 9.89981L4.9 10.7998C4.4 11.2998 3.95 11.9498 3.7 12.5998C3.45 13.2498 3.3 13.9498 3.3 14.6498C3.3 15.3498 3.45 16.0498 3.7 16.6998C4 17.3998 4.4 17.9998 4.9 18.4998C5.4 18.9998 6.05 19.4498 6.7 19.6998C7.35 19.9498 8.05 20.0998 8.75 20.0998C9.45 20.0998 10.15 19.9498 10.8 19.6998C11.5 19.3998 12.1 18.9998 12.6 18.4998L13.5 17.5998C13.9 17.1998 13.9 16.5998 13.5 16.1998C13.15 15.7998 12.55 15.7998 12.15 16.1998ZM20.25 6.1498C19.95 5.4498 19.55 4.8498 19.05 4.3498C18.55 3.8498 17.9 3.3998 17.25 3.1498C15.95 2.5998 14.45 2.5998 13.1 3.1498C12.4 3.4498 11.8 3.8498 11.3 4.3498L10.4 5.2498C10 5.6498 10 6.2498 10.4 6.64981C10.8 7.04981 11.4 7.04981 11.8 6.64981L12.7 5.7498C13.05 5.3998 13.4 5.1498 13.85 4.9998C14.7 4.6498 15.65 4.6498 16.5 4.9998C16.95 5.1998 17.3 5.4498 17.65 5.7498C18 6.0998 18.25 6.4498 18.4 6.89981C18.55 7.2998 18.65 7.7498 18.65 8.19981C18.65 8.64981 18.55 9.09981 18.4 9.49981C18.2 9.94981 17.95 10.2998 17.65 10.6498L16.75 11.5498C16.35 11.9498 16.35 12.5498 16.75 12.9498C16.95 13.1498 17.2 13.2498 17.45 13.2498C17.7 13.2498 17.95 13.1498 18.15 12.9498L19.05 12.0498C19.55 11.5498 20 10.8998 20.25 10.2498C20.5 9.59981 20.65 8.89981 20.65 8.19981C20.65 7.4998 20.5 6.7998 20.25 6.1498Z"
            fill="#979ABE"
          />
        </svg>
        <div className="tips">Disconnect</div>
      </StyledDisconnect>
      <StyledCloseButton
        onClick={() => {
          setLayoutStore({ showAccountSider: false });
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
            fill="white"
          />
        </svg>
      </StyledCloseButton>
    </StyledSubtractItem>
  );
};

export default memo(SubtractItem);
