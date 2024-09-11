import IconDone from '@public/images/campaign/icon-done.svg';

import { StyledFlex } from '@/styled/styles';

import { StyledContainer } from './styles';

const TicketBadge = (props: Props) => {
  const { className, amount, style } = props;

  const isActive = amount > 0;

  return (
    <StyledContainer className={`${className} ${isActive ? 'active' : 'inactive'}`} style={style}>
      {isActive ? (
        <StyledFlex justifyContent="center" alignItems="center" gap="9px">
          <IconDone />
          <span>{amount} tickets</span>
        </StyledFlex>
      ) : (
        <StyledFlex justifyContent="center" alignItems="center">
          0 ticket
        </StyledFlex>
      )}
    </StyledContainer>
  );
};

export default TicketBadge;

interface Props {
  amount: number;
  className?: string;
  style?: React.CSSProperties;
}
