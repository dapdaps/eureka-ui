import { useSetChain } from '@web3-onboard/react';
import { useDebounceFn } from 'ahooks';
import createKeccakHash from 'keccak';
import { useRouter } from 'next/router';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  execute,
  getAllToken,
  getAllTokenPairs,
  getBridgeMsg,
  getBridgeTokens,
  getChainScan,
  getIcon,
  getQuote,
  getStatus,
  init
} from 'super-bridge-sdk';

import BridgeX from '@/components/BridgeX/Index';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import DappBack from '@/components/PageBack';
import popupsData from '@/config/all-in-one/chains';
import allChain from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import { useDefaultLayout } from '@/hooks/useLayout';
import useScrollMore from '@/hooks/useScrollMore';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { usePriceStore } from '@/stores/price';
import { get } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';
import DappDetailScroll from '@/views/Dapp/components/DappDetail/Scroll';
import DappFallback from '@/views/Dapp/components/Fallback';

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  position: relative;
  padding-top: 42px;
  .page-back {
    margin-bottom: 16px;
  }
  .top-login-select {
    margin-right: 16px;
    border-radius: 12px;
    padding: 4px;
    display: flex;
    z-index: 2;
    width: fit-content;
    cursor: pointer;
    position: relative;

    .select-item-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .selsect-item-img {
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 8px;
      margin-right: 8px;
    }
    .selsect-item-text {
      padding-top: 16px;
      margin-right: 10px;
      p {
        font-size: 16px;
        font-weight: 700;
        color: #ffffff;
      }
    }
    .selsect-item-icon {
      background: linear-gradient(0deg, rgba(48, 49, 66, 0.5), rgba(48, 49, 66, 0.5));
      border: 1px solid rgba(55, 58, 83, 1);
      border-radius: 6px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 16px;
    }
    .login-select-popup {
      position: absolute;
      top: 60px;
      left: 0;
      background: #303142;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      padding: 12px;
      width: 249px;
      .select-popups-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        .flex-grow {
          flex-grow: 1;
        }
        .popup-item-img {
          width: 32px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border-radius: 8px;
          margin-right: 8px;
        }
        .popups-item-text {
          font-size: 14px;
          font-weight: 400;
          color: #fff;
        }
      }
      .select-popups-item:hover {
        background: #2a2a3a;
      }
      .selected {
        background: #2a2a3a;
      }
    }
  }
  .content-page {
    z-index: 1;
    width: 100%;
    position: relative;
    padding-top: 20px;
    //min-height: 575px;
    /* position: absolute; */
  }
  .select-bg-icon {
    z-index: 0;
    margin: 0 auto;
    //position: absolute;
    //top: 60px;
    //left: 50%;
    //transform: translate(-50%);
    font-size: 20px;
    font-weight: 700;
    .select-bg-content {
      //padding-top: 40px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      img {
        width: 24px;
        margin-right: 10px;
      }
    }
  }
`;

function toChecksumAddress(address: string): string {
  address = address.toLowerCase().replace('0x', '');
  const hash = createKeccakHash('keccak256').update(address).digest('hex');
  let ret = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}

const chainIds: any = {
  blast: {
    chainId: 81457,
    color: 'rgb(253, 254, 3)',
    mainToken: [],
    l2Token: []
  },
  mode: {
    chainId: 34443,
    color: 'rgb(223, 254, 0)',
    mainToken: [],
    l2Token: []
  },
  scroll: {
    chainId: 534352,
    color: '#ff684b',
    mainToken: [],
    l2Token: []
  }
};

const AllInOne: NextPageWithLayout = () => {
  const router = useRouter();
  const { viewHeight } = useScrollMore();

  const chain = router.query.chain as string;
  const [currentChain, setCurrentChain] = useState<any>();
  const [chainConfig, setChainConfig] = useState<any>(null);
  const { account, chainId } = useAccount();
  const [checkSumAccount, setCheckSumAccount] = useState<string>();
  const [{ settingChain, connectedChain }, setChain] = useSetChain();
  const prices = usePriceStore((store) => store.price);
  const [tab, setTab] = useState('');
  const cachedTabsStore: any = useAllInOneTabCachedStore();
  const { addAction } = useAddAction('dapp');
  const [tokenPairs, setTokenPairs] = useState([]);
  const DappDetail = lazy(() => import('@/views/Dapp/components/DappDetail'));

  const [updateDetail, setUpdateDetail] = useState<boolean>(false);

  const { run } = useDebounceFn(
    () => {
      const _currentChain = popupsData[chain] || popupsData['arbitrum'];
      setCurrentChain(_currentChain);
    },
    { wait: 500 }
  );

  useEffect(() => {
    if (currentChain && !chainConfig) {
      get(`/api/dapp?route=bridge-chain/${currentChain.path}`).then((res) => {
        if (res.code === 0) {
          setChainConfig(res.data);
        }
      });
    }
  }, [currentChain, chainConfig]);

  useEffect(() => {
    run();
  }, [chain]);

  useEffect(() => {
    if (account) {
      const checkSumAccount = toChecksumAddress(account as string);
      setCheckSumAccount(checkSumAccount);
    }
  }, [account]);

  const filterChainList = useMemo(() => {
    if (chain) {
      return [allChain[1], allChain[chainIds[chain].chainId]];
    }
  }, [chain]);

  const color = useMemo(() => {
    if (chain) {
      return chainIds[chain].color;
    }
  }, [chain]);

  useEffect(() => {
    if (chain) {
      getAllTokenPairs(chain).then((val) => setTokenPairs(val));
    }
  }, [chain]);

  return currentChain ? (
    <Container key={chain}>
      <div className="page-back">
        <DappBack defaultPath="/alldapps" />
      </div>

      <BridgeX
        style={{ minHeight: viewHeight }}
        addAction={addAction}
        prices={prices}
        account={account}
        icon={chainConfig?.logo}
        name={chainConfig?.name}
        dapp={chainConfig}
        color={color}
        disabledChain={true}
        disabledToToken={true}
        tool={chain}
        template={chainConfig?.name}
        chainList={filterChainList}
        getQuote={getQuote}
        getBridgeToken={getBridgeTokens}
        getChainScan={getChainScan}
        getStatus={getStatus}
        execute={execute}
        currentChainId={connectedChain?.id ? parseInt(connectedChain.id, 16) : 1}
        toChainId={router.query.toChainId as string}
        fromChainId={router.query.fromChainId as string}
        setChain={setChain}
        tokenPairs={tokenPairs}
        onSuccess={() => {
          // setUpdateDetail(true);
          // const timer = setTimeout(() => {
          //   clearTimeout(timer);
          //   setUpdateDetail(false);
          // }, 0);
        }}
      />
      {chainConfig ? (
        <>
          <DappDetailScroll />
          <Suspense fallback={<DappFallback />}>
            <DappDetail {...chainConfig} />
          </Suspense>
        </>
      ) : null}
    </Container>
  ) : (
    <div />
  );
};

AllInOne.getLayout = useDefaultLayout;

export default AllInOne;
