import type { Chain, Token } from '@/types'
import { addressFormated, balanceFormated, errorFormated, getFullNum, percentFormated } from '@/utils/balance';

import ChainTokenAmount from '../ChainTokenAmount';
import SellTokenAmount from '../SellTokenAmount';
import {
  ArrowSwap,
} from '../style.index';

interface Props {
  setFromChain: (chain: Chain) => void;
  setFromToken: (token: Token) => void;
  setSendAmount: (value: string) => void;
  fromChain: Chain | undefined;
  fromToken: Token | undefined;
  allTokens: any;
  sendAmount: string;
  chainList: Chain[];
  updateBanlance: number;
  address: string;
  shareVal: string;
  balance: string;
  toToken: Token;
  shareTokenPrice: string;
  buyQuoteLoading: boolean;
}

export default function Buy({
  setFromChain, setFromToken, setSendAmount, fromChain, fromToken, allTokens, sendAmount, chainList, updateBanlance, address, shareVal, balance, toToken, shareTokenPrice, buyQuoteLoading
}: Props) {

  return <>
    <ChainTokenAmount
      onChainChange={(chain: Chain) => {
        setFromChain(chain);
      }}
      onTokenChange={(token: Token) => {
        setFromToken(token);
      }}
      onAmountChange={(value) => {
        setSendAmount(value);
      }}
      updateBanlance={updateBanlance}
      currentChain={fromChain}
      currentToken={fromToken}
      chainToken={allTokens}
      title="Project Input"
      amount={sendAmount}
      address={address}
      chainList={chainList}
      inputDisabled={buyQuoteLoading}
    />
    <ArrowSwap>
      <div className="arrow">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.49992 1V11.5M6.49992 11.5L1 6M6.49992 11.5L12 6"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </ArrowSwap>
    <SellTokenAmount shareUsdPrice={shareVal? '$' + balanceFormated((Number(shareTokenPrice) * Number(shareVal)).toString(), 2) : '$~'} token={toToken} title="Collateral Token" amount={shareVal} balance={balance} readOnly />
  </>
}