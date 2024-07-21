import Big from 'big.js';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';

import { chains } from '@/config/bridge';
import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useLrtDataStore } from '@/stores/lrts';
import { usePriceStore } from '@/stores/price';
import { formatThousandsSeparator } from '@/utils/format-number';
import { unifyNumber } from '@/utils/format-number';

import { CustomTable, History, PolygonBtn, Tabs, UnstakeTable } from './components';
import AddTokenModal from './components/modal/add-token';
import StakeModal from './components/modal/stake';
import SwapModal from './components/modal/swap';
import { ActionType } from './components/tab-card';
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
  const { completed } = useLrtsList();
  const { chainId, account } = useAccount();

  const [swapToken, setSwapToken] = useState({});
  const [addToken, setAddToken] = useState({});

  const prices = usePriceStore((store) => store.price);
  const lrtsData = useLrtDataStore((store: any) => store.data);

  const [lstValue, setLstValue] = useState('0');
  const [lrtValue, setLrtValue] = useState('0');
  const [userBalance, setUserBalance] = useState('0');

  const [stakedEthPercent, setStakedEthPercent] = useState('0');
  const [restakedEthPercent, setRestakedEthPercent] = useState('0');

  const { check } = useAuthCheck({ isNeedAk: false });

  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showAddTokenModal, setShowAddTokenModal] = useState(false);
  const [balanceUpdater, setBalanceUpdater] = useState(0);
  const { loading: balanceLoading, balances } = useAllTokensBalance(balanceUpdater);

  const [lstIndex, setLstIndex] = useState(0);
  const [curLrt, setCurLrt] = useState<any>(null);
  const [actionType, setActionType] = useState<ActionType>();
  const [isShowStakeModal, setIsShowStakeModal] = useState(false);

  const lstAssets = lrtsData
    .filter((item: any) => {
      return balances[item.token.address] > 0;
    })
    .map((item: any, index: number) => ({
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
    .filter((item: any) => {
      return balances[item.token.address] > 0;
    })
    .map((item: any, index: number) => ({
      ...item.token,
      assets: item.token?.symbol,
      logo: item.dapp.logo,
      tvl: item.tvl,
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
    if (balanceLoading || !Array.isArray(lstAssets) || !Array.isArray(lrtAssets) || Object.keys(balances).length === 0)
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
    const _userEthBalance = Big(balances['native'] || 0)
      .times(prices['ETH'] || 0)
      .toFixed();

    setLstValue(_totalLst);
    setLrtValue(_totalLrt);
    setUserBalance(_userEthBalance);
  }, [lstAssets, lrtAssets, balances, balanceLoading]);

  const handleClickLst = (activeIndex: number) => {
    setCurLrt(null);
    setActionType(ActionType.STAKE);
    setLstIndex(activeIndex);
    setIsShowStakeModal(true);
  };
  const handleClickLrt = (lrt: any) => {
    setActionType(ActionType.UNSTAKE);
    setCurLrt(lrt);
    setIsShowStakeModal(true);
  };

  const updateBalance = () => {
    setBalanceUpdater((n) => n + 1);
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
            emptyTips="No LST assets found in your wallet..."
            columns={[
              {
                title: 'Assets',
                dataIndex: 'assets',
                key: 1,
                width: '10%',
                render: (token: any) => {
                  return (
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}
                      onClick={() => handleShowAddToken(token)}
                    >
                      <TokenImg src={token.icon} width={30} height={30} alt="token" />
                      {token.symbol}
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
                render: (token: any) => {
                  return (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <PolygonBtn size="small" onClick={() => handleClickLst(token.key)}>
                        STAKE / UNSTAKE{' '}
                      </PolygonBtn>
                      <PolygonBtn size="small" onClick={() => handleShowModal(token)}>
                        Swap
                      </PolygonBtn>
                      <PolygonBtn size="small" onClick={() => handleBridge(token.symbol)}>
                        Bridge
                      </PolygonBtn>
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
            emptyTips="No LRT assets found in your wallet..."
            columns={[
              {
                title: 'Assets',
                dataIndex: 'assets',
                key: 1,
                width: '10%',
                render: (token: any) => {
                  return (
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}
                      onClick={() => handleShowAddToken(token)}
                    >
                      <TokenImg src={token?.icon} alt="token" width={30} height={30} />
                      {token?.symbol}
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
                  return <TokenImg src={chains[_?.chainId]?.icon} width={30} height={30} alt="chainId" />;
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
                  return Number(prices[_?.symbol] || 0).toFixed(2);
                },
              },
              {
                title: '7d APR',
                dataIndex: 'apr',
                key: 5,
                width: '10%',
                render: (_: any) => {
                  return `${Number(_?.apr).toFixed(2)}%`;
                },
              },
              {
                title: 'Action',
                dataIndex: 'Action',
                key: 6,
                width: '50%',
                render: (token: any) => {
                  const { apr, logo, tvl, address, chainId, decimals, desc, icon, name, symbol } = token;
                  const _gem = {
                    apr,
                    logo,
                    tvl,
                    token: {
                      address,
                      chainId,
                      decimals,
                      desc,
                      icon,
                      name,
                      symbol,
                    },
                  };

                  return (
                    <div style={{ display: 'flex', gap: 10 }}>
                      <PolygonBtn size="small" onClick={() => handleClickLrt(_gem)}>
                        RESTAKE / UNSTAKE{' '}
                      </PolygonBtn>
                      <PolygonBtn size="small" onClick={() => handleShowModal(token)}>
                        Swap
                      </PolygonBtn>
                      <PolygonBtn size="small" onClick={() => handleBridge(token?.symbol)}>
                        Bridge
                      </PolygonBtn>
                    </div>
                  );
                },
              },
            ]}
          />
        </AssetTab>
      ),
    },
    { label: TabType.Unstake, key: 'item-2', children: <UnstakeTable /> },
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

  const handleShowModal = (token: any) => {
    setSwapToken(token);
    setShowSwapModal(true);
  };
  const handleShowAddToken = (token: any) => {
    setAddToken(token);
    setShowAddTokenModal(true);
  };

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
            <span className="key">Wallet Balance (ETH)</span>
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
      <StakeModal
        box={lrtsData[lstIndex].lstIcon}
        gem={curLrt}
        dapp={{
          name: lrtsData[lstIndex].dapp.name,
          logo: lrtsData[lstIndex].dapp.logo,
          minApr: lrtsData[lstIndex]?.minApr,
          maxApr: lrtsData[lstIndex]?.maxApr,
          apr: lrtsData[lstIndex]?.apr,
        }}
        token0={actionType === ActionType.STAKE ? ethereum['eth'] : lrtsData[lstIndex].token}
        token1={actionType === ActionType.STAKE ? lrtsData[lstIndex].token : curLrt?.token}
        chainId={chainId as number}
        show={isShowStakeModal}
        setShow={setIsShowStakeModal}
        onSuccess={updateBalance}
      />
      <AddTokenModal show={showAddTokenModal} setShow={setShowAddTokenModal} token={addToken} />
      <SwapModal show={showSwapModal} setShow={setShowSwapModal} token={swapToken} />
    </Container>
  );
};

export default memo(Portfolio);
