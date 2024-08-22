import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom'
import styled from 'styled-components';

import Lido from '@/components/Stake/Lido';
import Renzo from '@/components/Stake/Renzo';
import useAccount from '@/hooks/useAccount';
import { useChainsStore } from '@/stores/chains';

import lido from './lido.svg'
import renzo from './renzo.svg'

const Container = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 51;
`

const ModalLayer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
`

const Modal = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 420px;
    min-height: 467px;
    background-color: rgba(38, 40, 54, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
`

const Header = styled.div`
    padding: 20px;
`

const CloseIcon = styled.div`
    position: absolute;
    width: 12px;
    height: 12px;
    right: 20px;
    top: 27px;
    cursor: pointer;
    color: rgba(151, 154, 190, 1);
`


const stakeTypes: {
    [key: string]: string
} = {
    renzo: renzo.src,
    lido: lido.src,
}

export const StakeModalDapp = ({
    stakeType,
    onClose,
}: {
    stakeType: string;
    onClose: () => void
}) => {
    const chains = useChainsStore((store: any) => store.chains);

    const { chainId, account } = useAccount();

    const [currentChain, setCurrentChain] = useState<any>();
    const [ready, setReady] = useState(false);

    return <Container>
        <ModalLayer></ModalLayer>
        <Modal>
            <CloseIcon onClick={() => {
                console.log(222, onClose)
                onClose && onClose()
            }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="#979ABE" />
                </svg>
            </CloseIcon>
            <Header>
                <img src={stakeTypes[stakeType]} />
            </Header>
            {
                stakeType === 'renzo' && <Renzo />
            }
            {
                stakeType === 'lido' && <Lido />
            }
        </Modal>
    </Container>

};

export default StakeModalDapp;
