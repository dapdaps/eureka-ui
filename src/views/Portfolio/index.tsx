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
import NotificationBar from '@/components/NotificationBar';

const TABS = [
  {
    key: '1',
    title: 'In Wallet'
  },
  {
    key: '2',
    title: 'DeFi Portfolio'
  },
  {
    key: '3',
    title: 'Execution Records'
  },
]

export default function Portfolio() {
  const [tab, setTab] = useState(TABS[0].key);
  const [network, setNetwork] = useState('all');
  const [notiVisible, setNotiVisible] = useState(true);

  const { loading: tokensLoading, tokens, networks, totalBalance } = useTokens();
  const {
    loading: dappsLoading,
    dapps,
    dappsByChain,
    totalBalance: totalBalanceByDapps,
  } = useDapps();
  const {
    hasMore,
    records,
    loading: recordsLoading,
    chain,
    dapp,
    handleChain,
    handleDapp,
    pageIndex,
    handlePrev,
    handleNext,
    handleFirst,
    handleLast,
  } = useExecuteRecords();

  const filterFunc = (token: any) => {
    return network === 'all' || token.chain_id === network;
  };

  return (
    <StyledContainer>
      {
        notiVisible && (
          <NotificationBar
            styles={{
              position: 'relative',
            }}
            onClose={() => {
              setNotiVisible(false);
            }}
          >
            The Portfolio on DapDap now supports 5 networks: Polygon zkEVM, zkSync, Linea, Scroll, Blast. More is coming soon...
          </NotificationBar>
        )
      }
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
            />
          </>
        )}
        {tab === TABS[1].key && (
          <Protocol
            loading={dappsLoading}
            filterFunc={filterFunc}
            dapps={dapps}
            dappsByChain={dappsByChain}
          />
        )}
        {tab === TABS[2].key && (
          <ExecuteRecords
            loading={recordsLoading}
            records={records}
            hasMore={hasMore}
            networks={networks}
            dapps={dapps}
            chain={chain}
            dapp={dapp}
            handleChain={handleChain}
            handleDapp={handleDapp}
            pageIndex={pageIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleFirst={handleFirst}
            handleLast={handleLast}
          />
        )}
        </Tab>
      </StyledContent>
    </StyledContainer>
  );
}
