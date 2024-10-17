import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Rules from '@/views/Campaign/RubicHoldstation/sections/Tickets/Rules/index';

import { useQuests } from '../../RubicHoldstation/hooks/useQuests';
import BridgeModal from '../Bridge/Modal';
import LockModal from '../LockModal';
import MendiModal from '../Mendi/Modal';
import LiquidityModal from './Liquidity';
import SwapModal from './Swap';
import TaskItem from './TaskItem';
import TicketAction from './TicketAction';
import Timer from './Timer';

const Wrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  color: #fff;
  font-family: Montserrat;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 35px;
  .title-with-img {
    display: flex;
    align-items: center;
    img {
      width: 65px;
    }
    .title-text {
      font-size: 36px;
      font-weight: 700;
      margin-left: 35px;
    }
  }
  .rules {
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface Props {
  category: string;
}

export default function Task({ category }: Props) {
  const [bridgeData, setBridgeData] = useState<any>(null);
  const [swapData, setSwapData] = useState<any>(null);
  const [liquidityData, setLiquidityData] = useState<any>(null);
  const [gammaLiquidityData, setGammaLiquidityData] = useState<any>(null);
  const [stakingData, setStakingData] = useState<any>(null);
  const [lendingData, setLendingData] = useState<any>(null);

  const originData = useQuests({
    category
  });

  const { data, loading, getData } = originData;

  console.log(originData);

  useEffect(() => {
    if (!loading && data.length) {
      data.forEach((item) => {
        if (item.name === 'Across') {
          setBridgeData(item);
        }

        if (item.name === 'Nile-Swap') {
          setSwapData(item);
        }

        if (item.name === 'Nile-LP') {
          // @ts-ignore
          // item.remaining_time = 4
          setLiquidityData(item);
        }

        if (item.name === 'ZeroLend') {
          setLendingData(item);
        }
      });
    }
  }, [data, loading]);

  const [showRuler, setShowRuler] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [mendiVisible, setMendiVisible] = useState(false);
  const [bridgeVisible, setBridgeVisible] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);

  const [showLiquidityModal, setShowLiquidityModal] = useState(false);

  const refreshData = useCallback(
    (data?: any) => {
      getData();

      if (data) {
        const inter = setInterval(async () => {
          const newData = await getData();
          let newItem: any = null;
          newData.forEach((item: any) => {
            if (item.name === data.name) {
              newItem = item;
            }
          });

          if (newItem) {
            if (newItem && newItem.remaining_time > 0) {
              clearInterval(inter);
            }
          }
        }, 3000);
      }
    },
    [getData]
  );

  console.log('bridgeData:', bridgeData);

  return (
    <Wrapper>
      <Title>
        <div className="title-with-img">
          <div className="title-text" id="get_ticket">
            Get Tickets
          </div>
        </div>

        {/* <div
          onClick={() => {
            setShowRuler(true);
          }}
          className="rules"
        >
          Rules
        </div> */}
      </Title>

      <div style={{ height: 40 }}></div>

      <TaskItem
        icon="/images/odyssey/lineaLiquid2/across.svg"
        title="ACROSS"
        typeText=""
        typeColor="#F83437"
        ticket={bridgeData?.total_spins || 0}
        refresh={() => getData(true)}
        showTicketAction={false}
        renderDesc={() => {
          return (
            <div className="desc-item">
              <div className="desc-text">
                <div className="desc-action-wrapper">
                  <div className="title">Bridge to Linea with Across</div>
                  <TicketAction showPengding={false} ticket={bridgeData?.total_spins} refresh={() => getData(true)} />
                </div>

                <div className="desc-list">
                  <ul>
                    <li>
                      <span className="sep">Earn 1 ticket</span> for each bridge transaction to Linea ({'>'}$25).
                    </li>
                    <li>
                      <span className="sep">Get 1 extra ticket</span> for every additional $25 in volume.
                    </li>
                    <li>
                      <span className="sep">Maximum:</span> 20 tickets per transaction.
                    </li>
                  </ul>
                </div>
              </div>

              <TradeBtn
                onClick={() => {
                  setBridgeVisible(true);
                }}
                text="Bridge Now"
              />
            </div>
          );
        }}
      />
      <div style={{ height: 20 }}></div>
      <TaskItem
        icon="/images/odyssey/lineaLiquid2/nile.svg"
        title=""
        typeText=""
        typeColor="#DF822E"
        showTicketAction={false}
        ticket={0}
        refresh={() => getData(true)}
        renderDesc={() => {
          return (
            <>
              <div className="desc-item">
                <div className="desc-text">
                  <div className="desc-action-wrapper">
                    <div className="title">Swap ($ZERO)</div>
                    <TicketAction showPengding={false} ticket={swapData?.total_spins} refresh={() => getData(true)} />
                  </div>

                  <div className="desc-list">
                    <ul>
                      <li>
                        <span className="sep">Earn 1 ticket</span> for each swap ({'>'}$25).
                      </li>
                      <li>
                        <span className="sep">Get 1 extra ticket</span> for every additional $25 in volume.
                      </li>
                      <li>
                        <span className="sep">Maximum</span>: 20 tickets per transaction.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="float-btn">
                  <div>
                    <TradeBtn
                      style={{ width: 150, right: 160 }}
                      innerStyle={{ paddingRight: 20 }}
                      text="Trade ZERO"
                      onClick={() => {
                        setShowSwapModal(true);
                      }}
                    />
                    <TradeBtn
                      style={{ width: 150 }}
                      innerStyle={{ paddingRight: 30 }}
                      text="Trade Nile"
                      onClick={() => {
                        setShowSwapModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="desc-item">
                <div className="desc-text">
                  <div className="desc-action-wrapper">
                    <div className="title">Provide Liquidity ($ZERO/ETH)</div>
                    <TicketAction
                      showPengding={true}
                      tickets={0}
                      ticket={liquidityData?.total_spins}
                      pendingTicket={liquidityData?.pending_spins}
                      refresh={() => getData(true)}
                    />
                  </div>
                  <div className="desc-list">
                    <ul>
                      <li>
                        <span className="sep">Earn 5 tickets</span> per LP transaction ({'>'}$25).
                      </li>
                      <li>
                        <span className="sep">Get 5 extra tickets</span> for every additional $25 in volume.
                      </li>
                      <li>For larger transactions:</li>
                    </ul>
                    <ul className="no-icon">
                      <li>
                        <span className="sep">$500+</span>: +10 extra tickets
                      </li>
                      <li>
                        <span className="sep">$2000+</span>: +30 extra tickets
                      </li>
                      <li>
                        <span className="sep">$1000+</span>: +20 extra tickets
                      </li>
                      <li>
                        <span className="sep">$5000+</span>: +50 extra tickets
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="float-btn">
                  {liquidityData?.remaining_time > 0 && (
                    <>
                      <div className="time-tip">Action available again in</div>
                      <Timer
                        endTime={Number(liquidityData?.remaining_time * 1000) + Date.now()}
                        hideDays
                        onTimerEnd={() => {
                          liquidityData.remaining_time = 0;
                          setLiquidityData({
                            ...liquidityData,
                            remaining_time: 0
                          });

                          // getData();
                        }}
                      />
                    </>
                  )}

                  {liquidityData?.remaining_time === 0 && (
                    <TradeBtn
                      disbaled={liquidityData?.remaining_time > 0}
                      text="Add Liquidity Now"
                      onClick={() => {
                        if (liquidityData?.remaining_time > 0) {
                          return;
                        }
                        setShowLiquidityModal(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          );
        }}
      />
      <div style={{ height: 20 }}></div>
      <TaskItem
        icon="/images/odyssey/lineaLiquid2/zeroLend.svg"
        title="ZeroLend"
        typeText=""
        typeColor="#00B0EB"
        ticket={lendingData?.total_spins || 0}
        pendingTicket={lendingData?.pending_spins}
        refresh={() => getData(true)}
        showTicketAction={false}
        renderDesc={() => {
          return (
            <div className="desc-item">
              <div className="desc-text">
                <div className="desc-action-wrapper">
                  <div className="title">Stake zLP ($ZERO/ETH)</div>
                  <TicketAction
                    showPengding={true}
                    tickets={0}
                    ticket={lendingData?.total_spins}
                    pendingTicket={lendingData?.pending_spins}
                    refresh={() => getData(true)}
                  />
                </div>
                <div className="desc-list">
                  <ul>
                    <li>
                      <span className="sep">Earn 5 tickets</span> per LP transaction ({'>'}$25).
                    </li>
                    <li>
                      <span className="sep">Get 5 extra tickets</span> for every additional $25 in volume.
                    </li>
                    <li>For larger transactions:</li>
                  </ul>
                  <ul className="no-icon">
                    <li>
                      <span className="sep">$500+</span>: +10 extra tickets
                    </li>
                    <li>
                      <span className="sep">$2000+</span>: +30 extra tickets
                    </li>
                    <li>
                      <span className="sep">$1000+</span>: +20 extra tickets
                    </li>
                    <li>
                      <span className="sep">$5000+</span>: +50 extra tickets
                    </li>
                  </ul>
                </div>
              </div>

              <div className="float-btn" style={{ bottom: 0 }}>
                {lendingData?.remaining_time > 0 && (
                  <>
                    <div className="time-tip">Action available again in</div>
                    <Timer
                      endTime={Number(lendingData?.remaining_time * 1000) + Date.now()}
                      hideDays
                      onTimerEnd={() => {
                        lendingData.remaining_time = 0;
                        setLendingData(lendingData);
                      }}
                    />
                  </>
                )}

                {lendingData?.remaining_time === 0 && (
                  <TradeBtn
                    disbaled={lendingData?.remaining_time > 0}
                    text="Stake Now"
                    onClick={() => {
                      if (lendingData?.remaining_time > 0) {
                        return;
                      }
                      setShowLockModal(true);
                    }}
                  />
                )}
              </div>
            </div>
          );
        }}
      />
      <SwapModal
        show={showSwapModal}
        onClose={() => {
          setShowSwapModal(false);
          refreshData();
        }}
      />

      <Rules
        visible={showRuler}
        onClose={() => {
          setShowRuler(false);
        }}
      />

      <LockModal
        show={showLockModal}
        onClose={() => {
          setShowLockModal(false);
          refreshData();
        }}
      />

      <MendiModal
        visible={mendiVisible}
        onClose={(isFresh: any) => {
          setMendiVisible(false);
          if (isFresh) {
            refreshData(gammaLiquidityData);
          }
        }}
      />

      <BridgeModal
        visible={bridgeVisible}
        onClose={() => {
          setBridgeVisible(false);
          refreshData();
        }}
      />

      <LiquidityModal
        show={showLiquidityModal}
        onClose={(isFresh: any) => {
          setShowLiquidityModal(false);
          if (isFresh) {
            refreshData(gammaLiquidityData);
          }
        }}
      />
    </Wrapper>
  );
}

function TradeBtn({ text, onClick = () => {}, disbaled, style = {}, innerStyle = {} }: any) {
  return (
    <div className={'action-btn' + (disbaled ? ' disabled' : '')} style={style} onClick={onClick}>
      <div style={innerStyle}>{text}</div>
      <div className="arrow">
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928931C10.9526 0.538407 10.3195 0.538407 9.92893 0.928931C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 9L17 9L17 7L1 7L1 9Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
