import styled from 'styled-components';

import { formatValueDecimal } from '@/utils/formate';
import Big from 'big.js';
import { format } from 'date-fns';
import { useEffect, useMemo } from 'react';
import AreaChart from '../components/AreaChart';
import usePrice from '../hooks/usePrice';
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
  grid-template-columns: 1fr 1fr 1fr 1.3fr 1.5fr 1.5fr;

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

export default function Comp({ pool }: any) {
  const { loading, priceData, queryPrice } = usePrice()

  const previous = useMemo(() => {
    let _previous = null
    try {
      _previous = JSON.parse(pool?.previous)
    } catch (error) {
      _previous = []
    }
    return _previous
  }, [pool])
  const handleQueryPrice = function () {
    queryPrice({
      pool: pool?.pool
    })
  }
  useEffect(() => {
    pool?.pool && handleQueryPrice()
  }, [])
  return (
    <div>
      <Summary>
        <SummaryItem className="tiled">
          <div className="key">Funds Raised</div>
          <div className="value">{formatValueDecimal(pool?.funds_raised_usd ?? 0, '$', 2, true)}</div>
        </SummaryItem>
        <SummaryItem className="tiled">
          <div className="key">Price</div>
          <div className="value">{formatValueDecimal(pool?.price_usd ?? 0, '$', 3)}</div>
        </SummaryItem>
        <SummaryItem className="tiled">
          <div className="key">Volume</div>
          <div className="value">{formatValueDecimal(pool?.volume ?? 0, '$', 2)}</div>
        </SummaryItem>
        <SummaryItem className="tiled">
          <div className="key">Liquidity</div>
          <div className="value">{formatValueDecimal(pool?.liquidity ?? 0, '$', 2, true)}</div>
        </SummaryItem>
        <SummaryItem className="tiled">
          <div className="key">Token Released / Available</div>
          <div className="value">{formatValueDecimal(pool?.shares_released ?? 0, '$', 2)} / {formatValueDecimal(pool?.shares_initial ?? 0, '$', 2, true)}</div>
        </SummaryItem>
      </Summary>
      <AreaChart
        data={priceData}
      />
      <Detail>
        <SummaryItem className="overlap">
          <div className="key">Sale Start Time</div>
          <div className="value">{format(new Date(pool.start_time * 1000), 'dd/MM/yyyy HH:mm a')} GMT+8</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Sale End Time</div>
          <div className="value">{format(new Date(pool.end_time * 1000), 'dd/MM/yyyy HH:mm a')} GMT+8</div>
        </SummaryItem>
        {/* <SummaryItem className="overlap">
          <div className="key">Sale Price</div>
          <div className="value">1 CTG = $0.2</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Fundraise Goal</div>
          <div className="value">$10,000,000</div>
        </SummaryItem> */}
        <SummaryItem className="overlap">
          <div className="key">% of Supply Sold in Round</div>
          <div className="value">{pool?.custom_total_supply ? formatValueDecimal(Big(pool?.custom_total_supply).div(pool?.shares_initial).times(100)) + '%' : '-'}</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Total Supply</div>
          <div className="value">{formatValueDecimal(pool?.custom_total_supply || 0, '', 0, true)}</div>
        </SummaryItem>
        {/* <SummaryItem className="overlap">
          <div className="key">Initial Circulating Supply</div>
          <div className="value">74,500,000</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Initial Market Cap</div>
          <div className="value">$1,117,500</div>
        </SummaryItem> */}
      </Detail>
      <Title>Previous investment Round Details</Title>
      <Th>
        <div>Round</div>
        <div>TGE</div>
        {/* <div>Time</div> */}
        <div>Vesting Length</div>
        <div>
          % of Supply <br />
          Sold in Round
        </div>
        <div>Raise Amount</div>
        <div>Valuation of Round</div>
      </Th>
      {
        previous.map((item: any, index: number) => {
          return (
            <Tr key={index}>
              <div>{index + 1}</div>
              <div>{item.tge}%</div>
              {/* <div>
                2/25/2024 -<br /> 2/26/2024{' '}
              </div> */}
              <div>{item.vestingLength}</div>
              <div>{item.raiseAmount}%</div>
              <div>{formatValueDecimal(item?.raiseAmount || 0, '$', 2, true)}</div>
              <div>{formatValueDecimal(item?.roundValuation || 0, '$', 2, true)}</div>
            </Tr>
          )
        })
      }

      {/* <Tr>
        <div>2</div>
        <div>0%</div>
        <div>
          2/25/2024 -<br /> 2/26/2024{' '}
        </div>
        <div>1 year</div>
        <div>10%</div>
        <div>$1,000,000</div>
        <div>$10,000,000</div>
      </Tr> */}
    </div>
  );
}
