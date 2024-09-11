import MedalCard from '@/views/Profile/components/MedalCard';

import { StyledContainer, StyledContent, StyledTitle } from './styles';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

const Medal = () => {

  const medals: any = [
    {
      animation_url: null,
      category: 'Application Medals',
      completed_percent: '10',
      completed_status: '',
      completed_threshold: 10,
      completed_volume: '0',
      gem: 5,
      id: 70,
      level: 2,
      level_description: 'Staking $5k in Hyperlock',
      level_name: 'Hyperlock Golden Staking Maestro',
      logo: 'https://s3.amazonaws.com/dapdap.prod/images/test_medal_staking_2.png',
      medal_category: 'dapp',
      medal_name: 'Hyperlock Staking Maestro',
      online: 1,
      relate: 173,
      threshold: 0,
      trading_type: 'Staking',
      trading_volume: 5000,
    },
    {
      animation_url: null,
      category: 'Ethereum Ecosystem Medals',
      completed_percent: '20',
      completed_status: '',
      completed_threshold: 0,
      completed_volume: '0',
      gem: 10,
      id: 53,
      level: 3,
      level_description: '100 transactions and $10k in total on the zkSync',
      level_name: 'Azure zkSync Trader',
      logo: 'https://s3.amazonaws.com/dapdap.prod/images/test_medal_zksync_trade_azure.png',
      medal_category: 'chain',
      medal_name: 'zkSync Trader',
      online: 1,
      relate: 324,
      threshold: 100,
      trading_type: null,
      trading_volume: 10000,
    },
  ];

  const renderTooltip = (value: any, total: any) => {
    return `
      ${formateValueWithThousandSeparatorAndFont(value, 1, true, { prefix: '$' })}
      /
      ${formateValueWithThousandSeparatorAndFont(total, 1, true, { prefix: '$' })}
    `;
  };

  return (
    <StyledContainer>
      <StyledTitle>
        Participate in Campaign and win Medals
      </StyledTitle>
      <StyledContent>
        {
          medals.map((medal: any, idx: number) => (
            <MedalCard
              tooltip={renderTooltip(medal.completed_volume, medal.trading_volume)}
              className="campaign-medal"
              key={idx}
              medal={medal}
              barWidth="400px"
              style={{
                flex: 1,
                height: 150,
                background: '#1E2028',
                border: '1px solid #373A53',
              }}
              nameStyle={{
                fontSize: 16,
              }}
            />
          ))
        }
      </StyledContent>
    </StyledContainer>
  );
};

export default Medal;
