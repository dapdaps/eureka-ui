import Refresh from '@/views/Campaign/RubicHoldstation/components/Refresh';
import TicketBadge from '@/views/Campaign/RubicHoldstation/components/TicketBadge';
import {
  StyledCardHead,
  StyledCardHeadHandler,
  StyledCardHeadTitle,
} from '@/views/Campaign/RubicHoldstation/sections/Rubic/styles';

const RubicCardHead = (props: Props) => {
  const { title } = props;

  return (
    <StyledCardHead>
      <StyledCardHeadTitle>{title}</StyledCardHeadTitle>
      <StyledCardHeadHandler>
        <TicketBadge amount={2}></TicketBadge>
        <Refresh />
      </StyledCardHeadHandler>
    </StyledCardHead>
  );
};

export default RubicCardHead;

interface Props {
  title: string;
}
