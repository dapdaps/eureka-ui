import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import IconRefresh from '@public/images/refresh.svg'
import IconMore from '@public/images/tokens/more.svg'
import TokenDetailPopup from './TokenDetailPopup';

const ChartContainer = styled.div`
  color: white;
  margin-top: 20px;
  width: 100%;
`;

const Token = styled.div`
  display: flex;
  gap: 6px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CryptoIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PriceInfo = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
`;

const ChangePercentage = styled.span`
  color: #79FFB7;
  font-size: 14px;
  font-family: Gantari;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;

`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Tab = styled.button<{ active: boolean }>`
  color: ${props => props.active ? '#979ABE' : '#53577B'};
  border-bottom: ${props => props.active ? '1px solid #ebf479' : 'none'};
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
  color: #979ABE;
  &:hover {
    color: #fff;
  }
`

const periods = ['1D', '1W', '1M', '1Y'];

// Mock data for the chart
const generateMockData = (numPoints: number) => {
  const data = [];
  let value = 3000;
  for (let i = 0; i < numPoints; i++) {
    value += Math.random() * 100 - 50;
    data.push({ time: i, price: value });
  }
  return data;
};

const KLineChart: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState('1D');
  const [isTokenDetailPopupVisible, setIsTokenDetailPopupVisible] = useState(false);
  const chartData = generateMockData(100);

  return (
    <ChartContainer>
      <Title>
        <Token>
          <CryptoIcon />
          <Price>
            <PriceInfo>$3,477</PriceInfo>
            <ChangePercentage>↑1.23%</ChangePercentage>
          </Price>
          <IconRefresh />
        </Token>
        <TabContainer>
          {periods.map(period => (
            <Tab 
              key={period} 
              active={activePeriod === period}
              onClick={() => setActivePeriod(period)}
            >
              {period}
            </Tab>
          ))}
          <StyledIconMore onClick={() => setIsTokenDetailPopupVisible(true)}>
              <IconMore />
          </StyledIconMore>
      </TabContainer>
      </Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" hide />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'transparent', border: 'none',  }}
            itemStyle={{ color: 'white' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#79FFB7" 
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <TokenDetailPopup visible={isTokenDetailPopupVisible} close={() => setIsTokenDetailPopupVisible(false)} />
    </ChartContainer>
  );
};

export default KLineChart;