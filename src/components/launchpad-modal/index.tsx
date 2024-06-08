import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import allTokens from '@/config/bridge/allTokens';
import chainCofig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import type { Chain, Token } from '@/types';
import { addressFormated, balanceFormated, errorFormated, getFullNum, percentFormated } from '@/utils/balance';

import ChainTokenAmount from './ChainTokenAmount';
import Modal from './launch-modal';
import SellTokenAmount from './SellTokenAmount';
import Settings from './settings';
import {
  ArrowSwap,
  Body,
  CloseBtn,
  Foot,
  FootWrap,
  Head,
  HeadContent,
  HeadLeft,
  HeadSub,
  HeadTitle,
  Logo,
  Panel,
  Status,
  TabBody,
  TimerEnd,
} from './style.index';
import SubmitBtn from './SubmitBtn';
import Tabs from './tabs';
import Timer from './timer';

interface IProps {
  onClose: () => void;
}
const chainList = Object.values(chainCofig);

const CloseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
      fill="#979ABE"
    />
  </svg>
);

const LaunchPadModal: FC<IProps> = ({ onClose }) => {
  const { account, chainId, provider } = useAccount();
  const [fromChain, setFromChain] = useState<Chain>(chainList[0]);
  const [toChain, setToChain] = useState<Chain>(chainList[1]);
  const [fromToken, setFromToken] = useState<Token>();
  const [toToken, setToToken] = useState<Token>();
  const [sendAmount, setSendAmount] = useState('');
  const [updateBanlance, setUpdateBanlance] = useState(1);

  const [currentTab, setCurrentTab] = useState('BUY');
  const tabData = [
    {
      name: 'Buy',
      key: 'BUY',
    },
    {
      name: 'Sell',
      key: 'SELL',
    },
  ];

  const onTabsChange = (key: string) => {
    setCurrentTab(key);
  };
  return (
    <Modal>
      <Panel>
        <Head>
          <HeadLeft>
            <Logo src="https://ipfs.near.social/ipfs/bafkreidgui7lyuedwj7xk6zt2tpy6sezzgi3gj37rt43xo5bked5o5cmtm" />
            <HeadContent>
              <HeadTitle>
                CTG
                <Status>
                  <b className="dot"></b>Live Now
                </Status>
              </HeadTitle>
              <HeadSub>Contango</HeadSub>
            </HeadContent>
          </HeadLeft>
          <CloseBtn onClick={() => onClose()}>{CloseIcon}</CloseBtn>
        </Head>
        <TimerEnd>End in</TimerEnd>
        <Timer color="white" endTime={Number(1719836235833)} />
        <Tabs tabData={tabData} current={currentTab} onTabsChange={onTabsChange} style={{ marginTop: 4 }}></Tabs>
        <Settings style={{ position: 'absolute', right: 17, bottom: 24 }} />
      </Panel>
      <Body>
        {currentTab === 'BUY' && (
          <TabBody>
            <ChainTokenAmount
              onChainChange={(chain: Chain) => {
                setFromChain(chain);
              }}
              onTokenChange={(token: Token) => {
                setFromToken(token);
              }}
              onAmountChange={(value) => {
                setSendAmount(value);
              }}
              updateBanlance={updateBanlance}
              currentChain={fromChain}
              currentToken={fromToken}
              chainToken={allTokens}
              title="Collateral Token"
              needGas={false}
              amount={sendAmount}
              address={addressFormated(account as string)}
              chainList={chainList}
            />
            <ArrowSwap
            // onClick={() => {
            //   const [_toChain, _fromChain] = [fromChain, toChain];
            //   const [_toToken, _fromToken] = [fromToken, toToken];

            //   setFromChain(_fromChain);
            //   setToChain(_toChain);
            //   setFromToken(_fromToken);
            //   setToToken(_toToken);
            // }}
            >
              <div className="arrow">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.49992 1V11.5M6.49992 11.5L1 6M6.49992 11.5L12 6"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </ArrowSwap>
            <SellTokenAmount title="Project Input" amount="0.001" balance="0.00" readOnly />
          </TabBody>
        )}
        {currentTab === 'SELL' && (
          <TabBody>
            <SellTokenAmount title="Project Input" amount="0.001" balance="0.00" readOnly={false} />
            <ArrowSwap>
              <div className="arrow">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.49992 1V11.5M6.49992 11.5L1 6M6.49992 11.5L12 6"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </ArrowSwap>
            <SellTokenAmount title="Project Input" amount="0.001" balance="0.00" readOnly={true} />
          </TabBody>
        )}
        <FootWrap>
          <SubmitBtn
            isLoading={false}
            text={currentTab === 'BUY' ? 'Buy' : 'Sell'}
            fromChain={fromChain}
            onClick={() => {}}
            disabled={false}
          />

          <Foot>
            <span>Price impact 0.07%</span>
            <span className="addToken">Add CTG to MetaMask</span>
          </Foot>
        </FootWrap>
      </Body>
    </Modal>
  );
};

export default LaunchPadModal;
