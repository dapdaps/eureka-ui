import styled from 'styled-components';

import { useBasic } from '../../RubicHoldstation/hooks/useBasic';

const Wrapper = styled.div`
  height: 580px;
  background: url(/images/odyssey/lineaLiquid/et-bottom.png) center bottom no-repeat;
  background-size: auto 100%;
  mix-blend-mode: exclusion;
  font-family: Montserrat;
  .content {
    width: 1000px;
    margin: 150px auto 0;
    color: #fff;
    padding-top: 210px;
    .title {
      font-size: 36px;
      font-weight: 700;
      text-align: center;
    }
    .list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      text-align: center;
      margin-top: 55px;
      .item {
        flex: 1;
        &:not(:last-child) {
          border-right: 1px solid #fff;
        }
      }
      .item-title {
        font-size: 18px;
      }
      .item-text {
        font-size: 30px;
        font-weight: 700;
        margin-top: 10px;
      }
    }
  }
`;

interface Props {
  category: string;
}

export default function Stats({ category }: Props) {
  const { data, loading }: any = useBasic({
    category,
    totalBonus: 7000
  });

  // console.log('data:', data);

  return (
    <Wrapper>
      <div className="content">
        <div className="title">Main Stats</div>
        <div className="list">
          <div className="item">
            <div className="item-title">Trading Volume</div>
            <div className="item-text">{!loading && data.tradingVolume}</div>
          </div>
          <div className="item">
            <div className="item-title">Total Tickets</div>
            <div className="item-text">{!loading && data.totalTickets}</div>
          </div>
          <div className="item">
            <div className="item-title">Total participants</div>
            <div className="item-text">{!loading && data.total_users}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
