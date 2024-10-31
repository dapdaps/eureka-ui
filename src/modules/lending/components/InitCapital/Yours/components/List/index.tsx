import Big from 'big.js';
import { memo, useState } from 'react';
import styled from 'styled-components';

import LendingYoursHeader from '@/modules/lending/components/InitCapital/Markets/components/Header';
import LendingYoursRow from '@/modules/lending/components/InitCapital/Markets/components/Row';
import { StyledContainer } from '@/modules/lending/components/InitCapital/styles';
import { StyledFlex, StyledFont } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import useData from '../../hooks/useDataList';
const StyledAsset = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
export default memo(function List(props: any) {
  const { markets, dexConfig, onClick } = props;
  const [updater, setUpdater] = useState(0);
  const COLUMNS = [
    {
      key: 'Asset',
      label: 'Asset',
      width: '20%',
      render(data: any, _, index: number) {
        const underlyingToken = markets?.[data?.underlyingAddress]?.underlyingToken;
        const borrowToken = markets?.[data?.borrowAddress]?.underlyingToken;
        return (
          <StyledFlex gap="10px">
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              #{data?.sequence}
            </StyledFont>
            <StyledFlex>
              <StyledAsset src={underlyingToken?.icon} alt={underlyingToken?.symbol} />
              {borrowToken && underlyingToken?.symbol !== borrowToken?.symbol && (
                <StyledAsset src={borrowToken?.icon} style={{ marginLeft: -8 }} />
              )}
            </StyledFlex>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              {underlyingToken?.symbol}
            </StyledFont>
          </StyledFlex>
        );
      }
    },
    {
      key: 'healthFactor',
      label: 'Health Factor',
      width: '20%',
      render(data: any) {
        return <StyledFont color="#FFF">Health Factor</StyledFont>;
      }
    },
    {
      key: 'netApy',
      label: 'Net APY',
      width: '20%',
      render(data: any) {
        return <StyledFont color="#FFF">Net APY</StyledFont>;
      }
    },
    {
      key: 'deposit',
      label: 'Deposit',
      width: '20%',
      render(data: any) {
        return <StyledFont color="#FFF">{formatValueDecimal(data?.amount, '$', 2)}</StyledFont>;
      }
    },
    {
      key: 'borrow',
      label: 'Borrow',
      width: '18%',
      render(data: any) {
        return <StyledFont color="#FFF">{formatValueDecimal(data?.borrowAmount, '$', 2)}</StyledFont>;
      }
    },
    {
      key: 'handler',
      width: '2%'
    }
  ];
  const { loading, dataList } = useData({
    ...props,
    updater
  });
  return (
    <StyledContainer>
      <LendingYoursHeader columns={COLUMNS} />
      {dataList
        ?.filter((record) => Big(record?.amount ? record?.amount : 0).gt(0))
        .map((record: any) => (
          <LendingYoursRow
            key={record.address}
            {...props}
            columns={COLUMNS}
            data={record}
            showExpand={false}
            onClick={onClick}
          />
        ))}
    </StyledContainer>
  );
});
