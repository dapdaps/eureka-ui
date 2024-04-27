import { useDebounce } from 'ahooks';
import { createPortal } from 'react-dom'
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { balanceFormated, percentFormated } from '@/utils/balance';
import useRenzoDetail from './hooks/useRenzoDetail'
import useTrade from './hooks/useTrade'
import useValue from './hooks/useValue';
import { usePriceStore } from '@/stores/price';
import { useChainsStore } from '@/stores/chains';

import ChainTokens from './ChainTokens';
import { chains, tokens } from './chain';

const Container = styled.div`
   
`

const Summary = styled.div`
    display: flex;
    padding: 0 20px 20px;
    border-bottom: 1px solid rgba(55, 58, 83, 1);
    align-items: center;
    justify-content: space-between;
`

const SummaryItem = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    .title {
        color: rgba(151, 154, 190, 1);
    }
    .amount {
        margin-top: 5px;
        color: rgba(255, 255, 255, 1);
    }
`

const InputActionWapper = styled.div`
    padding: 20px;
`

const InputAction = styled.div`
    height: 100px;
    border-radius: 12px;
    border: 1px solid rgba(55, 58, 83, 1);
    background-color: rgba(46, 49, 66, 1);
    padding: 15px;
    &.spe {
        margin-top: 10px;
    }
`

const InputActionTitle = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
`

const TokenActionWapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    .input {
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        border: none;
        height: 24px;
        width: 200px;
    }
    .token {
        height: 35px;
        border-radius: 8px;
        min-width: 106px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        cursor: pointer;
        &.t-border {
            border: 1px solid rgba(55, 58, 83, 1);
        }
        .chian-token {
            position: relative;
            width: 20px;
            height: 20px;
            .token-icon {
                display: block;
                width: 100%;
                height: 100%;
            }
            .chain-icon {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 8px;
                height: 8px;
            }
        }
        .token-name {
            color: #fff;
            font-size: 16px;
            font-weight: 400;
        }
        .arrow {

        }
    }
`

const BalanceWapper = styled.div`
    display: flex;
    justify-content: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
    margin-top: 5px;
    .price-value {
        
    }
    .balance-value {
        .balance-text {
            color: #fff;
            text-decoration: underline;
            cursor: pointer;
        }
    }
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

const MsgWapper = styled.div`
    position: relative;
    padding: 20px;
`

const MsgHeader = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
`

const MsgFold = styled.div`
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 15px;
`

const MsgDetail = styled.div`
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 10px;
    padding: 12px;
    margin-top: 12px;
`

const MsgDetailItem = styled.div`
    display: flex;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    justify-content: space-between;
    align-items: center;
    color: rgba(151, 154, 190, 1);
    &:not(:first-child) {
        margin-top: 10px;
    }
