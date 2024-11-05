import Big from 'big.js';
import { memo, useMemo, useState } from 'react';
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
        const tokens = [...(data?.collaterals ?? []), ...(data?.borrows ?? [])]?.filter((collateral) => collateral[0]);
        const tokenMap = new Map();
        tokens?.forEach((token) => {
          const underlyingToken = markets[token[0]]?.underlyingToken;
          tokenMap.set(underlyingToken?.symbol, underlyingToken?.icon);
        });
        return (
          <StyledFlex gap="10px">
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              #{data?.sequence}
            </StyledFont>
            <StyledFlex>
              {Array.from(tokenMap?.entries())?.map((token, index) => {
                const [symbol, icon] = token;
                return <StyledAsset key={index} src={icon} alt={symbol} style={{ marginLeft: index > 0 ? -8 : 0 }} />;
              })}
            </StyledFlex>
            <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
              {markets[tokens?.[0]?.[0]]?.underlyingToken?.symbol}
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
        return <StyledFont color="#FFF">-%</StyledFont>;
        // return <StyledFont color="#FFF">{isNaN(data?.netApy) ? 'NaN' : Big(data?.netApy ?? 0).times(100).toFixed(2)}%</StyledFont>;
      }
    },
    {
      key: 'deposit',
      label: 'Deposit',
      width: '20%',
      render(data: any) {
        return <StyledFont color="#FFF">{formatValueDecimal(data?.amount, '$', 2, false, false)}</StyledFont>;
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
  const filterDataList = useMemo(() => dataList?.filter((record: any) => record?.collaterals?.length > 0), [dataList]);
  return (
    <StyledContainer>
      <LendingYoursHeader columns={COLUMNS} />
      {filterDataList?.length > 0 ? (
        filterDataList?.map((record: any, index: number) => (
          <LendingYoursRow
            key={index}
            {...props}
            columns={COLUMNS}
            data={record}
            showExpand={false}
            onClick={onClick}
          />
        ))
      ) : (
        <StyledFont color="#979abe" style={{ textAlign: 'center', paddingTop: 82 }}>
          You didn’t add any lending yet
        </StyledFont>
      )}
      {loading && <Spinner />}
    </StyledContainer>
  );
});
