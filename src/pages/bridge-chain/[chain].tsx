import { useDebounceFn } from 'ahooks';
import createKeccakHash from 'keccak';
import { useRouter } from 'next/router';
import { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import DappBack from '@/components/PageBack';
import popupsData from '@/config/all-in-one/chains';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import { useDefaultLayout } from '@/hooks/useLayout';
import useScrollMore from '@/hooks/useScrollMore';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { usePriceStore } from '@/stores/price';
import { get } from '@/utils/http';
import { multicall } from '@/utils/multicall';
import type { NextPageWithLayout } from '@/utils/types';
import DappDetailScroll from '@/views/Dapp/components/DappDetail/Scroll';
import DappFallback from '@/views/Dapp/components/Fallback';

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  position: relative;
  padding-top: 50px;
  .page-back {
    margin-bottom: 32px;
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
    padding-top: 50px;
    min-height: 575px;
    /* position: absolute; */
  }
  .select-bg-icon {
    z-index: 0;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%);
    font-size: 20px;
    font-weight: 700;
    .select-bg-content {
      padding-top: 40px;
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

const AllInOne: NextPageWithLayout = () => {
  const router = useRouter();
  const { viewHeight } = useScrollMore({ gap: 96 });

  const chain = router.query.chain as string;
  const [currentChain, setCurrentChain] = useState<any>();
  const [chainConfig, setChainConfig] = useState<any>(null);
  const { account, chainId } = useAccount();
  const [checkSumAccount, setCheckSumAccount] = useState<string>();
  const prices = usePriceStore((store) => store.price);
  const [tab, setTab] = useState('');
  const cachedTabsStore: any = useAllInOneTabCachedStore();
  const { addAction } = useAddAction('dapp');
  const DappDetail = lazy(() => import('@/views/Dapp/components/DappDetail'));

  const { run } = useDebounceFn(
    () => {
      const _currentChain = popupsData[chain] || popupsData['arbitrum'];
      setCurrentChain(_currentChain);
      if (chain) {
      }
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

  return currentChain ? (
    <Container key={chain}>
      <div className="page-back">
        <DappBack defaultPath="/alldapps" />
      </div>
      <div style={{ minHeight: viewHeight }}>
        <div className="select-bg-icon">
          <div className="select-bg-content">
            <img src={chainConfig?.logo} alt="" />
            <span>{chainConfig?.name}</span>
          </div>
        </div>
        <div className="content-page">
          <ComponentWrapperPage
            // src="bluebiu.near/widget/Mode.BridgeAuthority.Index"
            src={chainConfig?.dapp_network[0].dapp_src}
            componentProps={{
              addAction,
              multicall,
              chainId: currentChain.chainId,
              currentChainId: chainId,
              menuConfig: currentChain.menuConfig,
              prices,
              tab,
              account: checkSumAccount,
              onReset: () => {},
              onChangeTab: (tab: string) => {
                cachedTabsStore.setCachedTab(tab, currentChain.chainId);
                setTab(tab);
              }
            }}
          />
        </div>
      </div>
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
