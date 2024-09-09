import Big from 'big.js';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import NotificationBar from '@/components/NotificationBar';
import { SupportedChains } from '@/config/all-in-one/chains';
import useAccount from '@/hooks/useAccount';
import { useNetworks } from '@/hooks/useNetworks';
import { usePortfolioStore } from '@/stores/portfolio';
import Tab from '@/views/Portfolio/components/Tab';
import useTvls from '@/views/Portfolio/hooks/useTvls';
import { useWorth } from '@/views/Portfolio/hooks/useWorth';

import ExecuteRecords from './components/ExecuteRecords';
import Networks from './components/Networks';
import Protocol from './components/Protocol';
import Top from './components/Top';
import Wallet from './components/Wallet/index';
import useDapps from './hooks/useDapps';
import useExecuteRecords from './hooks/useExecuteRecords';
import useTokens from './hooks/useTokens';
import { StyledContainer, StyledContent, StyledFeedbackContainer, StyledFeedbackText, StyledLink } from './styles';

const TABS = [
  {
    key: '1',
    title: 'In Wallet',
    bp: '1008-001'
  },
  {
    key: '2',
    title: 'DeFi Portfolio',
    bp: '1008-002'
  },
  {
    key: '3',
    title: 'Execution Records',
    bp: '1008-003'
  }
];

export default function Portfolio() {
  const { account } = useAccount();

  const router = useRouter();
  const [tab, setTab] = useState<string>(TABS[0].key);
  const [network, setNetwork] = useState<number>(-1);

  const { networkList } = useNetworks();
  const { loading: tokensLoading, tokens, networks, totalBalance } = useTokens({ networkList });
  const { loading: dappsLoading, dapps, dappsByChain, totalBalance: totalBalanceByDapps } = useDapps();
  const { list: worthList, loading: worthLoading, increase: worthIncrease } = useWorth();
  const { tvls, loading: tvlsLoading } = useTvls();

  const show = usePortfolioStore((store: any) => store.show);
  const setShow = usePortfolioStore((store: any) => store.setShow);

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
    handleLast
  } = useExecuteRecords();

  const filterFunc = (token: any) => {
    return network === -1 || token.chain_id === network;
  };

  const totalWorth = useMemo(() => {
    return Big(totalBalance || 0).plus(totalBalanceByDapps || 0);
  }, [totalBalance, totalBalanceByDapps]);

  const link = (
    <a href="https://sfnhpsqzhck.typeform.com/to/dmL1kaVI" rel="nofollow" target="_blank">
      feedback here
    </a>
  );

  useEffect(() => {
    const routerTab: any = router.query?.tab ?? '';
    if (routerTab && !!TABS.find((tab) => tab.key === routerTab)) {
      setTab(routerTab);
    }
  }, [router.query?.tab]);

  return (
    <StyledContainer>
      {show && (
        <NotificationBar
          styles={{
            position: 'absolute',
            left: 0,
            top: 0
          }}
          onClose={() => {
            setShow(false);
          }}
        >
          <StyledFeedbackContainer>
            <StyledFeedbackText>
              The Portfolio. beta on DapDap now supports 5 networks: {SupportedChains.map((it) => it.name).join(', ')}.
              If there is any issue, please
            </StyledFeedbackText>
            <span>{link}.</span>
          </StyledFeedbackContainer>
        </NotificationBar>
      )}
      <StyledContent>
        <Top />
        <Tab tab={tab} setTab={setTab} tabs={TABS} tabsExtra={!show ? <StyledLink>{link}</StyledLink> : null}>
          {tab === TABS[0].key && (
            <>
              <Networks
                networks={networks}
                totalBalance={totalBalance}
                network={network}
                setNetwork={setNetwork}
                loading={tokensLoading}
              />
              <Wallet loading={tokensLoading} filterFunc={filterFunc} tokens={tokens} />
            </>
          )}
          {tab === TABS[1].key && (
            <Protocol
              loading={dappsLoading}
              dapps={dapps}
              dappsByChain={dappsByChain}
              totalWorth={totalWorth}
              worthList={worthList}
              worthLoading={worthLoading}
              worthIncrease={worthIncrease}
              tvls={tvls}
              tvlsLoading={tvlsLoading}
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
