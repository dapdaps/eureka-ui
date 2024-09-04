import styled from 'styled-components';

import Modal from '@/components/Modal';
import { StyledFont } from '@/styled/styles';


const StyledCheckConverting = styled.div`
  
`
const StyledCheckConvertingTop = styled.div`
  position: relative;
`
const StyledCheckConvertingTopImage = styled.img`
  width: 100%;
  height: 354px;
`
const StyledCheckConvertingClose = styled.div`
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledCheckConvertingBottom = styled.div`
  padding: 30px 30px 26px;
`
const StyledCheckConvertingButton = styled.div`
  margin: 26px auto 0;
  width: 394px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 10px;
  background: #EBF479;
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  cursor: pointer;
`
const CheckConvertingContent = function ({ onClose, onCheck }: { onClose: VoidFunction; onCheck: VoidFunction }) {
  return (
    <StyledCheckConverting>
      <StyledCheckConvertingTop>
        <StyledCheckConvertingTopImage src="/images/home/check-converting-bg.png" />
        <StyledCheckConvertingClose onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="13" fill="#1F2229" />
            <path d="M14.444 13L17.7799 9.66415C18.0307 9.41332 18.0735 9.0494 17.8756 8.85157L17.1482 8.12424C16.9503 7.92632 16.5869 7.96974 16.3356 8.22041L13.0001 11.5561L9.66433 8.22049C9.41349 7.96941 9.04957 7.92632 8.85165 8.12449L8.12431 8.8519C7.92648 9.04949 7.96931 9.4134 8.22048 9.66423L11.5563 13L8.22048 16.336C7.96973 16.5866 7.92631 16.9503 8.12431 17.1482L8.85165 17.8756C9.04957 18.0735 9.41349 18.0306 9.66433 17.7799L13.0003 14.4439L16.3357 17.7794C16.587 18.0307 16.9504 18.0735 17.1483 17.8756L17.8757 17.1482C18.0735 16.9503 18.0307 16.5866 17.78 16.3356L14.444 13Z" fill="white" />
          </svg>
        </StyledCheckConvertingClose>
      </StyledCheckConvertingTop>
      <StyledCheckConvertingBottom>
        <StyledFont color='#FFF' fontSize='24px' fontWeight='700' style={{ marginBottom: 14 }}>Medal System Now Live!</StyledFont>
        <StyledFont color='#979ABE' lineHeight='150%'>
          Your transaction volume, engagement, referrals, and PTS have been converted into medals. Activate them now to earn gem rewards, which determine your airdrop amount. You have one month to manually convert your PTS before automatic conversion.
        </StyledFont>
        <StyledCheckConvertingButton onClick={onCheck}>Check My PTS Converting</StyledCheckConvertingButton>
      </StyledCheckConvertingBottom>
    </StyledCheckConverting>
  )
}
const CheckConvertingModal = (props: Props) => {
  const { visible, onClose, onCheck } = props;
  return (
    <Modal
      display={visible}
      showHeader={false}
      portal={true}
      width={680}
      content={
        <CheckConvertingContent onClose={onClose} onCheck={onCheck} />
      }
    />
  );
};

export default CheckConvertingModal;

interface Props {
  visible: boolean;
  onClose(): void;
  onCheck: VoidFunction
}
