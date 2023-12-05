import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Icons/Loading';
import CloseIcon from '@/components/Icons/Close';
import ModalBox from './ModalBox';
import config from '@/config/uniswap';

const StyledContent = styled.div`
  width: 462px;
  height: 361px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 291px;
  }
`;
const StyledText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-top: 44px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
const StyledButton = styled.button`
  width: 414px;
  height: 62px;
  border-radius: 12px;
  background: #5ee0ff;
  color: #131313;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 26px;

  @media (max-width: 768px) {
    width: 241px;
    height: 50px;
  }
`;
const StyledLink = styled.a`
  color: #5ee0ff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 16px;
`;
const StyledDesc = styled.div`
  color: #8e8e8e;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 30px;
`;
const LoadingWrapper = styled.div`
  color: #5ee0ff;
`;
const ErrorIcon = styled.div`
  color: #5ee0ff;
  pointer-events: none;
  margin-bottom: -40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid #5ee0ff;
  margin-bottom: 2px;
`;
const StyledTradeText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 40px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// status 0 for success 1 for confirm 2 for submit 3 for error
export default function RequestModal({ isOpen, data, onRequestClose }: any) {
  const router = useRouter();
  const { status, text, tx, from } = data;
  return (
    <ModalBox isOpen={isOpen} onRequestClose={onRequestClose} shouldCloseOnOverlayClick={false}>
      <StyledContent>
        {status === 0 && (
          <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
            <circle cx="33" cy="33" r="30" stroke="#5EE0FF" strokeWidth="5" strokeLinecap="round" />
            <path
              d="M30.5 47C30.5 48.3807 31.6193 49.5 33 49.5C34.3807 49.5 35.5 48.3807 35.5 47L30.5 47ZM34.7678 16.2322C33.7915 15.2559 32.2085 15.2559 31.2322 16.2322L15.3223 32.1421C14.346 33.1184 14.346 34.7014 15.3223 35.6777C16.2986 36.654 17.8816 36.654 18.8579 35.6777L33 21.5355L47.1421 35.6777C48.1184 36.654 49.7014 36.654 50.6777 35.6777C51.654 34.7014 51.654 33.1184 50.6777 32.1421L34.7678 16.2322ZM35.5 47L35.5 18L30.5 18L30.5 47L35.5 47Z"
              fill="#5EE0FF"
            />
          </svg>
        )}
        {(status === 1 || status === 2) && (
          <LoadingWrapper>
            <Loading size={60} />
          </LoadingWrapper>
        )}
        {status === 3 && (
          <ErrorIcon>
            <CloseIcon size={50} />
          </ErrorIcon>
        )}
        <StyledText>
          {status === 0 && 'Transaction submitted'}
          {status === 1 && 'Waiting for confirmation'}
          {status === 3 && 'Transaction errored'}
        </StyledText>
        {(status === 0 || status === 3) && (
          <StyledButton
            onClick={() => {
              onRequestClose();
              status === 0 && from === 'pool' && router.push('/uniswap/pools');
            }}
          >
            Close
          </StyledButton>
        )}
        {(status === 1 || status === 2) && text && <StyledTradeText>{text}</StyledTradeText>}
        {status !== 1 && !!tx && (
          <StyledLink href={config.explor + '/tx/' + tx} target="_blank">
            View on Linea scan
          </StyledLink>
        )}
        {status === 1 && <StyledDesc>Confirm this transaction in your wallet</StyledDesc>}
      </StyledContent>
    </ModalBox>
  );
}
