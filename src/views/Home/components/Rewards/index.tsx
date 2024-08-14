import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TooltipList from '../Tooltip/List';
import useDappReward from '@/views/AllDapps/hooks/useDappReward';

const StyledRecentRewards = styled.div`
  height: 646px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 42px;
    font-weight: 500;
    font-family: Montserrat;
    color: #fff;
    margin-bottom: 35px;

    span {
      color: #ebf479;
      line-height: 51px;
      font-family: Montserrat;
      font-weight: 700;
    }
  }

  .words {
    font-size: 20px;
    font-weight: 400;
    font-family: Montserrat;
    line-height: 24px;
    text-align: center;
    margin-bottom: 72px;
    color: #979ABE;
  }

`;

const RecentRewards = () => {
  const { fetchRewardData, formatRewardList } = useDappReward()
  const [data, setData] = useState<any>([])
  useEffect(() => {
    fetchRewardData().then((data) => {
      setData(formatRewardList(data))
    })
  }, [])

  return (
    <StyledRecentRewards>
      <div className="title">
        RECENT <span>REWARDS</span>
      </div>
      <div className="words">Participate in DapDap's Odyssey or mission with partners to earn multiple rewards.</div>
      <TooltipList data={data} />
    </StyledRecentRewards>
  );
};

export default RecentRewards;
