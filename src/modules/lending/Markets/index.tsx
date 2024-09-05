import Big from 'big.js';
import { useEffect } from 'react';

import { useMultiState } from '@/modules/lending/hooks';
import LendingMarketHeader from '@/modules/lending/Markets/Header';
import LendingMarketRow from '@/modules/lending/Markets/Row';
import { StyledContainer } from '@/modules/lending/Markets/styles';
import type { DexProps } from '@/modules/lending/models';

const LendingMarkets = (props: Props) => {
  const {
    from,
    markets,
    userTotalCollateralUsd,
    totalCollateralUsd,
    userTotalBorrowUsd,
    addAction,
    toast,
    chainId,
    nativeCurrency,
    dexConfig,
    onSuccess,
    account,
    prices
  } = props;

  const [state, updateState] = useMultiState<any>({});

  const COLUMNS =
    from === 'layer'
      ? [
        {
          key: 'asset',
          label: 'Asset',
          width: '30%'
        },
        {
          key: 'totalSupply',
          label: 'Total supplied',
          width: '17%',
          type: 'amount'
        },
        {
          key: 'supplyApy',
          label: 'Supply APY',
          width: '17%',
          type: 'apy'
        },
        {
          key: 'totalBorrows',
          label: 'Total borrowed',
          width: '17%',
          type: 'amount'
        },
        {
          key: 'borrowApy',
          label: 'Borrow APY',
          width: '17%',
          type: 'apy'
        },
        {
          key: 'handler',
          width: '2%'
        }
      ]
      : [
        {
          key: 'asset',
          label: 'Asset',
          width: '30%'
        },
        {
          key: 'totalSupply',
          label: 'Total supplied',
          width: '14%',
          type: 'amount'
        },
        {
          key: 'supplyApy',
          label: 'Supply APY',
          width: '12%',
          type: 'apy'
        },
        {
          key: 'totalBorrows',
          label: 'Total borrowed',
          width: '15%',
          type: 'amount'
        },
        {
          key: 'borrowApy',
          label: 'Borrow APY',
          width: '12%',
          type: 'apy'
        },
        {
          key: 'liquidity',
          label: 'Liquidity',
          width: '15%',
          type: 'amount'
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
          borrowLimit={state.borrowLimit}
        />
      ))}
    </StyledContainer>
  );
};

export default LendingMarkets;

export interface Props extends DexProps {
  markets: any;
  userTotalCollateralUsd?: any;
  totalCollateralUsd: any;
  userTotalBorrowUsd: any;
}
