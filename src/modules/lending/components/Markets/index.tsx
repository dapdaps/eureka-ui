import Big from 'big.js';
import { useEffect, useMemo } from 'react';

import LendingMarketAmount from '@/modules/lending/components/Markets/Amount';
import LendingMarketAsset from '@/modules/lending/components/Markets/Asset';
import LendingMarketHeader from '@/modules/lending/components/Markets/Header';
import LendingMarketRow from '@/modules/lending/components/Markets/Row';
import { StyledContainer } from '@/modules/lending/components/Markets/styles';
import LendingSummary from '@/modules/lending/components/Markets/Summary';
import { useMultiState } from '@/modules/lending/hooks';
import type { DexProps} from '@/modules/lending/models';
import { MarketsType } from '@/modules/lending/models';
import { DexType } from '@/modules/lending/models';

const LendingMarkets = (props: Props) => {
  const {
    from,
    markets,
    userTotalCollateralUsd,
    totalCollateralUsd,
    userTotalBorrowUsd,
    userTotalSupplyUsd,
    dexConfig,
    marketsType = MarketsType.Market,
  } = props;
  
  const { type, pools } = dexConfig;

  const [state, updateState] = useMultiState<any>({});

  const COLUMNS = useMemo(() => {
    if (from === 'layer') {
      return [
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
      ];
    }
    if (pools && pools.length > 0) {
      return [
        {
          key: "asset",
          label: "Asset",
          width: "20%",
        },
        {
          key: "poolSize",
          label: "PoolSize",
          width: "20%",
          type: "amount",
        },
        {
          key: "supplyApy",
          label: "Supply APY",
          width: "20%",
          type: "apy",
        },
        {
          key: "borrowApy",
          label: "Borrow APR",
          width: "20%",
          type: "apy",
        },

        {
          key: "userSupply",
          label: "Supplied",
          width: "18%",
          type: "amount",
        },

        {
          key: "handler",
          width: "2%",
        },
      ];
    }
    if (marketsType === MarketsType.Borrow) {
      return [
        {
          key: 'collateral',
          label: 'Collateral',
          width: '20%',
          render: (record: any) => {
            return (
              <LendingMarketAsset
                icon={record.underlyingToken.icon}
                symbol={record.underlyingToken.symbol}
              />
            );
          },
        },
        {
          key: 'borrow',
          label: 'Borrow',
          width: '20%',
          render: (record: any) => {
            return (
              <LendingMarketAsset
                icon={record.borrowToken.icon}
                symbol={record.borrowToken.symbol}
              />
            );
          },
        },
        {
          key: 'totalSupplyUsd',
          label: 'Total Supplied',
          width: '20%',
          render: (record: any) => {
            return (
              <LendingMarketAmount
                amount={record.totalSupplied}
                price={record.borrowTokenPrice}
                suffixAmountUnit={` ${record.borrowToken.symbol}`}
              />
            );
          },
        },
        {
          key: 'borrowAPR',
          label: 'Borrow APR',
          width: '20%',
          type: 'apy'
        },
        {
          key: 'Utilization',
          label: 'Utilization',
          width: '17%',
          type: 'apy'
        },
        {
          key: 'handler',
          width: '3%'
        }
      ];
    }
    if (marketsType === MarketsType.Earn) {
      return [
        {
          key: 'collateral',
          label: 'Collateral',
          width: '25%',
          render: (record: any) => {
            return (
              <LendingMarketAsset
                icon={record.underlyingToken.icon}
                symbol={record.underlyingToken.symbol}
              />
            );
          },
        },
        {
          key: 'deposit',
          label: 'Deposit',
          width: '25%',
          render: (record: any) => {
            return (
              <LendingMarketAsset
                icon={record.borrowToken.icon}
                symbol={record.borrowToken.symbol}
              />
            );
          },
        },
        {
          key: 'yourDeposits',
          label: 'Your Deposits',
          width: '25%',
          render: (record: any) => {
            return (
              <LendingMarketAmount
                amount={record.yourLends}
                price={record.borrowTokenPrice}
                suffixAmountUnit={` ${record.borrowToken.symbol}`}
              />
            );
          },
        },
        {
          key: 'lendAPR',
          label: 'Lend APR',
          width: '22%',
          type: 'apy'
        },
        {
          key: 'handler',
          width: '3%'
        }
      ];
    }
    return [
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
  }, [from, pools, type]);

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
      {
        type === DexType.BorrowAndEarn && (
          <LendingSummary
            userTotalCollateralUsd={userTotalCollateralUsd}
            userTotalBorrowUsd={userTotalBorrowUsd}
            userTotalSupplyUsd={userTotalSupplyUsd}
          />
        )
      }
      <LendingMarketHeader columns={COLUMNS} />
      {data.map((record: any) => (
        <LendingMarketRow
          key={record.address}
          {...props}
          columns={COLUMNS}
          data={record}
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
