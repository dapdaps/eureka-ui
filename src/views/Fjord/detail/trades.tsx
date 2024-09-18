import { format } from 'date-fns';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import { StyledFlex, StyledLoadingWrapper, StyledSvg } from '@/styled/styles';
import { ellipsAccount } from '@/utils/account';
import { formatValueDecimal } from '@/utils/formate';

import Tabs from '../components/tabs';
import useTrades from '../hooks/useTrades';
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
    text-transform: capitalize;
    color: #ff3aa5;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .buy {
    text-transform: capitalize;
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
type PagerType = {
  page: number;
  page_size: number;
};
type currentTabType = 'TradeHistory' | 'YourTrades';

export default function Comp({ pool }: any) {
  const { account, provider } = useAccount();
  const { loading, trades, historyTotal, yourTotal, queryTrades, queryYourTotal } = useTrades();
  const [pager, setPager] = useState<PagerType>({
    page: 1,
    page_size: 10
  });
  const [currentTab, setCurrentTab] = useState<currentTabType>('TradeHistory');
  const [tabData, setTabData] = useState([
    {
      name: 'Trade History',
      key: 'TradeHistory'
    },
    {
      name: 'Your Trades',
      key: 'YourTrades'
    }
  ]);
  const maxPage = useMemo(() => {
    const total = currentTab === 'TradeHistory' ? historyTotal : yourTotal;
    return Math.ceil(total / pager.page_size);
  }, [currentTab, historyTotal, yourTotal]);

  const handleQueryYourTotal = function () {
    queryYourTotal({
      ...pager,
      account,
      pool: pool?.pool
    });
  };
  const handleQueryTrades = function (_pager: PagerType, _currentTab: currentTabType) {
    queryTrades({
      ..._pager,
      ...(_currentTab === 'YourTrades' ? { account } : {}),
      pool: pool?.pool
    });
  };

  const onTabsChange = (key: currentTabType) => {
    const _pager: PagerType = {
      ...pager,
      page: 1
    };
    setPager(_pager);
    setCurrentTab(key);
    handleQueryTrades(_pager, key);
  };

  const handleClickPager = function (type: 'prev' | 'next') {
    let _page = pager.page;
    if (type === 'prev') {
      _page -= 1;
    } else {
      _page += 1;
    }
    if ((type === 'prev' && _page < 1) || (type === 'next' && _page > maxPage)) {
      return;
    }
    const _pager: PagerType = {
      ...pager,
      page: _page
    };
    setPager(_pager);
    handleQueryTrades(_pager, currentTab);
  };
  useEffect(() => {
    setTabData((prev) => {
      const curr = _.cloneDeep(prev);
      curr[1].name = 'Your Trades (' + yourTotal + ')';
      return curr;
    });
  }, [yourTotal]);

  useEffect(() => {
    if (account && pool) {
      handleQueryTrades(pager, currentTab);
      handleQueryYourTotal();
    }
  }, [account, pool]);

  return (
    <div>
      <Tabs
        tabData={tabData}
        loading={loading}
        current={currentTab}
        onTabsChange={onTabsChange}
        style={{ marginTop: 4 }}
      ></Tabs>
      <Th>
        <div>Time</div>
        <div>Address</div>
        <div>Price</div>
        <div>Amount</div>
        <div>Type</div>
      </Th>
      {loading ? (
        <StyledLoadingWrapper $h="100px">
          <Loading size={60} />
        </StyledLoadingWrapper>
      ) : (
        <Tbody>
          {trades?.map((trade, index) => {
            return (
              <Tr key={index}>
                <div>
                  {format(new Date(trade.timestamp * 1000), 'dd/MM/yyyy')}
                  <br /> {format(new Date(trade.timestamp * 1000), 'HH:mm')} GMT+8
                </div>
                <div>{ellipsAccount(trade.account_id)}</div>
                <div>{formatValueDecimal(trade?.extra_data?.shareTokenPrice ?? 0, '$', 4)}</div>
                <div className="amount">
                  <img src={trade?.extra_data?.token0?.icon} className="icon" alt="" />
                  {formatValueDecimal(trade?.extra_data?.token0?.amount ?? 0, '', 4)} <Arrow />
                  <img src={trade?.extra_data?.token1?.icon} className="icon" alt="" />
                  {formatValueDecimal(trade?.extra_data?.token1?.amount ?? 0, '', 4)}
                </div>
                <div className={trade?.extra_data?.trade_type}>{trade?.extra_data?.trade_type}</div>
              </Tr>
            );
          })}
        </Tbody>
      )}

      <Foot>
        <PageNumber>Page 1 of {maxPage}</PageNumber>
        <StyledFlex gap="12px" style={{ marginLeft: 17 }}>
          <StyledSvg onClick={() => handleClickPager('prev')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="28" viewBox="0 0 50 28" fill="none">
              <rect
                x="1"
                y="1"
                width="47.6667"
                height="26"
                rx="13"
                fill={pager.page <= 1 ? 'transparent' : '#373A53'}
                fill-opacity={pager.page === 1 ? 1 : 0.5}
                stroke="#373A53"
              />
              <path d="M28 9L23 14L28 19" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
            </svg>
          </StyledSvg>
          <StyledSvg onClick={() => handleClickPager('next')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="28" viewBox="0 0 50 28" fill="none">
              <rect
                x="1"
                y="1"
                width="47.6667"
                height="26"
                rx="13"
                fill={pager.page >= maxPage ? 'transparent' : '#373A53'}
                fill-opacity={pager.page === maxPage ? 1 : 0.5}
                stroke="#373A53"
              />
              <path d="M22 9L27 14L22 19" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
            </svg>
          </StyledSvg>
        </StyledFlex>
      </Foot>
    </div>
  );
}
