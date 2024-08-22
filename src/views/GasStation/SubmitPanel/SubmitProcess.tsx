import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import useCopy from '@/hooks/useCopy'
import type { Chain, Token } from '@/types';
import { balanceFormated, percentFormated } from '@/utils/balance';
import Modal from '@/views/SuperBridge/Modal'

const Container = styled.div`
    
`

const TopSum = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding-top: 50px;
    .gas-chain {
        width: 32px;
        height: 32px;
        border-radius: 8px;
    }
    .gas-line {
        width: 37px;
        height: 0;
        border-top: 1px solid rgba(94, 97, 126, 1);
    }
    .gas-text {
        font-size: 26px;
        font-weight: 700;
        line-height: 30.76px;
        color: #fff;
    }
`

const Price = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 16.56px;
    text-align: center;
    color: rgba(151, 154, 190, 1);
`

const DestinationAddress = styled.div`
    padding: 50px 20px 30px;
    .des-address {
        font-size: 16px;
        font-weight: 500;
        line-height: 18.93px;
        color: rgba(151, 154, 190, 1);
        padding-left: 20px;
    }
    .address-content {
        border-radius: 12px;
        border: 1px solid rgba(55, 58, 83, 1);
        background: rgba(46, 49, 66, 1);
        padding: 20px;
        color: #fff;
        margin-top: 10px;
        .address-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            .account-wapper {
                display: flex;
                align-items: center;
                gap: 5px;
                .dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 5px;
                    background-color: rgba(102, 196, 87, 1);
                }
                .copy {
                    cursor: pointer;
                }
            }
            .amount-wapper {

            }
        }
    }
`

const Progress = styled.div`
    height: 120px;
    background-color: rgba(24, 25, 36, 1);
    border-radius: 0 0 16px 16px;
`

const CircleGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-top: 20px;
    .circle-line {
        height: 0;
        width: 130px;
        border-top: 1px solid rgba(94, 97, 126, 1);
    }
`

const GroupText = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    .text {
        flex: 1;
        text-align: center;
        color: #fff;
        &.disabled {
            color: rgba(94, 97, 126, 1);
        }
    }
`

const Circle = styled.div<{ disabled: boolean }>`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: 1px solid ${({ disabled }) => disabled ? 'rgba(94, 97, 126, 1)' : 'rgba(235, 244, 121, 1)'};
    background: radial-gradient(at 50% 50%, ${({ disabled }) => disabled ? 'rgba(94, 97, 126, 1)' : 'rgba(235, 244, 121, 1)'} 0% 60%, #000 60% 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
`

function IconCircle({ disabled, text, isLast } : { disabled: boolean; text: string, isLast: boolean }) {
    return <>
        <Circle className="circle" disabled={disabled}>
            { text }
        </Circle>
        {
            !isLast && <div className="circle-line" />
        }
    </>
}

function TextCircle({ disabled, text } : { disabled: boolean; text: string}) {
    return <div className={`text ${ disabled ? 'disabled' : '' }`}>{ text }</div>
}

const Icons = [
    ({disabled}: any) => {
        return <IconCircle isLast={false} text="&uarr;" disabled={disabled}/>
    },
    ({disabled}: any) => {
        return <IconCircle isLast={false} text={"L"}  disabled={disabled}/>
    },
    ({disabled}: any) => {
        return <IconCircle isLast={true} text={"✓"}  disabled={disabled}/>
    },
]

const Texts = [
    ({disabled}: any) => {
        return <TextCircle text='Waiting for transac' disabled={disabled}/>
    },
    ({disabled}: any) => {
        return <TextCircle text='Processing' disabled={disabled}/>
    },
    ({disabled}: any) => {
        return <TextCircle text='Success' disabled={disabled}/>
    },
]

interface Props {
    fromChain: Chain | undefined;
    toChain: Chain | undefined;
    fromToken: Token | undefined;
    payPrice: string | number | undefined;
    pay: string | number;
    address: string | undefined;
    step: number;
    disabled: boolean;
    onClose: () => void;
}

