import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { StyledCoin } from '@/views/Quest/styles';

import Modal from './Modal';
import { StyledClaimButton } from './styles';

const StyledContent = styled.div`
  padding: 80px 46px 42px;
  border-radius: 32px;
  border: 1px solid #373a53;
  background: #262836;
  text-align: center;
  position: relative;
`;
const StyledIcon = styled.img`
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  position: absolute;
  top: -90px;
  left: 50%;
  transform: translateX(-50%);
`;
const StyledTitle = styled.div`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 24px;
`;
const StyledDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ebf479;
  text-align: center;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 14px;
  gap: 4px;
`;
const StyledCloseIcon = styled.div`
  position: absolute;
  right: 27px;
  top: 26px;
  color: #979abe;
  cursor: pointer;
  z-index: 10;
`;

export default function SuccessModal({
  open,
  reward,
  onClose,
}: {
  open: boolean;
  reward?: number;
  onClose: VoidFunction;
}) {
  const router = useRouter();
  return (
    <Modal
      display={open}
      width={451}
      content={
        <StyledContent>
          {/* <StyledCloseIcon>
            <CloseIcon onClose={onClose} />
          </StyledCloseIcon> */}
          <StyledIcon src="/images/success.gif" />
          <StyledTitle>Congrats!</StyledTitle>
          <StyledDesc>
            <span>You’ve got {reward}</span> <StyledCoin $size={21} />
            <span>PTS</span>
          </StyledDesc>
          <StyledClaimButton
            style={{ width: '100%', marginTop: '40px' }}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ opacity: 0.6 }}
            onClick={() => {
              router.push('/');
            }}
          >
            Start your DapDap journey now
          </StyledClaimButton>
        </StyledContent>
      }
    />
  );
}
