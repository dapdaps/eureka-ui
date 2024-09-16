import { useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import useMobile from '@/hooks/useMobile';
import useUserInfo from '@/hooks/useUserInfo';
import { useX } from '@/views/Campaign/hooks/useX';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import { useBasic } from '@/views/Campaign/RubicHoldstation/hooks/useBasic';
import { useMedals } from '@/views/Campaign/RubicHoldstation/hooks/useMedals';
import { useQuests } from '@/views/Campaign/RubicHoldstation/hooks/useQuests';
import { useTickets } from '@/views/Campaign/RubicHoldstation/hooks/useTickets';
import Banner from '@/views/Campaign/RubicHoldstation/sections/Banner';
import Holdstation from '@/views/Campaign/RubicHoldstation/sections/Holdstation';
import Leaderboard from '@/views/Campaign/RubicHoldstation/sections/Leaderboard';
import Medal from '@/views/Campaign/RubicHoldstation/sections/Medal';
import Rubic from '@/views/Campaign/RubicHoldstation/sections/Rubic';
import Tickets from '@/views/Campaign/RubicHoldstation/sections/Tickets';
import NewTicketModal from '@/views/Campaign/RubicHoldstation/sections/Tickets/NewTicket/Modal';
import { StyledContainer } from '@/views/Campaign/RubicHoldstation/styles';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

const Category = 'rubic';
const TotalBonus = 7500;

const RubicHoldstation = (props: Props) => {
  const {} = props;

  useMobile();
  const { account } = useAccount();
  const { check: onAuthCheck } = useAuthCheck({ isNeedAk: true, isQuiet: false });
  const { userInfo, queryUserInfo } = useUserInfo();
  const authConfig = useAuthConfig();
  const { handleBind: handleXBind } = useX({ userInfo, authConfig });

  const [newTicketVisible, setNewTicketVisible] = useState(false);
  const basic = useBasic({
    category: Category,
    totalBonus: TotalBonus
  });
  const tickets = useTickets({
    category: Category,
    totalBonus: TotalBonus
  });
  const quests = useQuests({
    category: Category,
    totalBonus: TotalBonus
  });
  const medals = useMedals({
    category: Category,
    totalBonus: TotalBonus
  });

  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?category=rubic-holdstation`
  });

  return (
    <RubicHoldstationContext.Provider
      value={{
        account,
        onAuthCheck,
        category: Category,
        totalBonus: TotalBonus,
        basic,
        tickets,
        quests,
        medals,
        newTicketVisible,
        setNewTicketVisible,
        userInfo,
        authConfig,
        handleXBind
      }}
    >
      <StyledContainer>
        <Banner />
        <Tickets />
        <Rubic />
        {/*<Holdstation />*/}
        <Leaderboard />
        <Medal />
        <NewTicketModal visible={newTicketVisible} onClose={() => setNewTicketVisible(false)} />
      </StyledContainer>
    </RubicHoldstationContext.Provider>
  );
};

export default RubicHoldstation;

interface Props {}
