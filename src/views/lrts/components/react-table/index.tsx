import type { PaginationState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import type { FC } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import styled from 'styled-components';

import Pagination from './pagination';

interface IProps {
  data: any;
  columns: any;
  emptyTips?: string;
}

const TableWrap = styled.table`
  font-family: Orbitron;
  width: 100%;
  color: white;
  table {
    width: 100%;
  }
`;
const TableHead = styled.thead`
  th {
    padding: 16px 10px;
    color: #828282;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const TableBody = styled.tbody`
  tr {
    border-radius: 4px;
    border: 1px solid #3f3f3f;
    background: rgba(50, 50, 50, 0.6);
    backdrop-filter: blur(10px);
    margin-bottom: 8px;
    &:hover {
      background-color: #272727;
    }
  }
  td {
    padding: 0 10px;
    height: 72px;
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  font-size: 14px;
  color: #fff;
`;

const Comp: FC<IProps> = ({ data, columns, emptyTips = 'No Data' }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const gotoPage = (pageIndex: number): void => {
    table.setPageIndex(pageIndex);
  };

  return (
    <TableWrap>
      <table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </TableBody>
      </table>
      {!table.getRowModel()?.rows?.length ? <Empty>{emptyTips}</Empty> : null}

      {/* <Pagination
        gotoPage={table.setPageIndex}
        length={data.length}
        pageSize={data.length}
        setPageSize={table.setPageSize}
      /> */}
    </TableWrap>
  );
};

export default memo(Comp);
