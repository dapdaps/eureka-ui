import Skeleton from 'react-loading-skeleton';

import { columns } from './config';
import { StyledTableRow } from './styles';

export default function Loading({ rows, rowStyle }: any) {
  return Array.from({ length: rows }, (_, index) => index + 1).map((row) => (
    <StyledTableRow key={row} style={rowStyle}>
      {columns.map((column) => (
        <div
          key={column.key}
          style={{
            width: column.width,
          }}
        >
          <Skeleton width="120px" height="28px" borderRadius="4px" containerClassName="skeleton" />
        </div>
      ))}
    </StyledTableRow>
  ));
}
