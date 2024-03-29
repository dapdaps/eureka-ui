import { useState } from 'react';
import Top from './components/Top';
import Networks from './components/Networks';
import Wallet from './components/Wallet';
import Protocol from './components/Protocol';
import ExecuteRecords from './components/ExecuteRecords';
import useTokens from './hooks/useTokens';
import useDapps from './hooks/useDapps';
import useExecuteRecords from './hooks/useExecuteRecords';
import { StyledContainer, StyledContent } from './styles';

export default function Portfolio() {
  const [tab, setTab] = useState('Wallet');
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
      <Top tab={tab} setTab={setTab} />
      <StyledContent>
        {tab !== 'Execution Records' && (
          <Networks networks={networks} totalBalance={totalBalance} network={network} setNetwork={setNetwork} />
        )}
        {tab === 'Wallet' && (
          <Wallet loading={tokensLoading} filterFunc={filterFunc} tokens={tokens} totalBalance={totalBalance} />
        )}
        {tab === 'Protocol' && <Protocol loading={dappsLoading} filterFunc={filterFunc} dapps={dapps} />}
        {tab === 'Execution Records' && (
          <ExecuteRecords
            loading={recordsLoading}
            records={records}
            hasMore={hasMore}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </StyledContent>
    </StyledContainer>
  );
}
