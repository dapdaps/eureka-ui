import styled from 'styled-components';

import Modal from '@/components/Modal';

import Button from '../../components/Button';
import NumberBall from '../../components/NumberBall';
import ModalTicket from './ModalTicket';
import { StyledPrize } from './styles';

const StyledContainer = styled.div`
  padding: 0px 38px 32px 32px;
  margin-top: -20px;
`;

const StyledTitle = styled.div`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`;

const StyledLabel = styled.div`
  margin-top: 35px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const StyledPrizeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 9px;
  margin-bottom: 48px;
`;

const StyledNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 30px;
`;

const StyledHints = styled.div`
  color: #979abe;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  margin-top: 34px;
`;

const StyledButtonWrapper = styled.div`
  margin-top: 39px;
  display: flex;
  justify-content: center;
`;

export default function ResultModal({ display, onClose }: any) {
  const success = true;
  return (
    <Modal
      display={display}
      title=""
      width={470}
      onClose={onClose}
      content={
        <StyledContainer>
          {success ? (
            <>
              <StyledTitle>Congrats!</StyledTitle>
              <StyledLabel>You won</StyledLabel>
              <StyledPrizeWrapper>
                <StyledPrize size={46}>$2500</StyledPrize>
              </StyledPrizeWrapper>
              <StyledLabel>You matched the third prize in round 3</StyledLabel>
              <ModalTicket index={3} />
              <StyledNumbers>
                {[8, 6, 3, 9, 7].map((item) => (
                  <NumberBall key={item} number={item} size={70} />
                ))}
              </StyledNumbers>
              <StyledHints>The prize will transfer to your address in 5 days.</StyledHints>
            </>
          ) : (
            <>
              <StyledTitle>Oops!</StyledTitle>
              <StyledLabel style={{ width: '80%', margin: '20px auto' }}>
                You weren&apos;t selected in round 3Good luck is on its way!
              </StyledLabel>
              <StyledButtonWrapper>
                <Button onClick={onClose}>Close</Button>
              </StyledButtonWrapper>
            </>
          )}
        </StyledContainer>
      }
    />
  );
}
