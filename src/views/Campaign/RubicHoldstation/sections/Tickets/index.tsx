import Big from 'big.js';
import React, { useContext, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import type { RewardItem } from '@/views/Campaign/RubicHoldstation/hooks/useTickets';
import RulesEntry from '@/views/Campaign/RubicHoldstation/sections/Tickets/Rules/Entry';

import Button from '../../components/Button';
import ResultModal from './ResultModal';
import Round from './Round';
import {
  StyledContainer,
  StyledNotes,
  StyledPrize,
  StyledPrizeWrapper,
  StyledRoundContainer,
  StyledTickets,
  StyledTitle,
  StyledWonText
} from './styles';
import Ticket from './Ticket';
import YourTicketsModal from './YourTicketsModal';

const Tickets = () => {
  const context = useContext(RubicHoldstationContext);
  const { rewards, totalReward, userTotalRewardShown } = context.tickets;

  const [showTicketsModal, setShowTicketsModal] = useState(false);

  const handleScroll = () => {
    if (!context.account) {
      context.onAuthCheck();
      return;
    }
    const element = document.getElementById('campaignRubicAndHoldstationGetTicketsNow');
    element &&
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
  };

  return (
    <StyledContainer>
      <StyledTitle size={42}>Good Luck!</StyledTitle>
      <StyledPrizeWrapper>
        <StyledPrize size={80} italic>
          {totalReward}
        </StyledPrize>
        <StyledTitle size={36} style={{ paddingBottom: 12, display: 'flex', alignItems: 'center', gap: 22 }}>
          <span>in prize!</span>
          <RulesEntry />
        </StyledTitle>
      </StyledPrizeWrapper>
      <StyledTickets>
        <Ticket
          onClick={() => {
            setShowTicketsModal(true);
          }}
        />
        <Button style={{ position: 'absolute', right: 0 }} onClick={handleScroll}>
          <span>Get Tickets</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7.29289 15.0806C7.68342 15.4712 8.31658 15.4712 8.70711 15.0806L15.0711 8.71668C15.4616 8.32616 15.4616 7.69299 15.0711 7.30247C14.6805 6.91194 14.0474 6.91194 13.6569 7.30247L8 12.9593L2.34315 7.30247C1.95262 6.91194 1.31946 6.91194 0.928932 7.30247C0.538408 7.69299 0.538408 8.32616 0.928932 8.71668L7.29289 15.0806ZM7 0.873535V14.3735H9V0.873535H7Z"
              fill="black"
            />
          </svg>
        </Button>
      </StyledTickets>
      {Big(userTotalRewardShown.value).gt(0) && (
        <StyledWonText>
          <div>Congrats! You won</div>
          <StyledPrize size={46}>{userTotalRewardShown.str}</StyledPrize>
        </StyledWonText>
      )}
      <StyledRoundContainer>
        {rewards?.length
          ? rewards.map((item: RewardItem, i: number) => <Round key={i} reward={item} />)
          : [...new Array(3).keys()].map((idx) => (
              <Skeleton key={idx} width={998} height={186} borderRadius={20} style={{ marginBottom: 20 }} />
            ))}
      </StyledRoundContainer>
      <StyledNotes>
        <div className="note-title">Notes</div>
        <ul className="note-list">
          <li className="note-item">
            The prize distribution for each round needs to be adjusted based on the actual number of winners.
          </li>
          <li className="note-item">
            The carryover rules for the third round ensure that the prize does not go unclaimed, maintaining the
            fairness and attractiveness of the lottery.
          </li>
          <li className="note-item">Rewards will be distributed to winners via the BNB Smart chain.</li>
        </ul>
      </StyledNotes>
      <YourTicketsModal
        display={showTicketsModal}
        onClose={() => {
          setShowTicketsModal(false);
        }}
      />
      <ResultModal />
    </StyledContainer>
  );
};

export default Tickets;
