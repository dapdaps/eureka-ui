// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import Spinner from '@/modules/components/Spinner';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';

import MyStrategiesDetail from './MyStrategiesDetail';

const StyledMyStrategies = styled.div``;
const StyledSection = styled.div`
  margin-top: 32px;
`;
const StyledSectionTitle = styled.div`
  margin-bottom: 16px;
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StyledSectionCard = styled.div`
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #262836;
  overflow: hidden;
`;
const StyledSectionCardInner = styled.div`
  padding: 12px 12px;

  .deposited-value {
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    color: var(--switch-color);
  }

  .deposited-value-tips {
    font-size: 12px;
    color: #fff;
    margin-left: 2px;
    font-weight: 400;
  }

  .deposited-tips {
    color: #979abe;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 16px;
  }
`;
const StyledMyStrategiesHead = styled.div`
  border-bottom: 1px solid #373a53;
`;
const StyledMyStrategiesRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  transition: all 0.3s ease-in-out;

  &:not(.head) {
    cursor: pointer;

    &:hover {
      background: #1f212c;
    }
  }
`;
const StyledMyStrategiesCol = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  flex-shrink: 0;
  padding: 12px 12px;

  &.head {
    color: #979abe;
    font-size: 14px;
    font-weight: 400;
  }
`;
const StyledMyStrategiesBody = styled.div``;
const StyledMyStrategiesAssets = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .my-strategies-assets-item {
    margin: 0;
    padding: 0;
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 12px;
    background: #171717;

    :not(:first-child) {
      margin-left: -4px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const StyledMyStrategiesEmpty = styled.div`
  padding: 56px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #979abe;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default memo(function MyStrategies(props: any) {
  const {
    prices,
    record,
    handleRecord,
    dexConfig,
    account,
    curChain,
    listData,
    loading,
    totalDeposited,
    rootAgent,
    formatTVL
  } = props;

  const { StakeTokens } = dexConfig;

  const formatDateTime = (datetimeStr) => {
    const formatTen = (value) => {
      return value < 10 ? `0${value}` : value.toString();
    };
    const datetime = new Date(datetimeStr);
    const year = datetime.getFullYear();
    const month = formatTen(datetime.getMonth() + 1);
    const date = formatTen(datetime.getDate());
    const hour = formatTen(datetime.getHours());
    const minute = formatTen(datetime.getMinutes());
    const second = formatTen(datetime.getSeconds());
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  };

  return (
    <>
      {record && record.agentAddress ? (
        <MyStrategiesDetail
          {...{
            ...props,
            record,
            rootAgent,
            formatTVL
          }}
        />
      ) : loading ? (
        <Spinner />
      ) : (
        <StyledMyStrategies>
          <StyledSection>
            <StyledSectionTitle>Deposited</StyledSectionTitle>
            <StyledSectionCard>
              <StyledSectionCardInner>
                <div className="deposited-value">
                  ${totalDeposited}
                  <span className="deposited-value-tips">USD eq.</span>
                </div>
                <div className="deposited-tips">The total value of your deposits across all strategies.</div>
              </StyledSectionCardInner>
            </StyledSectionCard>
          </StyledSection>
          <StyledSection>
            <StyledSectionTitle>My Strategies</StyledSectionTitle>
            <StyledSectionCard>
              <StyledMyStrategiesHead>
                <StyledMyStrategiesRow className="head">
                  <StyledMyStrategiesCol
                    className="head"
                    style={{
                      width: '25%'
                    }}
                  >
                    Name
                  </StyledMyStrategiesCol>
                  <StyledMyStrategiesCol
                    className="head"
                    style={{
                      width: '20%'
                    }}
                  >
                    Launch Date
                  </StyledMyStrategiesCol>
                  <StyledMyStrategiesCol
                    className="head"
                    style={{
                      width: '15%'
                    }}
                  >
                    Assets
                  </StyledMyStrategiesCol>
                  <StyledMyStrategiesCol
                    className="head"
                    style={{
                      width: '15%'
                    }}
                  >
                    TVL
                  </StyledMyStrategiesCol>
                  <StyledMyStrategiesCol
                    className="head"
                    style={{
                      width: '20%'
                    }}
                  >
                    Protocols
                  </StyledMyStrategiesCol>
                  <StyledMyStrategiesCol
                    className="head"
                    style={{
                      width: '5%'
                    }}
                  ></StyledMyStrategiesCol>
                </StyledMyStrategiesRow>
              </StyledMyStrategiesHead>
              <StyledMyStrategiesBody>
                {listData.length > 0 ? (
                  listData.map((item, index) => (
                    <StyledMyStrategiesRow
                      key={index}
                      className={`${record.agentAddress === item.agentAddress ? 'selected' : ''}`}
                      onClick={() => handleRecord(item)}
                    >
                      <StyledMyStrategiesCol
                        style={{
                          width: '25%'
                        }}
                      >
                        {item.name}
                      </StyledMyStrategiesCol>
                      <StyledMyStrategiesCol
                        style={{
                          width: '20%'
                        }}
                      >
                        {formatDateTime(item.createdAt)}
                      </StyledMyStrategiesCol>
                      <StyledMyStrategiesCol
                        style={{
                          width: '15%'
                        }}
                      >
                        <StyledMyStrategiesAssets>
                          <li className="my-strategies-assets-item">
                            <img src="https://app.agentfi.io/icons/tokens/eth.svg" alt="" />
                          </li>
                          {['Looper', 'Orbit Looper', 'Concentrated Liquidity Manager', 'Dex Balancer'].includes(
                            item.name
                          ) && (
                            <li className="my-strategies-assets-item">
                              <img src="https://app.agentfi.io/icons/tokens/usdb.svg" alt="" />
                            </li>
                          )}
                          {['Looper', 'Orbit Looper'].includes(item.name) && (
                            <li className="my-strategies-assets-item">
                              <img src="https://app.agentfi.io/icons/tokens/dusd.svg" alt="" />
                            </li>
                          )}
                          {['Looper', 'Orbit Looper'].includes(item.name) && (
                            <li className="my-strategies-assets-item">
                              <img src="https://app.agentfi.io/icons/tokens/deth.svg" alt="" />
                            </li>
                          )}
                        </StyledMyStrategiesAssets>
                      </StyledMyStrategiesCol>
                      <StyledMyStrategiesCol
                        style={{
                          width: '15%'
                        }}
                      >
                        {formatTVL(item).value}
                      </StyledMyStrategiesCol>
                      <StyledMyStrategiesCol
                        style={{
                          width: '20%'
                        }}
                      >
                        <StyledMyStrategiesAssets>
                          {['Looper', 'Orbit Looper'].includes(item.name) && (
                            <li className="my-strategies-assets-item" title="Orbit">
                              <img src="https://app.agentfi.io/assets/strategies/icons/orbit.svg" alt="" />
                            </li>
                          )}
                          {['Looper', 'Orbit Looper'].includes(item.name) && (
                            <li className="my-strategies-assets-item" title="Particle">
                              <img src="https://app.agentfi.io/assets/strategies/icons/particle.svg" alt="" />
                            </li>
                          )}
                          {['Looper', 'Orbit Looper'].includes(item.name) && (
                            <li className="my-strategies-assets-item" title="Duo">
                              <img src="https://s3.amazonaws.com/dapdap.prod/images/group-48097863.png" alt="" />
                            </li>
                          )}
                          {['Looper', 'Orbit Looper', 'Dex Balancer'].includes(item.name) && (
                            <li className="my-strategies-assets-item" title="Ring">
                              <img src="https://app.agentfi.io/logo/partners/svgs/symbol/color/ring.svg" alt="" />
                            </li>
                          )}
                          {['Multipliooor'].includes(item.name) && (
                            <li className="my-strategies-assets-item" title="AgentFi">
                              <img src="https://app.agentfi.io/logo/partners/svgs/symbol/color/agentfi.svg" alt="" />
                            </li>
                          )}
                          {['Concentrated Liquidity Manager', 'Dex Balancer'].includes(item.name) && (
                            <li className="my-strategies-assets-item" title="blasterswap">
                              <img
                                src="https://app.agentfi.io/logo/partners/svgs/symbol/color/blasterswap.svg"
                                alt=""
                              />
                            </li>
                          )}
                          {['Dex Balancer'].includes(item.name) && (
                            <li className="my-strategies-assets-item" title="Hyperlock">
                              <img src="https://app.agentfi.io/logo/partners/svgs/symbol/color/hyperlock.svg" alt="" />
                            </li>
                          )}
                        </StyledMyStrategiesAssets>
                      </StyledMyStrategiesCol>
                      <StyledMyStrategiesCol
                        style={{
                          width: '5%'
                        }}
                      >
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7.17184 0.222355C7.42364 0.0766877 7.70926 0 8 0C8.29074 0 8.57637 0.0766877 8.82816 0.222355L15.1718 3.89274C15.4236 4.03841 15.6327 4.24792 15.7781 4.50021C15.9235 4.75251 16 5.0387 16 5.33003V12.67C16 12.9613 15.9235 13.2475 15.7781 13.4998C15.6327 13.7521 15.4236 13.9616 15.1718 14.1073L8.82816 17.7776C8.57637 17.9233 8.29074 18 8 18C7.70926 18 7.42364 17.9233 7.17184 17.7776L0.828158 14.1073C0.576372 13.9616 0.367286 13.7521 0.221915 13.4998C0.0765431 13.2475 7.38473e-06 12.9613 0 12.67V5.33003C7.38473e-06 5.0387 0.0765431 4.75251 0.221915 4.50021C0.367286 4.24792 0.576372 4.03841 0.828158 3.89274L7.17184 0.222355ZM8 1.65964L1.65632 5.33003V12.67L8 16.3404L14.3437 12.67V5.33003L8 1.65964ZM8 5.68064C8.87856 5.68064 9.72115 6.03035 10.3424 6.65286C10.9636 7.27536 11.3126 8.11965 11.3126 9C11.3126 9.88035 10.9636 10.7246 10.3424 11.3471C9.72115 11.9696 8.87856 12.3194 8 12.3194C7.12144 12.3194 6.27886 11.9696 5.65762 11.3471C5.03638 10.7246 4.68737 9.88035 4.68737 9C4.68737 8.11965 5.03638 7.27536 5.65762 6.65286C6.27886 6.03035 7.12144 5.68064 8 5.68064ZM8 7.34032C7.78249 7.34032 7.56711 7.38325 7.36616 7.46665C7.1652 7.55006 6.98261 7.67231 6.82881 7.82643C6.67501 7.98054 6.553 8.16351 6.46977 8.36487C6.38653 8.56623 6.34369 8.78205 6.34369 9C6.34369 9.21795 6.38653 9.43377 6.46977 9.63513C6.553 9.8365 6.67501 10.0195 6.82881 10.1736C6.98261 10.3277 7.1652 10.4499 7.36616 10.5333C7.56711 10.6168 7.78249 10.6597 8 10.6597C8.43928 10.6597 8.86057 10.4848 9.17119 10.1736C9.48181 9.86232 9.65631 9.44018 9.65631 9C9.65631 8.55983 9.48181 8.13768 9.17119 7.82643C8.86057 7.51518 8.43928 7.34032 8 7.34032Z"
                            fill="#979ABE"
                          />
                        </svg>
                      </StyledMyStrategiesCol>
                    </StyledMyStrategiesRow>
                  ))
                ) : (
                  <StyledMyStrategiesEmpty>You didn’t add any strategies yet</StyledMyStrategiesEmpty>
                )}
              </StyledMyStrategiesBody>
            </StyledSectionCard>
          </StyledSection>
        </StyledMyStrategies>
      )}
    </>
  );
});
