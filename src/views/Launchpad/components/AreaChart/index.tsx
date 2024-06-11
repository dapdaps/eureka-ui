import { format } from 'date-fns';
import type { FC } from 'react';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

interface IProps {
  data: { [propName: string]: any }[];
  // onSelect: (date: string) => void;
  // formatter: string;
}

const TooltipWrap = styled.div`
  font-family: Montserrat;
  /* background-color: #37364b; */
  padding: 5px;
  /* border-radius: 8px; */
  /* border: 1px solid #676a87; */
  font-size: 14px;
  color: white;
`;

const App: FC<IProps> = ({
  data,
  // onSelect, formatter
}) => {
  const CustomTooltip = (props: any) => {
    const { payload } = props;

    const value = payload[0]?.payload['price'];

    const date = payload[0]?.payload['time'];
    // if (date) {
    //   const str = format(date * 1000, formatter);
    //   onSelect(str);
    // }

    let ROUND;
    if (value < 1) ROUND = 3;
    if (value >= 1) ROUND = 2;
    return <TooltipWrap>${value}</TooltipWrap>;
    // return <TooltipWrap>${Number(value).toFixed(ROUND)}</TooltipWrap>;
  };
  return (
    <AreaChart
      width={780}
      height={278}
      data={data}
      className="area-chart"
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="#fff" stopOpacity={0.2} />
          <stop offset="90%" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>

      <XAxis
        dataKey="time"
        tick={{
          stroke: 'rgba(255, 255, 255, 0.40)',
          fill: 'rgba(255, 255, 255, 0.40)',
          fontSize: 12,
          fontWeight: 400,
        }}
        tickFormatter={(time: any) => {
          return format(time, 'd MMM');
        }}
      />
      {/* <YAxis
        axisLine={false}
        tickLine={false}
        tick={{
          stroke: 'rgba(255, 255, 255, 0.40)',
          fill: 'rgba(255, 255, 255, 0.40)',
          fontSize: 12,
          fontWeight: 400,
        }}
      /> */}

      <Area type="monotone" dataKey="price" stroke="#fff" fillOpacity={1} fill="url(#colorUv)" />
      <Tooltip
        // trigger="click"
        wrapperStyle={{
          minWidth: 122,
          height: 70,
        }}
        content={<CustomTooltip />}
        labelStyle={{
          color: 'white',
        }}
        itemStyle={{
          color: 'white',
        }}
      />
    </AreaChart>
  );
};
export default App;
