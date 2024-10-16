import { useMemo } from 'react';
import styled from 'styled-components';

import Modal from '../Modal';

const TicketWrapper = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  padding: 20px;
  background: url(/images/odyssey/lineaLiquid2/success-star.svg) center center no-repeat;
  background-size: 100% 100%;
  .big-title {
    font-size: 32px;
    font-weight: 700;
  }
  .normal-text {
  }
  .money {
    color: rgba(255, 85, 147, 1);
    font-size: 46px;
    font-weight: 700;
  }
  .no-box {
    max-height: 400px;
    overflow: auto;
  }
  .ticket-item {
    height: 70px;
    background: rgba(115, 113, 252, 1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    padding: 0 20px 0 20px;
    margin: 30px auto;

    .ticket-title {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 500;
      gap: 10px;
      border-right: 1px dashed #000;
    }
    .ticket-nums {
      flex: 3;
      display: flex;
      justify-content: center;
      font-size: 30px;
      font-weight: 800;
    }
    .it {
      flex: 1;
      font-size: 30px;
      font-weight: 800;
      text-align: center;
      &.win {
        color: #000;
        border-radius: 1000px;
        background-color: rgba(235, 244, 121, 1);
      }
    }
  }

  .notice {
    color: #979abe;
    font-size: 14px;
  }
`;

interface Props {
  onClose: () => void;
  successNum: any[];
  successMyNum: any[];
  data: any;
}

const prizeLevelText: any = {
  5: 'first',
  4: 'second',
  3: 'third',
  2: 'fourth',
  1: 'fifth'
};

export default function TicketModal({ successNum, successMyNum, onClose, data }: Props) {
  const prizeLavel = useMemo(() => {
    let maxSize = 0;
    successMyNum.map((item) => {
      let size = 0;
      item.forEach((it: any) => {
        if (it.won) {
          size += 1;
        }
      });
      if (size > maxSize) {
        maxSize = size;
      }
    });
    if (maxSize > 5) {
      return prizeLevelText[5];
    }

    return prizeLevelText[maxSize];
  }, [successMyNum]);

  return (
    <Modal title={''} onClose={onClose} padding={0}>
      <TicketWrapper>
        <div className="big-title">Congrats!</div>
        <div className="normal-text" style={{ marginTop: 20 }}>
          You won
        </div>
        <div className="money">{data.userRewardAmount}</div>
        <div className="normal-text">
          You matched the {Number(data.round) === 3 ? prizeLavel : ''} prize in round {data.round}
        </div>
        <div className="no-box">
          {successMyNum.map((item, idx) => {
            return (
              <div key={idx} className="ticket-item">
                <div className="ticket-title">
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.1813 0L11.4951 3.55029C12.4066 6.01376 14.3489 7.95605 16.8124 8.86762L20.3627 10.1813L16.8124 11.4951C14.3489 12.4066 12.4066 14.3489 11.4951 16.8124L10.1813 20.3627L8.86762 16.8124C7.95605 14.3489 6.01376 12.4066 3.55028 11.4951L0 10.1813L3.55029 8.86762C6.01376 7.95605 7.95605 6.01376 8.86762 3.55028L10.1813 0Z"
                      fill="white"
                    />
                  </svg>
                  <div>Ticket {idx + 1}</div>
                </div>
                <div className="ticket-nums">
                  {item.map((it: any, index: any) => {
                    return (
                      <div className={'it' + (it?.won ? ' win' : '')} key={index} style={{}}>
                        {it.no}
                        {/* {it?.won && <div className="bg"></div>} */}
                        {/* <div
                        className="real-num"
                        style={{
                          color: it?.won ? '#000000' : '#EBF479'
                        }}
                      >
                        {it.no} */}
                        {/* </div> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </TicketWrapper>
    </Modal>
  );
}
