import { useContext } from 'react';

import Refresh from '@/views/Campaign/RubicHoldstation/components/Refresh';
import TicketBadge from '@/views/Campaign/RubicHoldstation/components/TicketBadge';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import {
  StyledCardHead,
  StyledCardHeadHandler,
  StyledCardHeadTitle,
} from '@/views/Campaign/RubicHoldstation/sections/Rubic/styles';

const RubicCardHead = (props: Props) => {
  const { title } = props;

  const context = useContext(RubicHoldstationContext);

  const handleRefresh = () => {
    context.setNewTicketVisible(true);
  };

  return (
    <StyledCardHead>
      <StyledCardHeadTitle>{title}</StyledCardHeadTitle>
      <StyledCardHeadHandler>
        <TicketBadge amount={2}></TicketBadge>
        <Refresh onClick={handleRefresh} />
      </StyledCardHeadHandler>
    </StyledCardHead>
  );
};

export default RubicCardHead;

interface Props {
  title: string;
}
