import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, useMotionValue } from 'framer-motion';
import Tooltip from '../Tooltip';

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

  .list {
    display: flex;
    align-items: center;

    .box {
      position: relative;
      padding-top: 20px;

      &:not(:first-child) {
        margin-left: -6px;
      }

      .brand {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border: 4px solid #292b33;
      }
    }
  }
`;

const RecentRewards = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const x = useMotionValue(0);

  const data = [
    { imgSrc: 'https://s3.amazonaws.com/dapdap.prod/images/base.png', title: '$15k MODE', subtitle: 'Odyssey Vol.5: The Airdrop sdasdasdasada', imageUrl: 'https://s3.amazonaws.com/dapdap.prod/images/mode7.png' },
    { imgSrc: 'https://s3.amazonaws.com/dapdap.prod/images/linea.png', title: '$10k LINEA', subtitle: 'Linea Odyssey: The Adventure', imageUrl: 'https://s3.amazonaws.com/dapdap.prod/images/linea.png' },
  ];

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <StyledRecentRewards>
      <div className="title">
        Recent <span>Rewards</span>
      </div>
      <div className="words">Participate in DapDap's Odyssey or mission with partners to earn multiple rewards.</div>
      <div className="list">
        {data.map((item, index) => (
          <div
            className="box"
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <AnimatePresence>
                <Tooltip x={x} data={item} />
              </AnimatePresence>
            )}
            <img className='brand' src={item.imgSrc} alt="" onMouseMove={handleMouseMove} />
          </div>
        ))}
      </div>
    </StyledRecentRewards>
  );
};

export default RecentRewards;
