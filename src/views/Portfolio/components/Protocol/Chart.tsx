import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { useEffect, useMemo, useRef, useState } from 'react';

export const StyledContainer = styled.div`
  width: 574px;
  height: 347px;
  flex-shrink: 0;
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
    height: 26px;
    color: #979ABE;
    text-align: right;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    padding: 0 10px 0 9px;
    border-radius: 6px;
    border: 1px solid #3D405A;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 9px;
    cursor: pointer;
    position: relative;

    .dropdown {
      width: 100%;
      position: absolute;
      z-index: 1;
      right: 0;
      top: 24px;
      background: #1B1D25;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      border: 1px solid #3D405A;
      display: none;

      &.visible {
        display: block;
      }

      .dropdown-list {
        list-style: none;
        padding: 4px 0;
        margin: 0;
        display: flex;
        text-align: left;
        flex-direction: column;
        align-items: stretch;
      }
      .dropdown-item {
        padding: 4px 12px;
        transition: all .3s linear;
        
        &:hover,
        &.selected {
          background: #000;
        }
      }
    }
  }

  .chart-wrapper {
    height: 198px;
    margin-top: 42px;
  }
`;

const dropdownList = [
  {
    key: 1,
    label: 'Day',
  },
  {
    key: 2,
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

  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdown, setDropdown] = useState(dropdownList[0].key);

  const handleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownSelect = (value: any) => {
    setDropdown(value);
    setDropdownVisible(false);
  };

  const dropdownShown = useMemo(() => {
    return dropdownList.find((it) => it.key === dropdown)?.label;
  }, [dropdown]);

  useEffect(() => {
    const handleDropdownVisible = (e: any) => {
      if (!dropdownRef.current) return;
      if ((dropdownRef.current as HTMLElement).contains(e.target)) {
        return;
      }
      setDropdownVisible(false);
    };
    document.body.addEventListener('click', handleDropdownVisible);
    return () => {
      document.body.removeEventListener('click', handleDropdownVisible);
    };
  }, []);

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
        <div className="head-right" onClick={handleDropdown} ref={dropdownRef}>
          <span>{dropdownShown}</span>
          <span className="arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 5L11 1" stroke="#979ABE" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </span>
          <div className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
            <ul className="dropdown-list">
              {
                dropdownList.map((it) => (
                  <li
                    className={`dropdown-item ${dropdown === it.key ? 'selected' : ''}`}
                    key={it.key}
                    onClick={() => handleDropdownSelect(it.key)}
                  >
                    {it.label}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
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
