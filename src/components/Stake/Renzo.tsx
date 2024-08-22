import { useSetChain } from '@web3-onboard/react';
import { useDebounce } from 'ahooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom'
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useConnectWallet from '@/hooks/useConnectWallet';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { useChainsStore } from '@/stores/chains';
import { usePriceStore } from '@/stores/price';
import { balanceFormated, percentFormated } from '@/utils/balance';

import { chains, tokens } from './chain';
import { ArrowDown, ArrowUp } from './componments/Arrows'
import ChainTokens from './componments/ChainTokens';
import Header from './componments/Header';
import Msg from './componments/Msg';
import TokenAction from './componments/TokenAction';
import useRenzoDetail from './hooks/useRenzoDetail'
import useTrade from './hooks/useRenzoTrade'
import useValue from './hooks/useValue';

const Container = styled.div`
   
`

const InputActionWapper = styled.div`
    padding: 10px 20px 20px;
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

const ezToken = {
    chainId: 1,
    name: 'ETH',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628',
    decimals: 18,
    isNative: false,
    address: '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110',
}

export const Stake = () => {
    const { chainId, account, provider } = useAccount();
    const [{ settingChain }, setChain] = useSetChain();
    const { onConnect } = useConnectWallet();
    const { addAction } = useAddAction('dapp');

    const [amount, setAmount] = useState<string>('')
    const [currentChain, setCurrentChain] = useState<any>(chains[0]);
    const [currentToken, setCurrentToken] = useState<any>(tokens[chains[0].chainId][0]);
    const [_ezToken, setEzToken] = useState<any>(ezToken);
    const [chainTokenShow, setChainTokenShow] = useState<boolean>(false);
    const [needChainSwitch, setNeedChainSwitch] = useState(false)
    const [isError, setIsError] = useState(false)
    const [btnMsg, setBtnMsg] = useState('Confirm')
    const [updater, setUpdater] = useState(1)

    const prices = usePriceStore((store) => store.price);

    const inputValue = useDebounce(amount, { wait: 500 });

    const { balance: ethBalance, loading: ethLoading } = useTokenBalance({
        currency: currentToken,
        updater,
        isNative: currentToken.isNative,
        isPure: false,
    })

    const { balance: ezETHbalance, loading: ezETHLoading } = useTokenBalance({
        currency: _ezToken,
        updater,
        isNative: false,
        isPure: false,
    })

    const { apr } = useRenzoDetail(currentChain)
    const { rate, recived, exchangeRate, transactionCost, deposit, isLoading } = useTrade({
        amount: inputValue,
        provider: provider,
        account: account as string,
        isError: isError,
        chainId: Number(currentChain?.chainId),
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
        if (!chainId) {
            setIsError(false)
            setBtnMsg(`Connect Wallet`)
            return
        }

        if (currentChain?.chainId !== chainId) {
            setNeedChainSwitch(true)
            setIsError(false)
            setBtnMsg(`Switch to ${currentChain.chainName} Chain`)
            return
        }
        setNeedChainSwitch(false)

        if (!inputValue || isNaN(Number(inputValue))) {
            setIsError(true)
            setBtnMsg('Enter an amount')
            return
        }

        if (Number(inputValue) >= Number(ethBalance)) {
            setIsError(true)
            setBtnMsg('Insufficient balance')
            return
        }

        setIsError(false)
        setBtnMsg('Confirm')
    }, [inputValue, ethBalance, chainId, currentChain])

    return <Container>
        <Header
            ethLoading={ethLoading}
            ethBalance={ethBalance}
            ezETHLoading={ezETHLoading}
            ezETHbalance={ezETHbalance}
            apr={apr}
            currentToken={currentToken}
            symbol="ezETH"
        />
        <InputActionWapper>
            <TokenAction recived={amount}
                outputMoney={inputMoney}
                balance={ethBalance}
                chainIcon={currentChain.icon}
                tokenIcon={currentToken?.icon}
                symbol={currentToken.symbol}
                title="Restake"
                balanceLoading={ethLoading}
                tokenAmountChange={setAmount}
                tokenChange={() => {
                    setChainTokenShow(true)
                }}
            />

            <TokenAction recived={recived}
                outputMoney={outputMoney}
                balance={ezETHbalance}
                chainIcon={currentChain.icon}
                tokenIcon={ezToken.icon}
                symbol="ezETH"
                title="Receive"
                balanceLoading={ezETHLoading}
            />
        </InputActionWapper>

        <SubmitBtn style={{ opacity: isError ? 0.2 : 1 }} onClick={async () => {
            if (!account) {
                onConnect()
                return
            }

            if (needChainSwitch) {
                setChain({ chainId: `0x${currentChain.chainId.toString(16)}` });
                return
            }

            if (!isError && !isLoading) {
                const transactionHash = await deposit(inputValue, provider.getSigner())
                if (transactionHash) {
                    addAction({
                        type: "Staking",
                        fromChainId: currentChain.chainId,
                        toChainId: currentChain.chainId,
                        token: currentToken,
                        amount: amount,
                        template: "Renzo Stake",
                        add: false,
                        status: 1,
                        action: 'Staking',
                        transactionHash,
                        action_network_id: currentChain.chainName,
                    });
                }

                setUpdater(updater + 1)
            }
        }}>{isLoading ? <Loading size={18} /> : null} {btnMsg}</SubmitBtn>

        <Msg exchangeRate={exchangeRate} transactionCostMoney={transactionCostMoney} rewardFee="10%" symbol="ezETH" />

        {
            chainTokenShow ? <ChainTokens
                chains={chains.filter((item: any) => [1, 42161, 56, 59144, 8453, 34443].indexOf(item.chainId) > -1)}
                tokens={tokens}
                chain={currentChain}
                token={currentToken}
                onClose={() => {
                    setChainTokenShow(false)
                }}
                onChainTokenChange={(chain, token) => {
                    setCurrentChain(chain)
                    setCurrentToken(token)
                    const newEzToken = {
                        ..._ezToken,
                        chainId: chain.chainId,
                        address: chain.chainId === 1 ? '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110' : '0x2416092f143378750bb29b79eD961ab195CcEea5'
                    }

                    setEzToken(newEzToken)
                }} /> : null
        }

    </Container>

};

export default Stake;
