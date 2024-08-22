import { useSetChain } from '@web3-onboard/react';
import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';
import type { Chain } from '@/types';

const Container = styled.div`
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: rgba(0, 0, 0, 1);
    font-size: 16px;
    border-radius: 10px;
    background-color: rgba(235, 244, 121, 1);
    cursor: pointer;
    margin-top: 40px;
`

interface Props {
    disabled: boolean;
    loading: boolean;
    fromChain: Chain | undefined;
    onClick: () => void;
}

export default function SubmitBtn({ disabled, loading, fromChain, onClick }: Props) {
    const { account, chainId, provider } = useAccount()
    const { onConnect } = useConnectWallet();
    const [{ settingChain, connectedChain }, setChain] = useSetChain();
    
    if (!account) {
        return <Container onClick={() => { onConnect() }}>Connect Wallet</Container>
    }

    if (loading) {
        return <Container><Loading size={16} /> Send</Container>  
    }

    if (fromChain && chainId !== fromChain?.chainId) {
        return <Container onClick={() => { 
            setChain({ chainId: `0x${fromChain?.chainId?.toString(16)}` })
         }}>Switch Chain</Container>
    }

    if (disabled) {
        return <Container style={{ opacity: 0.3 }}>Send</Container>
    }

    return <Container onClick={onClick}>Send</Container>
}