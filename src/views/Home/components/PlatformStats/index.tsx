import { memo, useEffect, useState } from 'react';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import styled from 'styled-components';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';

const PlatformStats = () => {
  const [statData, setStatData] = useState<IData>({});

  const fetchStatData = () => {
    get(`${QUEST_PATH}/api/stats`).then((res) => {
      setStatData(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    fetchStatData();
  }, []);

  return (
    <StyledContainer className="platform">
      <div className="head">
        <span className="title">PLATFORM <span>STATS</span></span>
        {/* <span className="time">{formatDateString(statData.updated_at) || '-'}</span> */}
      </div>
      <div className="modules">
        <div className="item">
          <div className="name">Participants</div>
          <div className="value">{formatIntegerThousandsSeparator(statData.total_users)}</div>
        </div>
        <div className="item">
          <div className="name">Transactions</div>
          <div className="value">{formatIntegerThousandsSeparator(statData.total_transactions)}</div>
        </div>
        <div className="item">
          <div className="name">Trading Volume</div>
          <div className="value">{formatIntegerThousandsSeparator(statData.total_trading_volume)}</div>
        </div>
      </div>
    </StyledContainer>
  );
};

export default memo(PlatformStats);

interface IData {
  total_users?: number;
  total_transactions?: number;
  total_trading_volume?: number;
}

const StyledContainer = styled.div`
  padding-bottom: 94px;
  margin: 160px auto 0;
  width: 1248px;
  max-width: 1248px;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-weight: 500;
      font-size: 42px;
      font-family: Montserrat;
      color: #fff;
      margin-bottom: 20px;
      line-height: 34px;

      span {
        font-weight: 700;
        color: #EBF479;
      }
    }

    .time {
      color: #979ABE;
      font-size: 16px;
      line-height: 20px;
      font-family: Montserrat;
      font-weight: 400;
    }
  }

  .modules {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 16px;

    .item {
      background: #18191E;
      border: 1px solid;
      border-image-source: linear-gradient(180deg, #202329 0%, #101115 100%);
      border-radius: 20px;
      height: 150px;
      padding: 30px 36px;
      transition: transform 0.2s ease;
      cursor: pointer;
      
      &:hover {
        transform: translateY(-5px);
      }

      .name {
        font-size: 20px;
        font-family: Montserrat;
        line-height: 20px;
        display: inline-block;
        border-bottom: 2px dotted #EBF479;
        color: #979ABE;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }

      .value {
        font-weight: 700;
        color: #fff;
        font-family: Montserrat;
        font-size: 42px;
        line-height: 51px;
      }
    }
  }
`;
