
import React from "react";

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import type { Column, RowAlign} from './styles';
import { StyledTableFoot } from './styles';
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
    pagination,
    loading,
    emptyText,
  } = props;

  return (
    <StyledTable style={style} className={className}>
      <StyledTableHead className={`${className}-head`}>
        <StyledTableRow $border={false} bg="none" className={`${className}-row`}>
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
      {
        loading ? (
          <StyledLoadingWrapper $h="200px">
            <Loading size={22} />
          </StyledLoadingWrapper>
        ) : (
          <StyledTableBody className={`${className}-body`}>
            {
              list.map((record: any, index: number) => (
                <StyledTableRow key={`column${index}`} align={rowAlign} className={`${className}-row`}>
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
        )
      }
      {
        !loading && !list.length && (
          <StyledLoadingWrapper $h="200px">
            <div className="empty-text">{emptyText}</div>
          </StyledLoadingWrapper>
        )
      }
      {
       pagination && list.length > 0 && (
          <StyledTableFoot className={`${className}-foot`}>
            {pagination}
          </StyledTableFoot>
        )
      }
    </StyledTable>
  );
}

export default FlexTable;

export interface Props<Item> {
  columns: Column[];
  list: Item[];
  rowAlign?: RowAlign;
  className?: string;
  style?: React.CSSProperties;
  pagination?: React.ReactElement;
  loading?: boolean;
  emptyText?: React.ReactElement | string;
}