export default function SubmitPanel({
    fromChain, toChain, payPrice, pay, onClose, fromToken, address, step = 0, disabled
}: Props) {
    const { copy } = useCopy()

    return <Modal onClose={() => {
        !disabled && onClose()
    }} width={596} paddingSize={0}>
        <TopSum>
            <img src={fromChain?.icon} className="gas-chain" />
            <div className="gas-line"></div>
            <div className="gas-text">{balanceFormated(pay, 4)} {fromToken?.symbol}</div>
            <div className="gas-line"></div>
            <img src={toChain?.icon} className="gas-chain" />
        </TopSum>
        <Price>(~${balanceFormated(payPrice, 2)})</Price>
        <DestinationAddress>
            <div className="des-address">Destination Address</div>
            <div className="address-content">
                <div className="address-item">
                    <div className="account-wapper">
                        <div>{address}</div>
                        <div className="dot"></div>
                        <div className="copy" onClick={() => { copy(address as string) }}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.55263 0H9.07895C9.32323 3.27158e-09 9.5575 0.0970392 9.73023 0.26977C9.90296 0.442501 10 0.676774 10 0.921053V6.44737C10 6.69165 9.90296 6.92592 9.73023 7.09865C9.5575 7.27138 9.32323 7.36842 9.07895 7.36842H3.55263C3.30835 7.36842 3.07408 7.27138 2.90135 7.09865C2.72862 6.92592 2.63158 6.69165 2.63158 6.44737V0.921053C2.63158 0.676774 2.72862 0.442501 2.90135 0.26977C3.07408 0.0970392 3.30835 0 3.55263 0ZM3.55263 0.789474C3.51773 0.789474 3.48427 0.803337 3.45959 0.828012C3.43492 0.852688 3.42105 0.886156 3.42105 0.921053V6.44737C3.42105 6.46465 3.42446 6.48176 3.43107 6.49772C3.43768 6.51369 3.44737 6.52819 3.45959 6.54041C3.47181 6.55263 3.48632 6.56232 3.50228 6.56893C3.51824 6.57554 3.53535 6.57895 3.55263 6.57895H9.07895C9.11384 6.57895 9.14731 6.56508 9.17199 6.54041C9.19666 6.51573 9.21053 6.48226 9.21053 6.44737V0.921053C9.21053 0.886156 9.19666 0.852688 9.17199 0.828012C9.14731 0.803337 9.11384 0.789474 9.07895 0.789474H3.55263ZM6.57895 8.1579C6.57895 8.0532 6.62054 7.9528 6.69456 7.87877C6.76859 7.80475 6.86899 7.76316 6.97368 7.76316C7.07837 7.76316 7.17878 7.80475 7.25281 7.87877C7.32683 7.9528 7.36842 8.0532 7.36842 8.1579V9.07895C7.36842 9.32323 7.27138 9.5575 7.09865 9.73023C6.92592 9.90296 6.69165 10 6.44737 10H0.921053C0.676774 10 0.442501 9.90296 0.26977 9.73023C0.0970392 9.5575 3.27158e-09 9.32323 0 9.07895V3.55263C0 3.30835 0.0970392 3.07408 0.26977 2.90135C0.442501 2.72862 0.676774 2.63158 0.921053 2.63158H1.84211C1.9468 2.63158 2.0472 2.67317 2.12123 2.7472C2.19525 2.82122 2.23684 2.92163 2.23684 3.02632C2.23684 3.13101 2.19525 3.23141 2.12123 3.30544C2.0472 3.37946 1.9468 3.42105 1.84211 3.42105H0.921053C0.886156 3.42105 0.852688 3.43492 0.828012 3.45959C0.803337 3.48427 0.789474 3.51773 0.789474 3.55263V9.07895C0.789474 9.11384 0.803337 9.14731 0.828012 9.17199C0.852688 9.19666 0.886156 9.21053 0.921053 9.21053H6.44737C6.48226 9.21053 6.51573 9.19666 6.54041 9.17199C6.56508 9.14731 6.57895 9.11384 6.57895 9.07895V8.1579Z" fill="#979ABE" />
                            </svg>
                        </div>
                    </div>
                    <div className="amount-wapper">{balanceFormated(pay, 4)} {fromToken?.symbol}</div>
                </div>
            </div>
        </DestinationAddress>
        <Progress>
            <CircleGroup>
                {
                    Icons.map((Item, index) => {
                        return <Item key={index} disabled={ step < index }/>
                    })
                }
            </CircleGroup>
            <GroupText>
                {
                    Texts.map((Item, index)  => {
                        return <Item key={index} disabled={ step < index } />;
                    })
                }
            </GroupText>
        </Progress>
    </Modal>
}