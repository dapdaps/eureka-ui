import { useState } from 'react';
import styled from 'styled-components';

import Tabs from '../components/tabs';

const Th = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 1fr;

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
const Tbody = styled.div`
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #171822;
  overflow: hidden;
`;
const Tr = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 1fr;

  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &:nth-child(odd) {
    background: #171822;
  }
  &:nth-child(even) {
    background: #1e202c;
  }
  div {
    height: 77px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sell {
    color: #ff3aa5;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .buy {
    color: #47c33c;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .amount {
    gap: 5px;
  }
  .icon {
    width: 20px;
    height: 20px;
    border: 50%;
  }
`;
const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0;
`;
const PageNumber = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Arrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
    <path
      d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464467C9.97631 0.269205 9.65973 0.269205 9.46447 0.464467C9.2692 0.659729 9.2692 0.976312 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM-4.37114e-08 4.5L13 4.5L13 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
      fill="#979ABE"
    />
  </svg>
);

export default function Comp() {
  const [currentTab, setCurrentTab] = useState('TradeHistory');
  const tabData = [
    {
      name: 'Trade History',
      key: 'TradeHistory',
    },
    {
      name: 'Your Trades (2)',
      key: 'YourTrades',
    },
  ];

  const onTabsChange = (key: string) => {
    setCurrentTab(key);
  };
  return (
    <div>
      <Tabs tabData={tabData} current={currentTab} onTabsChange={onTabsChange} style={{ marginTop: 4 }}></Tabs>
      <Th>
        <div>Time</div>
        <div>Address</div>
        <div>Price</div>
        <div>Amount</div>
        <div>Type</div>
      </Th>
      <Tbody>
        <Tr>
          <div>
            2/25/2024
            <br /> 17:58 GMT+8
          </div>
          <div>0xC297...3316</div>
          <div>$0.02578</div>
          <div className="amount">
            <img
              src="https://assets.coingecko.com/coins/images/31002/small/uusdt_D_3x.png?1689648389"
              className="icon"
              alt=""
            />
            123.67 <Arrow />
            <img
              src="https://assets.coingecko.com/coins/images/31156/small/Circle_logo_black_%281%29.png?1691040942"
              className="icon"
              alt=""
            />
            0.015
          </div>
          <div className="sell">Sell</div>
        </Tr>
        <Tr>
          <div>
            2/25/2024
            <br /> 17:58 GMT+8
          </div>
          <div>0xC297...3316</div>
          <div>$0.02578</div>
          <div className="amount">
            <img
              src="https://assets.coingecko.com/coins/images/31002/small/uusdt_D_3x.png?1689648389"
              className="icon"
              alt=""
            />
            123.67 <Arrow />
            <img
              src="https://assets.coingecko.com/coins/images/31156/small/Circle_logo_black_%281%29.png?1691040942"
              className="icon"
              alt=""
            />
            0.015
          </div>
          <div className="buy">Buy</div>
        </Tr>
        <Tr>
          <div>
            2/25/2024
            <br /> 17:58 GMT+8
          </div>
          <div>0xC297...3316</div>
          <div>$0.02578</div>
          <div className="amount">
            <img
              src="https://assets.coingecko.com/coins/images/31002/small/uusdt_D_3x.png?1689648389"
              className="icon"
              alt=""
            />
            123.67 <Arrow />
            <img
              src="https://assets.coingecko.com/coins/images/31156/small/Circle_logo_black_%281%29.png?1691040942"
              className="icon"
              alt=""
            />
            0.015
          </div>
          <div className="buy">Buy</div>
        </Tr>
      </Tbody>
      <Foot>
        <PageNumber>Page 1 of 1200</PageNumber>
      </Foot>
    </div>
  );
}
