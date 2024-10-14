import { useMemo } from 'react';
import styled from 'styled-components';

import Modal from '../Modal';

const TicketWrapper = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  .big-title {
    font-size: 32px;
    font-weight: 700;
  }
  .normal-text {
  }
  .money {
    color: #ebf479;
    font-size: 42px;
    font-weight: 600;
  }
  .no-box {
    max-height: 400px;
    overflow: auto;
  }
  .ticket-item {
    width: 204px;
    height: 74px;
    background: url(/images/odyssey/lineaLiquid/ticket-bg.svg) 0 0 no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ebf479;
    font-size: 20px;
    font-weight: 600;
    padding: 0 20px 0 20px;
    margin: 30px auto;
    .it {
      position: relative;
      height: 74px;
      flex: 1;
      .real-num {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bg {
        position: absolute;
        width: 30.8px;
        height: 30.8px;
        background-color: #ebf479;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
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
    let size = 0;
    successMyNum.map((item) => {
      item.forEach((it: any) => {
        if (it.won) {
          size += 1;
        }
      });
    });
    if (size > 5) {
      return prizeLevelText[5];
    }

    return prizeLevelText[size];
  }, [successMyNum]);

  return (
    <Modal title={''} onClose={onClose}>
      <TicketWrapper>
        <div className="big-title">Congrats!</div>
        <div className="normal-text" style={{ marginTop: 20 }}>
          You won
        </div>
        <div className="money">{data.userRewardAmount}</div>
        <div className="normal-text">
          You matched the {data.round === 3 ? prizeLavel + ' ' : ''} prize in round {data.round}
        </div>
        <div className="no-box">
          {successMyNum.map((item, idx) => {
            return (
              <div key={idx} className="ticket-item">
                {item.map((it: any, index: any) => {
                  return (
                    <div className="it" key={index}>
                      {it?.won && <div className="bg"></div>}
                      <div
                        className="real-num"
                        style={{
                          color: it?.won ? '#000000' : '#EBF479'
                        }}
                      >
                        {it.no}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="notice">The prize will transfer to your address after the campaign ends.</div>
      </TicketWrapper>
    </Modal>
  );
}
