import styled from 'styled-components';
import ModalBox from './pools/ModalBox';

const StyledContent = styled.div`
  width: 462px;
  height: 361px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;
const StyledButton = styled.div`
  width: 414px;
  height: 62px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #5ee0ff;
  color: #131313;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border: none;
`;

export default function SuccessModal({ isOpen, onRequestClose }: any) {
  return (
    <ModalBox isOpen={isOpen} onRequestClose={onRequestClose}>
      <StyledContent>
        <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
          <circle cx="33" cy="33" r="30" stroke="#5EE0FF" stroke-width="5" stroke-linecap="round" />
          <path
            d="M30.5 47C30.5 48.3807 31.6193 49.5 33 49.5C34.3807 49.5 35.5 48.3807 35.5 47L30.5 47ZM34.7678 16.2322C33.7915 15.2559 32.2085 15.2559 31.2322 16.2322L15.3223 32.1421C14.346 33.1184 14.346 34.7014 15.3223 35.6777C16.2986 36.654 17.8816 36.654 18.8579 35.6777L33 21.5355L47.1421 35.6777C48.1184 36.654 49.7014 36.654 50.6777 35.6777C51.654 34.7014 51.654 33.1184 50.6777 32.1421L34.7678 16.2322ZM35.5 47L35.5 18L30.5 18L30.5 47L35.5 47Z"
            fill="#5EE0FF"
          />
        </svg>
        <StyledText>Transaction successed</StyledText>
        <StyledButton>Close</StyledButton>
      </StyledContent>
    </ModalBox>
  );
}
