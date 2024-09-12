import { useState } from 'react';

import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import Banner from '@/views/Campaign/RubicHoldstation/sections/Banner';
import Holdstation from '@/views/Campaign/RubicHoldstation/sections/Holdstation';
import Leaderboard from '@/views/Campaign/RubicHoldstation/sections/Leaderboard';
import Medal from '@/views/Campaign/RubicHoldstation/sections/Medal';
import Rubic from '@/views/Campaign/RubicHoldstation/sections/Rubic';
import Tickets from '@/views/Campaign/RubicHoldstation/sections/Tickets';
import NewTicketModal from '@/views/Campaign/RubicHoldstation/sections/Tickets/NewTicket/Modal';
import { StyledContainer } from '@/views/Campaign/RubicHoldstation/styles';

const RubicHoldstation = (props: Props) => {
  const {} = props;

  const [newTicketVisible, setNewTicketVisible] = useState(false);

  return (
    <RubicHoldstationContext.Provider
      value={{
        newTicketVisible,
        setNewTicketVisible,
      }}
    >
      <StyledContainer>
        <Banner />
        <Tickets />
        <Rubic />
        <Holdstation />
        <Leaderboard />
        <Medal />
        <NewTicketModal
          visible={newTicketVisible}
          onClose={() => setNewTicketVisible(false)}
        />
      </StyledContainer>
    </RubicHoldstationContext.Provider>
  );
};

export default RubicHoldstation;

interface Props {
}
