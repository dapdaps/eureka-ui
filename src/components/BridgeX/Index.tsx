import { useEffect, useState } from 'react'
import styled from 'styled-components';
import Big from 'big.js'

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';

import ChainSelector from './components/ChainSelector'
import FeeMsg from './components/FeeMsg';
import Alert from './components/Alert';
import Transaction from './components/Transaction';
import Confirm from './components/Confirm'
import Token from './components/Token'

import {
    getBalance,
    addressFormated,
    balanceFormated,
    getTransaction,
    saveTransaction,
} from './Utils'

const BridgePanel = styled.div`
  width: 478px;
  margin: 80px auto;
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BridgeIcon = styled.div`
    height: 28px;
    overflow: hidden;
    img {
        height: 100%;
    }
`

const BridgeName = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    margin-left: 10px;
`

const Content = styled.div`
    border: 1px solid #373A53;
    border-radius: 16px;
    background: #262836;
    margin-top: 30px;
    padding: 16px;
`

const MainTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #fff;
    padding-top: 10px;
`

const ChainPairs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
    gap: 10px;
`


const ChainArrow = styled.div`
    cursor: pointer;
`

const TokenSpace = styled.div<any>`
    height: ${(props: any) => {
        return props.height ? props.height : '6px'
    }};
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TransformArrow = styled.div`
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: #2E3142;
    border: 4px solid rgba(38, 40, 54, 1);
    display: flex;
    justify-content: center;
    align-items: center;
