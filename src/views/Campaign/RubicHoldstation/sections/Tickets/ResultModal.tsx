import { useContext } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import NoPrize from '@/views/Campaign/RubicHoldstation/sections/Tickets/NoPrize';

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

export default function ResultModal(props: ResultModalProps) {
  const context = useContext(RubicHoldstationContext);

  const { checkTicketVisible, checkTicketData, setCheckTicketVisible, setCheckTicketData } = context.tickets;

  const success = !!checkTicketData && checkTicketData?.user_reward_voucher;

  const handleClose = () => {
    setCheckTicketVisible(false);
    setCheckTicketData(undefined);
  };

  return (
    <Modal
      display={checkTicketVisible}
      title=""
      width={470}
      onClose={handleClose}
      content={
        <StyledContainer>
          {success ? (
            <>
              <StyledTitle>Congrats!</StyledTitle>
              <StyledLabel>You won</StyledLabel>
              <StyledPrizeWrapper>
                <StyledPrize size={46}>{checkTicketData?.userRewardAmount}</StyledPrize>
              </StyledPrizeWrapper>
              <StyledLabel>You matched the prize in round {checkTicketData?.round}</StyledLabel>
              {checkTicketData?.userRewardVoucher?.map((v: any, idx: number) => (
                <ModalTicket key={idx} index={idx + 1} voucher={v} />
              ))}
              <StyledNumbers>
                {checkTicketData?.voucherArr.map((item: string) => <NumberBall key={item} number={item} size={70} />)}
              </StyledNumbers>
              <StyledHints>The prize will transfer to your address after the campaign ends.</StyledHints>
            </>
          ) : (
            <NoPrize round={checkTicketData?.round} />
          )}
        </StyledContainer>
      }
    />
  );
}

interface ResultModalProps {}
