// @ts-nocheck
import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import Big from 'big.js';
import { memo } from 'react';
import styled from 'styled-components';

import Avatar from '@/modules/components/Avatar';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';

import Stake from './Stake';
import Unstake from './Unstake';
const HeadWrapper = styled.div`
  border-radius: 16px;
  color: var(--white);
  font-size: var(--fz-14);
  position: relative;
  .pool-head {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    align-items: center;
    cursor: pointer;
    background-color: var(--bg-1);
  }
  .title-primary {
    font-size: var(--fz-16);
    font-weight: 500;
  }
  .title-secondary {
  }
  .title-sub {
    font-size: var(--fz-12);
    color: var(--purple);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 12% 12% 12% 24%;
`;
const GridItem = styled.div`
  height: 84px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
`;

const InfoPanel = styled.div`
  width: 610px;
  margin: 0 auto;
`;
const InfoPanelTitle = styled.div`
  font-size: var(--fz-16);
  font-weight: 500;
  color: var(--white);
  margin-bottom: 14px;
`;
const InfoPanelList = styled.div`
  font-size: var(--fz-14);
  font-weight: 400;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  .list-key {
    color: var(--purple);
  }
  .list-value {
    color: var(--white);
    flex-grow: 1;
    text-align: right;
    text-decoration: underline;
  }
`;

// tabs begin
const TabListWrap = styled.div`
  border-right: 1px solid var(--bg-2);
  display: flex;
  margin: 0 auto;
  width: 510px;
  align-items: center;
`;
const TabsList = styled(Tabs.List)`
  border: 1px solid var(--bg-2);
  margin-bottom: 20px;
  .tab-head-item {
    flex: 1;
    display: flex;
    height: 46px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--purple);
    cursor: pointer;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    border-left: 1px solid var(--bg-2);
  }
  .tab-head-item.active {
    color: var(--white);
    border-bottom-color: var(--primary);
  }
`;
// tabs end

// Accordion begin
const AccordionItem = styled(Accordion.Item)`
  /* margin-bottom: 10px; */
  border: 1px solid #373a53;
  max-width: 1244px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  .AccordionChevron {
    position: absolute;
    right: 24px;
    top: 45%;
    transition: all 0.1s ease-out;
  }
  &[data-state='open'] .AccordionChevron {
    transform: rotate(90deg);
  }
`;

const AccordionContent = styled(Accordion.Content)`
  /* max-width: 1244px;
  margin: 0 auto; */
  border-color: var(--bg-3);
  background-color: var(--bg-3);
  padding-bottom: 20px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
//Accordion end
export default memo(function Pool(props) {
  const { data, account, TOKENS } = props;
  const {
    Aura_Pool_ID,
    poolName,
    tokens,
    tokenAssets,
    stakedAmount,
    reward,
    Rewards_contract_address,
    Rewards_depositor_contract_address,
    LP_token_address,
    TVL,
    BAL_APR,
    swapFee,
    APR,
    pjAPR
  } = data;
  const [state, updateState] = useMultiState({
    currentTab: 'STAKE_TAB'
  });
  const EXPLORER = 'https://gnosisscan.io';
  const handleChangeTabs = (value) => {
    updateState({
      currentTab: value
    });
  };

  const renderPoolIcon = () => {
    if (tokenAssets) {
      return tokenAssets.map((addr, index) => {
        if (TOKENS[addr]) {
          return (
            <span key={index} style={{ marginRight: -12 }}>
              <Avatar src={TOKENS[addr].icon} />
            </span>
          );
        }
        return <></>;
      });
    }
  };

  return (
    <AccordionItem value={poolName}>
      <Accordion.Trigger asChild>
        <HeadWrapper>
          <GridContainer className="pool-head">
            <GridItem>
              <div className="title-primary">
                {renderPoolIcon()}
                <span style={{ marginLeft: 20 }}>{poolName}</span>
              </div>
            </GridItem>
            <GridItem>
              <div className="title-secondary">{Big(APR || 0).toFixed(2)}%</div>
              <div className="title-sub">proj.{Big(pjAPR).toFixed(2)} %</div>
            </GridItem>
            <GridItem>
              <div className="title-secondary">{formatValueDecimal(TVL, '$', 2, true)}</div>
            </GridItem>
            <GridItem>
              <div className="title-secondary">{formatValueDecimal(stakedAmount, '', 2)}</div>
              <div className="title-sub"></div>
            </GridItem>
            <GridItem>
              <div className="title-secondary">{formatValueDecimal(reward, '', 2)}</div>
              <div className="title-sub"></div>
            </GridItem>
          </GridContainer>
          <svg
            className="AccordionChevron"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
          >
            <path
              d="M7.02391 4.21913C7.52432 4.61945 7.52432 5.38054 7.02391 5.78087L2.1247 9.70024C1.46993 10.2241 0.5 9.75788 0.5 8.91937L0.5 1.08062C0.5 0.242118 1.46993 -0.224055 2.12469 0.299755L7.02391 4.21913Z"
              fill="#979ABE"
            />
          </svg>
        </HeadWrapper>
      </Accordion.Trigger>
      <AccordionContent>
        <Tabs.Root value={state.currentTab} onValueChange={handleChangeTabs}>
          <TabsList>
            <TabListWrap>
              <Tabs.Trigger value="STAKE_TAB" asChild>
                <div className={`tab-head-item ${state.currentTab === 'STAKE_TAB' ? 'active' : ''}`}>Stake</div>
              </Tabs.Trigger>
              <Tabs.Trigger value="UNSTAKE_TAB" asChild>
                <div className={`tab-head-item ${state.currentTab === 'UNSTAKE_TAB' ? 'active' : ''}`}>Unstake</div>
              </Tabs.Trigger>
              <Tabs.Trigger value="INFO_TAB" asChild>
                <div className={`tab-head-item ${state.currentTab === 'INFO_TAB' ? 'active' : ''}`}>Info</div>
              </Tabs.Trigger>
            </TabListWrap>
          </TabsList>
          <Tabs.Content value="STAKE_TAB">
            <Stake {...{ ...props }} />
          </Tabs.Content>
          <Tabs.Content value="UNSTAKE_TAB">{data && <Unstake {...{ ...props }} />}</Tabs.Content>
          <Tabs.Content value="INFO_TAB">
            <InfoPanel>
              <InfoPanelTitle>Contract</InfoPanelTitle>
              <InfoPanelList>
                <span className="list-key">Rewards contract address: </span>

                <a className="list-value" target="_blank" href={`${EXPLORER}/address/${Rewards_contract_address}`}>
                  {Rewards_contract_address}
                </a>
              </InfoPanelList>
              <InfoPanelList>
                <span className="list-key">Rewards depositor contract address: </span>

                <a
                  className="list-value"
                  target="_blank"
                  href={`${EXPLORER}/address/${Rewards_depositor_contract_address}`}
                >
                  {Rewards_depositor_contract_address}
                </a>
              </InfoPanelList>
              <InfoPanelList>
                <span className="list-key">LP token address: </span>
                <a className="list-value" target="_blank" href={`${EXPLORER}/address/${LP_token_address}`}>
                  {LP_token_address}
                </a>
              </InfoPanelList>
            </InfoPanel>
          </Tabs.Content>
        </Tabs.Root>
      </AccordionContent>
    </AccordionItem>
  );
});
