import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types'
import { balanceFormated, percentFormated } from '@/utils/balance';

import usePriceValue from '../hooks/usePriceValue';

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

const SellToken = styled.div`
  display: flex;
  height: 30px;
  gap: 5px;
  justify-content: end;
`;
const SellImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
const SellSymbol = styled.div`
  color: #fff;
  text-align: right;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

interface Props {
  title: string;
  // address: string;
  // chainList: Chain[];
  // chainToken: any;
  // currentChain: Chain | undefined;
  // currentToken: Token | undefined;
  // inputDisabled?: boolean;
  balance: string;
  amount: string;
  readOnly: boolean;
  token?: Token | undefined;
  shareUsdPrice?: string | undefined;
  // needGas: boolean;
  // updateBanlance: number;
  // onChainChange: (chain: Chain) => void;
  // onTokenChange: (token: Token) => void;
  onAmountChange?: (value: string) => void;
  // onGasTrigger?: () => void;
}

export default function ChainTokenAmount({
  title,
  balance,
  readOnly,
  // address,
  // chainList,
  // needGas = false,
  // updateBanlance = 1,
  // chainToken,
  // currentChain,
  // currentToken,
  onAmountChange,
  token,
  amount, 
  shareUsdPrice,
  // inputDisabled = false,
  // onTokenChange,
} // onChainChange,
// onAmountChange,
// onGasTrigger,
: Props) {
  const prices = usePriceStore((store) => store.price);
  const [tokenModalShow, setTokenModalShow] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  // const { balance, loading } = useTokenBalance({
  //   currency: currentToken,
  //   updater: updateBanlance,
  //   isNative: currentChain?.nativeCurrency.symbol === currentToken?.symbol,
  //   isPure: false,
  // });

  const { value: usdVal } = usePriceValue({
    prices,
    amount,
    symbol: token?.symbol,
  });

  const icon = token ? token.icon : 'https://ipfs.near.social/ipfs/bafkreidgui7lyuedwj7xk6zt2tpy6sezzgi3gj37rt43xo5bked5o5cmtm'
  const name = token ? token.symbol : 'CTG'

  return (
    <Wapper style={{ background: readOnly ? '#2E3142' : '#1B1E27' }}>
      <Header>
        <ChainWapper>
          <ChainName>{title}</ChainName>
          {/* <ChainTrigger
            onClick={() => {
              setTokenModalShow(true);
            }}
          >
            <ChainGroupImg src={currentChain?.icon} key={currentChain?.icon} />
            <ChainGroupName>{currentChain?.chainName}</ChainGroupName>
            <ArrowDown />
          </ChainTrigger> */}
        </ChainWapper>
        {/* <AddressWapper>{address}</AddressWapper> */}
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
              onAmountChange && onAmountChange(e.target.value);
            }}
            type="number"
            // disabled={inputDisabled}
            placeholder="0"
            readOnly={readOnly}
          />
          <PriceWapper>{shareUsdPrice || usdVal}</PriceWapper>
        </AmountWapper>
        <TokenWapper>
          <SellToken>
            <SellImg src={icon} />
            <SellSymbol>{ name }</SellSymbol>
          </SellToken>
          <BalanceWapper>
            <span>balance: </span>
            <span
              className="num"
              onClick={() => {
                onAmountChange && onAmountChange(balance)
              }}
            >
              {balanceFormated(balance)}
            </span>
          </BalanceWapper>
        </TokenWapper>
      </Content>
    </Wapper>
  );
}
