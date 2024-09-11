
// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from "react";
import { useEffect } from 'react';
import styled from "styled-components";

import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from "@/utils/formate";

import StrategyFactoryDetail from './StrategyFactoryDetail'
const StyledContentTopTips = styled.div`
  margin: 30px 0;
  text-align: center;
  color: #979ABE;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledStrategyFactory = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;
const StyledStrategyCard = styled.div`
  width: 320px;
  height: 440px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #373A53;
  background: #262836;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
const StyledStrategyCardHead = styled.div`
  padding-left: 16px;
  padding-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  height: 93px;
  background: #32364B;
  border-bottom: 1px solid #373A53;
  position: relative;
  flex-shrink: 0;

  .strategy-title {
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .stratefy-addon {
    color: #979ABE;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .stratefy-hot {
    position: absolute;
    z-index: 1;
    width: 34px;
    height: 34px;
    right: 2px;
    top: 5px;
  }
`;
const StyledStrategyCardBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 247px;
  padding: 16px;
  flex: 1;

  .achievement-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 12px;
    color: #979ABE;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    list-style: none;
    margin: 0;
    padding: 0;

    .achievement-item {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;

      .achievement-icon {
        width: 25px;
        height: 25px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .checked-icon {
        margin-left: auto;
      }
    }
  }
`;
const StyledStrategyCardFoot = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`;
const StyledStrategyCardButton = styled.button`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 288px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--button-color);
  color: var(--button-text-color);
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  
  &[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
const StyledProgress = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  background: #979ABE;
  position: relative;
  margin-top: 20px;
  flex-shrink: 0;

  &::after {
    content: "";
    display: block;
    width: ${({ value, max }) => `${Math.floor(value / max * 100)}%`};
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 6px;
    background: var(--button-color);
  }
`;
const StyledProgressTips = styled.div`
  font-size: 12px;
  color: #979ABE;
  text-align: center;
  margin-top: 2px;
`;

export default memo(function StrategyFactory(props: any) {
  const {
    dexConfig,
    currentStrategy,
    handleStrategy,
    numKnownMissions,
    totalMissions,
    multiplier,
    rootAgent,
    dexAPR,
    strategies,
  } = props;

  return (
    <>
      {
        currentStrategy && currentStrategy.ID ? (
          <StrategyFactoryDetail
            {...{
              ...props,
              currentStrategy,
            }}
          />
        ) : (
          <>
            <StyledContentTopTips>
              Launch one or more of these strategies to automatically manage your portfolio and maximize returns.
            </StyledContentTopTips>
            <StyledStrategyFactory>
              {
                strategies.map((strategy, index) => (
                  <StyledStrategyCard key={index}>
                    <StyledStrategyCardHead>
                      <div className="strategy-title">
                        {strategy.NAME}
                      </div>
                      {
                        // Looper
                        strategy.ID === "4" && (
                          <div className="stratefy-addon">
                            {strategy.meta.leverage}x Leverage
                          </div>
                        )
                      }
                      {
                        // DEX Balancer
                        strategy.ID === "1" && (
                          <div className="stratefy-addon">
                            {dexAPR}% APR
                          </div>
                        )
                      }
                      {
                        // Multipliooor
                        strategy.ID === "2" && (
                          <div className="stratefy-addon">
                            {multiplier}x Points
                          </div>
                        )
                      }
                      {
                        strategy.isNew && (
                          <img
                            className="stratefy-hot"
                            src="https://app.agentfi.io/assets/strategies/icons/fire.svg"
                            alt=""
                          />
                        )
                      }
                    </StyledStrategyCardHead>
                    <StyledStrategyCardBody>
                      {
                        strategy.achievements && (
                          <ul className="achievement-list">
                            {
                              strategy.achievements.map((achievement, index) => (
                                <li className="achievement-item" key={index}>
                                  {
                                    achievement.iconUrl && (
                                      <span
                                        className="achievement-icon"
                                        style={{ backgroundImage: `url("${achievement.iconUrl}")` }}
                                      />
                                    )
                                  }
                                  <span>{achievement.name}</span>
                                  <span className="checked-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="11"
                                      viewBox="0 0 14 11"
                                      fill="none"
                                    >
                                      <path
                                        d="M1 4.65217L5.17391 8.82609L13 1"
                                        stroke="#fcfc03"
                                        stroke-width="2"
                                      />
                                    </svg>
                                  </span>
                                </li>
                              ))
                            }
                          </ul>
                        )
                      }
                      {
                        strategy.ID === "2" && (
                          <>
                            <StyledProgress
                              className="achievement-progress"
                              max={totalMissions}
                              value={numKnownMissions}
                            />
                            <StyledProgressTips>
                              {numKnownMissions}/{totalMissions} multipliers live
                            </StyledProgressTips>
                          </>
                        )
                      }
                    </StyledStrategyCardBody>
                    <StyledStrategyCardFoot>
                      <StyledStrategyCardButton
                        disabled={strategy.ID === "2" && !rootAgent.agentAddress}
                        onClick={() => handleStrategy(strategy)}
                      >
                        LAUNCH
                      </StyledStrategyCardButton>
                    </StyledStrategyCardFoot>
                  </StyledStrategyCard>
                ))
              }
            </StyledStrategyFactory>
          </>
        )
      }
    </>
  );
})
