import { useRouter } from 'next/router';
import styled from 'styled-components';
import type { ExecuteRequest,QuoteRequest, QuoteResponse } from 'super-bridge-sdk'

import Loading from '@/components/Icons/Loading';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';
import { addressFormated,balanceFormated, percentFormated } from '@/utils/balance';

import Modal from "../Modal";

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: rgba(255, 255, 255, 1);
    padding-top: 20px;
    text-align: center;
`

const Content = styled.div`
    font-size: 16px;
    font-weight: 300;
    line-height: 19.2px;
    color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`

const Desc = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    text-align: center;
    margin-top: 25px;
    color: rgba(151, 154, 190, 1);
    .transactions {
        color: rgba(235, 244, 121, 1);
        cursor: pointer;
    }
`

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
    margin-top: 40px;
    &.disbaled {
        opacity: .3;
        cursor: default;
    }
`

interface Props {
    isLoading: boolean;
    // disabled?: boolean;
    // text: string;
    fromChain: Chain | null;
    toChain: Chain | null;
    fromToken: Token | undefined;
    toToken: Token | undefined;
    amount: string;
    theme?: any;
    reciveAmount: string | null;
    toAddress: string;
    route: QuoteResponse | null;
    onClick: () => void;
    onTransactionClick: () => void;
    onClose: () => void;
}

export default function ConfirmModal({
    onClick, onClose, fromChain, toChain, fromToken, toToken, amount, theme, toAddress, route, reciveAmount, isLoading, onTransactionClick
}: Props) {
    const prices = usePriceStore((store) => store.price);
    const router = useRouter();

    const styles = { backgroundColor: theme?.selectBgColor, color: theme?.textColor }

    return <Modal showLayer={false} width={370} top="auto" fixed position='right-bottom' onClose={() => {
        onClose()
    }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.5833 31.1666V13.6666M23.5833 13.6666L16 21.25M23.5833 13.6666L31.1667 21.25" stroke="#EBF479" stroke-width="3" stroke-linecap="round" />
                <circle cx="23" cy="23" r="21" stroke="#373A53" stroke-width="3" />
                <path d="M23 44C34.598 44 44 34.598 44 23C44 11.402 34.598 2 23 2C11.402 2 2 11.402 2 23" stroke="#EBF479" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <Title>Bridged Successfully!</Title>
        <Content>
            <div>{balanceFormated(amount)} {fromToken?.symbol} on {fromChain?.chainName}</div>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8536 4.35355C12.0488 4.15829 12.0488 3.84171 11.8536 3.64645L8.67157 0.464466C8.47631 0.269204 8.15973 0.269204 7.96447 0.464466C7.7692 0.659728 7.7692 0.976311 7.96447 1.17157L10.7929 4L7.96447 6.82843C7.7692 7.02369 7.7692 7.34027 7.96447 7.53553C8.15973 7.7308 8.47631 7.7308 8.67157 7.53553L11.8536 4.35355ZM0 4.5H11.5V3.5H0V4.5Z" fill="white" />
            </svg>
            <div>{balanceFormated(reciveAmount as string)} {toToken?.symbol} on {toChain?.chainName}</div>
        </Content>

        <Desc>
            Transaction completed. You can view it on <span className="transactions" onClick={() => {
                router.push('/super-bridge/transaction')
            }}>My Transactions </span>page.
        </Desc>

        <Container style={styles} onClick={onClick}>+ New Transfer</Container>

    </Modal>
}