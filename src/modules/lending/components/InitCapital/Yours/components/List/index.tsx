import Big from 'big.js';
import { memo, useState } from 'react';
import styled from 'styled-components';

import Spinner from '@/modules/components/Spinner';
import LendingYoursHeader from '@/modules/lending/components/InitCapital/Markets/components/Header';
import LendingYoursRow from '@/modules/lending/components/InitCapital/Markets/components/Row';
import { StyledContainer } from '@/modules/lending/components/InitCapital/styles';
import { StyledFlex, StyledFont } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import useDataList from '../../hooks/useDataList';
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
      render(data: any) {
        const underlyingToken = markets?.[data?.underlyingAddress]?.underlyingToken;
        const borrowToken = markets?.[data?.borrowAddress]?.underlyingToken;
        return (
          <StyledFlex gap="10px">
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              #{data?.sequence}
            </StyledFont>
            <StyledFlex>
              {[...(data?.collaterals ?? []), ...(data?.borrows ?? [])]
                ?.filter((collateral) => collateral[0])
                ?.map((collateral, index) => {
                  const underlyingToken = markets[collateral[0]]?.underlyingToken;
                  return (
                    <StyledAsset
                      key={index}
                      src={underlyingToken?.icon}
                      alt={underlyingToken?.symbol}
                      style={{ marginLeft: index > 0 ? -8 : 0 }}
                    />
                  );
                })}
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
        return (
          <StyledFont color="#FFF">
            {isFinite(data?.healthFactor) ? formatValueDecimal(data?.healthFactor, '', 2) : '∞'}
          </StyledFont>
        );
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
  const { loading, dataList } = useDataList({
    ...props,
    updater
  });
  return (
    <StyledContainer>
      <LendingYoursHeader columns={COLUMNS} />
      {dataList
        ?.filter((record: any) => Big(record?.amount ? record?.amount : 0).gt(0))
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
      {loading && <Spinner />}
    </StyledContainer>
  );
});