`

const ArrowDown = () => {
    return <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 5L11 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
    </svg>
}

const ArrowUp = () => {
    return <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 1.5L6.5 6.5L1.5 1.5" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
    </svg>
}

const ezToken = {
    chainId: 1,
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    isNative: false,
    address: '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110',
}

export const Stake = ({
}: {
    }) => {
    // const chains = useChainsStore((store: any) => store.chains);
    const { chainId, account, provider } = useAccount();
    const [ amount, setAmount ] = useState<string>('')
    const [currentChain, setCurrentChain] = useState<any>(chains[0]);
    const [currentToken, setCurrentToken] = useState<any>(tokens[chains[0].chainId][0]);
    const [chainTokenShow, setChainTokenShow] = useState<boolean>(false);
    const [needChainSwitch, setNeedChainSwitch] = useState(false)
    const [isError, setIsError] = useState(false)
    const [btnMsg, setBtnMsg] = useState('Confirm')
    const prices = usePriceStore((store) => store.price);

    const inputValue = useDebounce(amount, { wait: 500 });

    const { balance: ethBalance, loading: ethLoading } = useTokenBalance({
        currency: currentToken,
        updater: 1,
        isNative: currentToken.isNative,
        isPure: false,
    })

    const { balance: ezETHbalance, loading: ezETHLoading } = useTokenBalance({
        currency: ezToken,
        updater: 1,
        isNative: false,
        isPure: false,
    })

    const { apr } = useRenzoDetail(currentChain)
    const { rate, recived, exchangeRate, transactionCost, deposit } = useTrade({
        amount: inputValue,
        provider: provider,
        account: account as string,
        isError: isError,
    })

    const { value: inputMoney } = useValue({
        prices,
        amount: inputValue,
        symbol: currentToken.symbol
    })

    const { value: outputMoney } = useValue({
        prices,
        amount: recived,
        symbol: 'ezETH'
    })

    const { value: transactionCostMoney } = useValue({
        prices,
        amount: transactionCost,
        symbol: 'ETH'
    })


    useEffect(() => {
        if (currentChain?.chainId !== chainId) {
            setNeedChainSwitch(true)
            setBtnMsg('Switch to Ethereum Chain')
        } else {
            setNeedChainSwitch(false)
        }
    }, [chainId, currentChain])

    useEffect(() => {
        if (!inputValue || isNaN(Number(inputValue))) {
            setIsError(true)
            setBtnMsg('Illegal value')
            return
        }

        if (Number(inputValue) >= Number(ethBalance)) {
            setIsError(true)
            setBtnMsg('Insufficient balance')
            return
        }

        setIsError(false)
        setBtnMsg('Confirm')
    }, [inputValue, ethBalance])

    return <Container>
        <Summary>
            <SummaryItem>
                <div className="title">Available to stake</div>
                <div className="amount">{ethLoading ? <Loading size={14} /> : balanceFormated(ethBalance)} {currentToken.symbol}</div>
            </SummaryItem>
            <SummaryItem>
                <div className="title">Staked amount</div>
                <div className="amount">{ezETHLoading ? <Loading size={14} /> : balanceFormated(ezETHbalance || 0)} ezETH</div>
            </SummaryItem>
            <SummaryItem>
                <div className="title">APR</div>
                <div className="amount">{percentFormated(apr || 0)}</div>
            </SummaryItem>
        </Summary>
        <InputActionWapper>
            <InputAction>
                <InputActionTitle>Restake</InputActionTitle>
                <TokenActionWapper>
                    <input className="input" placeholder='0' value={amount} onChange={(e) => {
                        setAmount(e.target.value)
                    }} />
                    <div className="token t-border" onClick={() => {
                        setChainTokenShow(true)
                    }}>
                        <div className="chian-token">
                            <img src={currentToken?.icon} className="token-icon" />
                            <img src={currentChain?.icon} className="chain-icon" />
                        </div>
                        <div className='token-name'>{currentToken?.name}</div>
                        <div className='arrow'><ArrowDown /></div>
                    </div>
                </TokenActionWapper>
                <BalanceWapper>
                    <div className="price-value">{inputMoney}</div>
                    <div className="balance-value">Balance:<span className="balance-text">
                        {ethLoading ? <Loading size={14} /> : balanceFormated(ethBalance)} {currentToken.symbol}
                    </span></div>
                </BalanceWapper>
            </InputAction>

            <InputAction className="spe">
                <InputActionTitle>Receive</InputActionTitle>
                <TokenActionWapper>
                    <input className="input" disabled placeholder='0' value={recived}/>
                    <div className="token" >
                        <div className="chian-token">
                            <img src="https://app.renzoprotocol.com/_next/image?url=%2Ftokens%2FezETH.png&w=32&q=75" className="token-icon" />
                            <img src="https://assets.dapdap.net/images/bafkreicjsbkvvcxahxjejkctwopcnmzbeskxhfrkg7lyawhkhzrxcmvgfy.svg" className="chain-icon" />
                        </div>
                        <div className='token-name'>ezETH</div>
                        <div className='arrow'></div>
                    </div>
                </TokenActionWapper>
                <BalanceWapper>
                    <div className="price-value">{ outputMoney }</div>
                    <div className="balance-value">Balance:<span >{balanceFormated(ezETHbalance)}</span></div>
                </BalanceWapper>
            </InputAction>
        </InputActionWapper>

        <SubmitBtn style={{ opacity: isError ? 0.2 : 1 }} onClick={() => {
            if (!isError) {
                deposit(inputValue, provider.getSigner(), Number(currentChain?.chainId))
            }
        }}>{btnMsg}</SubmitBtn>

        <MsgWapper>
            <MsgHeader>1 ETH = {exchangeRate ? balanceFormated(exchangeRate) : <Loading size={14} />} ezETH</MsgHeader>
            <MsgFold>
                <ArrowDown />
            </MsgFold>
            <MsgDetail>
                <MsgDetailItem>
                    <div>Transaction Cost</div>
                    <div>{transactionCostMoney}</div>
                </MsgDetailItem>
                <MsgDetailItem>
                    <div>Reward Fee</div>
                    <div>10%</div>
                </MsgDetailItem>
            </MsgDetail>
        </MsgWapper>

        {
            chainTokenShow ? <ChainTokens
                chains={chains}
                tokens={tokens}
                chain={currentChain}
                token={currentToken}
                onClose={() => {
                    setChainTokenShow(false)
                }}
                onChainTokenChange={(chain, token) => {
                    setCurrentChain(chain)
                    setCurrentToken(token)
                }} /> : null
        }

    </Container>

};

export default Stake;
