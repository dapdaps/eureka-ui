import { useMemo, useState } from 'react';
import styled from 'styled-components';

import Empty from '@/components/Empty';
import useChain from '@/hooks/useChain';
import useTokensBalance from '@/hooks/useTokensBalance';
import LendingMarketHeader from '@/modules/lending/components/Markets/Header';
import { StyledContainer } from '@/modules/lending/components/Markets/styles';
import type { DexProps } from '@/modules/lending/models';
import { MarketsType } from '@/modules/lending/models';

import useTokens from './hooks/useTokens';
import LendingMarketRow from './Row';
import type { Tab } from './tabs';
import Tabs from './tabs';

const Container = styled.div`
  padding-top: 16px;
`;

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

  const chain = useChain();

  const [tab, setTab] = useState<Tab>('Base Tokens' as Tab);

  const { type, pools } = dexConfig;

  const { baseTokens, listTokens, allTokensList, tokenTal } = useTokens({ chainId: chain?.chainId });

  const { balances, queryBalance } = useTokensBalance(allTokensList);

  const COLUMNS = useMemo(() => {
    return [
      {
        key: 'asset',
        label: 'Asset',
        width: '30%'
      },
      {
        key: 'totalDeposit',
        label: 'Total Deposit',
        width: '24%',
        type: 'amount'
      },
      {
        key: 'apy',
        label: 'APY',
        width: '24%',
        type: 'apy'
      },
      {
        key: 'yourDeposit',
        label: 'Your Deposit',
        width: '24%',
        type: 'amount'
      },
      {
        key: 'handler',
        width: '2%'
      }
    ];
  }, [from, pools, type]);

  console.log('tokenTal:', tokenTal);

  return (
    <StyledContainer>
      <Tabs current={tab} onChange={setTab} />

      <Container>
        <LendingMarketHeader columns={COLUMNS} />
        <div style={{ height: '10px' }} />
        {tab === 'Base Tokens' &&
          (baseTokens && baseTokens.length > 0 ? (
            baseTokens.map((record: any) => (
              <LendingMarketRow
                queryBalance={queryBalance}
                key={record.address}
                {...props}
                columns={COLUMNS}
                data={record}
                balance={balances[record.address.toLowerCase()]}
                borrowLimit={1}
                marketsType={marketsType}
                tokenTal={tokenTal}
              />
            ))
          ) : (
            <Empty />
          ))}

        {tab === 'Listed Tokens' &&
          (listTokens && listTokens.length > 0 ? (
            listTokens.map((record: any) => (
              <LendingMarketRow
                tokenTal={tokenTal}
                queryBalance={queryBalance}
                key={record.address}
                {...props}
                columns={COLUMNS}
                data={record}
                balance={balances[record.address.toLowerCase()]}
                borrowLimit={1}
                marketsType={marketsType}
              />
            ))
          ) : (
            <Empty />
          ))}
      </Container>
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
