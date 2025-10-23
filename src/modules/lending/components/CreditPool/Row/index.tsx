import { useEffect, useState } from 'react';

import LendingMarketAmount from '@/modules/lending/components/Markets/Amount';
import LendingMarketApy from '@/modules/lending/components/Markets/Apy';
import LendingMarketAsset from '@/modules/lending/components/Markets/Asset';
import { useMultiState } from '@/modules/lending/hooks';
import type { Column, DexProps } from '@/modules/lending/models';
import { MarketsType } from '@/modules/lending/models';

import LendingMarketExpand from '../Expand';
import useTokenDetail from '../hooks/useTokenDetail';
import { StyledExpand, StyledRow, StyledRowHeader, StyledRowItem } from './styles';

const LendingMarketRow = (props: Props) => {
  const {
    columns,
    data,
    balance,
    queryBalance,
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
    from,
    tokenTal
  } = props;

  const [state, updateState] = useMultiState({
    expand: false
  });

  const [update, setUpdate] = useState(1);

  let _borrowLimit;

  const {
    totalDeposited,
    yourDeposited,
    loading,
    fetchGetWnlpByNlp,
    fetchGetNlpByWnlp,
    nlpPerToken,
    tokensPerNlp,
    fetchYourDeposited
  } = useTokenDetail(data, update);

  return (
    <StyledRow>
      <StyledRowHeader
        style={{
          borderRadius: state.expand ? '16px 16px 0px 0px' : '16px',
          background: from === 'layer' && state.expand ? '#f2f2f2' : 'var(--agg-secondary-color, #262836)'
        }}
        onClick={() => {
          if (!data.wrappedTokenAddress && (!data.pairingToken || data.pairingToken.length === 0)) {
            return;
          }
          updateState({
            expand: !state.expand
          });
        }}
      >
        {columns.map((column) => (
          <StyledRowItem key={column.key} style={{ width: column.width }}>
            {typeof column.render === 'function' && column.render(data, column)}
            {column.key === 'asset' && <LendingMarketAsset icon={data?.logoUrl} symbol={data?.symbol} />}
            {column.key === 'totalDeposit' && <LendingMarketAmount amount={totalDeposited} price={data?.priceUsd} />}
            {column.key === 'apy' && (
              <LendingMarketApy apy={data?.apy || '-'} distributionApy={data?.distributionApy} rewardKey={'borrow'} />
            )}
            {column.key === 'yourDeposit' && <LendingMarketAmount amount={yourDeposited} price={data?.priceUsd} />}
            {column.key === 'handler' && (
              <StyledExpand
                style={{
                  opacity: !data.wrappedTokenAddress && (!data.pairingToken || data.pairingToken.length === 0) ? 0.2 : 1
                }}
                className={state.expand ? 'expand' : ''}
              >
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
      <LendingMarketExpand
        {...props}
        tokenTal={tokenTal}
        nlpPerToken={nlpPerToken}
        tokensPerNlp={tokensPerNlp}
        fetchGetWnlpByNlp={fetchGetWnlpByNlp}
        fetchGetNlpByWnlp={fetchGetNlpByWnlp}
        yourDeposited={yourDeposited}
        balance={balance}
        marketsType={data.wrappedTokenAddress ? MarketsType.Earn : MarketsType.Borrow}
        expand={state.expand}
        borrowLimit={_borrowLimit}
        updateBalance={() => {
          queryBalance();
          fetchYourDeposited();
        }}
      />
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
  balance: any;
  queryBalance: any;
  tokenTal: any;
}
