import IconNoPrize from '@public/images/campaign/icon-no-prize.svg';
import styled from 'styled-components';

import Modal from '@/components/Modal';

const StyledContainer = styled.div`
  padding: 10px 0 41px;
`;
const StyledTitle = styled.div`
  color: #FFF;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: relative;
  display: flex;
  justify-content: center;
  
  .text {
    position: absolute;
    z-index: 1;
    top: 20px;
  }
`;
const StyledText = styled.div`
  color: #FFF;
  margin-top: 30px;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const NoPrize = (props: Props) => {
  const { visible, onClose } = props;

  return (
    <Modal
      display={visible}
      title=""
      width={444}
      onClose={onClose}
      style={{
        borderRadius: 12,
        background: '#1F2229',
        border: '1px solid #333648',
      }}
      content={(
        <StyledContainer>
          <StyledTitle>
            <span className="text">No Prize</span>
            <IconNoPrize />
          </StyledTitle>
          <StyledText>
            You weren&apos;t selected in round 3 <br />
            Good luck is on its way!
          </StyledText>
        </StyledContainer>
      )}
    />
  );
};

export default NoPrize;

interface Props {
  visible: boolean;

  onClose?(): void;
}
