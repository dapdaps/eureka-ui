import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';
import { balanceFormated, percentFormated } from '@/utils/balance';

import { ArrowDown } from '../Arrow';
import usePriceValue from '../hooks/usePriceValue';
import TokenSelectModal from './TokenSelectModal';

const Wapper = styled.div`
  min-height: 145px;
  border-radius: 12px;
  border: 1px solid rgba(55, 58, 83, 1);
  transition: all 0.3s;
  /* background-color: ${(focus) => (!focus ? 'red' : 'rgba(46, 49, 66, 1)')}; */
`;
const Header = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid rgba(55, 58, 83, 1);
`;
const ChainWapper = styled.div`
  display: flex;
  align-items: center;
`;
const ChainName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  width: 30px;
`;
const ChainTrigger = styled.div<{ disabled?: boolean }>`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(46, 49, 66, 1);
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 8px;
  margin-left: 15px;
  gap: 10px;
  padding: 0 5px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    cursor: ${({ disabled = false }) => `${!disabled ? 'pointer' : 'default'}`};
    border: 1px solid ${({ disabled = false }) => `${!disabled ? 'rgba(235, 244, 121, 0.3)' : 'rgba(55, 58, 83, 1)'}`};
  }
`;
const ChainGroupImg = styled.img`
  width: 22px;
  height: 22px;
`;

const ChainGroupName = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 19.2px;
  color: #fff;
`;

const AddressWapper = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  color: rgba(151, 154, 190, 1);
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
`;

const AmountWapper = styled.div`
  flex: 1;
`;

const AmountInput = styled.input`
  width: 100%;
  display: block;
  color: rgba(255, 255, 255, 1);
  font-size: 26px;
  font-weight: 500;
  line-height: 31.2px;
  &::placeholder {
    color: rgba(151, 154, 190, 1);
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const PriceWapper = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  color: rgba(151, 154, 190, 1);
  margin-top: 10px;
  padding-left: 3px;
`;

const TokenWapper = styled.div``;

const TokenTrigger = styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid rgba(55, 58, 83, 1);
  background-color: rgba(46, 49, 66, 1);
  cursor: pointer;
  transition: all 0.3s;
  width: 160px;
  margin: 0 0 0 auto;
  &:hover {
    cursor: ${({ disabled = false }) => `${!disabled ? 'pointer' : 'default'}`};
    border: 1px solid ${({ disabled = false }) => `${!disabled ? 'rgba(235, 244, 121, 0.3)' : 'rgba(55, 58, 83, 1)'}`};
  }
