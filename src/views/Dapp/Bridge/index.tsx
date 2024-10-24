import { useSetChain } from '@web3-onboard/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  execute,
  getAllToken,
  getBridgeMsg,
  getBridgeTokens,
  getChainScan,
  getQuote,
  getStatus
} from 'super-bridge-sdk';

import BridgeX from '@/components/BridgeX/Index';
import chainCofig from '@/config/chains';
import allChain from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useScrollMore from '@/hooks/useScrollMore';
import { usePriceStore } from '@/stores/price';

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  position: relative;
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
    padding-top: 60px;
    /* position: absolute; */
  }
  .select-bg-icon {
    z-index: 0;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%);
    .select-bg-content {
      padding-top: 40px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      font-size: 20px;
      img {
        width: 24px;
        margin-right: 10px;
      }
    }
  }
`;

const TOOL_MAP: any = {
  'xy-bridge': 'xy'
};

const chainIds: any = {
  ['blast']: {
    chainId: 81457,
    color: 'rgb(253, 254, 3)',
    mainToken: [],
    l2Token: []
  },
  ['scroll']: {
    chainId: 534352,
    color: '#ff684b',
    mainToken: [],
    l2Token: []
  }
};

const chainListSort = [
  1, 42161, 10, 8453, 81457, 5000, 324, 59144, 169, 34443, 1088, 534352, 1101, 137, 56, 43114, 100
];
const chainList = Object.values(chainCofig);
chainList.sort((a, b) => chainListSort.indexOf(a.chainId) - chainListSort.indexOf(b.chainId));

const Bridge = (props: any) => {
  const { dapp, localConfig } = props;

  const router = useRouter();
  const { viewHeight } = useScrollMore({ gap: 96 });
  const { addAction } = useAddAction('dapp');
  const { account } = useAccount();

  const prices = usePriceStore((store) => store.price);

  const [color, setColor] = useState('');
  const [{ connectedChain }, setChain] = useSetChain();
  const params = useSearchParams();
  const chainNameByRoute = params.get('chain') || '';

  useEffect(() => {
    if (TOOL_MAP[localConfig.name]) {
      const { color } = getBridgeMsg(TOOL_MAP[localConfig.name]);
      setColor(color);
    }
  }, []);

  const filterChainList = useMemo(() => {
    if (!!chainNameByRoute) {
      return [allChain[1], allChain[chainIds[chainNameByRoute].chainId]];
    }
  }, [chainNameByRoute]);

  return (
    <Container key={localConfig.name}>
      <BridgeX
        style={{ minHeight: viewHeight }}
        addAction={addAction}
        prices={prices}
        account={account}
        showHeader={false}
        icon={dapp?.logo}
        name={dapp?.name}
        disabledChain={!!chainNameByRoute}
        disabledToToken={!!chainNameByRoute}
        dapp={dapp}
        color={color}
        tool={TOOL_MAP[localConfig.name]}
        template={dapp?.name}
        chainList={chainNameByRoute ? filterChainList : chainList}
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
      />
    </Container>
  );
};

export default Bridge;
