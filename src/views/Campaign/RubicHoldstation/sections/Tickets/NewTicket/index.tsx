import IconStar from '@public/images/campaign/icon-star.svg';

import { StyledFlex } from '@/styled/styles';
import NumberWheel from '@/views/Campaign/RubicHoldstation/components/NumberWheel';
import {
  StyledContainer, StyledCountdown, StyledCountdownPrimary,
  StyledDesc, StyledTicket, StyledTicketLeft, StyledTicketRight,
  StyledTitle,
} from '@/views/Campaign/RubicHoldstation/sections/Tickets/NewTicket/styles';

const NewTicket = (props: NewTicketProps) => {
  const {} = props;

  return (
    <StyledContainer>
      <StyledTitle>
        +1 Ticket
      </StyledTitle>
      <StyledDesc>
        Good job! <br />
        You got 1 [Rubic x HoldStation campagin] ticket. <br />
        your ticket number is:
      </StyledDesc>
      <StyledFlex justifyContent="center">
        <StyledTicket>
          <StyledTicketLeft>
            <IconStar />
            <span>Ticket</span>
            <IconStar />
          </StyledTicketLeft>
          <StyledTicketRight>
            <NumberWheel height={45} target={7} />
            <NumberWheel height={45} target={2} />
            <NumberWheel height={45} target={6} />
            <NumberWheel height={45} target={9} />
            <NumberWheel height={45} target={9} />
          </StyledTicketRight>
        </StyledTicket>
      </StyledFlex>
      <StyledCountdown>
        <StyledCountdownPrimary>1</StyledCountdownPrimary>&nbsp;
        <span>d</span>&nbsp;
        <StyledCountdownPrimary>9</StyledCountdownPrimary>&nbsp;
        <span>h</span>&nbsp;
        <StyledCountdownPrimary>1</StyledCountdownPrimary>&nbsp;
        <span>m</span>
        <br/>
        <span>until the draw</span>
      </StyledCountdown>
    </StyledContainer>
  );
};

export default NewTicket;

export interface NewTicketProps {

}
