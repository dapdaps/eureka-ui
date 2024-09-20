import { useSetChain } from '@web3-onboard/react';
import { useDebounce } from 'ahooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useConnectWallet from '@/hooks/useConnectWallet';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { usePriceStore } from '@/stores/price';
import { balanceFormated, percentFormated } from '@/utils/balance';

import { chains, tokens } from './chain';
import ChainTokens from './componments/ChainTokens';
import Header from './componments/Header';
import TokenAction from './componments/TokenAction';
import useEtherFiDetail from './hooks/useEtherFiDetail';
import useTrade from './hooks/useEtherFiTrade';
import useValue from './hooks/useValue';

const Container = styled.div`
  width: 478px;
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  margin: 20px auto;
  padding: 20px 0;
  position: relative;
`;

const InputActionWapper = styled.div`
  padding: 10px 20px 20px;
`;
const InputActionTitle = styled.div`
  font-weight: 400;
  line-height: 16.8px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    color: #fff;
    font-weight: 700;
    font-size: 18px;
  }
  .desc {
    color: rgba(151, 154, 190, 1);
    font-size: 14px;
  }
`;

const SubmitBtn = styled.button`
  margin: 0 auto;
  display: block;
  height: 48px;
  width: calc(100% - 40px);
  line-height: 48px;
  text-align: center;
  border-radius: 8px;
  color: #fff;
  background: linear-gradient(90deg, #3e9bf1 0%, #9c5df3 100%);
`;

const ezTokens: any = {
  81457: {
    chainId: 81457,
    name: 'weETH',
    symbol: 'weETH',
    icon: 'https://etherscan.io/token/images/etherfiweeth_32.png',
    decimals: 18,
    isNative: false,
    address: '0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A'
  },
  59144: {
    chainId: 59144,
    name: 'weETH',
    symbol: 'weETH',
    icon: 'https://etherscan.io/token/images/etherfiweeth_32.png',
    decimals: 18,
    isNative: false,
    address: '0x1Bf74C010E6320bab11e2e5A532b5AC15e0b8aA6'
  },
  34443: {
    chainId: 34443,
    name: 'weETH',
    symbol: 'weETH',
    icon: 'https://etherscan.io/token/images/etherfiweeth_32.png',
    decimals: 18,
    isNative: false,
    address: '0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A'
  },
  8453: {
    chainId: 34443,
    name: 'weETH',
    symbol: 'weETH',
    icon: 'https://etherscan.io/token/images/etherfiweeth_32.png',
    decimals: 18,
    isNative: false,
    address: '0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A'
  }
};

interface Props {
  chainIndex: number;
}

