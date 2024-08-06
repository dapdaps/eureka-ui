
import type React from "react";
import styled from "styled-components";

export interface Column<Item = any> {
  title: string;
  dataIndex: string;
  align?: Align;
  width?: string;
  ellipsis?: boolean;
  render?(text: string, record: Item, index: number): React.ReactElement | string | number | null;
}
export const StyledTable = styled.div`
  
  .empty-text {
    text-align: center;
    color: #5E617E;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
`;
export const StyledTableHead = styled.div`
  border-bottom: 1px solid #373A53;
  
  > [class*="StyledTableRow"] {
    > [class*="StyledTableCol"] {
      padding: 12px 27px;
      color: #7C7F96;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
    }
  }
`;
export const StyledTableBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
`;
export const StyledTableRow = styled.div<{ bg?: string, borderColor?: string, $border?: boolean, align?: RowAlign }>`
  display: flex;
  justify-content: space-between;
  align-items: ${({ align }) => align || 'stretch'};
  flex-wrap: nowrap;
  border: ${({ borderColor, $border }) => $border ? `1px solid ${borderColor || '#333549'}` : 0};
  background: ${({ bg }) => bg || 'transparent'};
`;
export type Align = 'left' | 'right' | 'center';
export type RowAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch';
export const StyledTableCol = styled.div<{ align?: Align, width?: string, ellipsis?: boolean }>`
  flex: 1;
  width: 0;
  overflow: hidden;
  padding: 16px 27px;
  text-align: ${({ align }) => align || 'left'};
  white-space: wrap;
  word-break: break-word;
  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  ${({ width }) => {
  if (!width) return '';
  return `flex-basis: ${width}; flex-shrink: 0; flex-grow: 0;`;
}};
  ${({ ellipsis }) => {
  if (!ellipsis) return '';
  return `white-space: nowrap;word-break: unset;text-overflow: ellipsis;`;
}};
`;
export const StyledTableFoot = styled.div`
  padding: 20px 24px 17px;
  color: #7C7F96;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