`

const SubmitBtn = styled.button`
    margin: 0 auto;
    display: block;
    height: 48px;
    width: calc(100% - 40px);
    line-height: 48px;
    text-align: center;
    border-radius: 8px;
    color: #000;
    background: linear-gradient(180deg, #EEF3BF 0%, #E9F456 100%);
`


export default function BridgeX({
    bridge,
    icon,
    name,
    color,
    tool,
    account,
    chainList,
    toggleDocClickHandler,
    getQuote,
    getAllToken,
    getChainScan,
    getStatus,
    prices,
    currentChainId,
    setChain,
    setToChain,
    fromChainId,
    toChainId,
    execute,
    toast,
}: any) {
    const [chainFrom, setChainFrom] = useState<any>(null)
    const [chainTo, setChainTo] = useState<any>(null)
    const [allTokens, setAllTokens] = useState<any>({})
    const [loadedAllTokens, setLoadedAllTokens] = useState(false)
    const [otherAddressChecked, setOtherAddressChecked] = useState(false)
    const [inputTokens, setInputTokens] = useState([])
    const [outputTokens, setOutputTokens] = useState([])
    const [selectInputToken, setSelectInputToken] = useState<any>(null)
    const [selectOutputToken, setSelectOutputToken] = useState<any>(null)
    const [sendAmount, setSendAmount] = useState('')
    const [receiveAmount, setReceiveAmount] = useState('')
    const [inputBalance, setInputBalance] = useState('')
    const [inputBalanceLoading, setInputBalanceLoading] = useState(false)
    const [outputBalance, setOutputBalance] = useState('')
    const [outputBalanceLoading, setOutputBalanceLoading] = useState(false)
    const [duration, setDuration] = useState('')
    const [gasCostUSD, setGasCostUSD] = useState('')
    const [fromUSD, setFromUSD] = useState('')
    const [toUSD, setToUSD] = useState('')
    const [toAddress, setToAddress] = useState('')
    const [isValidAddress, setIsValidAddress] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [route, setRoute] = useState(null)
    const [canRoute, setCanRoute] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [sendingDisabeld, setSendingDisabeld] = useState(false)
    const [btnText, setBtnText] = useState('Send')
    const [transactionList, setTransactionList] = useState([])
    const [transitionUpdate, setTransitionUpdate] = useState(Date.now())
    const [timeOut, setXTimeOut] = useState(null)
    const [isSendingDisabled, setIsSendingDisabled] = useState(false)

    const { chainId, provider } = useAccount();

    useEffect(() => {
        console.log('fromChainId:', fromChainId, toChainId)
        if (fromChainId && toChainId) {
            const _chainFrom = chainList.filter((chain: any) => chain.chainId === parseInt(fromChainId))[0]
            const _chainTo = chainList.filter((chain: any) => chain.chainId === parseInt(toChainId))[0]
            setChainFrom(_chainFrom)
            setChainTo(_chainTo)
        }

    }, [])

    useEffect(() => {
        getAllToken().then((res: any) => {
            setLoadedAllTokens(true)
            setAllTokens(res)
        })
    }, [])

    useEffect(() => {
        if (loadedAllTokens && account) {
            setInputTokens(allTokens[chainFrom.chainId])
            setSelectInputToken(null)
            setInputBalance('0.0')
        }
    }, [chainFrom, loadedAllTokens, allTokens])



    useEffect(() => {
        if (loadedAllTokens && account) {
            setOutputTokens(allTokens[chainTo.chainId])
            setSelectOutputToken(null)
            setOutputBalance('0.0')
        }
    }, [chainTo, loadedAllTokens, allTokens])


    useEffect(() => {
        const inter = setInterval(() => {
            if (!account) {
                return
            }
            setTransitionUpdate(Date.now())
        }, 10000)

        return () => {
            clearInterval(inter)
        }
    }, [])


    useEffect(() => {
        // if (state.timeOut) {
        //     clearTimeout(state.timeOut)
        // }
        // const timeOut = setTimeout(() => {
        //     if (!account) {
        //         return 
        //     }
        //     getTrade(sendAmount, selectInputToken, selectOutputToken, toAddress, otherAddressChecked)
        // }, 500)

        getTrade()


        // State.update({
        //     timeOut
        // })
        // return () => {
        //     clearTimeout(timeOut)
        // }
    }, [sendAmount, selectInputToken, selectOutputToken, toAddress])

    useEffect(() => {
        if (sendAmount && inputBalance) {
            const canRoute = validateInput()
            if (!canRoute) {
                setBtnText('Send')
                return
            }

            if (Number(sendAmount) > Number(inputBalance)) {
                setBtnText('Insufficient balance')
                setCanRoute(false)
                return
            }

            if (!route && !loading) {
                setBtnText('No Route')
                setCanRoute(false)
                return
            }

            if (currentChainId !== chainFrom.chainId) {
                setBtnText('Switch Chain')
                setCanRoute(true)
                return
            }

            setBtnText('Send')
            setCanRoute(true)
        }
    }, [sendAmount, inputBalance, route, loading, chainFrom])

    const signer = provider.getSigner()

    function refreshTransactionList() {
        const transactionObj = getTransaction(`bridge-${account}-${tool}`)

        setTransactionList(transactionObj.transactionList)
    }

    function validateInput() {
        // const { sendAmount, selectInputToken, selectOutputToken, toAddress, otherAddressChecked, isValidAddress } = state
        const canRoute = sendAmount && Number(sendAmount) > 0 && selectInputToken && selectOutputToken
            && ((otherAddressChecked && toAddress && isValidAddress) || !otherAddressChecked)

        return canRoute
    }

    function getTokenBalance(chain: any, token: any) {
        const address = chain.nativeCurrency.symbol === token.symbol ? 'native' : token.address
        return getBalance(address, account, chain.rpcUrls[0], token.decimals)
    }


    function getTrade() {
        // const { sendAmount, selectInputToken, selectOutputToken, toAddress, otherAddressChecked, isValidAddress } = state

        const canRoute = validateInput()

        if (canRoute) {
            setLoading(true)
            setDuration('')
            setGasCostUSD('')
            setReceiveAmount('')
            setToUSD('')
            setRoute(null)

            getQuote({
                fromChainId: chainFrom.chainId,
                toChainId: chainTo.chainId,
                fromToken: {
                    address: selectInputToken.address,
                    symbol: selectInputToken.symbol,
                    decimals: selectInputToken.decimals,
                },
                toToken: {
                    address: selectOutputToken.address,
                    symbol: selectOutputToken.symbol,
                    decimals: selectOutputToken.decimals,
                },
                fromAddress: account,
                destAddress: otherAddressChecked ? toAddress : account,
                amount: new Big(sendAmount).times(Math.pow(10, selectInputToken.decimals)),
                engine: [tool]
            }, signer).then((res: any) => {
                console.log('route: ', res)
                if (res && res.length) {
                    let maxReceiveAmount = 0
                    let maxRoute: any
                    res.forEach((route: any) => {
                        if (Number(route.receiveAmount) > maxReceiveAmount) {
                            maxReceiveAmount = Number(route.receiveAmount)
                            maxRoute = route
                        }
                    })

                    console.log('maxRoute: ', maxRoute)

                    if (maxRoute) {
                        setDuration(maxRoute.duration)
                        setGasCostUSD(maxRoute.feeType === 1 ? prices['ETH'] * maxRoute.gas : maxRoute.gas,)
                        setReceiveAmount(new Big(maxRoute.receiveAmount).div(Math.pow(10, selectOutputToken.decimals)).toString())
                        setRoute(maxRoute)
                        setLoading(false)
                    }

                } else {
                    setLoading(false)
                }
            })
        }
    }


    // if (!account) {
    //     return (
    //         // <Widget
    //         //     src="dapdapbos.near/widget/Bridge.ConnectButton"
    //         //     props={{
    //         //     }}
    //         // />
    //     );
    // }


    return <BridgePanel>
        <Header>
            <BridgeIcon>
                <img src={icon} />
            </BridgeIcon>
            <BridgeName>{name}</BridgeName>
        </Header>
        <Content>
            <MainTitle>Bridge</MainTitle>
            <ChainPairs>
                <ChainSelector
                    chain={chainFrom}
                    chainList={chainList}
                    toggleDocClickHandler={toggleDocClickHandler}
                    onChainChange={(chain: any) => {
                        setChainFrom(chain)
                        setChain({ chainId: `0x${chain.chainId?.toString(16)}` }, chain.chainId, chainTo.chainId, true)

                    }}
                />

                <ChainArrow onClick={() => {
                    const _chainTo = chainFrom
                    const _chainFrom = chainTo

                    setChainFrom(_chainTo)
                    setChainTo(_chainFrom)
                    setChain({ chainId: `0x${chainFrom.chainId?.toString(16)}` }, chainFrom.chainId, chainTo.chainId, true)

                }}>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6L13.7273 6M13.7273 6L8.87869 11.0002M13.7273 6L8.87869 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </ChainArrow>


                <ChainSelector
                    chain={chainTo}
                    chainList={chainList}
                    toggleDocClickHandler={toggleDocClickHandler}
                    onChainChange={(chain: any) => {
                        setChainTo(chain)
                        // setChain({ chainId: `0x${chain.chainId?.toString(16)}` }, chain.chainId, chainTo.chainId, true)

                    }}
                />
            </ChainPairs>


            <Token
                title="Send"
                selectToken={selectInputToken}
                tokens={inputTokens}
                amount={sendAmount}
                balance={inputBalance}
                loadingBalance={inputBalanceLoading}
                disabled={false}
                prices={prices}
                amountUSD={fromUSD}
                onTokenChange={(token: any) => {
                    setSelectInputToken(token)
                    setSendAmount('')
                    setReceiveAmount('')
                    setInputBalance('0')
                    setOutputBalance('0')
                    setInputBalanceLoading(false)
                }}
                onInputChange={(val: any) => {
                    setSendAmount(val)
                }}
            />

            <TokenSpace>
                <TransformArrow>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.49992 1V11.5M6.49992 11.5L1 6M6.49992 11.5L12 6" stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </TransformArrow>
            </TokenSpace>



            <Token
                title="Receive"
                selectToken={selectOutputToken}
                tokens={outputTokens}
                amount={receiveAmount}
                balance={outputBalance}
                loadingBalance={outputBalanceLoading}
                disabled={true}
                prices={prices}
                amountUSD={toUSD}
                onTokenChange={(token: any) => {
                    setReceiveAmount('')
                    setOutputBalance('0')
                    setOutputBalanceLoading(false)
                }}

            />


            {/* <Widget
                src="dapdapbos.near/widget/Bridge.AddressInput"
                props={{
                    checked: state.otherAddressChecked,
                    address: state.toAddress,
                    isValidAddress: state.isValidAddress,
                    onCheck: () => {
                        State.update({
                            otherAddressChecked: !state.otherAddressChecked
                        })
                    },
                    onChange: (value) => {
                        State.update({
                            toAddress: value,
                        })
    
                        const isValidAddress = ethers.utils.isAddress(value)
    
                        State.update({
                            isValidAddress
                        })
    
                    }
                }}
            /> */}


            <FeeMsg
                duration={duration}
                gasCostUSD={gasCostUSD ? balanceFormated(gasCostUSD) : ''}
            />

            {
                showWarning ? <Alert /> : null
            }

            <TokenSpace height={'12px'} />




            <SubmitBtn style={{ opacity: canRoute ? 0.2 : 1 }} onClick={async () => {
                if (btnText === 'Switch Chain') {
                    setChain({ chainId: `0x${chainFrom.chainId?.toString(16)}` })
                    return
                }

                setShowConfirm(true)
            }}>{loading ? <Loading size={18} /> : null} {btnText}</SubmitBtn>
        </Content>

        <TokenSpace height={'16px'} />



        {
            showConfirm && <Confirm
                color={color}
                chainFrom={chainFrom}
                chainTo={chainTo}
                loading={isSending}
                disabled={isSendingDisabled}
                toAddress={addressFormated(otherAddressChecked ? toAddress : account)}
                duration={duration}
                gasCostUSD={gasCostUSD}
                sendAmount={balanceFormated(sendAmount) + selectInputToken.symbol}
                receiveAmount={balanceFormated(receiveAmount) + selectOutputToken.symbol}
                onClose={() => {
                    if (!isSending) {
                        setShowConfirm(false)
                    }
                }}
                onSend={() => {

                    setIsSending(true)
                    setIsSendingDisabled(true)


                    execute(route, signer).then((txHash: any) => {
                        console.log('txHash: ', txHash)
                        if (!txHash) {
                            return
                        }

                        // getTokenBalance(chainFrom, selectInputToken)
                        //     .then(balance => {
                        //         State.update({
                        //             inputBalance: balance,
                        //         })

                        //     })

                        // getTokenBalance(state.chainTo, state.selectOutputToken)
                        //     .then(balance => {
                        //         State.update({
                        //             outputBalance: balance,
                        //         })
                        //     })

                        setShowConfirm(false)
                        setIsSending(false)
                        setIsSendingDisabled(false)


                        // saveTransaction(`bridge-${account}-${tool}`, {
                        //     hash: txHash,
                        //     link: getChainScan(state.chainFrom.chainId),
                        //     duration: route.duration,
                        //     fromChainId: state.chainFrom.chainId,
                        //     fromChainLogo: state.chainFrom.icon,
                        //     fromTokenLogo: state.selectInputToken.logoURI,
                        //     fromAmount: state.sendAmount,
                        //     fromTokenSymbol: state.selectInputToken.symbol,
                        //     toChainId: state.chainTo.chainId,
                        //     toChainLogo: state.chainTo.icon,
                        //     toTokenLogo: state.selectOutputToken.logoURI,
                        //     toAmout: state.receiveAmount,
                        //     toToenSymbol: state.selectOutputToken.symbol,
                        //     time: Date.now(),
                        // })

                        toast.success({
                            title: 'Transaction success',
                            text: '',
                        })

                        refreshTransactionList()

                    }).catch((err: any) => {

                        toast.fail({
                            title: 'Transaction failed',
                            text: err.toString(),
                        })

                        setIsSending(false)
                        setIsSendingDisabled(false)
                    })
                }}

            />
        }

        <Transaction
            transactionList={transactionList}
            updater={transitionUpdate}
            storageKey={`bridge-${account}-${tool}`}
            getStatus={getStatus}
            tool={tool}
            account={account}
            onRefresh={() => {
                refreshTransactionList()
            }}
        />

    </BridgePanel>
}

