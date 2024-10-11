import { useState } from 'react';
import styled from 'styled-components';

import { balanceFormated } from '@/utils/balance';

const Wrapper = styled.div`
  .action {
    display: flex;
    align-items: center;
    gap: 10px;
    .ticket-pending-btn {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: #ebf479;
      border: 1px dashed #ebf479;
      white-space: nowrap;
      position: relative;
      z-index: 20;
      &:hover {
        .pending-detail {
          display: block;
        }
      }
      .pending-detail {
        display: none;
        position: absolute;
        width: 608px;
        background-color: #1f2229;
        border: 1px solid #333648;
        border-radius: 12px;
        top: 110%;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        .pending-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(151, 154, 190, 0.3);
          height: 50px;
          color: rgba(151, 154, 190, 1);
          padding: 0 30px;
          & > div {
            flex: 1;
          }
          & > div:last-child {
            text-align: right;
          }
        }
        .pending-content {
          padding: 10px 0;
        }
        .pending-item {
          display: flex;
          padding: 0 30px;
          height: 50px;
          align-items: center;
          & > div {
            flex: 1;
          }
          & > div:last-child {
            text-align: right;
          }
          .is-distribute {
            color: rgba(115, 113, 252, 1);
          }
          .distributed {
            color: rgba(138, 184, 0, 1);
          }
        }
      }
    }
    .ticket-success-btn {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      background-color: #8ab80033;
      color: #8ab800;
      cursor: pointer;
    }
    .ticket-btn {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      background-color: #979abe4d;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: #979abe;
      white-space: nowrap;
    }
  }

  .refresh {
    cursor: pointer;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(151, 154, 190, 0.3);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    .circle-svg {
      transition: all 2s;
    }
  }
`;

export default function TicketAction({
  showPengding,
  ticket,
  pendingTicket = 0,
  tickets,
  refresh
}: {
  tickets?: any;
  showPengding: boolean;
  ticket: number;
  pendingTicket?: number;
  refresh: () => void;
}) {
  const [degre, setDegre] = useState(45);

  return (
    <Wrapper>
      <div className="action">
        {/* {showPengding && pendingTicket > 0 && (
          <div className="ticket-pending-btn">
            <div>{pendingTicket} pending tickets</div>
            <div className="pending-detail">
              <div className="pending-header">
                <div style={{ flex: 2 }}>Your transactions</div>
                <div>Tickets</div>
                <div>Status</div>
              </div>
              <div className="pending-content">
                {tickets?.map((item: any, index: any) => {
                  return (
                    <div key={index} className="pending-item">
                      <div style={{ flex: 2 }}>
                        {item?.transaction?.action_type}: {balanceFormated(item?.transaction?.action_amount, 2)} USDC{' '}
                        <span style={{ color: 'rgba(151, 154, 190, 1)' }}>
                          (${balanceFormated(item?.transaction?.trading_volume, 2)})
                        </span>
                      </div>
                      <div>{item?.spins} tickets</div>
                      {item.release_status === 0 && <div className="is-distribute">To be distribute...</div>}

                      {item.release_status === 1 && <div className="distributed">To be distribute...</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )} */}

        {ticket > 0 ? (
          <div className="ticket-success-btn">{ticket} ticket</div>
        ) : (
          <div className="ticket-btn">0 ticket</div>
        )}

        <div
          className="refresh"
          onClick={() => {
            refresh();
            setDegre(degre + 360);
          }}
        >
          <svg
            width="18"
            className="circle-svg"
            style={{ transform: `rotate(${degre}deg)` }}
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.1723 2.46948C16.1623 2.07175 15.8594 1.82109 15.4254 1.83023C14.9907 1.83937 14.7668 2.10456 14.6954 2.50245C14.6584 2.70879 14.6703 2.92466 14.6681 3.13634C14.6645 3.49748 14.6672 3.85869 14.6672 4.21991C14.6107 4.2455 14.5542 4.27112 14.4977 4.29675C14.3081 4.1145 14.1216 3.92881 13.9283 3.75055C12.1858 2.14411 10.1184 1.54607 7.80308 1.90151C4.53412 2.40334 2.1121 5.12495 1.82789 8.52241C1.56128 11.7095 3.61732 14.7888 6.70349 15.8247C9.8255 16.8726 13.2993 15.6529 15.0552 12.8892C15.1682 12.7113 15.2857 12.5286 15.3546 12.3319C15.4886 11.9498 15.4213 11.5941 15.0439 11.3899C14.6803 11.1933 14.3356 11.2723 14.0774 11.606C13.9483 11.773 13.8502 11.9634 13.7296 12.1374C12.641 13.7095 11.1455 14.566 9.23194 14.6593C6.66965 14.7842 4.32082 13.1222 3.57408 10.6725C2.80283 8.14244 3.86958 5.41633 6.15128 4.08642C8.36923 2.79362 11.2166 3.16462 13.0115 4.9875C13.1429 5.12099 13.2315 5.29671 13.4446 5.60319C12.7438 5.60319 12.2044 5.57466 11.6694 5.61153C11.1754 5.64562 10.9137 5.93961 10.9178 6.35234C10.9217 6.75419 11.2017 7.0867 11.6771 7.09839C12.9179 7.12891 14.1601 7.11783 15.4015 7.10461C15.8105 7.10026 16.1491 6.86613 16.1615 6.46198C16.2023 5.13203 16.2056 3.79964 16.1723 2.46948Z"
              fill="#979ABE"
            />
          </svg>
        </div>
      </div>
    </Wrapper>
  );
}
