import CountUp from 'react-countup';

import Loading from '@/components/Icons/Loading';
import { formatThousandsSeparator } from '@/utils/format-number';

import { Item, LoadingWrap, StyledContainer, Title, Value } from './styles';

export default function Summary({ data, loading }: any) {
  const { total_transactions = 0, total_users = 0, trading_volume = 0 } = data;

  let golds = 0;
  if (!loading) {
    golds = 30000;
  }
  // const golds = 30000;
  const duration = 2;
  // const delay = 2;
  return (
    <StyledContainer>
      <span className="leftTop corner"></span>
      <span className="rightTop corner"></span>
      <span className="leftBottom corner"></span>
      <span className="rightBottom corner"></span>
      <Item>
        <Title>Trading Volume</Title>
        {/* <Value>${formatThousandsSeparator(Number(Number(trading_volume).toFixed(2)))}</Value> */}
        <Value>
          <CountUp start={0} end={trading_volume} duration={duration} decimals={2} decimal="." prefix="$" suffix="" />
        </Value>
      </Item>
      <Item>
        <Title>Total Transactions</Title>
        {/* <Value>{formatThousandsSeparator(total_transactions)}</Value> */}
        <Value>
          <CountUp start={0} end={total_transactions} duration={duration} />
        </Value>
      </Item>
      <Item>
        <Title>Total Users</Title>
        {/* <Value>{formatThousandsSeparator(total_users)}</Value> */}
        <Value>
          <CountUp start={0} end={total_users} duration={duration} />
        </Value>
      </Item>
      <Item>
        <Title>accumulated Gold</Title>
        {/* <Value>{formatThousandsSeparator(30000)}</Value> */}
        <Value>
          <CountUp start={0} end={golds} duration={duration} />
        </Value>
      </Item>
    </StyledContainer>
  );
}
