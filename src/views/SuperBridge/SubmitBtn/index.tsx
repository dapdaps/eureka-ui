import { useSetChain } from '@web3-onboard/react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';
import type { Chain, Token } from '@/types';

const Container = styled.div<{ disabled?: boolean }>`
    height: 60px;
    line-height: 60px;
    background-color: rgba(235, 244, 121, 1);
    border-radius: 10px;
    text-align: center;
    color: rgba(55, 58, 83, 1);
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    &.disbaled {
        opacity: .3;
        cursor: default;
    }
`

interface Props {
    isLoading: boolean;
    disabled: boolean;
    text: string;
    fromChain: Chain | null;
    onClick: () => void;
    defaultText?: string;   
    theme?: any;
}

export default function SubmitBtn({
    isLoading, disabled, onClick, text, fromChain, defaultText = 'Bridge'
} : Props) {
    const { onConnect } = useConnectWallet();
    const { account, chainId, provider } = useAccount();
    const [{ settingChain, connectedChain }, setChain] = useSetChain();

    if (!account) {
        return <Container onClick={() => { onConnect() }}>Connect Wallet</Container>
    }

    if (isLoading) {
        return <Container><Loading size={16} /> {defaultText}</Container>  
    }

    if (disabled) {
        return <Container className="disbaled">{text}</Container>
    }

    if (chainId !== fromChain?.chainId) {
        return <Container onClick={() => { 
            setChain({ chainId: `0x${fromChain?.chainId?.toString(16)}` })
         }}>Switch Chain</Container>
    }

    return <Container onClick={onClick}>{ defaultText }</Container>
}