import { useMemo, useState } from 'react';

import Tab from '@/views/Portfolio/components/Tab';

import ExecuteRecords from './components/ExecuteRecords';
import Networks from './components/Networks';
import Protocol from './components/Protocol';
import Top from './components/Top';
import Wallet from './components/Wallet/index';
import useDapps from './hooks/useDapps';
import useExecuteRecords from './hooks/useExecuteRecords';
import useTokens from './hooks/useTokens';
import { StyledContainer, StyledContent, StyledFeedbackContainer } from './styles';
import NotificationBar from '@/components/NotificationBar';
import { useNetworks } from '@/hooks/useNetworks';
import Big from 'big.js';

const TABS = [
  {
    key: '1',
    title: 'In Wallet',
  },
  {
    key: '2',
    title: 'DeFi Portfolio',
  },
  {
    key: '3',
    title: 'Execution Records',
  },
];

export default function Portfolio() {
  const [tab, setTab] = useState(TABS[0].key);
  const [network, setNetwork] = useState<number>(-1);
  const [notiVisible, setNotiVisible] = useState(true);

  const { networkList } = useNetworks();
  const { loading: tokensLoading, tokens, networks, totalBalance } = useTokens({ networkList });
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
    return network === -1 || token.chain_id === network;
  };

  const totalWorth = useMemo(() => {
    return Big(totalBalance || 0).plus(totalBalanceByDapps || 0);
  }, [totalBalance, totalBalanceByDapps]);

  return (
    <StyledContainer>
      {
        notiVisible && (
          <NotificationBar
            styles={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
            onClose={() => {
              setNotiVisible(false);
            }}
          >
            <StyledFeedbackContainer>
              <span>
              The Portfolio. beta on DapDap now supports 5 networks: Polygon zkEVM, zkSync, Linea, Scroll, Blast. If there is any issue, please
            </span>
              <a href="https://sfnhpsqzhck.typeform.com/to/dmL1kaVI" rel="nofollow" target="_blank">feedback here.</a>
            </StyledFeedbackContainer>
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
                loading={tokensLoading}
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
              dapps={dapps}
              dappsByChain={dappsByChain}
              totalWorth={totalWorth}
            />
          )}
          {tab === TABS[2].key && (
            <ExecuteRecords
              loading={recordsLoading}
              records={records}
              hasMore={hasMore}
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
