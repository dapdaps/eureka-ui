// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Balance from '@/modules/components/Balance';
import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';

import {
  ListWrapper,
  PoolPercentage,
  StrategyTxt,
  StyledEmptyTips,
  StyledVaultImage,
  SvgIcon,
  Table,
  TBody,
  Td,
  TdTxt,
  Th,
  THead,
  Tr,
  TrWrapper
} from '../styles';
import Detail from './Detail';

export default memo(function List(props) {
  const { toast, prices, dataList, dataIndex, columnList, onChangeDataIndex, addAction } = props;

  function renderTD(data, column, index) {
    if (column.type === 'slot') {
      return column.render(data, index);
    }
    if (column.type === 'svg') {
      return <SvgIcon>{data[column.key]}</SvgIcon>;
    }
    return <TdTxt>{data[column.key]}</TdTxt>;
  }
  return (
    <ListWrapper>
      {
        <Table>
          <THead>
            {columnList.map((column, index) => {
              return (
                <Th key={index} style={{ width: column.width }}>
                  {column.label}
                </Th>
              );
            })}
          </THead>
          {dataList && dataList.length > 0 ? (
            <TBody>
              {dataList.map((data, index) => {
                return (
                  <TrWrapper key={data.id}>
                    <Tr onClick={() => onChangeDataIndex(index)}>
                      {columnList.map((column, columnIndex) => {
                        return (
                          <Td
                            key={index + columnIndex}
                            className={column.direction === 'column' ? 'column' : ''}
                            style={{ width: column.width }}
                          >
                            {renderTD(data, column, index, columnIndex)}
                          </Td>
                        );
                      })}
                    </Tr>
                    {index === dataIndex && (
                      <Detail
                        {...{
                          ...props,
                          data: dataList[dataIndex]
                        }}
                      />
                    )}
                  </TrWrapper>
                );
              })}
            </TBody>
          ) : (
            <StyledEmptyTips>You didn’t add any liquidity yet</StyledEmptyTips>
          )}
        </Table>
      }
    </ListWrapper>
  );
});
