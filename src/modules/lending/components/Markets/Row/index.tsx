import Big from 'big.js';

import LendingMarketAmount from '@/modules/lending/components/Markets/Amount';
import LendingMarketApy from '@/modules/lending/components/Markets/Apy';
import LendingMarketAsset from '@/modules/lending/components/Markets/Asset';
import LendingMarketExpand from '@/modules/lending/components/Markets/Expand';
import { useMultiState } from '@/modules/lending/hooks';
import type { Column, DexProps, MarketsType } from '@/modules/lending/models';

import { StyledExpand, StyledRow, StyledRowHeader, StyledRowItem } from './styles';

const LendingMarketRow = (props: Props) => {
  const {
    columns,
    data,
    borrowLimit,
    addAction,
    toast,
    chainId,
    nativeCurrency,
    dexConfig,
    onSuccess,
    account,
    prices,
    totalCollateralUsd,
    userTotalBorrowUsd,
    userTotalCollateralUsd,
    from
  } = props;

  const [state, updateState] = useMultiState({
    expand: false
  });

  let _borrowLimit;

  console.log('====borrowLimit', borrowLimit);
  // for Ionic
  if (dexConfig.name === 'Ionic') {
    const currentTokenCollateralUSD = Big(data.userCollateralUSD || 0).times(Big(data.COLLATERAL_FACTOR));

    _borrowLimit = Big(totalCollateralUsd).div(1.03).minus(currentTokenCollateralUSD).minus(Big(userTotalBorrowUsd));

    _borrowLimit = _borrowLimit.lte(0) ? 0 : _borrowLimit.toFixed(6);
  } else {
    _borrowLimit = borrowLimit;
  }

  return (
    <StyledRow>
      <StyledRowHeader
        style={{
          borderRadius: state.expand ? '16px 16px 0px 0px' : '16px',
          background: from === 'layer' && state.expand ? '#f2f2f2' : 'var(--agg-secondary-color, #262836)'
        }}
        onClick={() => {
          updateState({
            expand: !state.expand
          });
        }}
      >
        {columns.map((column) => (
          <StyledRowItem key={column.key} style={{ width: column.width }}>
            {typeof column.render === 'function' && column.render(data, column)}
            {column.key === 'asset' && (
              <LendingMarketAsset icon={data?.underlyingToken.icon} symbol={data?.underlyingToken.symbol} />
            )}
            {column.type === 'amount' && (
              <LendingMarketAmount amount={data[column.key]} price={data?.underlyingPrice} />
            )}
            {column.type === 'apy' && (
              <LendingMarketApy
                apy={data[column.key]}
                distributionApy={data?.distributionApy}
                rewardKey={column.key === 'supplyApy' ? 'supply' : 'borrow'}
              />
            )}
            {column.key === 'handler' && (
              <StyledExpand className={state.expand ? 'expand' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path
                    d="M5.94103 7.02391C5.5407 7.52432 4.77961 7.52432 4.37929 7.02391L0.459914 2.1247C-0.0638966 1.46993 0.402276 0.499999 1.24078 0.499999L9.07953 0.5C9.91804 0.5 10.3842 1.46993 9.8604 2.12469L5.94103 7.02391Z"
                    fill="#979ABE"
                  />
                </svg>
              </StyledExpand>
            )}
          </StyledRowItem>
        ))}
      </StyledRowHeader>
      <LendingMarketExpand {...props} expand={state.expand} borrowLimit={_borrowLimit} />
    </StyledRow>
  );
};

export default LendingMarketRow;

export interface Props extends DexProps {
  columns: Column[];
  data: any;
  borrowLimit: any;
  totalCollateralUsd: any;
  userTotalBorrowUsd: any;
  userTotalCollateralUsd?: any;
  marketsType?: MarketsType;
}
