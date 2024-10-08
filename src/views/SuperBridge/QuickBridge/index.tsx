import Link from "next/link";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import allTokens from '@/config/bridge/allTokens';
import chainCofig from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import { usePriceStore } from '@/stores/price';
import type { Chain } from "@/types";
import { balanceFormated } from '@/utils/balance';

import { ArrowDown } from '../Arrow';
import useBridge from '../hooks/useBridge';
import Modal from '../Modal';
import SubmitBtn from '../SubmitBtn';
import ConfirmModal from '../SubmitBtn/ConfirmModal';
import ConfirmSuccessModal from '../SubmitBtn/ConfirmSuccess2Modal';
import TokenAmount from './TokenAmount';
const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    .chain-icon {
        width: 31px;
        height: 31px;
    }
    .chain-name {
        font-size: 20px;
        font-weight: 600;
    }
`

const Tabs = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    background: rgba(33, 35, 48, 1);
    padding: 5px;
`

const Tab = styled.div`
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 6px;
    color: rgba(151, 154, 190, 1);
    
    &.active {
        border: 1px solid rgba(55, 58, 83, 1);
        background: rgba(50, 54, 75, 1);
        color: #fff;
    }
`

const ChainSelector = styled.div`
    display: flex;
    margin-top: 30px;
    align-items: center;
    .arrow {
        /* margin-right: 30px; */
    }
    .quick-chain {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #fff;
        /* flex: 1; */
        padding-left: 30px;
        width: 217px;
        img {
            width: 26px;
            height: 26px;
        }
        &:last-child {
            padding-left: 60px;
        }
    }
`

const RouteMsg = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
`

const SuperTip = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
    margin-top: 20px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
        color: #fff;
    }
`

const TokenSep = styled.div`
    height: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Styledlink = styled(Link)`
    &:hover {
        text-decoration: none;
        color: #fff;
    }
    
