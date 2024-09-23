// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
import { asyncFetch } from '@/utils/http';
const StyledContainer = styled.div``;
const StyledTop = styled.div``;
const StyledBack = styled.div`
  margin: 20px 0 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  color: #979abe;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 200px;
`;
const StyledContent = styled.div``;
const StyledCard = styled.div`
  margin: 0 auto;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  overflow: hidden;
`;
const StyledCardHead = styled.div`
  padding: 18px 30px 18px 30px;
  background: #32364b;
  border-bottom: 1px solid #373a53;

  .strategy-title {
    color: #fff;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .strategy-detail {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }
  .strategy-description {
    color: #979abe;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      margin: 0;
    }
  }
`;
const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;

  &.no-padding {
    padding: 0;
  }
`;
const StyledCardFoot = styled.div``;

const StyledBot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 16px;
  margin-top: 16px;
`;
const StyledSection = styled.div`
  padding: 18px 30px;

  &:not(:last-child) {
    border-bottom: 1px solid #373a53;
  }
`;
const StyledSectionTitle = styled.div`
  margin-bottom: 16px;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledSectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StyledSectionContent = styled.div``;
const StyledSectionListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledSectionListLabel = styled.div`
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 4px;

  .strategy-balance-icon {
    width: 24px;
    height: 24px;
  }
`;
const StyledSectionListValue = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #373a53;
`;
const StyledTab = styled.div`
  flex: 1;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #979abe;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  padding: 22px 0;

  &.active {
    color: #fff;
  }
`;
const StyledTabPointer = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  height: 4px;
  background: var(--switch-color);
  transition: transform 0.3s ease-in-out;
`;
const StyledTabsContent = styled.div`
  padding: 18px 30px;
  flex: 1;
`;

const StyledTips = styled.div`
  color: rgb(151, 154, 190);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;
  padding: 18px 30px 0;
`;
const StyledMultipliooorCardList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0 18px 18px;
  gap: 16px;
  max-height: 240px;
  overflow-y: auto;

  .card-item {
    margin: 0;
    padding: 8px;
    width: 130px;
    height: 192px;
    border-radius: 0;
    overflow: hidden;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }
`;
const StyledDexCardList = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0 18px 18px;
  gap: 16px;

  .card-item {
    margin: 0;
    padding: 8px;
    width: 130px;
    height: 192px;
    border-radius: 16px;
    overflow: hidden;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    border: 1px solid #373a53;
  }

  .card-logo {
    width: 100px;
    height: 40px;
  }
  .card-balance-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    margin: 0;
    flex: 1;
  }
  .card-balance-item {
    color: #fff;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
  }
  .card-foot {
    padding: 8px;
    border-top: 1px solid #373a53;
    margin-top: auto;
  }
  .card-link {
    text-decoration: none;
    color: rgb(151, 154, 190);
    font-size: 14px;
  }
`;
const StyledProgress = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 6px;
  background: #979abe;
  position: relative;
  margin-top: 20px;
  flex-shrink: 0;

  &::after {
    content: '';
    display: block;
    width: ${({ value, max }) => `${Math.floor((value / max) * 100)}%`};
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 6px;
    background: var(--button-color);
  }

  &.center {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .range-min,
  .range-max,
  .range-center {
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    top: -30px;
    color: #fff;
    font-size: 14px;
  }
  .range-min {
    left: 25%;
  }
  .range-max {
    left: 75%;
  }
  .range-center {
    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 1;
      left: 50%;
      transform: translateX(-50%);
      height: 36px;
      top: 18px;
      width: 4px;
      background: var(--switch-color);
      border-radius: 2px;
    }
  }
`;

