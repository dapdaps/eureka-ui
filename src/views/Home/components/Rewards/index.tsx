import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useDappReward from '@/views/AllDapps/hooks/useDappReward';

import TooltipList from '../Tooltip/List';

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

const RecentRewards = (props: Props) => {
  const { style, titleStyle, isSubTitle = true } = props;

  const { fetchRewardData, formatRewardList } = useDappReward()
  const [data, setData] = useState<any>([])
  useEffect(() => {
    fetchRewardData().then((data) => {
      setData(formatRewardList(data))
    })
  }, [])

  return (
    <StyledRecentRewards style={style}>
      <div className="title" style={titleStyle}>
        RECENT <span>REWARDS</span>
      </div>
      {
        isSubTitle && (
          <div className="words">Participate in DapDap&apos;s Odyssey or mission with partners to earn multiple rewards.</div>
        )
      }
      <TooltipList data={data} />
    </StyledRecentRewards>
  );
};

export default RecentRewards;

interface Props {
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  isSubTitle?: boolean;
}
