import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  dataSource: any[];
  columns: any[];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}
const TableWrap = styled.table`
  font-family: Orbitron;
  width: 100%;
`;
const TableHead = styled.thead<{ $amount: number }>`
  th {
    padding: 16px 10px;
    color: #828282;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const TableBody = styled.tbody<{ $amount: number }>`
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

const CustomTable: FC<IProps> = ({ dataSource, columns }) => {
  const renderTd = (data: any, key: any) => {
    return columns.map((item: any) => {
      if (item.render && typeof item.render === 'function') {
        return <td key={data.key}>{item.render(dataSource[key])}</td>;
      }
      return <td key={data.key}>{data[item.dataIndex]}</td>;
    });
  };
  return (
    <TableWrap>
      <TableHead $amount={columns.length}>
        <tr>
          {columns.map((item: any) => (
            <th key={item.key} style={{ width: item.width }}>
              {item.title}
            </th>
          ))}
        </tr>
      </TableHead>
      <TableBody $amount={columns.length}>
        {dataSource.map((item: any, index: number) => {
          return <tr key={item.key}>{renderTd(item, item.key)}</tr>;
        })}
      </TableBody>
    </TableWrap>
  );
};

export default memo(CustomTable);