const tabs = [
  {
    key: 1,
    title: 'Withdraw',
    component: dynamic(() => import('@/modules/staking/AgentFi/components/Withdraw'))
  },
  {
    key: 2,
    title: 'Deposit',
    component: dynamic(() => import('@/modules/staking/AgentFi/components/Deposit'))
  },
  {
    key: 3,
    title: 'Reset',
    component: dynamic(() => import('@/modules/staking/AgentFi/components/Reset'))
  }
];
export default memo(function MyStrategiesDetail(props: any) {
  const {
    record,
    onRecordClose,
    dexConfig,
    formatTVL,
    prices,
    numKnownMissions,
    totalMissions,
    tickToPrice,
    QUERY_POOL_ABI,
    strategies,
    provider
  } = props;

  const currentStrategy = strategies.find((it) => it.name === record.name.toLowerCase());

  const [state, updateState] = useMultiState({
    tab: tabs[0],
    tabsShown: [tabs[0]],
    currentRange: [],
    currentPrice: ''
  });
  const { tab, currentRange, tabsShown } = state;
  const balanceList = formatTVL(record).list || [];
  const handleClose = () => {
    onRecordClose();
  };

  const handleTab = (tab) => {
    if (tab.key === state.tab.key) return;
    updateState({
      tab: tab
    });
  };

  const queryPoolInfo = (params) => {
    let fee = params?.fee;
    return new Promise((resolve) => {
      if (!fee) {
        const currentBalancesList = record.balances || [];
        const currentBalance = currentBalancesList.find((it) => /^BlasterSwap Positions NFT/.test(it.name));
        if (!currentBalance) {
          resolve(false);
          return;
        }
        fee = currentStrategy.meta.feeTierList.find((it) => it.name.includes(currentBalance.name));
        if (!fee) {
          resolve(false);
          return;
        }
      }

      const contract = new ethers.Contract(fee.pool, QUERY_POOL_ABI, provider.getSigner());
      const params = [];
      contract
        .slot0(...params)
        .then((poolAddress) => {
          const [sqrtPriceX96, tick] = poolAddress;
          resolve({ sqrtPriceX96: ethers.BigNumber.from(sqrtPriceX96).toString(), tick });
        })
        .catch((err) => {
          console.log('queryPoolInfo failed, ', err);
          resolve(false);
        });
    });
  };
  const getRangeData = () => {
    const url = `/api/app/agentfi/position/range?agentAddress=${record.agentAddress}`;
    asyncFetch(url)
      .then((res) => {
        if (!res.ok || !res) {
          return;
        }
        updateState({
          currentRange: [res.min, res.max]
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderDetail = () => {
    if ([strategies[0].name].includes(record.name.toLowerCase())) {
      return (
        <StyledSection>
          <StyledSectionTitle>Strategy Overview</StyledSectionTitle>
          <StyledSectionList>
            <StyledSectionListItem>
              <StyledSectionListLabel>Supply</StyledSectionListLabel>
              <StyledSectionListValue>
                {balanceList[0]
                  ? Big(balanceList[0].balance).times(currentStrategy.meta.leverage).toFixed(4)
                  : '0.0000'}
              </StyledSectionListValue>
            </StyledSectionListItem>
            <StyledSectionListItem>
              <StyledSectionListLabel>Borrow</StyledSectionListLabel>
              <StyledSectionListValue>
                {balanceList[0] ? Big(balanceList[0].balance).toFixed(4) : '0.0000'}
              </StyledSectionListValue>
            </StyledSectionListItem>
            <StyledSectionListItem>
              <StyledSectionListLabel>Leverage</StyledSectionListLabel>
              <StyledSectionListValue>{currentStrategy.meta.leverage}x</StyledSectionListValue>
            </StyledSectionListItem>
            <StyledSectionListItem>
              <StyledSectionListLabel>LTV</StyledSectionListLabel>
              <StyledSectionListValue>{currentStrategy.meta.targetLTV}</StyledSectionListValue>
            </StyledSectionListItem>
            <StyledSectionListItem>
              <StyledSectionListLabel>Mode</StyledSectionListLabel>
              <StyledSectionListValue>Boost Points</StyledSectionListValue>
            </StyledSectionListItem>
          </StyledSectionList>
        </StyledSection>
      );
    }
    if (record.name.toLowerCase() === strategies[3].name) {
      return (
        <>
          <StyledTips>
            See which multiplers your agent has accumulated for you. Learn more about Blast multipliers here.
          </StyledTips>
          <StyledMultipliooorCardList>
            {currentStrategy.achievements.map((achievement, idx) => (
              <li className="card-item" key={idx + ''} style={{ backgroundImage: `url("${achievement.img}")` }}>
                <span className="no">#{idx + 1}</span>
              </li>
            ))}
            {[...new Array(totalMissions - numKnownMissions).keys()].map((idx) => (
              <li
                className="card-item"
                key={idx + ''}
                style={{ backgroundImage: `url("${currentStrategy.meta.lockedImgUrl}")` }}
              >
                <span className="no">#{idx + numKnownMissions + 1}</span>
              </li>
            ))}
          </StyledMultipliooorCardList>
        </>
      );
    }
    if (record.name.toLowerCase() === strategies[2].name) {
      return (
        <>
          <StyledTips>View the breakdown of your LP positions being managed by DEX Balancer.</StyledTips>
          <StyledDexCardList>
            {currentStrategy.meta.protocolList.map((protocol, index) => {
              const balances = record.balances || [];
              const currBalance = balances.find((it) => it.address === protocol.address);
              if (!currBalance || !currBalance.underlying) return null;
              return (
                <li className="card-item" key={index}>
                  <img className="card-logo" src={protocol.logo} alt="" />
                  <ul className="card-balance-list">
                    {currBalance.underlying.map((b, index) => (
                      <li className="card-balance-item" key={index}>
                        <span>{b.symbol}</span>
                        <span>{Big(b.balance || 0).toFixed(4)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-foot">
                    <a className="card-link" href={protocol.link} rel="nofollow" target="_blank">
                      {protocol.link.replace(/^https?:\/\/(www.)?/, '')}
                    </a>
                  </div>
                </li>
              );
            })}
          </StyledDexCardList>
        </>
      );
    }
    if (record.name.toLowerCase() === strategies[1].name) {
      return (
        <>
          <StyledTips>
            View liquidity, unclaimed fees and accrued points in your LP position, as well as range and next
            rebalancing.
          </StyledTips>
          <StyledSection>
            <StyledSectionTitle>Liquidity</StyledSectionTitle>
            <StyledSectionList>
              {balanceList &&
                balanceList.map((balance, index) => (
                  <StyledSectionListItem key={index}>
                    <StyledSectionListLabel>
                      <img className="clm-balance-icon" src={balance.icon} alt="" />
                      <span>{balance.symbol}</span>
                    </StyledSectionListLabel>
                    <StyledSectionListValue title={Big(balance.balance || 0).toFixed(18)}>
                      {Big(balance.balance || 0).toFixed(4)}
                    </StyledSectionListValue>
                  </StyledSectionListItem>
                ))}
            </StyledSectionList>
          </StyledSection>
          <StyledSection>
            <StyledSectionTitle>Current range and price</StyledSectionTitle>
            <StyledSectionList>
              <StyledProgress className="center" max={10} value={5}>
                <div className="range-center">{Math.round(state.currentPrice || 0)}</div>
                <div className="range-min">{currentRange[0] && Math.floor(currentRange[0] || 0)}</div>
                <div className="range-max">{currentRange[1] && Math.floor(currentRange[1] || 0)}</div>
              </StyledProgress>
            </StyledSectionList>
          </StyledSection>
        </>
      );
    }
  };

  useEffect(() => {
    const _tabs = [tabs[0]];
    if (record.name.toLowerCase() === strategies[1].name) {
      getRangeData();
      _tabs.push(tabs[1]);
      _tabs.push(tabs[2]);
    }
    if (record.name.toLowerCase() === strategies[3].name) {
      _tabs.push(tabs[1]);
    }
    if (record.name.toLowerCase() === strategies[2].name) {
      _tabs.push(tabs[1]);
    }
    updateState({
      tabsShown: _tabs
    });

    if (record.name.toLowerCase() === strategies[1].name) {
      queryPoolInfo().then((poolRes) => {
        if (!poolRes) {
          return;
        }
        const { tick } = poolRes;
        const currentBalancesList = record.balances || [];
        const currentBalance = currentBalancesList.find((it) => /^BlasterSwap Positions NFT/.test(it.name));
        if (!currentBalance || !currentBalance.underlying || currentBalance.underlying.length < 2) {
          return;
        }
        updateState({
          currentPrice: tickToPrice({
            tick,
            token0: currentBalance.underlying[1],
            token1: currentBalance.underlying[0]
          })
        });
      });
    }
  }, []);

  return (
    <StyledContainer>
      <StyledTop>
        <StyledBack onClick={handleClose}>
          <div className="back-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
              <path d="M7.5 1L2 6.49992L7.5 12" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <div className="back-title">Back to My Strategies</div>
        </StyledBack>
      </StyledTop>
      <StyledContent>
        <StyledCard>
          <StyledCardHead>
            <div className="strategy-title">{record.name}</div>
            <div className="strategy-description">{currentStrategy?.DESCRIPTION_CONFIG?.join(' ')}</div>
          </StyledCardHead>
        </StyledCard>
        <StyledBot>
          <StyledCard style={{ flex: 1 }}>
            <StyledCardBody className="no-padding" style={{ height: '100%' }}>
              <StyledTabs>
                {tabsShown.map((_tab) => (
                  <StyledTab
                    key={_tab.key}
                    onClick={() => handleTab(_tab)}
                    className={`${tab.key === _tab.key ? 'active' : ''}`}
                  >
                    {_tab.title}
                  </StyledTab>
                ))}
                <StyledTabPointer
                  style={{
                    width: `calc(100% / ${tabsShown.length})`,
                    transform: `translateX(calc(100% * ${tabsShown.findIndex((it) => it.key === tab.key) || 0}))`
                  }}
                />
              </StyledTabs>
              <StyledTabsContent>
                <tab.component
                  {...{
                    ...props,
                    tab,
                    handleDetailClose: handleClose,
                    currentStrategy,
                    balanceList,
                    queryPoolInfo
                  }}
                />
              </StyledTabsContent>
            </StyledCardBody>
          </StyledCard>
          <StyledCard style={{ flex: 1 }}>
            <StyledCardBody>
              {/*#region balance*/}
              <StyledSection>
                <StyledSectionTitle>Balance</StyledSectionTitle>
                <StyledSectionList>
                  <StyledSectionListItem>
                    <StyledSectionListLabel style={{ color: 'var(--switch-color)' }}>Total</StyledSectionListLabel>
                    <StyledSectionListValue style={{ color: 'var(--switch-color)' }}>
                      {formatTVL(record).value}
                    </StyledSectionListValue>
                  </StyledSectionListItem>
                  {!!balanceList.length &&
                    balanceList.map((tk, index) => (
                      <StyledSectionListItem key={index}>
                        <StyledSectionListLabel>
                          <img className="strategy-balance-icon" src={tk.icon} alt="" />
                          <span>{tk.symbol}</span>
                        </StyledSectionListLabel>
                        <StyledSectionListValue>
                          {record.name.toLowerCase() === strategies[3].name
                            ? Big(tk.balance).times(4).toFixed(4)
                            : Big(tk.balance).toFixed(4)}
                        </StyledSectionListValue>
                      </StyledSectionListItem>
                    ))}
                </StyledSectionList>
              </StyledSection>
              {/*#endregion*/}

              {/*#region detail*/}
              {renderDetail()}
              {/*#endregion*/}
            </StyledCardBody>
          </StyledCard>
        </StyledBot>
      </StyledContent>
    </StyledContainer>
  );
});
