import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLayoutStore } from '@/stores/layout';
import useTxs from '../Bridge/hooks/useTxs';
import BridgeWrapper from './components/BridgeWrapper';
import Header from './components/Header';
import AccountWrapper from './components/AccountWrapper';

const StyledContainer = styled.div`
  width: 352px;
  height: calc(100vh - 40px);
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 50;
`;

const StyledPanel = styled.div<{ display: boolean }>`
  border-radius: 32px;
  height: 100%;
  border: 1px solid #343838;
  box-sizing: border-box;
  padding: 20px 0px;
  background-color: #141414;
  --padding-x: 20px;
  transition: 0.5s;
  transform: translate(${({ display }) => (display ? 0 : 400)}px);
  position: relative;
  z-index: 52;
  @media (max-width: 768px) {
    width: 100vw;
    right: 0px;
    border-radius: 32px 32px 0px 0px;
    top: 20vh;
    height: 80vh;
    background: #2b2b2b;
    padding: 20px 0px 0px;
  }
  div::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    cursor: pointer;
  }
  div::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;
const Content = styled.div`
  position: relative;
  z-index: 60;
`;
const Bg = styled.div`
  width: 100%;
  height: 40%;
  background: linear-gradient(45deg, rgba(235, 244, 121, 0.2) 10%, rgba(20, 20, 20, 0.8) 50%);
  position: absolute;
  z-index: 51;
  bottom: 0px;
  left: 0px;
  border-radius: 0px 0px 32px 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;
const CloseIcon = styled.div`
  position: absolute;
  padding: 5px;
  left: -40px;
  top: 20px;
  cursor: pointer;
  border-radius: 23px 0px 0px 23px;
  background: rgba(55, 58, 83, 0.5);
  width: 50px;
  height: 32px;
  padding-left: 15px;
  padding-top: 3px;
  z-index: 51;
  @media (max-width: 768px) {
    display: none;
  }
`;

const AccountSider = () => {
  const layoutStore = useLayoutStore();
  const defaultTab = layoutStore.defaultTab;
  const [tab, setTab] = useState<'bridge' | 'account'>('account');
  const [showChains, setShowChains] = useState(false);
  const [showCodes, setShowCodes] = useState(false);

  useEffect(() => {
    if (layoutStore.showAccountSider && defaultTab === 'bridge') {
      setTab('bridge');
    }
  }, [layoutStore.showAccountSider, defaultTab]);

  const [updater, setUpdater] = useState(1);
  const { count, txs, loading: txLoading } = useTxs(updater);

  useEffect(() => {
    if (showChains) setShowCodes(false);
  }, [showChains]);

  useEffect(() => {
    if (showCodes) setShowChains(false);
  }, [showCodes]);

  return (
    <StyledContainer>
      <StyledPanel display={layoutStore.showAccountSider}>
        <Content>
          <Header tab={tab} />
          {tab === 'account' && <AccountWrapper count={count} setTab={setTab} />}
          {tab === 'bridge' && (
            <BridgeWrapper
              onBack={() => {
                setTab('account');
              }}
              count={count}
              txs={txs}
              txLoading={txLoading}
              refreshTxs={() => {
                setUpdater(Date.now());
              }}
            />
          )}
        </Content>
        <Bg />
      </StyledPanel>
      {layoutStore.showAccountSider && (
        <CloseIcon
          onClick={() => {
            layoutStore.set({
              showAccountSider: false,
            });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
            <path d="M1 9.46176L4.84626 5.23087L1 0.999986" stroke="white" stroke-width="2" stroke-linecap="round" />
            <path
              d="M7.15356 9.46176L10.9998 5.23087L7.15356 0.999986"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </CloseIcon>
      )}
    </StyledContainer>
  );
};

export default memo(AccountSider);
