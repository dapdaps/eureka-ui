import { useSetChain } from '@web3-onboard/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import BridgeAction from '@/views/SuperBridge/BridgeAction';
import Transaction from '@/views/SuperBridge/Transaction';
import Medal from '@/views/SuperBridge/Medal';

import chainCofig from '@/config/chains'
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import { useDefaultLayout } from '@/hooks/useLayout';
import { usePriceStore } from '@/stores/price';
import { useDebounceFn } from 'ahooks';

import type { NextPageWithLayout } from '@/utils/types';
import type { Chain } from '@/types';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 80px;
`;

const RightContainer = styled.div`
  width: 414px;
`

const Sep = styled.div`
  margin-top: 20px;
`

const chainList = Object.values(chainCofig)

const Bridge: NextPageWithLayout = () => {
  const handlerList = useRef<any[]>([])
  const [toChainId, setToChain] = useState<number>(chainList[1].chainId)
  const router = useRouter();
  // const tool = router.query.tool as string;
  const { account, chainId } = useAccount();
  const prices = usePriceStore((store) => store.price);
  const { addAction } = useAddAction('all-in-one');

  const [{ settingChain, connectedChain }, setChain] = useSetChain();

  // const { icon, name, color } = getBridgeMsg(tool)



  return (
    <Container>
      <BridgeAction
        chainList={chainList}
        // getAllTokens={getAllToken}
        // getChainScan={getChainScan}
        // getQuote={getQuote}
        // execute={execute}
        // getStatus={getStatus}
      />
      <RightContainer>
        <Transaction />
        <Sep />
        <Medal />
      </RightContainer>
    </Container>
  )
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
