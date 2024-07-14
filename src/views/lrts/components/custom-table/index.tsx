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
const TableWrap = styled.div`
  font-family: Orbitron;
`;
const TableHead = styled.div`
  display: grid;
  width: 1140px;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 16px 0;
  .th {
    padding: 0 10px;
    color: #828282;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const TableBody = styled.div`
  .tr {
    display: grid;

    /* width: 1140px; */
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    border-radius: 4px;
    border: 1px solid #3f3f3f;
    background: rgba(50, 50, 50, 0.6);
    backdrop-filter: blur(10px);
    margin-bottom: 8px;
    &:hover {
      background-color: #272727;
    }
  }
  .td {
    display: flex;
    align-items: center;
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
  const renderTr = (data: any) => {
    return columns.map((item: any) => {
      return (
        <div key={data.key} className="td">
          {data[item.dataIndex]}
        </div>
      );
    });
  };
  return (
    <TableWrap>
      <TableHead>
        {columns.map((item: any) => (
          <div key={item.key} className="th">
            {item.title}
          </div>
        ))}
      </TableHead>
      <TableBody>
        {dataSource.map((item: any, index: number) => {
          return (
            <div key={item.key} className="tr">
              {renderTr(item)}
            </div>
          );
        })}
      </TableBody>
    </TableWrap>
  );
};

export default memo(CustomTable);
