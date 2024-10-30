// @ts-nocheck
import { memo } from 'react';

import { ListWrapper, StyledEmptyTips, SvgIcon, Table, TBody, Td, TdTxt, Th, THead, Tr, TrWrapper } from '../styles';
import Detail from './Detail';
export default memo(function List(props) {
  const { toast, prices, dataList, dataIndex, columnList, onChangeDataIndex, addresses, addAction, provider } = props;

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
            {Array.isArray(columnList) &&
              columnList.map((column, index) => {
                return (
                  <Th key={index} style={{ width: column.width }}>
                    {column.label}
                  </Th>
                );
              })}
          </THead>
          {Array.isArray(dataList) && dataList.length ? (
            <TBody>
              {dataList.map((data, index) => {
                return (
                  <TrWrapper key={index}>
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
                          provider,
                          data: dataList[dataIndex]
                        }}
                      />
                    )}
                  </TrWrapper>
                );
              })}
            </TBody>
          ) : (
            <StyledEmptyTips>Um...we didn't find anything</StyledEmptyTips>
          )}
        </Table>
      }
    </ListWrapper>
  );
});