`

interface Props {
    fromChainId: number;
    toChainId: number;
    direction: string;
    onClose?: () => void;
}

const chainList = Object.values(chainCofig)

function QuickBridge({
    fromChainId,
    toChainId,
    direction,
    onClose,
}: Props) {
    const originFromChain: Chain = chainCofig[fromChainId]
    const originToChain: Chain = chainCofig[toChainId]

    const { account, chainId, provider } = useAccount();
    const [derection, setDerection] = useState(1)
    const [btnText, setBtnText] = useState('Bridge in')
    const [confirmModalShow, setConfirmModalShow] = useState<boolean>(false);
    const [fromChainModalShow, setFromChainModalShow] = useState<boolean>(false);
    const [confirmSuccessModalShow, setConfirmSuccessModalShow] = useState<boolean>(false);
    const [toChainModalShow, setToChainModalShow] = useState<boolean>(false);
    const [mainModalShow, setMainModalShow] = useState<boolean>(true)
    const prices = usePriceStore((store) => store.price);

    useEffect(() => {
        if (direction === 'in') {
            setDerection(1)
            
        } else {
            setDerection(2)
            
        }
    }, [direction])


    const {
        fromChain,
        setFromChain,
        toChain,
        setToChain,
        fromToken,
        setFromToken,
        toToken,
        setToToken,
        sendAmount,
        onSendAmountChange,
        updateBanlance,
        reciveAmount,
        identification,
        routeSortType,
        sendDisabled,
        disableText,
        isSending,
        loading,
        selectedRoute,
        executeRoute,
    } = useBridge({
        originFromChain,
        originToChain,
        derection,
        account,
        defaultBridgeText: btnText,
    })

    useEffect(() => {
        if (fromChainId && toChainId) {
            const fromTokens = allTokens[fromChainId]
            const toTokens = allTokens[toChainId]

            let _fromTokens, _toTokens
            if (direction === 'in') {
                _fromTokens = toTokens
                _toTokens = fromTokens
            } else {
                _fromTokens = fromTokens
                _toTokens = toTokens
            }

            let fromEthToken, toEthToken, fromWethToken, toWethToken
            _fromTokens.some(token => {
                if (token.symbol.toUpperCase() === 'ETH') {
                    fromEthToken = token
                    return true
                }
                if (token.symbol.toUpperCase() === 'WETH') {
                    fromWethToken = token
                }
            })

            _toTokens.some(token => {
                if (token.symbol.toUpperCase() === 'ETH') {
                    toEthToken = token
                    return true
                }
                if (token.symbol.toUpperCase() === 'WETH') {
                    toWethToken = token
                    return true
                }
            })

            setFromToken(fromEthToken || fromWethToken)
            setToToken(toEthToken || toWethToken)
        }
    }, [fromChainId, toChainId, direction])

    useEffect(() => {
        if (derection === 1) {
            setBtnText('Bridge in')
            setFromChain(originToChain)
            setToChain(originFromChain)
        } else {
            setBtnText('Bridge out')
            setFromChain(originFromChain)
            setToChain(originToChain)
        }
    }, [derection])

    function swapToken() {
        // const [_fromChain, _toChain] = [toChain, fromChain]
        const [_fromToken, _toToken] = [toToken, fromToken]
        // setFromChain(_fromChain)
        // setToChain(_toChain)
        setFromToken(_fromToken)
        setToToken(_toToken)
    }

    return <div> {
        mainModalShow &&
        <Modal width={492} fixed title={<Title>
            <img className="chain-icon" src={originFromChain.icon} />
            <div className="chain-name">{originFromChain.chainName} Quick Bridge</div>
        </Title>} onClose={() => {
            setMainModalShow(true)
            onClose && onClose()
        }}>
            <Tabs>
                <Tab className={derection === 1 ? 'active' : ''} onClick={() => { setDerection(1); swapToken() }}>Bridge in</Tab>
                <Tab className={derection === 2 ? 'active' : ''} onClick={() => { setDerection(2); swapToken() }}>Bridge out</Tab>
            </Tabs>
            <ChainSelector>
                <div className="quick-chain" onClick={() => {
                    if (derection === 1) {
                        setFromChainModalShow(true)
                    }
                }}>
                    <img src={fromChain.icon} />
                    <div>{fromChain.chainName}</div>
                    {derection === 1 && <ArrowDown />}
                </div>
                <svg className="arrow" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6L13.7273 6M13.7273 6L8.87869 11.0002M13.7273 6L8.87869 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                </svg>
                <div className="quick-chain" onClick={() => {
                    if (derection === 2) {
                        setToChainModalShow(true)
                    }
                }}>
                    <img src={toChain.icon} />
                    <div>{toChain.chainName}</div>
                    {derection === 2 && <ArrowDown />}
                </div>
            </ChainSelector>

            <div style={{ marginTop: 20 }}></div>
            <TokenAmount
                amount={sendAmount}
                onAmountChange={onSendAmountChange}
                currentToken={fromToken}
                currentChain={fromChain}
                chainList={chainList}
                chainToken={allTokens}
                showTokenSelectModal={fromChainModalShow}
                onTokenSelectModalChange={() => {
                    setFromChainModalShow(false)
                }}
                disabledChainSelector={derection === 2}
                onChainChange={(chain) => {
                    if (derection === 1) {
                        setFromChain(chain)
                    }
                    // setFromChain(chain)
                }}
                onTokenChange={setFromToken}
            />

            <TokenSep>
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="38" height="38" rx="10" fill="#2E3142" stroke="#262836" stroke-width="4" />
                    <path d="M21.4999 16V26.5M21.4999 26.5L16 21M21.4999 26.5L27 21" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>
            </TokenSep>

            <TokenAmount
                inputDisabled
                amount={reciveAmount}
                currentToken={toToken}
                currentChain={toChain}
                chainList={chainList}
                chainToken={allTokens}
                showTokenSelectModal={toChainModalShow}
                onTokenSelectModalChange={() => {
                    setToChainModalShow(false)
                }}
                disabledChainSelector={derection === 1}
                onChainChange={(chain) => {
                    if (derection === 2) {
                        setToChain(chain)
                    }
                }}
                onTokenChange={setToToken}
            />

            <RouteMsg>
                <div>~{selectedRoute?.duration} mins｜Fee ${balanceFormated(selectedRoute?.feeType === 1 ? (prices as any)[fromChain.nativeCurrency.symbol] * Number(selectedRoute?.fee) : selectedRoute?.fee)}</div>
            </RouteMsg>
            <div style={{ marginTop: 15 }}></div>
            <SubmitBtn
                isLoading={loading}
                text={disableText}
                defaultText={btnText}
                fromChain={fromChain}
                onClick={() => {
                    // console.log('selectedRoute:', selectedRoute)
                    if (selectedRoute) {
                        setConfirmModalShow(true);
                    }
                }}
                disabled={sendDisabled}
            />

            <Styledlink href={'/super-bridge'}>
                <SuperTip>
                    <span>Use the</span>&nbsp;&nbsp;<svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.400981 6.33975L6.84571 0.280371C7.35087 -0.19458 8.14285 0.368692 7.85998 1.00174L6.04747 5.05803C5.87157 5.4517 6.13097 5.90244 6.55973 5.94811L9.57712 6.26956C10.1256 6.32799 10.3437 7.01009 9.93073 7.37584L2.10237 14.3098C1.57082 14.7806 0.78511 14.1564 1.12352 13.5322L3.76338 8.66244C3.97724 8.26795 3.72538 7.78217 3.27974 7.7296L0.761396 7.43252C0.22577 7.36933 0.00804376 6.70919 0.400981 6.33975Z" fill="#EBF479" />
                    </svg>
                    <span>Super Bridge for more route options.</span>
                </SuperTip>
            </Styledlink>

            {confirmModalShow && (
                <ConfirmModal
                    fromChain={fromChain}
                    toChain={toChain}
                    fromToken={fromToken}
                    toToken={toToken}
                    amount={sendAmount}
                    reciveAmount={reciveAmount}
                    toAddress={account as string}
                    route={selectedRoute}
                    onClose={() => {
                        setConfirmModalShow(false);
                    }}
                    isLoading={isSending}
                    onClick={async () => {
                        try {
                            const isSuccess = await executeRoute()
                            if (isSuccess) {
                                setConfirmSuccessModalShow(true);
                                setConfirmModalShow(false);
                                setMainModalShow(false)
                            }
                        } catch (e) {
                            console.log(e)
                        }
                        // onClose && onClose()
                    }}
                />
            )}


        </Modal>
    }

        {confirmSuccessModalShow && (
            <ConfirmSuccessModal
                fromChain={fromChain}
                toChain={toChain}
                fromToken={fromToken}
                toToken={toToken}
                amount={sendAmount}
                reciveAmount={reciveAmount}
                toAddress={account as string}
                route={selectedRoute}
                onClose={() => {
                    setConfirmSuccessModalShow(false);
                    setMainModalShow(true)
                    onClose && onClose()
                }}
                onTransactionClick={() => { }}
                isLoading={isSending}
                onClick={async () => {
                    setConfirmSuccessModalShow(false);
                    setMainModalShow(true)
                    // onClose && onClose()
                }}
            />
        )}
    </div>
}

export default function QuickBridgeModal(props: Props) {
    return ReactDOM.createPortal(<QuickBridge {...props} />, document.body)
}