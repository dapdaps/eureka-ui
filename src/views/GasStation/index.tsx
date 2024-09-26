import { useDebounce } from 'ahooks';
import Big from 'big.js';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useTokensBalance from '@/components/BridgeX/hooks/useTokensBalance';
import allTokens from '@/config/bridge/allTokens';
import useAccount from '@/hooks/useAccount';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';
import { useGasAmount, useGasTokenHooks, useSupportedSourceTokens } from '@/views/SuperBridge/hooks/useGasTokenHooks';

import Amount from './Amount/index';
import ChainSelector from './ChainSelector/index';
import DestinationAddress from './DestinationAddress/index';
import ReceiveDesc from './ReceiveDesc/index';
import SubmitPanel from './SubmitPanel/index';
import SubmitProcess from './SubmitPanel/SubmitProcess';
import TokenSeletor from './TokenSelector/index';

const Container = styled.div`
  width: 440px;
  min-height: 200px;
  margin: 20px auto;
  font-family: Jura;
`;

const Header = styled.div`
  width: 408px;
  background-color: rgba(46, 49, 66, 1);
  margin: 0 auto;
  border-radius: 16px 16px 0 0;
  border: 1px solid rgba(55, 58, 83, 1);
  padding: 10px;
`;

const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(29, 31, 43, 1);
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  padding: 4px;
  .item {
    cursor: pointer;
    flex: 1;
    height: 42px;
    color: rgba(151, 154, 190, 1);
    line-height: 42px;
    text-align: center;
    svg {
      margin-left: 5px;
    }
    &.active {
      background-color: rgba(55, 57, 77, 1);
      border-radius: 16px;
      color: #fff;
    }
  }
`;

const Content = styled.div`
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  background-color: rgba(38, 40, 54, 1);
  min-height: 730px;
  padding: 20px 36px;
  position: relative;
