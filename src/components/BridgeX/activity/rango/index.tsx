import dynamic from 'next/dynamic';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(90deg, #b6c133 0%, #fdfe03 100%);
  padding: 10px 28px 50px 60px;
  border-radius: 20px 20px 0 0;
  color: #000;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: -70px;
  margin-top: 30px;
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

// @ts-ignore
const Rank: any = dynamic(() => import('@/views/Dapp/components/RankModal'), {
  ssr: false,
  loading: () => (
    <div style={{ width: 800 }}>
      <Skeleton width="350px" height="72px" borderRadius="6px" containerClassName="skeleton" />
      <Skeleton
        style={{ marginTop: 20 }}
        width="400px"
        height="720px"
        borderRadius="6px"
        containerClassName="skeleton"
      />
    </div>
  )
});

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
