import { useState } from 'react';

import Button from '../../components/Button';
import ResultModal from './ResultModal';
import Round from './Round';
import { StyledContainer, StyledPrize, StyledPrizeWrapper, StyledTickets, StyledTitle, StyledWonText } from './styles';
import Ticket from './Ticket';
import YourTicketsModal from './YourTicketsModal';

const Tickets = () => {
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  return (
    <StyledContainer>
      <StyledTitle size={42}>Good Luck!</StyledTitle>
      <StyledPrizeWrapper>
        <StyledPrize size={80} italic>
          $7,500
        </StyledPrize>
        <StyledTitle size={36} style={{ paddingBottom: 12 }}>
          in prize!
        </StyledTitle>
      </StyledPrizeWrapper>
      <StyledTickets style={{ marginBottom: true ? 38 : 72 }}>
        <Ticket
          onClick={() => {
            setShowTicketsModal(true);
          }}
        />
        <Button style={{ position: 'absolute', right: 0 }}>
          <span>Get Tickets</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7.29289 15.0806C7.68342 15.4712 8.31658 15.4712 8.70711 15.0806L15.0711 8.71668C15.4616 8.32616 15.4616 7.69299 15.0711 7.30247C14.6805 6.91194 14.0474 6.91194 13.6569 7.30247L8 12.9593L2.34315 7.30247C1.95262 6.91194 1.31946 6.91194 0.928932 7.30247C0.538408 7.69299 0.538408 8.32616 0.928932 8.71668L7.29289 15.0806ZM7 0.873535V14.3735H9V0.873535H7Z"
              fill="black"
            />
          </svg>
        </Button>
      </StyledTickets>
      <StyledWonText>
        <div>Congrats! You won</div>
        <StyledPrize size={46}>$2500</StyledPrize>
      </StyledWonText>
      {[0, 1, 2].map((item, i) => (
        <Round key={i} round={i + 1} />
      ))}
      <YourTicketsModal
        display={showTicketsModal}
        onClose={() => {
          setShowTicketsModal(false);
        }}
      />
      <ResultModal
        display={showResultModal}
        onClose={() => {
          setShowResultModal(false);
        }}
      />
    </StyledContainer>
  );
};

export default Tickets;