export const Stake = ({ chainIndex }: Props) => {
  const { chainId, account, provider } = useAccount();
  const [{ settingChain }, setChain] = useSetChain();
  const [amount, setAmount] = useState<string>('');
  const [chainTokenShow, setChainTokenShow] = useState<boolean>(false);
  const { onConnect } = useConnectWallet();

  const { addAction } = useAddAction('dapp');
  const [currentChain, setCurrentChain] = useState<any>(chains[chainIndex]);
  const [currentToken, setCurrentToken] = useState<any>(tokens[chains[chainIndex].chainId][0]);
  const [needChainSwitch, setNeedChainSwitch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [btnMsg, setBtnMsg] = useState('Confirm');
  const [updater, setUpdater] = useState(1);
  const [ezToken, setEzToken] = useState<any>(ezTokens[currentChain.chainId]);

  const prices = usePriceStore((store) => store.price);

  const inputValue = useDebounce(amount, { wait: 500 });

  const { balance: ethBalance, loading: ethLoading } = useTokenBalance({
    currency: currentToken,
    updater,
    isNative: currentToken.isNative,
    isPure: false
  });

  const { balance: ezETHbalance, loading: ezETHLoading } = useTokenBalance({
    currency: ezToken,
    updater,
    isNative: false,
    isPure: false
  });

  const { apr } = useEtherFiDetail(currentChain);
  const { rate, recived, exchangeRate, transactionCost, deposit, isLoading } = useTrade({
    amount: inputValue,
    provider: provider,
    account: account as string,
    isError: isError,
    chain: currentChain
  });

  const { value: inputMoney } = useValue({
    prices,
    amount: inputValue,
    symbol: currentToken.symbol
  });

  const { value: outputMoney } = useValue({
    prices,
    amount: recived,
    symbol: 'weETH'
  });

  const { value: transactionCostMoney } = useValue({
    prices,
    amount: transactionCost,
    symbol: 'ETH'
  });

  useEffect(() => {
    if (!chainId) {
      setIsError(false);
      setBtnMsg(`Connect Wallet`);
      return;
    }

    if (currentChain?.chainId !== chainId) {
      setNeedChainSwitch(true);
      setIsError(false);
      setBtnMsg(`Switch to ${currentChain.chainName} Chain`);
      return;
    }
    setNeedChainSwitch(false);

    if (!inputValue || isNaN(Number(inputValue))) {
      setIsError(true);
      setBtnMsg('Enter an amount');
      return;
    }

    if (Number(inputValue) >= Number(ethBalance)) {
      setIsError(true);
      setBtnMsg('Insufficient balance');
      return;
    }

    setIsError(false);
    setBtnMsg('Confirm');
  }, [inputValue, ethBalance, chainId, currentChain]);

  return (
    <Container>
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
        <TokenAction
          recived={amount}
          outputMoney={inputMoney}
          balance={ethBalance}
          chainIcon={currentChain.icon}
          tokenIcon={currentToken?.icon}
          symbol={currentToken.symbol}
          // title="Restake"
          balanceLoading={ethLoading}
          tokenAmountChange={setAmount}
          tokenChange={() => {
            setChainTokenShow(true);
          }}
        />

        <InputActionTitle>
          <div className="title">Receive</div>
          <div className="desc">1 ETH = {balanceFormated(exchangeRate)} weETH</div>
        </InputActionTitle>
        <TokenAction
          recived={recived}
          outputMoney={outputMoney}
          balance={ezETHbalance}
          chainIcon={currentChain.icon}
          tokenIcon={ezToken.icon}
          symbol="weETH"
          // title="Receive"
          balanceLoading={ezETHLoading}
        />
      </InputActionWapper>

      <SubmitBtn
        style={{ opacity: isError ? 0.2 : 1 }}
        onClick={async () => {
          if (!account) {
            onConnect();
            return;
          }

          if (needChainSwitch) {
            setChain({ chainId: `0x${currentChain.chainId.toString(16)}` });
            return;
          }

          if (!isError && !isLoading) {
            const transactionHash = await deposit(inputValue, provider.getSigner());
            if (transactionHash) {
              addAction({
                type: 'Staking',
                fromChainId: currentChain.chainId,
                toChainId: currentChain.chainId,
                token: currentToken,
                amount: amount,
                template: 'ether.fi',
                add: false,
                status: 1,
                action: 'Staking',
                transactionHash,
                action_network_id: currentChain.chainName
              });
            }

            setUpdater(updater + 1);
          }
        }}
      >
        {isLoading ? <Loading size={18} /> : null} {btnMsg}
      </SubmitBtn>

      {chainTokenShow ? (
        <ChainTokens
          chains={chains.filter((item: any) => [81457, 59144, 8453].indexOf(item.chainId) > -1)}
          tokens={tokens}
          chain={currentChain}
          token={currentToken}
          onClose={() => {
            setChainTokenShow(false);
          }}
          onChainTokenChange={(chain, token) => {
            setCurrentChain(chain);
            setCurrentToken(token);
            setEzToken(ezTokens[chain.chainId]);
          }}
        />
      ) : null}
    </Container>
  );
};

export default Stake;
