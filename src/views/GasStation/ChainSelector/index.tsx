import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import type { Chain } from '@/types';

import leftImg from './left.svg'
import rightImg from './right.svg'

const Container = styled.div`
    display: flex;
    align-items: center;
`

const ChainTrigger = styled.div`
    flex: 1;
    position: relative;
    .title {
        color: rgba(151, 154, 190, 1);
        font-size: 14px;
        font-weight: 500;
        line-height: 16.56px;
    }
    .trigger {
        height: 48px;
        margin-top: 10px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        &.left {
            background: url(${leftImg.src}) no-repeat 0 0;
            background-size: 100% 100%;
            padding-right: 20px;
        }
        &.right {
            background: url(${rightImg.src}) no-repeat 0 0;
            background-size: 100% 100%;
            padding-left: 25px;
        }
        .chain-name {
            display: flex;
            align-items: center;
            .alt {
                width: 28px;
                height: 28px;
                border-radius: 8px;
                background-color: rgba(94, 97, 126, 1);
                overflow: hidden;
                
            }
            .chain-img {
                width: 28px;
                height: 28px;
                border-radius: 8px;
            }
            .name {
                margin-left: 10px;
                color: rgba(151, 154, 190, 1);
            }
            .select-name {
                margin-left: 10px;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
`

const ChainListModal = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    top: 102%;
    background: #2E3142;
    border-radius: 12px;
    padding: 12px 0;
    z-index: 21;
    max-height: 500px;
    overflow: auto;
`

const ChainRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    height: 42px;
    padding: 0 12px;
    justify-content: space-between;
    &:hover {
        background: #676d93;
    }
    .names-group {
        display: flex;
        align-items: center;
    }
`




const ChainIcon = styled.img`
    width: 26px;
    height: 26px;
    border-radius: 8px;
`
const ChainName = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: #fff;
    margin-left: 7px;
`

const Arrow = () => {
    return <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 5L11 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
    </svg>
}

const Checked = () => {
    return <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4.11111L5.28571 8L13 1" stroke="#EBF479" stroke-width="2" stroke-linecap="round"/>
    </svg>
}

const ChainPlaceHolder = () => {
    return <div className='chain-name'>
        <div className="alt"></div>
        <div className="name">Select</div>
    </div>
}

const ChainSelected = ({ chain }: { chain: Chain }) => {
    return <div className='chain-name'>
        <img src={ chain.icon } className="chain-img" />
        <div className="select-name ">{chain.chainName}</div>
    </div>
}

const ChainTriggerCom = ({ cls, paddingLeft, title, chainList, onChainChange, chain: currentChain }: any) => {
    const [modalShow, setModalShow] = useState(false)

    const domRef = useRef<any>(null)

    const docClick = useCallback((e: any) => {
        const isChild = domRef.current?.contains(e.target)
        if (!isChild) {
            setModalShow(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('click', docClick, false)

        return () => {
            document.removeEventListener('click', docClick)
        }
    }, [])


    return <ChainTrigger ref={domRef}>
        <div className="title" style={{ paddingLeft }}>{title}</div>
        <div className={`trigger ${cls}`} onClick={() => {
            setModalShow(true)
        }}>
            {
                currentChain ? <ChainSelected chain={currentChain} /> : <ChainPlaceHolder />
            }
            <Arrow />
        </div>
        {
            modalShow ? <ChainListModal onClick={(e) => { e.stopPropagation() }}>
                {
                    chainList.map((chain: any) => {
                        return <ChainRow key={chain.chainId} onClick={() => {
                            onChainChange(chain)
                            setModalShow(false)
                        }}>
                            <div className="names-group">
                                <ChainIcon src={chain.icon} />
                                <ChainName>{chain.chainName}</ChainName>
                            </div>
                            
                            {
                                chain === currentChain && <Checked />
                            }
                        </ChainRow>
                    })
                }
            </ChainListModal> : null
        }
    </ChainTrigger>
}

interface Props {
    chainList: Chain[];
    fromChain: Chain | undefined;
    toChain: Chain | undefined;
    onFromChainChange: (chain: Chain) => void;
    onToChainChange: (chain: Chain) => void;
}

export default function ChainSelector({ chainList, fromChain, toChain, onFromChainChange, onToChainChange }: Props) {
    
    return <Container>
        <ChainTriggerCom
            paddingLeft={0}
            chainList={chainList}
            onChainChange={onFromChainChange}
            chain={fromChain}
            cls="left"
            title="Source Chain" />

        <ChainTriggerCom
            paddingLeft={25}
            chainList={chainList}
            onChainChange={onToChainChange}
            chain={toChain}
            cls="right"
            title="Destination Chain" />
    </Container>
}