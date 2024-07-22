import styled from 'styled-components';

import AreaChart from '../components/AreaChart';

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  grid-column-gap: 8px;

  margin-bottom: 50px;
`;
const SummaryItem = styled.div`
  .key {
    color: #979abe;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;
  }
  .value {
    color: #fff;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const Detail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 50px;
  margin-top: 56px;
`;

const Title = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 24px;
  margin-top: 100px;
`;
const Th = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.3fr 1fr 1.3fr 1.5fr 1.5fr;

  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 14px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Tr = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.3fr 1fr 1.3fr 1.5fr 1.5fr;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #171822;
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 20px;
  div {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function Comp() {
  return (
    <div>
      <Summary>
        <SummaryItem className="tiled">
          <div className="key">Funds Raised</div>
          <div className="value">$68.55K</div>
        </SummaryItem>
        <SummaryItem className="tiled">
          <div className="key">Price</div>
          <div className="value">$0.23</div>
        </SummaryItem>
        <SummaryItem className="tiled">
          <div className="key">Volume</div>
          <div className="value">$120.62K</div>
        </SummaryItem>
        <SummaryItem className="tiled">
          <div className="key">Liquidity</div>
          <div className="value">$120.62K</div>
        </SummaryItem>
        <SummaryItem className="tiled">
          <div className="key">Token Released / Available</div>
          <div className="value">2.62M / 10M</div>
        </SummaryItem>
      </Summary>
      <AreaChart
        data={[
          {
            price: '0.000000000544106657',
            time: 1717459200,
          },
          {
            price: '0.000000000624522388',
            time: 1717545600,
          },
          {
            price: '0.000000000538347022',
            time: 1717632000,
          },
          {
            price: '0.000000000549063408',
            time: 1717718400,
          },
          {
            price: '0.00000000056206394',
            time: 1717804800,
          },
          {
            price: '0.00000000056386092',
            time: 1717891200,
          },
          {
            price: '0.000000000526694053',
            time: 1717977600,
          },
        ]}
      />
      <Detail>
        <SummaryItem className="overlap">
          <div className="key">Sale Start Time</div>
          <div className="value">4/25/2024 10:00 PM GMT+8</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Sale End Time</div>
          <div className="value">4/26/2024 3:00 AM GMT+8</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Sale Price</div>
          <div className="value">1 CTG = $0.2</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Fundraise Goal</div>
          <div className="value">$10,000,000</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">% of Supply Sold in Round</div>
          <div className="value">10%</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Total Supply</div>
          <div className="value">1,000,000,000</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Initial Circulating Supply</div>
          <div className="value">74,500,000</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Initial Market Cap</div>
          <div className="value">$1,117,500</div>
        </SummaryItem>
      </Detail>
      <Title>Previous investment Round Details</Title>
      <Th>
        <div>Round</div>
        <div>TGE</div>
        <div>Time</div>
        <div>Vesting Length</div>
        <div>
          % of Supply <br />
          Sold in Round
        </div>
        <div>Raise Amount</div>
        <div>Valuation of Round</div>
      </Th>
      <Tr>
        <div>1</div>
        <div>0%</div>
        <div>
          2/25/2024 -<br /> 2/26/2024{' '}
        </div>
        <div>1 year</div>
        <div>10%</div>
        <div>$1,000,000</div>
        <div>$10,000,000</div>
      </Tr>
      <Tr>
        <div>2</div>
        <div>0%</div>
        <div>
          2/25/2024 -<br /> 2/26/2024{' '}
        </div>
        <div>1 year</div>
        <div>10%</div>
        <div>$1,000,000</div>
        <div>$10,000,000</div>
      </Tr>
    </div>
  );
}
