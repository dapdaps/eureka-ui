import Big from 'big.js';
import { isArray } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import useChain from '@/hooks/useChain';
import useTokensBalance from '@/hooks/useTokensBalance';
import LendingMarketAmount from '@/modules/lending/components/Markets/Amount';
import LendingMarketAsset from '@/modules/lending/components/Markets/Asset';
import LendingMarketAssetList from '@/modules/lending/components/Markets/Asset/List';
import LendingMarketHeader from '@/modules/lending/components/Markets/Header';
import { StyledContainer } from '@/modules/lending/components/Markets/styles';
import LendingSummary from '@/modules/lending/components/Markets/Summary';
import { useMultiState } from '@/modules/lending/hooks';
import type { DexProps } from '@/modules/lending/models';
import { DexType, MarketsType } from '@/modules/lending/models';
import { StyledFlex, StyledFont } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

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

  const { baseTokens, listTokens, loading, allTokensList } = useTokens({ chainId: chain?.chainId });

  const { balances } = useTokensBalance(allTokensList);

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

  return (
    <StyledContainer>
      <Tabs current={tab} onChange={setTab} />

      <Container>
        <LendingMarketHeader columns={COLUMNS} />
        {tab === 'Base Tokens' &&
          baseTokens.map((record: any) => (
            <LendingMarketRow
              key={record.address}
              {...props}
              columns={COLUMNS}
              data={record}
              balance={balances[record.address.toLowerCase()]}
              borrowLimit={1}
              marketsType={marketsType}
            />
          ))}

        {tab === 'Listed Tokens' &&
          listTokens.map((record: any) => (
            <LendingMarketRow
              key={record.address}
              {...props}
              columns={COLUMNS}
              data={record}
              balance={balances[record.address.toLowerCase()]}
              borrowLimit={1}
              marketsType={marketsType}
            />
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
