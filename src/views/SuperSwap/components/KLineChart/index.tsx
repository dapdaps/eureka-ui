import IconSwap from '@public/images/refresh.svg';
import IconArrowUp from '@public/images/tokens/arrow-up.svg';
import IconMore from '@public/images/tokens/more.svg';
import { useDebounceFn } from 'ahooks';
import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { Line, LineChart, ResponsiveContainer,Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { useTokenPriceLatestStore } from '@/stores/tokenPrice';
import { StyledFlex } from '@/styled/styles';
import { get } from '@/utils/http';

import TokenDetailPopup from './TokenDetailPopup';

const ChartContainer = styled.div`
  color: white;
  margin-top: 20px;
  width: 100%;
`;

const Token = styled.div`
  display: flex;
  gap: 6px;
  .swap {
    cursor: pointer;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CryptoIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PriceInfo = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
`;

const ChangePercentage = styled.div<{ isPositive: boolean }>`
  font-size: 14px;
  font-family: Gantari;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ isPositive }) => (isPositive ? '#79FFB7' : '#FF3D83')};
  svg {
    transform: ${({ isPositive }) => (isPositive ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Tab = styled.button<{ active: boolean }>`
  color: ${(props) => (props.active ? '#979ABE' : '#53577B')};
  border-bottom: ${(props) => (props.active ? '1px solid #ebf479' : 'none')};
  padding: 2px;
  cursor: pointer;
  background-color: transparent;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
`;

const StyledIconMore = styled.div`
  width: 20px;
  height: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #979abe;
  &:hover {
    color: #fff;
  }
`;

const StyleCustomTooltip = styled.div`
  background-color: transparent;
  .price {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: right;
    color: #fff;
  }
  .time {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: right;
    color: #53577B;
  }
`

type ICategory = 'day' | 'week' | 'month' | 'year';

const periods: ICategory[] = ['day', 'week', 'month', 'year'];

const periodsMap = {
  day: 'D',
  week: 'W',
  month: 'M',
  year: 'Y',
};

interface IChartData {
  id: number;
  price: string;
  price_key: string;
  timestamp: number; // Jul 10 3:00 PM
}


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { price, timestamp } = payload[0].payload;
    return (
      <StyleCustomTooltip>
        <div className='price'>{parseFloat(price).toFixed(2)}</div>
        <div className='time'>{timestamp}</div>
      </StyleCustomTooltip>
    );
  }
  return null;
};


const KLineChart = ({ trade }: { trade: any }) => {
  const [activePeriod, setActivePeriod] = useState<ICategory>('day');
  const [isTokenDetailPopupVisible, setIsTokenDetailPopupVisible] = useState(false);
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const tokenPriceLatest = useTokenPriceLatestStore(store => store.list);

  const [isReversed, setIsReversed] = useState(false);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const { data } = await get(`/api/token/price/list`, {
        symbol: isReversed ? trade.outputCurrency.symbol : trade.inputCurrency.symbol,
        category: activePeriod,
      });
      const formattedData = data.map((item: IChartData) => ({
        ...item,
        timestamp: format(new Date(item.timestamp * 1000), 'MMM d h:mm a'),
      }));
      setChartData(formattedData);
    } catch (error) {
      console.log(error, 'fetchChartData');
    } finally {
      setLoading(false);
    }
  };

  const { run } = useDebounceFn(() => fetchChartData(), {
    wait: 500,
  });

  useEffect(() => {
    run();
  }, [trade, activePeriod, isReversed]);

  const selectedToken = useMemo(() => {
    const symbol = isReversed ? trade.outputCurrency.symbol : trade.inputCurrency.symbol;
    return tokenPriceLatest?.[symbol];
  }, [trade.inputCurrency, trade.outputCurrency, tokenPriceLatest, isReversed]);

  const swapChart = () => setIsReversed((prev) => !prev);

  const currentCurrency = isReversed ? trade.outputCurrency : trade.inputCurrency;

  const currentTrade = useMemo(() => {
    if (isReversed) {
      return {
        ...trade,
        inputCurrency: trade.outputCurrency,
        outputCurrency: trade.inputCurrency
      };
    }
    return trade;
  }, [trade, isReversed]);

  if (!currentCurrency) return null;

  return (
    <ChartContainer>
      <Title>
        <Token>
          <CryptoIcon src={currentCurrency?.icon} />
          <Price>
            <PriceInfo>${parseFloat(selectedToken?.price).toFixed(2) || '-'}</PriceInfo>
            <ChangePercentage isPositive={selectedToken?.change_percent >= 0}>
              <IconArrowUp clasName={selectedToken?.change_percent >= 0 ? 'up' : 'downs'} />
              <span>{parseFloat(selectedToken?.change_percent).toFixed(2) || '-'}%</span>
              </ChangePercentage>
          </Price>
          <IconSwap className='swap' onClick={swapChart} />
        </Token>
        <TabContainer>
          {periods.map((period) => (
            <Tab key={period} active={activePeriod === period} onClick={() => setActivePeriod(period)}>
              1{periodsMap[period]}
            </Tab>
          ))}
          <StyledIconMore onClick={() => setIsTokenDetailPopupVisible(true)}>
            <IconMore />
          </StyledIconMore>
        </TabContainer>
      </Title>
      {loading ? (
        <StyledFlex style={{ height: '150px' }} justifyContent="center" alignItems="center">
          <Loading />
        </StyledFlex>
      ) : (
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={chartData}>
            <XAxis dataKey="timestamp" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#53577B' }}  />
            <Line type="monotone" dot={false} dataKey="price" stroke="#79FFB7" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
      <TokenDetailPopup trade={currentTrade} visible={isTokenDetailPopupVisible} close={() => setIsTokenDetailPopupVisible(false)} />
    </ChartContainer>
  );
};

export default KLineChart;
