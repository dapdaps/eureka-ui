import CountUp from 'react-countup';

import { Item, StyledContainer, Title, Value } from './styles';

export default function Summary({ data, loading }: any) {
  const { total_transactions = 0, total_users = 0, trading_volume = 0 } = data;

  let golds = 0;
  if (!loading) {
    golds = 30000;
  }

  const duration = 2;

  return (
    <StyledContainer>
      <span className="leftTop corner"></span>
      <span className="rightTop corner"></span>
      <span className="leftBottom corner"></span>
      <span className="rightBottom corner"></span>
      <Item>
        <Title>Trading Volume</Title>

        <Value>
          <CountUp start={0} end={trading_volume} duration={duration} decimals={2} decimal="." prefix="$" suffix="" />
        </Value>
      </Item>
      <Item>
        <Title>Total Transactions</Title>
        <Value>
          <CountUp start={0} end={total_transactions} duration={duration} />
        </Value>
      </Item>
      <Item>
        <Title>Total Users</Title>
        <Value>
          <CountUp start={0} end={total_users} duration={duration} />
        </Value>
      </Item>
      <Item>
        <Title>Total Rewards</Title>
        <Value>
          {/*<CountUp start={0} end={golds} duration={duration} />*/}
          $MODE & $5k USDC
        </Value>
      </Item>
    </StyledContainer>
  );
}
