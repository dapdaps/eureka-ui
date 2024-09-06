import type { Column } from '@/modules/lending/models';

import { StyledContainer } from './styles';

const LendingMarketHeader = (props: Props) => {
  const { columns } = props;

  return (
    <StyledContainer>
      {columns.map((column) => (
        <div key={column.key} style={{ width: column.width }}>
          {column.label}
        </div>
      ))}
    </StyledContainer>
  );
};

export default LendingMarketHeader;

export interface Props {
  columns: Column[];
}
