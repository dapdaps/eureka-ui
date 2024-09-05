import { useSetChain } from '@web3-onboard/react';
import { useDebounceFn } from 'ahooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  execute,
  getAllToken,
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
import chainCofig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useConnectWallet from '@/hooks/useConnectWallet';
import { useDefaultLayout } from '@/hooks/useLayout';
import useScrollMore from '@/hooks/useScrollMore';
import { usePriceStore } from '@/stores/price';
import type { Chain } from '@/types';
import { get } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';
import DappDetailScroll from '@/views/Dapp/components/DappDetail/Scroll';
import DappFallback from '@/views/Dapp/components/Fallback';

const DappDetail = lazy(() => import('@/views/Dapp/components/DappDetail'));

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  position: relative;
  padding-top: 42px;
`;
const BreadCrumbs = styled.div`
  color: #979abe;
  font-size: 14px;
  margin-bottom: 32px;
  a {
    text-decoration: none;
    color: #979abe;
    display: inline-block;
    cursor: pointer;
  }
  svg {
    margin: 0 8px;
  }
  span {
    color: #ffffff;
  }
`;

const chainListSort = [
  1, 42161, 10, 8453, 81457, 5000, 324, 59144, 169, 34443, 1088, 534352, 1101, 137, 56, 43114, 100
];

const chainList = Object.values(chainCofig);

chainList.sort((a, b) => chainListSort.indexOf(a.chainId) - chainListSort.indexOf(b.chainId));

const Bridge: NextPageWithLayout = () => {
  const router = useRouter();
  const tool = router.query.tool as string;
  const { account, chainId } = useAccount();

  const prices = usePriceStore((store) => store.price);
  const { addAction } = useAddAction('dapp');
  const { viewHeight } = useScrollMore();

  const [{ settingChain, connectedChain }, setChain] = useSetChain();
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [template, setTemplate] = useState('');
  const [dappDetail, setDappDetail] = useState<any>({});
  const [updateDetail, setUpdateDetail] = useState<boolean>(false);

  // const { icon, name, color } = getBridgeMsg(tool)

  useEffect(() => {
    if (tool) {
      const { icon, name, color } = getBridgeMsg(tool);
      setIcon(icon);
      setName(name);
      setColor(color);
      get(`/api/dapp?route=bridge-x/${tool}`).then((res) => {
        if (res.code === 0) {
          console.log(res);
          setTemplate(res.data.name);
          setName(res.data.name);
          setIcon(res.data.logo);
          // setChainConfig(res.data)
          // 🔔 for use in the new dApp detail page
          setDappDetail(res.data || {});
        }
      });
    }
  }, [tool]);

  return (
    <Container>
      <DappBack defaultPath="/alldapps" />

      <BridgeX
        style={{ minHeight: viewHeight }}
        addAction={addAction}
        prices={prices}
        account={account}
        icon={icon}
        name={name}
        dapp={dappDetail}
        color={color}
        tool={tool}
        template={template}
        chainList={chainList}
        getQuote={getQuote}
        getAllToken={getAllToken}
        getBridgeToken={getBridgeTokens}
        getChainScan={getChainScan}
        getStatus={getStatus}
        execute={execute}
        currentChainId={connectedChain?.id ? parseInt(connectedChain.id, 16) : 1}
        toChainId={router.query.toChainId as string}
        fromChainId={router.query.fromChainId as string}
        setChain={setChain}
        onSuccess={() => {
          setUpdateDetail(true);
          const timer = setTimeout(() => {
            clearTimeout(timer);
            setUpdateDetail(false);
          }, 0);
        }}
      />
      {updateDetail ? null : (
        <>
          <DappDetailScroll />
          <Suspense fallback={<DappFallback />}>
            <DappDetail {...dappDetail} />
          </Suspense>
        </>
      )}
    </Container>
  );
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
