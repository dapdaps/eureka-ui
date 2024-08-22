import { memo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, YAxis } from 'recharts';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import useNetCurve24h from '../../hooks/useNetCurve24h';
import { ChartContainer, ChartDataWrapper, DiffWrapper,TotalBalanceWrapper } from './styles';

const Chat = ({ totalBalance }: any) => {
  const { netCurve24h, diff } = useNetCurve24h();

  if (!netCurve24h || !diff || totalBalance === undefined) return <div />;

  const data = netCurve24h;
  return (
    <ChartContainer
      style={{
        position: 'relative',
      }}
    >
      <ChartDataWrapper>
        <TotalBalanceWrapper>
          <span className="format-decimals">
            $
            <span className="integer-part">
              {formateValueWithThousandSeparatorAndFont(totalBalance || 0, 4).integer}
            </span>
            <span className="decimal-part">
              {formateValueWithThousandSeparatorAndFont(totalBalance || 0, 4).decimal}
            </span>
          </span>
        </TotalBalanceWrapper>

        <DiffWrapper dir={diff.dir}>{diff.value}</DiffWrapper>
      </ChartDataWrapper>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={200}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(99, 195, 65, 0.1)" />
              <stop offset="50%" stopColor="rgba(99, 195, 65, 0)" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="transparent" />
          <YAxis width={0} axisLine={false} tick={false} tickLine={false} domain={['dataMin', 'dataMax']} />
          <Area
            height={100}
            width={425}
            type="linear"
            dataKey="usd_value"
            stroke="#63C341"
            fill="url(#gradient)"
            min={Math.min(...data.map((item) => item.usd_value))}
            max={Math.max(...data.map((item) => item.usd_value))}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default memo(Chat);
