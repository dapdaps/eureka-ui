import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from '@/views/Portfolio/components/Dropdown';

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

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
            <div className="usd">$1,234<span className="sm">.67</span></div>
            <div className="rate">+1.23%</div>
          </div>
        </div>
        <Dropdown
          className="head-right"
          list={dropdownList}
          value={dropdown}
          onSelect={handleDropdownSelect}
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
                <stop stop-color="#41C37D" />
                <stop offset="1" stop-color="#41C37D" stop-opacity="0" />
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
            <Tooltip />
            <Area
              dataKey="uv"
              type="linear"
              stroke="#63C341"
              fill="url(#paint0_linear_12309_49)"
              min={Math.min(...data.map((item) => item.uv))}
              max={Math.max(...data.map((item) => item.uv))}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </StyledContainer>
  );
};

export default ChartComponent;
