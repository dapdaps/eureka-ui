import { useState } from 'react';

import Tab from '@/views/Portfolio/components/Tab';

import ExecuteRecords from './components/ExecuteRecords';
import Networks from './components/Networks';
import Protocol from './components/Protocol';
import Top from './components/Top';
import Wallet from './components/Wallet/index';
import useDapps from './hooks/useDapps';
import useExecuteRecords from './hooks/useExecuteRecords';
import useTokens from './hooks/useTokens';
import { StyledContainer, StyledContent } from './styles';

const TABS = [
  {
    key: '1',
    title: 'Wallet'
  },
  {
    key: '2',
    title: 'Protocol'
  },
  {
    key: '3',
    title: 'Execution Records'
  },
]

export default function Portfolio() {
  const [tab, setTab] = useState(TABS[0].key);
  const [network, setNetwork] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const { loading: tokensLoading, tokens, networks, totalBalance } = useTokens();
  const { loading: dappsLoading, dapps } = useDapps();
  const {
    hasMore,
    records,
    loading: recordsLoading,
  } = useExecuteRecords({
    currentPage,
  });

  const filterFunc = (token: any) => {
    return network === 'all' || token.chain_id === network;
  };

  return (
    <StyledContainer>
      <StyledContent>
        <Top />
        <Tab tab={tab} setTab={setTab} tabs={TABS}>
        {tab === TABS[0].key && (
          <>
            <Networks
              networks={networks}
              totalBalance={totalBalance}
              network={network}
              setNetwork={setNetwork}
            />
            <Wallet
              loading={tokensLoading}
              filterFunc={filterFunc}
              tokens={tokens}
              totalBalance={totalBalance}
            />
          </>
        )}
        {tab === TABS[1].key && (
          <Protocol
            loading={dappsLoading}
            filterFunc={filterFunc}
            dapps={dapps}
          />
        )}
        {tab === TABS[2].key && (
          <ExecuteRecords
            loading={recordsLoading}
            records={records}
            hasMore={hasMore}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        </Tab>
      </StyledContent>
    </StyledContainer>
  );
}
