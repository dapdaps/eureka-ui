import IconArrowRight from '@public/images/campaign/icon-arrow-right-white.svg';
import { useContext } from 'react';

import useToast from '@/hooks/useToast';
import { StyledFlex } from '@/styled/styles';
import { useCheck } from '@/views/Campaign/hooks/useCheck';
import useReport from '@/views/Campaign/hooks/useReport';
import type { Quest } from '@/views/Campaign/models';
import Refresh from '@/views/Campaign/RubicHoldstation/components/Refresh';
import { StyledContainer, StyledTitle } from '@/views/Campaign/RubicHoldstation/components/Task/styles';
import TicketBadge from '@/views/Campaign/RubicHoldstation/components/TicketBadge';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import { useRubicCampaignStore } from '@/views/Campaign/RubicHoldstation/store';

const Task = (props: Props) => {
  const { children, className, style, quest } = props;

  const context = useContext(RubicHoldstationContext);

  const { updateData } = context.quests;
  const { getData: getTicketsData } = context.tickets;

  const toast = useToast();
  const { checkCompleted, handleRefresh, refreshing } = useCheck();
  const { handleReport } = useReport();
  const { setTwitterVisited, getTwitterVisited } = useRubicCampaignStore();

  const completed = checkCompleted(quest);

  const onRefresh = () => {
    if (!context.account) {
      context.onAuthCheck();
      return;
    }
    if (quest.category.startsWith('twitter')) {
      if (!context.userInfo.twitter?.is_bind) {
        context.handleXBind();
        return;
      }
      if (!getTwitterVisited(context.account, quest.id)) {
        toast.success({
          title: 'Action confirmed successfully'
        });
        return;
      }
    }
    handleRefresh(quest, (resData) => {
      updateData(quest.id, resData);
      // if (resData.total_spins >= quest.total_spins) {
      //   context.setNewTicketVisible(true);
      // }
      getTicketsData(true);
    });
  };

  const handleTask = () => {
    if (!context.account) {
      context.onAuthCheck();
      return;
    }
    if (completed) return;
    if (quest.category.startsWith('twitter')) {
      if (!context.userInfo.twitter?.is_bind) {
        context.handleXBind();
        return;
      }
      setTwitterVisited(context.account, true, quest.id);
    }
    if (!quest.source) return;
    if (quest.category === 'page') handleReport(quest.id);
    window.open(quest.source, '_blank');
  };

  return (
    <StyledContainer className={className} style={style} onClick={handleTask}>
      <StyledTitle>{children}</StyledTitle>
      <StyledFlex justifyContent="flex-end" alignItems="center" gap="14px">
        {completed ? <TicketBadge amount={quest.total_spins} /> : <Refresh onClick={onRefresh} loading={refreshing} />}
        <IconArrowRight style={{ fill: '#fff' }} />
      </StyledFlex>
    </StyledContainer>
  );
};

export default Task;

interface Props {
  children: any;
  className?: string;
  style?: React.CSSProperties;
  quest: Quest;
}
