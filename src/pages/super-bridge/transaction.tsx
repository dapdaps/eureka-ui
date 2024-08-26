import { useSetChain } from '@web3-onboard/react';
import { useDebounceFn } from 'ahooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import chainCofig from '@/config/chains'
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import { useDefaultLayout } from '@/hooks/useLayout';
import { usePriceStore } from '@/stores/price';
import type { Chain } from '@/types';
import type { NextPageWithLayout } from '@/utils/types';
import BridgeAction from '@/views/SuperBridge/BridgeAction';
import Medal from '@/views/SuperBridge/Medal';
import Transaction from '@/views/SuperBridge/Transaction';

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
        <Transaction initModalShow={true} updater={1} />
    </Container>
  )
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
