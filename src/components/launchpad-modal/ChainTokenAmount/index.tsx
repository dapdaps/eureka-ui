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
  height: 100px;
  border-radius: 12px;
  border: 1px solid rgba(55, 58, 83, 1);
  transition: all 0.3s;
  /* background-color: ${(focus) => (!focus ? 'red' : 'rgba(46, 49, 66, 1)')}; */
`;
const Header = styled.div`
  display: flex;
  padding: 14px 20px 9px;
  align-items: center;
  justify-content: space-between;
`;
const ChainWapper = styled.div`
  display: flex;
  align-items: center;
`;
const ChainName = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const ChainTrigger = styled.div`
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
    border: 1px solid rgba(235, 244, 121, 0.3);
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
  padding: 0 16px;
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
  margin-top: 3px;
  padding-left: 3px;
`;

const TokenWapper = styled.div``;

const TokenTrigger = styled.div`
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
  color: #fff;
  &:hover {
    border: 1px solid rgba(235, 244, 121, 0.3);
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
  margin-top: 3px;
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

interface Props {
  title: string;
  address: string;
  chainList: Chain[];
  chainToken: any;
  currentChain: Chain | undefined;
  currentToken: Token | undefined;
  inputDisabled?: boolean;
  amount: string;
  updateBanlance: number;
  onChainChange: (chain: Chain) => void;
  onTokenChange: (token: Token) => void;
  onAmountChange?: (value: string) => void;
  onGasTrigger?: () => void;
}

export default function ChainTokenAmount({
  title,
  address,
  chainList,
  updateBanlance = 1,
  chainToken,
  currentChain,
  currentToken,
  amount,
  inputDisabled = false,
  onChainChange,
  onTokenChange,
  onAmountChange,
  onGasTrigger,
}: Props) {
  const prices = usePriceStore((store) => store.price);
  const [tokenModalShow, setTokenModalShow] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const { balance, loading } = useTokenBalance({
    currency: currentToken,
    updater: updateBanlance,
    isNative: currentChain?.nativeCurrency.symbol === currentToken?.symbol,
    isPure: false,
  });

  const { value: usdVal } = usePriceValue({
    prices,
    amount,
    symbol: currentToken?.symbol,
  });

  return (
    <Wapper
      style={{ background: '#1B1E27' }}
      // style={{ background: focus ? '#1B1E27' : 'rgba(46, 49, 66, 1)' }}
    >
      <Header>
        <ChainWapper>
          <ChainName>{title}</ChainName>
        </ChainWapper>
      </Header>
      <Content>
        <AmountWapper>
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
          <PriceWapper>{usdVal}</PriceWapper>
        </AmountWapper>
        <TokenWapper>
          <TokenTrigger
            onClick={() => {
              setTokenModalShow(true);
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
          chainList={chainList}
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
