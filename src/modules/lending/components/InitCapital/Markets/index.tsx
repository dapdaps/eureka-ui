import Big from 'big.js';
import { useEffect } from 'react';

import { useMultiState } from '@/modules/lending/hooks';
import type { DexProps } from '@/modules/lending/models';
import { MarketsType } from '@/modules/lending/models';
import { StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import { StyledContainer } from '../styles';
import LendingMarketHeader from './components/Header';
import Ring from './components/Ring';
import LendingMarketRow from './components/Row';

const LendingMarkets = (props: Props) => {
  const {
    from,
    markets,
    userTotalCollateralUsd,
    totalCollateralUsd,
    userTotalBorrowUsd,
    userTotalSupplyUsd,
    dexConfig,
    marketsType = MarketsType.Market
  } = props;
  const { type, pools } = dexConfig;
  const [state, updateState] = useMultiState<any>({});

  const COLUMNS = [
    {
      key: 'asset',
      label: 'Asset',
      width: '30%'
    },
    {
      key: 'depositAPY',
      label: 'Deposit APY',
      width: '15%',
      render(data: any) {
        return <StyledFont color="#FFF">{data?.supplyApy}</StyledFont>;
      }
    },
    {
      key: 'borrowAPY',
      label: 'Borrow APY',
      width: '13%',
      render(data: any) {
        return <StyledFont color="#FFF">-{data?.borrowApy}</StyledFont>;
      }
    },
    {
      key: 'utilization',
      label: 'Utilization',
      width: '40%',
      render(data: any) {
        return (
          <StyledFlex gap="120px">
            <Ring percent={Big(data?.utilization).times(100).toFixed(2)} />
            <StyledFlex flexDirection="column" gap="8px" alignItems="flex-start">
              <StyledFlex gap="12px">
                <StyledFont color="#FFF">Total Deposit:</StyledFont>
                <StyledFont color="#FFF">{formatValueDecimal(data?.totalSupply, '$', 2, true)}</StyledFont>
              </StyledFlex>
              <StyledFlex gap="12px">
                <StyledFont color="#FFF">Total Borrow:</StyledFont>
                <StyledFont color="#FFF">{formatValueDecimal(data?.totalBorrows, '$', 2, true)}</StyledFont>
              </StyledFlex>
            </StyledFlex>
          </StyledFlex>
        );
      }
    },
    {
      key: 'handler',
      width: '2%'
    }
  ];

  const data = Object.values(markets || {});

  useEffect(() => {
    if (!totalCollateralUsd && !userTotalBorrowUsd) {
      return;
    }
    updateState({
      borrowLimit: Big(totalCollateralUsd || 0)
        ?.minus(userTotalBorrowUsd || 0)
        .toString()
    });
  }, [totalCollateralUsd, userTotalBorrowUsd]);

  return (
    <StyledContainer>
      <LendingMarketHeader columns={COLUMNS} />
      {data.map((record: any) => (
        <LendingMarketRow
          key={record.address}
          {...props}
          columns={COLUMNS}
          data={record}
          markets={data}
          borrowLimit={state.borrowLimit}
          marketsType={marketsType}
        />
      ))}
    </StyledContainer>
  );
};

export default LendingMarkets;

export interface Props extends DexProps {
  marketsType?: MarketsType;
  markets: any;
  userTotalCollateralUsd?: string;
  totalCollateralUsd: string;
  userTotalBorrowUsd: string;
  userTotalSupplyUsd: string;
}
