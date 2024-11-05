import Big from 'big.js';
import { format } from 'date-fns';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { StyledContainer, StyledFlex, StyledFont } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import AreaChart from '../components/AreaChart';
import Ring from '../components/Ring';
import usePrice from '../hooks/usePrice';
const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  grid-column-gap: 8px;
  grid-row-gap: 14px;

  /* margin-bottom: 50px; */
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
  /* margin-top: 56px; */
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

const StyledMaxRaiseAmount = styled.div`
  padding: 4px 16px;
  flex: 0.3;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 16px;
  border: 2px solid rgb(84, 61, 201);
`;
const StyledMaxRaiseAmountL = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledMaxRaiseAmountR = styled.div``;

export default function Comp({ pool, totalSupply, softCap }: any) {
  const { loading, priceData, queryPrice } = usePrice();

  const isFixedPriceSale = useMemo(() => pool?.mode === 'fixed_price', [pool]);
  const previous = useMemo(() => {
    let _previous = null;
    try {
      _previous = JSON.parse(pool?.previous);
    } catch (error) {
      _previous = [];
    }
    return _previous;
  }, [pool]);
  const handleQueryPrice = function () {
    queryPrice({
      pool: pool?.pool
    });
  };
  const showZero = function (value: string, unit?: string) {
    return value === '-' ? (unit || '') + '0' : value;
  };
  const fdv = useMemo(() => {
    return pool?.share_token_symbol?.toLocaleLowerCase() === 'tango'
      ? '$44.99M'
      : formatValueDecimal(Big(pool?.price ?? 0).times(totalSupply), '$', 2, true);
  }, [totalSupply, pool]);

  useEffect(() => {
    pool?.pool && handleQueryPrice();
  }, []);
  return (
    <div>
      {isFixedPriceSale ? (
        <StyledFlex gap="10px" style={{ marginBottom: 50 }}>
          <Summary style={{ gridTemplateColumns: 'repeat(3, 1fr)', flex: 1 }}>
            <SummaryItem className="tiled">
              <div className="key">Price Per RAGE</div>
              <div className="value">
                {formatValueDecimal(pool?.price ?? 0, '', 2, true)} {pool?.asset_token_symbol}
              </div>
            </SummaryItem>
            <SummaryItem className="tiled">
              <div className="key">Max Allocation per Wallet</div>
              <div className="value">
                {formatValueDecimal(pool?.shares_initial ?? 0, '', 2, true)} {pool?.share_token_symbol}
              </div>
            </SummaryItem>
            <SummaryItem className="tiled">
              <div className="key">Soft Cap</div>
              <div className="value">
                {showZero(formatValueDecimal(softCap, '', 2, true))} {pool?.share_token_symbol}
              </div>
            </SummaryItem>
            <SummaryItem className="tiled">
              <div className="key">Funds Raised</div>
              <div className="value">
                {showZero(formatValueDecimal(pool?.funds_raised_usd ?? 0, '$', 2, true), '$')}
              </div>
            </SummaryItem>
            <SummaryItem className="tiled">
              <div className="key">FDV</div>
              <div className="value">{fdv}</div>
            </SummaryItem>
            <SummaryItem className="tiled">
              <div className="key">Circ. Marketcap</div>
              <div className="value">{formatValueDecimal(pool?.market_cap ?? 0, '$', 2, true)}</div>
            </SummaryItem>
          </Summary>
          <StyledMaxRaiseAmount>
            <StyledMaxRaiseAmountL>
              <StyledFont color="#FFF" fontSize="12px">
                Max raise amount:
              </StyledFont>

              <StyledFont color="#FFF" fontSize="16px">
                {showZero(formatValueDecimal(pool?.shares_released ?? 0, '', 2, true))}/
                {formatValueDecimal(pool?.shares_initial ?? 0, '', 2, true)}
              </StyledFont>
            </StyledMaxRaiseAmountL>
            <StyledFont color="#FFF">
              {Big(pool?.shares_released ?? 0)
                .div(pool?.shares_initial ?? 1)
                .times(100)
                .toFixed(2)}
              %
            </StyledFont>
          </StyledMaxRaiseAmount>
        </StyledFlex>
      ) : (
        <>
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
            <StyledFlex gap="10px">
              <Ring
                percent={Big(pool?.shares_released ?? 0)
                  .div(pool?.shares_initial ?? 1)
                  .times(100)
                  .toFixed(2)}
              />
              <SummaryItem className="tiled">
                <div className="key">Token Released / Available</div>
                <div className="value">
                  {formatValueDecimal(pool?.shares_released ?? 0, '', 2, true)} /{' '}
                  {formatValueDecimal(pool?.shares_initial ?? 0, '', 2, true)}
                </div>
              </SummaryItem>
            </StyledFlex>
          </Summary>
          <StyledContainer style={{ marginTop: 50, marginBottom: 56 }}>
            {/* <AreaChart data={priceData} /> */}
          </StyledContainer>
        </>
      )}

      <Detail>
        <SummaryItem className="overlap">
          <div className="key">Sale Start Time</div>
          <div className="value">{format(new Date(pool.start_time * 1000), 'dd/MM/yyyy HH:mm a')} GMT+8</div>
        </SummaryItem>
        <SummaryItem className="overlap">
          <div className="key">Sale End Time</div>
          <div className="value">{format(new Date(pool.end_time * 1000), 'dd/MM/yyyy HH:mm a')} GMT+8</div>
        </SummaryItem>
        {!isFixedPriceSale && (
          <>
            <SummaryItem className="overlap">
              <div className="key">% of Supply Sold in Round</div>
              <div className="value">
                {pool?.custom_total_supply
                  ? formatValueDecimal(Big(pool?.shares_initial).div(pool?.custom_total_supply).times(100)) + '%'
                  : '-'}
              </div>
            </SummaryItem>
            <SummaryItem className="overlap">
              <div className="key">Total Supply</div>
              <div className="value">{formatValueDecimal(pool?.custom_total_supply || 0, '', 0, true)}</div>
            </SummaryItem>
          </>
        )}
      </Detail>
      {!isFixedPriceSale && (
        <>
          <Title>Previous investment Round Details</Title>
          <Th>
            <div>Round</div>
            <div>TGE</div>
            <div>Vesting Length</div>
            <div>
              % of Supply <br />
              Sold in Round
            </div>
            <div>Raise Amount</div>
            <div>Valuation of Round</div>
          </Th>
          {previous?.map((item: any, index: number) => {
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
            );
          }) ?? <></>}
        </>
      )}
    </div>
  );
}
