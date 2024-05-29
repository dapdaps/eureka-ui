import React from "react";

import type { Column, RowAlign } from "./styles";
import {
  type Align,
  StyledTable,
  StyledTableBody,
  StyledTableCol,
  StyledTableHead,
  StyledTableRow
} from "./styles";

function FlexTable<Item = any>(props: Props<Item>) {
  const {
    columns,
    list,
    rowAlign,
    className = 'flex-table',
    style,
  } = props;

  return (
    <StyledTable style={style} className={className}>
      <StyledTableHead className={`${className}-head`}>
        <StyledTableRow border={false} bg="none" className={`${className}-row`}>
          {
            columns.map((column) => (
              <StyledTableCol
                key={column.dataIndex}
                align={column.align as Align}
                width={column.width}
                ellipsis={column.ellipsis}
                className={`${className}-col`}
              >
                {column.title}
              </StyledTableCol>
            ))
          }
        </StyledTableRow>
      </StyledTableHead>
      <StyledTableBody className={`${className}-body`}>
        {
          list.map((record: any, index: number) => (
            <StyledTableRow key={record.chainId} align={rowAlign} className={`${className}-row`}>
              {
                columns.map((column) => (
                  <StyledTableCol
                    key={column.dataIndex}
                    align={column.align as Align}
                    width={column.width}
                    ellipsis={column.ellipsis}
                    className={`${className}-col`}
                  >
                    {
                      typeof column.render === 'function' ? (
                        column.render(JSON.stringify(record[column.dataIndex]), record, index)
                      ) : record[column.dataIndex]
                    }
                  </StyledTableCol>
                ))
              }
            </StyledTableRow>
          ))
        }
      </StyledTableBody>
    </StyledTable>
  );
};

export default FlexTable;

export interface Props<Item> {
  columns: Column[];
  list: Item[];
  rowAlign?: RowAlign;
  className?: string;
  style?: React.CSSProperties;
}
