import IconArrowRight from '@public/images/campaign/icon-arrow-right-white.svg';

import { StyledFlex } from '@/styled/styles';
import Refresh from '@/views/Campaign/RubicHoldstation/components/Refresh';
import { StyledContainer, StyledTitle } from '@/views/Campaign/RubicHoldstation/components/Task/styles';
import TicketBadge from '@/views/Campaign/RubicHoldstation/components/TicketBadge';

const Task = (props: Props) => {
  const { children, className, style, completed, amount } = props;

  return (
    <StyledContainer
      className={className}
      style={style}
    >
      <StyledTitle>
        {children}
      </StyledTitle>
      <StyledFlex justifyContent="flex-end" alignItems="center" gap="14px">
        {
          completed ? (
            <TicketBadge amount={amount} />
          ) : (
            <Refresh />
          )
        }
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
  completed?: boolean;
  amount: number;
}
