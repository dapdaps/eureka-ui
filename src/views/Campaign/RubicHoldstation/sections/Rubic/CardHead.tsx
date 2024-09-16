import { useContext } from 'react';

import { useCheck } from '@/views/Campaign/hooks/useCheck';
import type { Quest } from '@/views/Campaign/models';
import Refresh from '@/views/Campaign/RubicHoldstation/components/Refresh';
import TicketBadge from '@/views/Campaign/RubicHoldstation/components/TicketBadge';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import {
  StyledCardHead,
  StyledCardHeadHandler,
  StyledCardHeadTitle
} from '@/views/Campaign/RubicHoldstation/sections/Rubic/styles';

const RubicCardHead = (props: Props) => {
  const { title, quest } = props;

  const { handleRefresh, refreshing } = useCheck();

  const context = useContext(RubicHoldstationContext);

  const { updateData } = context.quests;
  const { getData: getTicketsData } = context.tickets;

  const onRefresh = () => {
    if (!context.account) {
      context.onAuthCheck();
      return;
    }
    handleRefresh(quest, (resData) => {
      updateData(quest.id, resData);
      // if (resData.total_spins > quest.total_spins) {
      //   context.setNewTicketVisible(true);
      // }
      getTicketsData(true);
    });
  };

  return (
    <StyledCardHead>
      <StyledCardHeadTitle>{title}</StyledCardHeadTitle>
      <StyledCardHeadHandler>
        <TicketBadge amount={quest?.total_spins}></TicketBadge>
        <Refresh onClick={onRefresh} loading={refreshing} />
      </StyledCardHeadHandler>
    </StyledCardHead>
  );
};

export default RubicCardHead;

interface Props {
  title: string;
  quest: Quest;
}
