import { useRouter } from 'next/router';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';

import { useLrtDataStore } from '@/stores/lrts';

import { CustomTable, PolygonBtn, Tabs } from './components';
import useAllTokensBalance from './hooks/useAllTokensBalance';
import { Ad, Assets, AssetTab, Container } from './styles/portfolio.style';
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
  const lrtsData = useLrtDataStore((store: any) => store.data);
  console.log('lrtsData----', lrtsData);
  const lsts = lrtsData.map((item: any) => item.token);
  const lrtAssets = lrtsData
    .map((item: any) => item.lrtTokens)
    .flat()
    .map((item: any, index: number) => ({
      ...item.token,
      assets: item.token?.symbol,
      chian: item.token?.chianId,
      price: 0,
      arp: 0,
      key: index,
    }));

  const lstAssets = lsts.map((item: any, index: number) => ({
    ...item,
    assets: item.symbol,
    chian: item.chianId,
    price: 0,
    arp: 0,
    key: index,
  }));

  const router = useRouter();
  const handleBridge = (toToken: string) => {
    router.push(`/super-bridge?fromChainId=1&toChainId=1&fromToken=ETH&toToken=${toToken}`);
  };

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
              { title: 'Assets', dataIndex: 'assets', key: 1 },
              {
                title: 'Chain',
                dataIndex: 'chain',
                key: 2,
              },
              {
                title: 'Balance',
                dataIndex: 'balance',
                key: 3,
                render: (_: any) => {
                  return Number(_?.balance).toFixed(2);
                },
              },
              { title: 'Price', dataIndex: 'price', key: 4 },
              { title: '7d APR', dataIndex: 'apr', key: 5 },
              {
                title: 'Action',
                dataIndex: 'Action',
                key: 6,
                render: (_: any) => {
                  return (
                    <>
                      <PolygonBtn>STAKE / UNSTAKE </PolygonBtn>
                      {/* <PolygonBtn>Swap</PolygonBtn> */}
                      <PolygonBtn onClick={() => handleBridge(_.symbol)}>Bridge</PolygonBtn>
                    </>
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
              { title: 'Assets', dataIndex: 'assets', key: 1 },
              {
                title: 'Chain',
                dataIndex: 'chain',
                key: 2,
              },
              { title: 'Balance', dataIndex: 'balance', key: 3 },
              { title: 'Price', dataIndex: 'price', key: 4 },
              { title: '7d APR', dataIndex: 'apr', key: 5 },
              {
                title: 'Action',
                dataIndex: 'Action',
                key: 6,
                render: (_: any) => {
                  return (
                    <>
                      <PolygonBtn>RESTAKE / UNSTAKE </PolygonBtn>
                      {/* <PolygonBtn>Swap</PolygonBtn> */}
                    </>
                  );
                },
              },
            ]}
          />
        </AssetTab>
      ),
    },
    { label: TabType.Unstake, key: 'item-2', children: 2 },
    {
      label: TabType.History,
      key: 'item-3',
      children: (
        <CustomTable
          dataSource={[
            {
              action: 'Stake',
              sent: '0.1 stETH',
              receive: '0.1 ETH',
              hash: 'SDLGSLDBGLB',
              date: 'Jul 4, 2024 5:39 PM',
              key: 1,
            },
            {
              action: 'UnStake',
              sent: '0.1 stETH',
              receive: '0.1 ETH',
              hash: 'SDLGSLDBGLB',
              date: 'Jul 4, 2024 5:39 PM',
              key: 2,
            },
          ]}
          columns={[
            { title: 'Action', dataIndex: 'action', key: 1 },
            { title: 'Sent', dataIndex: 'sent', key: 2 },
            { title: 'Receive', dataIndex: 'receive', key: 3 },
            { title: 'Hash', dataIndex: 'hash', key: 4 },
            { title: 'Date', dataIndex: 'date', key: 5 },
          ]}
        />
      ),
    },
  ];

  return (
    <Container>
      <Assets>
        <div className="head">
          <div className="item">
            <span className="key">LST Value</span>
            <span className="value">$ 1,035.23</span>
          </div>
          <div className="item">
            <span className="key">LRT Value</span>
            <span className="value">$ 2,535.23</span>
          </div>
          <div className="item">
            <span className="key">Wallet Balance</span>
            <span className="value">$ 5,295.67</span>
          </div>
        </div>
        <div className="body">
          <div className="top">
            <div className="item">
              <span className="key">Staked ETH</span>
              <span className="value">45%</span>
            </div>
            <div className="item">
              <span className="key">Non-staked ETH</span>
              <span className="value">55%</span>
            </div>
          </div>
          <div className="process">
            <div className="process-bar process-bar-stake"></div>
            <div className="process-bar process-bar-nostake"></div>
          </div>
          <div className="bottom">
            <div className="item">
              <span className="key">Restaked ETH</span>
              <span className="value">74%</span>
            </div>
            <div className="item">
              <span className="key">Non-restaked ETH</span>
              <span className="value">26%</span>
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
