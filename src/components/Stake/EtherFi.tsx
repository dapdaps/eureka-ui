import { useDebounce } from 'ahooks';
import { createPortal } from 'react-dom'
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSetChain } from '@web3-onboard/react';

import useAccount from '@/hooks/useAccount';
import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { balanceFormated, percentFormated } from '@/utils/balance';
import useEtherFiDetail from './hooks/useEtherFiDetail'
import useTrade from './hooks/useEtherFiTrade'
import useValue from './hooks/useValue';
import { usePriceStore } from '@/stores/price';

import Header from './componments/Header';
import TokenAction from './componments/TokenAction';
import { chains, tokens } from './chain';

const Container = styled.div`
   width: 478px;
   border: 1px solid rgba(55, 58, 83, 1);
   border-radius: 16px;
   margin: 20px auto;
   padding: 20px 0;
`

const InputActionWapper = styled.div`
    padding: 10px 20px 20px;
`
const InputActionTitle = styled.div`
    font-size: 18px;
    font-weight: 400;
    line-height: 16.8px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
        color: #fff;
    }
    .desc {
        color: rgba(151, 154, 190, 1);
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
    color: #fff;
    background: linear-gradient(90deg, #3E9BF1 0%, #9C5DF3 100%);
    
;
`

const ezToken = {
    chainId: 81457,
    name: 'weETH',
    symbol: 'weETH',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA6xJREFUeF7t3bFtHUcUheFlAQTcgDLmCpm7AueEGyCgagQ4VWA4c+BEDShTDwIcOHXGAmQ4c/z+BxwM/DG/O/POPfuf2eXO7sP7T5+/Xwf//fH4Mp39T2+/Tcevgz8wQJOQAZp+uRoBmoQI0PS7ECAKWMsRoCmIAE0/BIj65XIEaBIiQNMPAaJ+uRwBmoQI0PRDgKhfLkeAJiECNP0QIOqXyxGgSYgATT8EiPrlcgRoEiJA0+98Avz5+w/peYC/fvmWJPzw89dU//HX51Rfi9fzf/f6lH7CAwMk/S4GQIDkoEowBBAByYAiIMl3iQCLwO0iVgSIgMQwEZDkEwGXCBAB6RxaX0enyV8IgADjO5kWgRaBCWIWgUk+ESACRID/BhaI+F/A+Awqzfu3dn0VkxeB6+3h9QyoDVzXVwPV+c+fCGKAdiOJAaoC43oEGF/Hj/uf1xB1/iKgKhjrEQABooVaOQI0/XI1AiBANlE5AAIU9e5QiwAIcAcb3X4IBLhdu7tUIgAC3MVItx4EAW5V7k51CIAAd7LSbYdBgNt0u1sVAiDA3cx0y4HmBKhv+Kj7Em4R7b819YGM9cumGSA6gAGigAiw/eIIAkQDI0AUEAEQIFnIIjDJd4mApt8lAqKAIkAEJAuJgCSfCGjyXSKgCigCREDykAhI8omAJp8IqPpdIkAEJBOJgCSfCGjyiYBrvb17/UTN6b8/3wo+XYBKgNN/PwNEBzDA+Jk+EdDeMIIACPA5fTTqdATG/h+/CEaA6IDTTwAGYAARUDyAAK4Cin9ybb0KEgGxBQiAANFCrRwB4summ/yXy8DTEcgAn1wFFBOcfgJYBJbuXyIgZ+DpO2vWj7QdvwhkgO0nd+YRwAAMkFJ4/YoVERBvBCEAAiBAUMAi8G27sUIEiIBw/l7zL6+6Ckjtu+Zb20SACEgWRoAkHwK4Ffz4kixUN7eKABGQDCgCknwiQASIgOd0DrkVPL4V/OXHv9PWsNR9xXMFHhhg3oPpBBhgKv9+cAbY92A6AwaYyr8fnAH2PZjOgAGm8u8HZ4B9D6YzYICp/PvBGWDfg+kMGGAq/35wBtj3YDoDBpjKvx+cAfY9mM6AAaby7wdngH0PpjOYG6A+EFIfqqzqnz5/BogOYID/uYAMwABJgXWEiYDUvv7RKAZ4fUotWAsoAlL7zj+DGIABkgJrglkDpPadTzAGYIDtzqDTM/T0+SMAAiBA8QACFPWu8xdRDMAASQGXge4EJgPV4n8AyiPwzlyf1WoAAAAASUVORK5CYII=',
    decimals: 18,
    isNative: false,
    address: '0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A',
}

export const Stake = ({
}: {
    }) => {
    const { chainId, account, provider } = useAccount();
    const [{ settingChain }, setChain] = useSetChain();
    const [amount, setAmount] = useState<string>('')

    const [currentChain, setCurrentChain] = useState<any>(chains[5]);
    const [currentToken, setCurrentToken] = useState<any>(tokens[chains[5].chainId][0]);
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
        currency: ezToken,
        updater,
        isNative: false,
        isPure: false,
    })

    const { apr } = useEtherFiDetail(currentChain)
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
        symbol: 'stETH'
    })

    const { value: transactionCostMoney } = useValue({
        prices,
        amount: transactionCost,
        symbol: 'ETH'
    })

    useEffect(() => {
        if (currentChain?.chainId !== chainId) {
            setNeedChainSwitch(true)
            setIsError(false)
            setBtnMsg(`Switch to ${currentChain.chainName} Chain`)
            return
        }
        setNeedChainSwitch(false)

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
    }, [inputValue, ethBalance, chainId, currentChain])

    return <Container>
        <Header
            ethLoading={ethLoading}
            ethBalance={ethBalance}
            ezETHLoading={ezETHLoading}
            ezETHbalance={ezETHbalance}
            apr={apr}
            currentToken={currentToken}
            symbol="weETH"
        />
        <InputActionWapper>
            <InputActionTitle>
                <div className="title">Stake</div>
            </InputActionTitle>
            <TokenAction recived={amount}
                outputMoney={inputMoney}
                balance={ethBalance}
                chainIcon={currentChain.icon}
                tokenIcon={currentToken?.icon}
                symbol={currentToken.symbol}
                // title="Restake"
                balanceLoading={ethLoading}
                tokenAmountChange={setAmount}
                // tokenChange={() => {
                //     setChainTokenShow(true)
                // }}
            />

            <InputActionTitle>
                <div className="title">Receive</div>
                <div className="desc">1 ETH = {balanceFormated(exchangeRate)} weETH</div>
            </InputActionTitle>
            <TokenAction recived={recived}
                outputMoney={outputMoney}
                balance={ezETHbalance}
                chainIcon={currentChain.icon}
                tokenIcon={ezToken.icon}
                symbol="weETH"
                // title="Receive"
                balanceLoading={ezETHLoading}
            />
        </InputActionWapper>

        <SubmitBtn style={{ opacity: isError ? 0.2 : 1 }} onClick={async () => {
            if (needChainSwitch) {
                setChain({ chainId: `0x${currentChain.chainId.toString(16)}` });
                return
            }

            if (!isError && !isLoading) {
                await deposit(inputValue, provider.getSigner())
                setUpdater(updater + 1)
            }
        }}>{isLoading ? <Loading size={18} /> : null} {btnMsg}</SubmitBtn>


    </Container>

};

export default Stake;
