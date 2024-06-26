import { useSetChain } from '@web3-onboard/react';
import Link from 'next/link';
import useConnectWallet from '@/hooks/useConnectWallet';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { init, getQuote, execute, getIcon, getBridgeMsg, getAllToken, getChainScan, getStatus } from 'super-bridge-sdk';

import { get } from '@/utils/http'
import chainCofig from '@/config/chains'
import useAccount from '@/hooks/useAccount';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import useAddAction from '@/hooks/useAddAction';
import { useDefaultLayout } from '@/hooks/useLayout';
import { usePriceStore } from '@/stores/price';
import { useDebounceFn } from 'ahooks';

import BridgeX from '@/components/BridgeX/Index';

import type { NextPageWithLayout } from '@/utils/types';
import type { Chain } from '@/types';

const arrow = (
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
    </svg>
);

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  position: relative;
  padding-top: 50px;
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

const chainListSort = [1, 42161, 10, 8453, 81457, 5000, 324, 59144, 169, 34443, 1088, 534352, 1101, 137, 56, 43114, 100]

const chainList = Object.values(chainCofig)

chainList.sort((a, b) => chainListSort.indexOf(a.chainId) - chainListSort.indexOf(b.chainId))

const Bridge: NextPageWithLayout = () => {
    const handlerList = useRef<any[]>([])
    const { onConnect } = useConnectWallet()
    // const [toChainId, setToChain] = useState<number>(chainList[1].chainId)
    const router = useRouter();
    const tool = router.query.tool as string;
    const { account, chainId } = useAccount();

    const prices = usePriceStore((store) => store.price);
    const { addAction } = useAddAction('dapp');

    const [{ settingChain, connectedChain }, setChain] = useSetChain();
    const [icon, setIcon] = useState('')
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [template, setTemplate] = useState('')

    // const { icon, name, color } = getBridgeMsg(tool)

    useEffect(() => {
        if (tool) {
            const { icon, name, color } = getBridgeMsg(tool)
            setIcon(icon)
            setName(name)
            setColor(color)
            get(`/api/dapp?route=bridge-x/${tool}`)
                .then(res => {
                    if (res.code === 0) {
                        console.log(res)
                        setTemplate(res.data.name)
                        setName(res.data.name)
                        setIcon(res.data.logo)
                        // setChainConfig(res.data)
                    }
                })
        }
    }, [tool])

    return (
        <Container>
            <BreadCrumbs>
                <Link href="/">Home</Link>
                {arrow}
                <Link href="/alldapps">dApp</Link>
                {arrow}
                <span>{name}</span>
            </BreadCrumbs>

            <BridgeX
                addAction={addAction}
                prices={prices}
                account={account}
                icon={icon}
                name={name}
                color={color}
                tool={tool}
                template={template}
                chainList={chainList}
                getQuote={getQuote}
                getAllToken={getAllToken}
                getChainScan={getChainScan}
                getStatus={getStatus}
                execute={execute}
                currentChainId={connectedChain?.id ? parseInt(connectedChain.id, 16) : 1}
                toChainId={router.query.toChainId as string}
                fromChainId={router.query.fromChainId as string}
                setChain={setChain}
            />
        </Container>
    )
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
