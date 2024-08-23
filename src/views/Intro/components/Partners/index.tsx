import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TooltipList from './Tooltip/List';
import useDappReward from '@/views/AllDapps/hooks/useDappReward';

const StyledRecentRewards = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding-top: 150px;

  .title {
    font-size: 46px;
    font-weight: 700;
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
  const [data, setData] = useState<any>([
    {
      name: '0xSocratic',
      desc: 'Chief Chess Player Building for product market fit',
      link: 'https://x.com/0x_socratic',
      icon: '/images/intro/partner/p1.png'
    },
    {
      name: 'DapDap Intern: Research Intern',
      desc: 'Pronouns: Dap/Dap 🤜🤛',
      link: 'https://x.com/dapdap_intern',
      icon: '/images/intro/partner/p2.png'
    },
    {
      name: 'Nikwadz',
      desc: 'Business Development LeadReach out to @nikwadz on Twitter or TG for integration / business inquiries',
      link: 'https://x.com/NikWadz',
      icon: '/images/intro/partner/p3.png'
    },
    {
      name: 'Hero',
      desc: 'Technical Marketing LeadReimagining the Open Web',
      link: 'https://x.com/chrestomanzi',
      icon: '/images/intro/partner/p4.png'
    },
    {
      name: 'Cudam321',
      desc: 'Chief Schizoposting Officer When in doubt, zoom out',
      link: 'https://x.com/0x_socratic',
      icon: '/images/intro/partner/p5.png'
    }
  ])
  useEffect(() => {
    fetchRewardData().then((data) => {
      console.log('data:', formatRewardList(data))
      // setData(formatRewardList(data))
    })
  }, [])


  return (
    <StyledRecentRewards style={style}>
      <div className="title" style={titleStyle}>
      Created by DapDap Team with ❤️ 
      </div>
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