`;

const TokenGroupImg = styled.div`
  position: relative;
  width: 22px;
  height: 22px;
  .token {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  .chain {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
  }
`;

const TokenGroupName = styled.div`
  color: #fff;
`;

const GasBalance = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 10px;
`;

const GasWapper = styled.div`
  border: 1px solid rgba(235, 244, 121, 1);
  border-radius: 1000px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(235, 244, 121, 1);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  margin-right: 20px;
  padding: 5px 10px;
  cursor: pointer;
`;

const BalanceWapper = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  color: rgba(151, 154, 190, 1);
  text-align: right;

  .num {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const NoConnectText = styled.div`
  color: #979abe;
  font-size: 14px;
  line-height: 32px;
`;

interface Props {
  title: string;
  address: string;
  chainList: Chain[];
  chainToken: any;
  currentChain: Chain | undefined;
  currentToken: Token | undefined;
  inputDisabled?: boolean;
  amount: string;
  needGas: boolean;
  updateBanlance: number;
  limitChain?: Chain | undefined | null;
  onChainChange: (chain: Chain) => void;
  onTokenChange: (token: Token) => void;
  onAmountChange?: (value: string) => void;
  onGasTrigger?: () => void;
}

export default function ChainTokenAmount({
  title,
  address,
  chainList,
  needGas = false,
  updateBanlance = 1,
  chainToken,
  currentChain,
  limitChain,
  currentToken,
  amount,
  inputDisabled = false,
  onChainChange,
  onTokenChange,
  onAmountChange,
  onGasTrigger
}: Props) {
  const prices = usePriceStore((store) => store.price);
  const [tokenModalShow, setTokenModalShow] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const { balance, loading } = useTokenBalance({
    currency: currentToken,
    updater: updateBanlance,
    isNative: currentChain?.nativeCurrency.symbol === currentToken?.symbol,
    isPure: false
  });

  const { value: usdVal } = usePriceValue({
    prices,
    amount,
    symbol: currentToken?.symbol
  });

  return (
    <Wapper style={{ background: 'rgba(46, 49, 66, 1)' }}>
      <Header>
        <ChainWapper>
          <ChainName>{title}</ChainName>
          <ChainTrigger
            disabled={!address}
            onClick={() => {
              if (address) {
                setTokenModalShow(true);
              }
            }}
          >
            <ChainGroupImg src={currentChain?.icon} key={currentChain?.icon} />
            <ChainGroupName>{currentChain?.chainName}</ChainGroupName>
            <ArrowDown />
          </ChainTrigger>
        </ChainWapper>
        <AddressWapper>{address}</AddressWapper>
      </Header>
      <Content style={{ background: focus ? 'rgba(27, 30, 39, 1)' : 'rgba(46, 49, 66, 1)' }}>
        <AmountWapper>
          {address || inputDisabled ? (
            <AmountInput
              value={amount}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
              onChange={(e) => {
                onAmountChange && !inputDisabled && onAmountChange(e.target.value);
              }}
              type="number"
              disabled={inputDisabled}
              placeholder="0"
            />
          ) : (
            <NoConnectText>Please connect your wallet</NoConnectText>
          )}

          <PriceWapper>{usdVal}</PriceWapper>
        </AmountWapper>
        <TokenWapper>
          <TokenTrigger
            disabled={!address}
            onClick={() => {
              if (address) {
                setTokenModalShow(true);
              }
            }}
          >
            {currentToken ? (
              <>
                <TokenGroupImg>
                  <img className="token" src={currentToken?.icon} />
                  <img className="chain" src={currentChain?.icon} />
                </TokenGroupImg>
                <TokenGroupName>{currentToken?.symbol}</TokenGroupName>
              </>
            ) : (
              <>Select a Token</>
            )}
            <ArrowDown />
          </TokenTrigger>
          <GasBalance>
            {needGas && (
              <GasWapper
                onClick={() => {
                  onGasTrigger && onGasTrigger();
                }}
              >
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.564103 9.16667V0.555556C0.564103 0.408213 0.623535 0.266905 0.729324 0.162718C0.835114 0.0585316 0.978596 0 1.12821 0H6.20513C6.35474 3.45334e-09 6.49822 0.0585316 6.60401 0.162718C6.7098 0.266905 6.76923 0.408213 6.76923 0.555556V5H7.89744C8.19666 5 8.48362 5.11706 8.6952 5.32544C8.90678 5.53381 9.02564 5.81643 9.02564 6.11111V8.61111C9.02566 8.75844 9.08511 8.89972 9.19089 9.00389C9.29668 9.10806 9.44015 9.16658 9.58974 9.16658C9.73934 9.16658 9.88281 9.10806 9.98859 9.00389C10.0944 8.89972 10.1538 8.75844 10.1538 8.61111V4.44444H9.02564C8.87603 4.44444 8.73255 4.38591 8.62676 4.28173C8.52097 4.17754 8.46154 4.03623 8.46154 3.88889V1.89667L7.84723 1.29167C7.8054 1.2505 7.77232 1.20153 7.74992 1.14763C7.72752 1.09372 7.71626 1.03596 7.71678 0.977723C7.71731 0.919483 7.72962 0.86193 7.75298 0.808427C7.77635 0.754924 7.81031 0.706543 7.85287 0.666111C7.94011 0.58322 8.05681 0.537223 8.17803 0.53795C8.29926 0.538677 8.41538 0.586069 8.50159 0.67L10.8347 2.94056C10.8872 2.99208 10.9288 3.0533 10.9572 3.1207C10.9855 3.18811 11.0001 3.26037 11 3.33333V8.61111C11 9.53167 10.3851 10 9.58974 10C8.79436 10 8.17949 9.53167 8.17949 8.61111V6.11111C8.17949 6.03744 8.14977 5.96679 8.09688 5.91469C8.04398 5.8626 7.97224 5.83333 7.89744 5.83333H6.76923V9.16667H6.91026C7.02246 9.16667 7.13008 9.21056 7.20942 9.2887C7.28876 9.36685 7.33333 9.47283 7.33333 9.58333C7.33333 9.69384 7.28876 9.79982 7.20942 9.87796C7.13008 9.9561 7.02246 10 6.91026 10H0.423077C0.31087 10 0.203259 9.9561 0.123916 9.87796C0.044574 9.79982 0 9.69384 0 9.58333C0 9.47283 0.044574 9.36685 0.123916 9.2887C0.203259 9.21056 0.31087 9.16667 0.423077 9.16667H0.564103ZM1.41026 1.11111V4.16667C1.41026 4.20315 1.41755 4.23927 1.43173 4.27297C1.4459 4.30667 1.46668 4.33729 1.49287 4.36308C1.51906 4.38888 1.55015 4.40934 1.58437 4.4233C1.61859 4.43726 1.65527 4.44444 1.69231 4.44444H5.64103C5.71583 4.44444 5.78757 4.41518 5.84047 4.36308C5.89336 4.31099 5.92308 4.24034 5.92308 4.16667V1.11111C5.92308 1.07463 5.91578 1.03851 5.90161 1.00481C5.88743 0.971109 5.86666 0.940486 5.84047 0.914692C5.81428 0.888898 5.78318 0.868438 5.74896 0.854478C5.71474 0.840518 5.67807 0.833333 5.64103 0.833333H1.69231C1.65527 0.833333 1.61859 0.840518 1.58437 0.854478C1.55015 0.868438 1.51906 0.888898 1.49287 0.914692C1.46668 0.940486 1.4459 0.971109 1.43173 1.00481C1.41755 1.03851 1.41026 1.07463 1.41026 1.11111Z"
                    fill="#EBF479"
                  />
                </svg>
                <span>Need Gas Token</span>
              </GasWapper>
            )}
            <BalanceWapper>
              <span>balance: </span>
              {loading ? (
                <Loading size={12} />
              ) : (
                <span
                  className="num"
                  onClick={() => {
                    onAmountChange && !inputDisabled && balance && onAmountChange(balance);
                  }}
                >
                  {balanceFormated(balance)}
                </span>
              )}
            </BalanceWapper>
          </GasBalance>
        </TokenWapper>
      </Content>

      {tokenModalShow && (
        <TokenSelectModal
          currentChain={currentChain}
          currentToken={currentToken}
          chainToken={chainToken}
          chainList={limitChain ? chainList.filter((chain) => chain.chainId !== limitChain.chainId) : chainList}
          onClose={() => {
            setTokenModalShow(false);
          }}
          onChainChange={onChainChange}
          onTokenChange={onTokenChange}
        />
      )}
    </Wapper>
  );
}
