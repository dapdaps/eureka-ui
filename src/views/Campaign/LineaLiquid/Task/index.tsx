import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import BridgeModal from '@/views/Campaign/LineaLiquid/Bridge/Modal';
import MendiModal from '@/views/Campaign/LineaLiquid/Mendi/Modal';
import Rules from '@/views/Campaign/RubicHoldstation/sections/Tickets/Rules/index';

import { useQuests } from '../../RubicHoldstation/hooks/useQuests';
import LockModal from '../LockModal';
import useVouchers from './hooks/useVouchers';
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
  justify-content: space-between;
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
  const [stakingData, setStakingData] = useState<any>(null);
  const [lendingData, setLendingData] = useState<any>(null);

  const originData = useQuests({
    category
  });

  console.log('originData:', originData);

  const { data, loading, getData } = originData;

  useEffect(() => {
    if (!loading && data.length) {
      data.forEach((item) => {
        if (item.category_name === 'Bridge') {
          setBridgeData(item);
        }

        if (item.category_name === 'Swap') {
          setSwapData(item);
        }

        if (item.category_name === 'Liquidity') {
          setLiquidityData(item);
        }

        if (item.category_name === 'Staking') {
          setStakingData(item);
        }

        if (item.category_name === 'Lending') {
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

  // const { tickets: lendingPendingTickets } = useVouchers({ id: lendingData?.id });
  // const { tickets: liquidityPendingTickets } = useVouchers({ id: liquidityData?.id });

  return (
    <Wrapper>
      <Title>
        <div className="title-with-img">
          <img src="/images/odyssey/lineaLiquid/task-ticket.svg" />
          <div className="title-text">Get Tickets</div>
        </div>

        <div
          onClick={() => {
            setShowRuler(true);
          }}
          className="rules"
        >
          Rules
        </div>
      </Title>

      <div style={{ height: 40 }}></div>

      <TaskItem
        icon="/images/odyssey/lineaLiquid/bridge-icon.svg"
        title="Bridge to Linea with"
        typeText="Orbiter"
        typeColor="#F83437"
        ticket={bridgeData?.spins || 0}
        refresh={() => getData(true)}
        renderDesc={() => {
          return (
            <div className="desc-item">
              <div className="desc-text">
                <div className="desc-list">
                  <ul>
                    <li>
                      Each bridge transaction earns <span className="sep">1 ticket</span> (minimum transaction: $25).
                    </li>
                    <li>
                      For every additional $25 in transaction volume, earn <span className="sep">1 extra ticket</span>.
                    </li>
                    <li>Maximum 20 tickets per transaction.</li>
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
        icon="/images/odyssey/lineaLiquid/union-icon.svg"
        title="Swap / Provide Liquidity / Lock on Linea with"
        typeText="Lynex"
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
                    <div className="title">Swap</div>
                    <TicketAction showPengding={false} ticket={swapData?.spins} refresh={() => getData(true)} />
                  </div>

                  <div className="desc-list">
                    <ul>
                      <li>
                        Each swap transaction earns <span className="sep">1 ticket</span> (minimum transaction: $25).
                      </li>
                      <li>
                        For every additional $25 in transaction volume, earn <span className="sep">1 extra ticket</span>
                        .
                      </li>
                      <li>Maximum 20 tickets per transaction.</li>
                    </ul>
                  </div>
                </div>

                <TradeBtn
                  text="Trade Now"
                  onClick={() => {
                    setShowSwapModal(true);
                  }}
                />
              </div>
              <div className="desc-item">
                <div className="desc-text">
                  <div className="desc-action-wrapper">
                    <div className="title">Provide LP (Liquidity Pool)</div>
                    <TicketAction
                      showPengding={true}
                      tickets={0}
                      ticket={liquidityData?.spins}
                      pendingTicket={liquidityData?.pending_spins}
                      refresh={() => getData(true)}
                    />
                  </div>
                  <div className="desc-list">
                    <ul>
                      <li>
                        Each LP transaction (LYNX/ETH pair) earns <span className="sep">5 tickets</span> (minimum
                        transaction: $25).
                      </li>
                      <li>
                        For every additional $25 in transaction volume, earn{' '}
                        <span className="sep">5 extra tickets</span>.
                      </li>
                      <li>For higher transaction volumes, earn additional tickets:</li>
                    </ul>
                    <ul className="no-icon">
                      <li>
                        Transaction {'>'} $500: <span className="sep">10 extra tickets</span>
                      </li>
                      <li>
                        Transaction {'>'} $1000: <span className="sep">20 extra tickets</span>
                      </li>
                      <li>
                        Transaction {'>'} $2000: <span className="sep">30 extra tickets</span>
                      </li>
                      <li>
                        Transaction {'>'} $5000: <span className="sep">50 extra tickets</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="float-btn">
                  <div className="time-tip">Available to participates again in</div>

                  <Timer endTime={86400000 + 1728651345007} hideDays />

                  <TradeBtn
                    text="Add Liquidity Now"
                    onClick={() => {
                      setShowLiquidityModal(true);
                    }}
                  />
                </div>
              </div>
              <div className="desc-item">
                <div className="desc-text">
                  <div className="desc-action-wrapper">
                    <div className="title">Lock LYNX into veLYNX</div>
                    <TicketAction showPengding={false} ticket={stakingData?.spins} refresh={() => getData(true)} />
                  </div>

                  <div className="desc-list">
                    <ul>
                      <li>
                        Each lock transaction earns <span className="sep">5 tickets</span> (minimum lock: $50 in LYNX
                        for at least 3 months).
                      </li>
                      <li>
                        For every additional 50$ in transaction volume, earn{' '}
                        <span className="sep">5 extra tickets</span>.
                      </li>
                      <li>
                        Maximum <span className="sep">50 tickets</span> per transaction
                      </li>
                    </ul>
                  </div>
                </div>

                <TradeBtn
                  text="Lock Now"
                  onClick={() => {
                    setShowLockModal(true);
                  }}
                />
              </div>
            </>
          );
        }}
      />
      <div style={{ height: 20 }}></div>
      <TaskItem
        icon="/images/odyssey/lineaLiquid/union-icon-2.svg"
        title="Lend/Borrow on Linea with"
        typeText="Mendi"
        typeColor="#00B0EB"
        ticket={lendingData?.spins || 0}
        pendingTicket={lendingData?.pending_spins}
        refresh={() => getData(true)}
        renderDesc={() => {
          return (
            <div className="desc-item">
              <div className="desc-text">
                <div className="title">Supply/Borrow (USDC, USDT, WETH)</div>
                <div className="desc-list">
                  <ul>
                    <li>
                      Each transaction earns <span className="sep">5 tickets</span> (minimum transaction: $25).
                    </li>
                    <li>
                      For every additional $25 in transaction volume, earn <span className="sep">5 extra tickets</span>.
                    </li>
                    <li>For higher transaction volumes, earn additional tickets:</li>
                  </ul>
                  <ul className="no-icon">
                    <li>
                      Transaction {'>'} $500: <span className="sep">10 extra tickets</span>
                    </li>
                    <li>
                      Transaction {'>'} $1000: <span className="sep">20 extra tickets</span>
                    </li>
                    <li>
                      Transaction {'>'} $2000: <span className="sep">30 extra tickets</span>
                    </li>
                    <li>
                      Transaction {'>'} $5000: <span className="sep">50 extra tickets</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="float-btn" style={{ bottom: 0 }}>
                <div className="time-tip">Available to participates again in</div>

                <Timer endTime={86400000 + 1728651345007} hideDays />

                <TradeBtn
                  text="Add Liquidity Now"
                  onClick={() => {
                    setMendiVisible(true);
                  }}
                />
              </div>
            </div>
          );
        }}
      />
      <SwapModal
        show={showSwapModal}
        onClose={() => {
          setShowSwapModal(false);
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
        }}
      />
      <MendiModal
        visible={mendiVisible}
        onClose={() => {
          setMendiVisible(false);
        }}
      />

      <BridgeModal
        visible={bridgeVisible}
        onClose={() => {
          setBridgeVisible(false);
        }}
      />

      <LiquidityModal
        show={showLiquidityModal}
        onClose={() => {
          setShowLiquidityModal(false);
        }}
      />
    </Wrapper>
  );
}

function TradeBtn({ text, onClick = () => {} }: any) {
  return (
    <div className="action-btn" onClick={onClick}>
      <div>{text}</div>
      <div className="arrow">
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928931C10.9526 0.538407 10.3195 0.538407 9.92893 0.928931C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 9L17 9L17 7L1 7L1 9Z"
            fill="#979ABE"
          />
        </svg>
      </div>
    </div>
  );
}
