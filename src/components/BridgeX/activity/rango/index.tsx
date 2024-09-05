import { useState } from 'react';
import styled from 'styled-components';

import Rank from '@/views/Dapp/components/RankModal'

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(90deg, #b6c133 0%, #fdfe03 100%);
  padding: 10px 28px 50px 60px;
  border-radius: 20px 20px 0 0;
  color: #000;
  font-size: 16px;
  margin-bottom: -70px;
  margin-top: 30px;
  font-family: Montserrat;
  font-weight: 500;
  .money {
    font-weight: 900;
    font-style: italic;
  }
  .time {
    font-weight: 700;
  }
  .flashing-coins {
    position: absolute;
    left: -24px;
    top: -24px;
  }
  .rank {
    position: absolute;
    right: 28px;
    top: 57px;
    cursor: pointer;
    text-decoration: underline;
    color: #0075ff;
  }
`;



export default function RangoActivity({ dapp }: { dapp: any }) {
  const [rankModalShow, setRankModalShow] = useState(false);

  return (
    <Wrapper>
      <img className="flashing-coins" src="/images/apps/flashing-coins.svg" />
      Volume-based competition: <span className="money">1000 $USDC</span> will be shared between top traders
      <div>
        <span className="time">Time:</span> 2024/9/9 - 2024/9/23 (UTC)
      </div>
      <div
        onClick={() => {
          setRankModalShow(true);
        }}
        className="rank"
      >
        Rank{'>'}
      </div>
      {rankModalShow && (
        <Rank
          show={true}
          onClose={() => {
            setRankModalShow(false);
          }}
          dapp={dapp}
        />
      )}
    </Wrapper>
  );
}
