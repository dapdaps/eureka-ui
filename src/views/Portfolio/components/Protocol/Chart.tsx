import { random } from 'lodash';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import styled from 'styled-components';

import { formatDateTime } from '@/utils/date';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import Dropdown from '@/views/Portfolio/components/Dropdown';
import Big from 'big.js';

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

const ChartComponent = (props: any) => {
  const {} = props;

  const [data, setData] = useState<{ day_time: number; worth: number; }[]>([]);
  const [percent, setPercent] = useState<string>('');

  const getData = () => {
    const startDate = new Date('2024-01-01');
    const _data = [...new Array(200).keys()].map((i) => ({
      day_time: new Date(new Date(startDate).setDate(i)).getTime(),
      worth: i + random(0.001, 100, true),
    }));
    const _sorted = _data.sort((a, b) => b.day_time - a.day_time);
    setData(_sorted);
    setPercent(Big(_sorted[0].worth).minus(_sorted[1].worth).div(_sorted[1].worth).times(100).toFixed(2));
  };

  useEffect(() => {
    getData();
  }, []);

  const [dropdown, setDropdown] = useState(dropdownList[0].value);

  const handleDropdownSelect = (value: any) => {
    setDropdown(value);
  };

  return (
    <StyledContainer>
      <div className="chart-head">
        <div className="head-left">
          <div className="title">Total Worth</div>
          <div className="summary">
            <div className="usd">$0<span className="sm">.00</span></div>
            <div className="rate">
              {Big(percent || 0).gt(0) ? '+' : ''}{percent}%
            </div>
          </div>
        </div>
        <Dropdown
          className="head-right"
          list={dropdownList}
          value={dropdown}
          onSelect={handleDropdownSelect}
          dropdownWidth={100}
        />
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={531}
            height={198}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
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
              domain={['dataMin', 'dataMax']}
            />
            <Area
              dataKey="worth"
              type="linear"
              stroke="#63C341"
              fill="url(#paint0_linear_12309_49)"
              min={Math.min(...data.map((item) => item.worth))}
              max={Math.max(...data.map((item) => item.worth))}
            />
            <Tooltip
              content={<CustomTooltip />}
            />
          </AreaChart>
        </ResponsiveContainer>
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