`;

function Ask() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_10869_6951)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.66658 10.9888C3.65328 11.6481 4.81331 12 6 12C7.5913 12 9.11743 11.3679 10.2426 10.2426C11.3679 9.11743 12 7.5913 12 6C12 4.81331 11.6481 3.65328 10.9888 2.66658C10.3295 1.67989 9.39246 0.910851 8.2961 0.456725C7.19975 0.00259969 5.99335 -0.11622 4.82946 0.115291C3.66558 0.346802 2.59648 0.918247 1.75736 1.75736C0.918247 2.59648 0.346802 3.66558 0.115291 4.82946C-0.11622 5.99335 0.00259969 7.19975 0.456725 8.2961C0.910851 9.39246 1.67989 10.3295 2.66658 10.9888ZM3.08326 1.63479C3.94662 1.05791 4.96165 0.750003 6 0.750003C7.39239 0.750003 8.72775 1.30313 9.71231 2.28769C10.6969 3.27226 11.25 4.60762 11.25 6C11.25 7.03835 10.9421 8.05339 10.3652 8.91675C9.78834 9.7801 8.9684 10.453 8.00909 10.8504C7.04978 11.2477 5.99418 11.3517 4.97578 11.1491C3.95738 10.9466 3.02192 10.4465 2.28769 9.71231C1.55347 8.97809 1.05345 8.04263 0.85088 7.02423C0.648308 6.00583 0.752275 4.95023 1.14964 3.99091C1.547 3.0316 2.2199 2.21166 3.08326 1.63479ZM7.85991 3.91193C7.7705 3.69618 7.63487 3.50265 7.46257 3.34499C7.07534 3.02446 6.58052 2.86354 6.07882 2.89499C5.80397 2.88152 5.52926 2.92411 5.27139 3.02017C5.01352 3.11623 4.77788 3.26374 4.57882 3.45374C4.3881 3.65229 4.24011 3.88784 4.144 4.14583C4.0479 4.40383 4.00572 4.6788 4.02007 4.95374H4.92757C4.90733 4.63612 4.9902 4.32046 5.16382 4.05374C5.26418 3.9244 5.39538 3.8223 5.5454 3.75679C5.69543 3.69127 5.85949 3.66444 6.02257 3.67874C6.15892 3.66854 6.2959 3.68659 6.42495 3.73176C6.554 3.77693 6.67234 3.84824 6.77257 3.94124C6.94808 4.13738 7.03964 4.39456 7.02757 4.65749C7.02315 4.89058 6.93987 5.1153 6.79132 5.29499L6.64132 5.45999C6.25484 5.76755 5.91835 6.13313 5.64382 6.54374C5.52532 6.80346 5.46883 7.08718 5.47882 7.37249V7.52249H6.39382V7.37249C6.38935 7.16884 6.43712 6.96744 6.53257 6.78749C6.62782 6.61608 6.75513 6.46458 6.90757 6.34124C7.17091 6.12884 7.42135 5.90093 7.65757 5.65874C7.88002 5.34924 7.99345 4.97465 7.98007 4.59374C7.99034 4.36042 7.94932 4.12768 7.85991 3.91193ZM6.54777 8.37753C6.516 8.29908 6.46727 8.22863 6.40507 8.17124C6.34353 8.11348 6.27094 8.06876 6.19168 8.03976C6.11242 8.01076 6.02811 7.99808 5.94382 8.00249C5.86121 7.99865 5.77872 8.01238 5.7018 8.04276C5.62487 8.07314 5.55527 8.11948 5.49757 8.17874C5.43418 8.23394 5.38406 8.30274 5.35094 8.38C5.31783 8.45727 5.30258 8.54101 5.30632 8.62499C5.30924 8.79181 5.37706 8.95093 5.49539 9.06856C5.61372 9.18618 5.77323 9.25306 5.94007 9.25499C6.11166 9.25644 6.27756 9.19355 6.40507 9.07874C6.46495 9.01958 6.51213 8.94883 6.54373 8.87081C6.57532 8.79279 6.59067 8.70914 6.58882 8.62499C6.59356 8.54048 6.57954 8.45598 6.54777 8.37753Z"
          fill="#979ABE"
        />
      </g>
      <defs>
        <clipPath id="clip0_10869_6951">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

interface Props {
  chainList: Chain[];
}

const DefaultTokenList = [
  {
    chainId: 1,
    name: 'ETH',
    symbol: 'ETH',
    icon: '/assets/tokens/eth.png',
    decimals: 18,
    isNative: true,
    address: 'native'
  },
  {
    chainId: 1,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USDC',
    symbol: 'USDC',
    icon: 'https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694',
    decimals: 6
  },
  {
    chainId: 1,
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'Tether USD',
    symbol: 'USDT',
    icon: '/assets/tokens/usdt.png',
    decimals: 6
  }
];

const symbols = DefaultTokenList.map((item) => item.symbol);

export default function GasStation({ chainList }: Props) {
  const { account, chainId, provider } = useAccount();
  const [fromChain, setFromChain] = useState<Chain | undefined>(chainList[0]);
  const [toChain, setToChain] = useState<Chain | undefined>(chainList[1]);
  const [amount, setAmount] = useState<string | number | undefined>(undefined);
  const [inputVal, setInputVal] = useState<string | number>(0);
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token>();
  const [canSend, setCanSend] = useState<boolean>(false);
  const [chainFromToken, setChainFromToken] = useState<Token | undefined>();
  const [submitProcessShow, setSubmitProcessShow] = useState(false);
  const [step, setStep] = useState(0);
  const [gas, setGas] = useState<any>(0);
  const fromChainRef = useRef<any>(null);
  const [gasAmountParam, setGasAmountParam] = useState<any>({
    fromChain,
    toChain,
    fromToken: chainFromToken,
    value: inputVal
  });
  const prices = usePriceStore((store) => store.price);
  const inputGasAmountParam = useDebounce(gasAmountParam, { wait: 500 });
  const { isSupported, supportedChainFrom, getStatus } = useGasTokenHooks({
    fromChain,
    toChain,
    fromToken: chainFromToken
  });

  const { supportedTokens } = useSupportedSourceTokens({
    fromChain,
    toChain
  });

  const { receive, isLoading, deposit, estimateGas } = useGasAmount(inputGasAmountParam);

  const { balances } = useTokensBalance(tokenList);

  useEffect(() => {
    if (supportedTokens && supportedTokens.length) {
      const addresses = supportedTokens.map((item) => item.token_address.toLowerCase());
      const _tokenList = allTokens[fromChainRef.current.chainId];
      const tokenList = _tokenList.filter((token) => addresses.indexOf(token.address.toLowerCase()) > -1);
      setTokenList(tokenList);
    } else {
      setTokenList([]);
    }
  }, [supportedTokens]);

  useEffect(() => {
    if (tokenList && fromToken) {
      const _filter = tokenList.filter((token) => {
        return token.symbol === fromToken.symbol;
      });
      if (_filter && _filter.length) {
        setChainFromToken(_filter[0]);
      } else {
        setChainFromToken(undefined);
      }
    } else {
      setChainFromToken(undefined);
    }
  }, [fromToken, tokenList]);

  useEffect(() => {
    if (amount && chainFromToken && toChain && prices) {
      const _amount = Number(amount) / Number(prices[chainFromToken.symbol]);
      setInputVal(_amount);
    } else {
      setInputVal(0);
    }
  }, [amount, chainFromToken, toChain, prices]);

  useEffect(() => {
    setGasAmountParam({
      fromChain,
      toChain,
      fromToken: chainFromToken,
      value: inputVal
    });
  }, [fromChain, toChain, chainFromToken, inputVal]);

  useEffect(() => {
    async function getGas() {
      try {
        if (fromChain && toChain && chainFromToken) {
          const price = await provider.getSigner().getGasPrice();
          const gasLimit = await estimateGas(
            chainFromToken?.address,
            account as string,
            new Big(inputVal).mul(10 ** chainFromToken?.decimals).toString(),
            provider.getSigner()
          );

          const gas = (Number(gasLimit) * Number(price.toString())) / 10 ** chainFromToken?.decimals;

          return gas;
        }
      } catch (e) {
        return 0;
      }
    }

    if (fromChain && toChain && chainFromToken && inputVal && receive && balances) {
      const address = chainFromToken.isNative ? 'native' : chainFromToken.address;
      if (balances[address] && Number(balances[address]) > Number(receive)) {
        setCanSend(true);

        getGas().then(setGas);
      } else {
        setCanSend(false);
      }
    } else {
      setCanSend(false);
    }
  }, [fromChain, toChain, chainFromToken, inputVal, receive, balances]);

  useEffect(() => {
    fromChainRef.current = fromChain;
  }, [fromChain]);

  return (
    <Container>
      <Header>
        {/* <HeaderItems>
                <div className="item active">
                    Login mode
                    <Ask />
                </div>
                <div className="item">
                    Login free mode
                    <Ask />
                </div>
            </HeaderItems> */}
      </Header>
      <Content>
        <ChainSelector
          onFromChainChange={(chain: Chain) => setFromChain(chain)}
          onToChainChange={(chain: Chain) => setToChain(chain)}
          chainList={chainList}
          fromChain={fromChain}
          toChain={toChain}
        />

        <div style={{ marginTop: 20 }}></div>

        <TokenSeletor
          selectedToken={fromToken}
          balances={balances}
          tokenList={tokenList}
          onTokenChoose={(token) => {
            setFromToken(token);
          }}
        />

        <div style={{ marginTop: 20 }}></div>
        <Amount
          value={amount}
          onChange={(v) => {
            setAmount(v);
          }}
        />

        <div style={{ marginTop: 20 }}></div>
        {/* <DestinationAddress /> */}

        {isSupported && receive && amount && toChain && (
          <div>
            <div style={{ marginTop: 20 }}></div>
            <ReceiveDesc
              gas={gas}
              gasPrice={Number(gas) * Number(prices[toChain?.nativeCurrency.symbol])}
              receivePrice={Number(receive) * Number(prices[toChain?.nativeCurrency.symbol])}
              receive={receive}
              loading={isLoading}
              toChain={toChain}
            />
          </div>
        )}

        <SubmitPanel
          disabled={!canSend}
          payPrice={fromToken && amount}
          pay={inputVal}
          token={fromToken}
          loading={isLoading}
          fromChain={fromChain}
          onClick={async () => {
            if (canSend && chainFromToken) {
              setSubmitProcessShow(true);
              setStep(0);
              const hash = await deposit(
                chainFromToken.address,
                account as string,
                new Big(inputVal).mul(10 ** chainFromToken?.decimals).toString(),
                provider.getSigner()
              );
              setStep(1);
              await getStatus(supportedChainFrom, hash);
            }
          }}
        />

        {submitProcessShow && (
          <SubmitProcess
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken}
            payPrice={fromToken && amount}
            address={account as string}
            pay={inputVal}
            step={step}
            disabled={isLoading}
            onClose={() => {
              setSubmitProcessShow(false);
            }}
          />
        )}
      </Content>
    </Container>
  );
}
