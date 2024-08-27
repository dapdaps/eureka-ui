import Big from 'big.js';
import { max, min } from 'lodash';
import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { StyledFlex } from '@/styled/styles';
import { formatDateTime } from '@/utils/date';
import { formateValueWithThousandSeparator, formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

export const StyledContainer = styled.div`
  width: 574px;
  height: 347px;
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 10px;
  background: #1B1D25;
  backdrop-filter: blur(10px);
  padding: 18px 16px 23px 22px;
  color: #fff;

  .chart-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .head-left {
    .title {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
    }

    .summary {
      font-size: 26px;
      font-style: normal;
      font-weight: 700;
      line-height: 1;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      gap: 9px;
      margin-top: 10px;
    }

    .usd {
    }

    .sm {
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
    }

    .rate {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      color: #41C37D;
    }
  }

  .head-right {
    width: auto;
    height: 26px;
    padding: 0 9px;
    border-color: #3D405A;

    &-popup {
      top: 30px;
      left: unset;
      right: 0;
    }

    &-trigger {
      color: #979ABE;
      text-align: right;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &-arrow {
        color: #979ABE;
      }
    }
  }

  .chart-wrapper {
    height: 198px;
    margin-top: 42px;
  }
`;

export const StyledTooltip = styled.div`
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #303142;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  padding: 15px 20px;
`;

const dropdownList = [
  {
    key: 1,
    value: 1,
    label: 'Day',
  },
  {
    key: 2,
    value: 2,
    label: 'Month',
  },
];

const ChartComponent = (props: Props) => {
  const { totalWorth, list, loading, increase } = props;

  const isUp = useMemo(() => {
    if (!increase) return true;
    const increaseNumber = Big(increase).toNumber();
    return increaseNumber >= 0;
  }, [increase]);

  const [dropdown, setDropdown] = useState(dropdownList[0].value);

  const handleDropdownSelect = (value: any) => {
    setDropdown(value);
  };

  const totalWorthShown = useMemo(() => {
    let _totalWorth = 0;
    if (totalWorth) {
      _totalWorth = Big(totalWorth).toNumber();
    }
    return formateValueWithThousandSeparatorAndFont(_totalWorth, 2, false, { prefix: '$', isLTIntegerZero: true });
  }, [totalWorth]);

  return (
    <StyledContainer>
      <div className="chart-head">
        <div className="head-left">
          <div className="title">Total Worth</div>
          <div className="summary">
            <div className="usd">{totalWorthShown.integer}<span className="sm">{totalWorthShown.decimal}</span></div>
            <div className="rate">
              {isUp ? '+' : ''}{Big(increase).toFixed(2)}%
            </div>
          </div>
        </div>
        {/*<Selector
          className="head-right"
          triggerClassName="head-right-trigger"
          arrowClassName="head-right-trigger-arrow"
          popupClassName="head-right-popup"
          list={dropdownList}
          value={dropdown}
          onSelect={handleDropdownSelect}
          popupStyle={{
            width: 100,
          }}
          style={{
            borderRadius: 6,
            background: '#1B1D25',
          }}
        />*/}
      </div>
      <div className="chart-wrapper">
        {
          loading ? (
            <StyledFlex style={{ height: '100%' }} justifyContent="center" alignItems="center">
              <Loading />
            </StyledFlex>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={531}
                height={198}
                data={list}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 10,
                }}
              >
                <defs>
                  <linearGradient
                    id="paint0_linear_12309_49"
                    x1="265.457"
                    y1="11.4055"
                    x2="265.457"
                    y2="198"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#41C37D" />
                    <stop offset="1" stopColor="#41C37D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="transparent" />
                <YAxis
                  width={0}
                  axisLine={false}
                  tick={false}
                  tickLine={false}
                  domain={() => {
                    const _list = list.map((it) => {
                      if (!isValidNumber(it.worth)) return 0;
                      return Big(it.worth).toNumber();
                    });
                    const _dataMin = min(_list) ?? 0;
                    const _dataMax = max(_list) ?? 0;
                    const _dataMaxLen = Math.floor(_dataMax).toString().length || 1;
                    const _dataMinRes = 0;
                    const _dataMaxRes = _dataMax + _dataMax / Math.pow(10, _dataMaxLen - 1);
                    return [_dataMinRes, _dataMaxRes];
                  }}
                />
                <Area
                  dataKey="worth"
                  type="linear"
                  stroke="#63C341"
                  fill="url(#paint0_linear_12309_49)"
                  min={Math.min(...list.map((item) => Big(item.worth).toNumber()))}
                  max={Math.max(...list.map((item) => Big(item.worth).toNumber()))}
                />
                <Tooltip
                  content={<CustomTooltip />}
                />
              </AreaChart>
            </ResponsiveContainer>
          )
        }
      </div>
    </StyledContainer>
  );
};

export default ChartComponent;

const CustomTooltip = (props: any) => {
  const { payload } = props;
  const { worth, day_time } = payload[0]?.payload || {};
  return (
    <StyledTooltip>
      <div className="tooltip-label">
        {formatDateTime(day_time, 'YYYY.MM.DD')}:
      </div>
      <div className="tooltip-value">
        ${worth ? formateValueWithThousandSeparator(worth, 2) : ''}
      </div>
    </StyledTooltip>
  );
};

export interface Props {
  totalWorth: Big.Big;
  list: any[];
  loading: boolean;
  increase: any;
}

function isValidNumber(num: number): boolean {
  try {
    Big(num);
    return true;
  } catch (e) {
    return false;
  }
}
