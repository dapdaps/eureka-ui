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
  padding-top: 50px;
  .page-back {
    margin-bottom: 32px;
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
  const { viewHeight } = useScrollMore({ gap: 96 });

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
    if (currentChain) {
      get(`/api/dapp?route=bridge-chain/${currentChain.path}`).then((res) => {
        if (res.code === 0) {
          setChainConfig(res.data);
        }
      });
    }
  }, [currentChain, chainConfig, chain]);

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
