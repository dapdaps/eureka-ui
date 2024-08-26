import type React from "react";
import styled from "styled-components";

export interface Column<Item = any> {
  title: string;
  dataIndex: string;
  align?: Align;
  width?: string;
  ellipsis?: boolean;
  render?(text: string, record: Item, index: number): React.ReactElement | null;
}
export const StyledTable = styled.div`

`;
export const StyledTableHead = styled.div`
  > [class*="StyledTableRow"] {
    > [class*="StyledTableCol"] {
      padding: 12px 24px;
    }
  }
`;
export const StyledTableBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: stretch;
`;
export const StyledTableRow = styled.div<{ bg?: string, borderColor?: string, border?: boolean, align?: RowAlign }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ align }) => align || 'stretch'};
  flex-wrap: nowrap;
  border: ${({ borderColor, border }) => border ? `1px solid ${borderColor || '#333549'}` : 0};
  background: ${({ bg }) => bg || '#242631'};
  border-radius: 16px;
`;
export type Align = 'left' | 'right' | 'center';
export type RowAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch';
export const StyledTableCol = styled.div<{ align?: Align, width?: string, ellipsis?: boolean }>`
  flex: 1;
  width: 0;
  overflow: hidden;
  padding: 24px;
  text-align: ${({ align }) => align || 'left'};
  white-space: wrap;
  word-break: break-all;
  ${({ width }) => {
  if (!width) return '';
  return `flex-basis: ${width}`;
}};
  ${({ ellipsis }) => {
  if (!ellipsis) return '';
  return `white-space: nowrap;word-break: unset;text-overflow: ellipsis;`;
}};
`;
