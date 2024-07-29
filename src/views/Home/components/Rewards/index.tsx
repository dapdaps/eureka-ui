import React from 'react';
import styled from 'styled-components';
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
    color: #fff;
    margin-bottom: 35px;

    span {
      color: #ebf479;
      line-height: 51px;
      font-weight: 700;
    }
  }

  .words {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    margin-bottom: 72px;
    color: #979ABE;
  }

`;

const data = [
  {
    imgSrc: 'https://s3.amazonaws.com/dapdap.prod/images/base.png',
    title: '$15k MODE',
    subtitle: 'Odyssey Vol.5: The Airdrop sdasdasdasada',
    imageUrl: 'https://s3.amazonaws.com/dapdap.prod/images/mode7.png',
  },
  {
    imgSrc: 'https://s3.amazonaws.com/dapdap.prod/images/linea.png',
    title: '$10k LINEA',
    subtitle: 'Linea Odyssey: The Adventure',
    imageUrl: 'https://s3.amazonaws.com/dapdap.prod/images/linea.png',
  },
];

const RecentRewards = () => {


  return (
    <StyledRecentRewards>
      <div className="title">
        Recent <span>Rewards</span>
      </div>
      <div className="words">Participate in DapDap's Odyssey or mission with partners to earn multiple rewards.</div>
      <TooltipList data={data} />
    </StyledRecentRewards>
  );
};

export default RecentRewards;
