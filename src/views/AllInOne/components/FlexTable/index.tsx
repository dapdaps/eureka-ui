import React from "react";

import type {
  Column, RowAlign
} from "@/views/AllInOne/components/FlexTable/styles";
import {
  type Align,
  StyledTable,
  StyledTableBody,
  StyledTableCol,
  StyledTableHead,
  StyledTableRow
} from "@/views/AllInOne/components/FlexTable/styles";

function FlexTable<Item = any>(props: Props<Item>) {
  const { columns, list, rowAlign } = props;

  return (
    <StyledTable>
      <StyledTableHead>
        <StyledTableRow border={false} bg="none">
          {
            columns.map((column) => (
              <StyledTableCol
                key={column.dataIndex}
                align={column.align as Align}
                width={column.width}
                ellipsis={column.ellipsis}
              >
                {column.title}
              </StyledTableCol>
            ))
          }
        </StyledTableRow>
      </StyledTableHead>
      <StyledTableBody>
        {
          list.map((record: any, index: number) => (
            <StyledTableRow key={record.chainId} align={rowAlign}>
              {
                columns.map((column) => (
                  <StyledTableCol
                    key={column.dataIndex}
                    align={column.align as Align}
                    width={column.width}
                    ellipsis={column.ellipsis}
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
}
