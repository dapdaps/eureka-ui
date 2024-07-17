import Big from 'big.js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';

import useTokenBalance from '@/components/Bridge/hooks/useTokenBalance';
import { chains } from '@/config/bridge';
import { useLrtDataStore } from '@/stores/lrts';
import { usePriceStore } from '@/stores/price';
import { formatThousandsSeparator } from '@/utils/format-number';
import { unifyNumber } from '@/utils/format-number';
import useTokens from '@/views/lrts/hooks/useTokens';

import { CustomTable, History, PolygonBtn, Tabs } from './components';
import useAllTokensBalance from './hooks/useAllTokensBalance';
import useLrtsList from './hooks/useLrtsList';
import { Ad, Assets, AssetTab, Container, TokenImg } from './styles/portfolio.style';
interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}
enum TabType {
  'Portfolio' = 'Portfolio',
  'Unstake' = 'Unstake',
  'History' = 'History',
}

const Portfolio: FC<IProps> = (props) => {
  const { loading, balances } = useAllTokensBalance();
  const { completed } = useLrtsList();

  const prices = usePriceStore((store) => store.price);
  const lrtsData = useLrtDataStore((store: any) => store.data);

  const [lstValue, setLstValue] = useState('0');
  const [lrtValue, setLrtValue] = useState('0');
  const [userBalance, setUserBalance] = useState('0');

  const [stakedEthPercent, setStakedEthPercent] = useState('0');
  const [restakedEthPercent, setRestakedEthPercent] = useState('0');

  const tokens = useTokens();
  const currentToken = tokens?.filter((token: any) => token.isNative)[0];

  const { balance: ethBalance, loading: ethBalLoading } = useTokenBalance({ tokensByChain: currentToken });

  const lstAssets = lrtsData.map((item: any, index: number) => ({
    ...item.token,
    assets: item.token.symbol,
    chian: item.token.chianId,
    price: prices[item.symbol] || 0,
    key: index,
    apr: item.apr,
  }));
  const lrtAssets = lrtsData
    .map((item: any) => item.lrtTokens)
    .flat()
    .map((item: any, index: number) => ({
      ...item.token,
      assets: item.token?.symbol,
      chian: item.token?.chianId,
      price: prices[item.symbol] || 0,
      apr: item.apr,
      key: index,
    }));

  const router = useRouter();
  const handleBridge = (toToken: string) => {
    router.push(`/super-bridge?fromChainId=1&toChainId=1&fromToken=ETH&toToken=${toToken}`);
  };

  useEffect(() => {
    if (
      loading ||
      ethBalLoading ||
      !Array.isArray(lstAssets) ||
      !Array.isArray(lrtAssets) ||
      Object.keys(balances).length === 0
    )
      return;
    const _totalLst = lstAssets.reduce((_total, _cur) => {
      return Big(_total)
        .plus(Big(balances[_cur.address] || 0).times(Big(prices[_cur.symbol] || 0)))
        .toFixed();
    }, 0);
    const _totalLrt = lrtAssets.reduce((_total, _cur) => {
      return Big(_total)
        .plus(Big(balances[_cur.address] || 0).times(Big(prices[_cur.symbol] || 0)))
        .toFixed();
    }, 0);
    const _userBalance = Big(_totalLst).plus(_totalLrt).plus(ethBalance).toFixed(2);

    setLstValue(_totalLst);
    setLrtValue(_totalLrt);
    setUserBalance(_userBalance);
  }, [lstAssets, lrtAssets, balances, ethBalLoading]);

  const items = [
    {
      label: TabType.Portfolio,
      key: 'item-1',
      children: (
        <AssetTab>
          <div className="title">LST Assets</div>
          <CustomTable
            dataSource={lstAssets}
            columns={[
              {
                title: 'Assets',
                dataIndex: 'assets',
                key: 1,
                width: '10%',
                render: (_: any) => {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <TokenImg src={_.icon} width={30} height={30} alt="token" />
                      {_.symbol}
                    </div>
                  );
                },
              },
              {
                title: 'Chain',
                dataIndex: 'chainId',
                key: 2,
                width: '10%',
                render: (_: any) => {
                  return <TokenImg src={chains[_.chainId].icon} width={30} height={30} alt="chainId" />;
                },
              },
              {
                title: 'Balance',
                dataIndex: 'balance',
                key: 3,
                width: '10%',
                render: (_: any) => {
                  return unifyNumber(balances[_?.address] || 0);
                },
              },
              {
                title: 'Price',
                dataIndex: 'price',
                key: 4,
                width: '10%',
                render: (_: any) => {
                  return Number(prices[_.symbol] || 0).toFixed(2);
                },
              },
              {
                title: '7d APR',
                dataIndex: 'apr',
                key: 5,
                width: '10%',
                render: (_: any) => {
                  return `${Number(_.apr).toFixed(2)}%`;
                },
              },
              {
                title: 'Action',
                dataIndex: 'Action',
                key: 6,
                width: '50%',
                render: (_: any) => {
                  return (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <PolygonBtn>STAKE / UNSTAKE </PolygonBtn>
                      <PolygonBtn>Swap</PolygonBtn>
                      <PolygonBtn onClick={() => handleBridge(_.symbol)}>Bridge</PolygonBtn>
                    </div>
                  );
                },
              },
            ]}
          />
          <div className="title" style={{ marginTop: 50 }}>
            LRT Assets
          </div>
          <CustomTable
            dataSource={lrtAssets}
            columns={[
              {
                title: 'Assets',
                dataIndex: 'assets',
                key: 1,
                width: '10%',
                render: (_: any) => {
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <TokenImg src={_.icon} alt="token" width={30} height={30} />
                      {_.symbol}
                    </div>
                  );
                },
              },
              {
                title: 'Chain',
                dataIndex: 'chainId',
                key: 2,
                width: '10%',
                render: (_: any) => {
                  return <TokenImg src={chains[_.chainId].icon} width={30} height={30} alt="chainId" />;
                },
              },
              {
                title: 'Balance',
                dataIndex: 'balance',
                key: 3,
                width: '10%',
                render: (_: any) => {
                  return unifyNumber(balances[_?.address] || 0);
                },
              },
              {
                title: 'Price',
                dataIndex: 'price',
                key: 4,
                width: '10%',
                render: (_: any) => {
                  return Number(prices[_.symbol] || 0).toFixed(2);
                },
              },
              {
                title: '7d APR',
                dataIndex: 'apr',
                key: 5,
                width: '10%',
                render: (_: any) => {
                  return `${Number(_.apr).toFixed(2)}%`;
                },
              },
              {
                title: 'Action',
                dataIndex: 'Action',
                key: 6,
                width: '50%',
                render: (_: any) => {
                  return (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <PolygonBtn>RESTAKE / UNSTAKE </PolygonBtn>
                      <PolygonBtn>Swap</PolygonBtn>
                      <PolygonBtn onClick={() => handleBridge(_.symbol)}>Bridge</PolygonBtn>
                    </div>
                  );
                },
              },
            ]}
          />
        </AssetTab>
      ),
    },
    { label: TabType.Unstake, key: 'item-2', children: <History /> },
    {
      label: TabType.History,
      key: 'item-3',
      children: <History />,
    },
  ];

  useEffect(() => {
    if (Number(userBalance) === 0) return;

    const _staked = Big(lstValue).plus(lrtValue);
    const _stakedETH = Big(lstValue).plus(lrtValue).div(userBalance).toFixed(2);
    const _restakedETH = _staked.eq(0) ? '0' : Big(lrtValue).div(_staked).toFixed(2);

    setStakedEthPercent(_stakedETH);
    setRestakedEthPercent(_restakedETH);
  }, [lstValue, lrtValue, userBalance]);

  return (
    <Container>
      <Assets>
        <div className="head">
          <div className="item">
            <span className="key">LST Value</span>
            <span className="value">$ {formatThousandsSeparator(Number(lstValue).toFixed(2))}</span>
          </div>
          <div className="item">
            <span className="key">LRT Value</span>
            <span className="value">$ {formatThousandsSeparator(Number(lrtValue).toFixed(2))}</span>
          </div>
          <div className="item">
            <span className="key">Wallet Balance</span>
            <span className="value">$ {formatThousandsSeparator(Number(userBalance).toFixed(2))}</span>
          </div>
        </div>
        <div className="body">
          <div className="top">
            <div className="item">
              <span className="key">Staked ETH</span>
              <span className="value">{Number(Number(stakedEthPercent) * 100).toFixed()}%</span>
            </div>
            <div className="item">
              <span className="key">Non-staked ETH</span>
              <span className="value">{Number((1 - Number(stakedEthPercent)) * 100).toFixed()}%</span>
            </div>
          </div>
          <div className="process">
            <div className="process-bar" style={{ width: `${Number(Number(stakedEthPercent) * 100).toFixed()}%` }}>
              <div
                className="process-bar-nostake"
                style={{ width: `${Number(Number(restakedEthPercent) * 100).toFixed()}%` }}
              ></div>
            </div>
          </div>
          <div className="bottom">
            <div className="item">
              <span className="key">Restaked ETH</span>
              <span className="value">{Number(Number(restakedEthPercent) * 100).toFixed()}%</span>
            </div>
            <div className="item">
              <span className="key">Non-restaked ETH</span>
              <span className="value">{Number((1 - Number(restakedEthPercent)) * 100).toFixed()}%</span>
            </div>
          </div>
        </div>
      </Assets>
      <Ad src="/images/lrts/ad.png" width={1200} height={103} alt="ad" />
      <Tabs items={items} />
    </Container>
  );
};

export default memo(Portfolio);
