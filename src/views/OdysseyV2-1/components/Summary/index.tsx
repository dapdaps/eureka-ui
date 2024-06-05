import CountUp from 'react-countup';

import { Item, StyledContainer, Title, Value } from './styles';

const ITEMS = [
  {
    label: 'Trading Volume',
    key: 'trading_volume',
  },
  {
    label: 'Total Transactions',
    key: 'total_transactions',
  },
  {
    label: 'Total Users',
    key: 'total_users',
  },
];

export default function Summary({ detail, loading }: any) {

  const duration = 2;

  return (
    <StyledContainer>
      <span className="leftTop corner" />
      <span className="rightTop corner" />
      <span className="leftBottom corner" />
      <span className="rightBottom corner" />
      {
        ITEMS.map(item => (
          <Item key={item.key}>
            <Title>{item.label}</Title>
            <Value>
              <CountUp start={0} end={detail?.[item.key] ?? 0} duration={duration} />
            </Value>
          </Item>
        ))
      }
    </StyledContainer>
  );
}
