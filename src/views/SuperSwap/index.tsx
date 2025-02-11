import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { uniqBy } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import networks from '@/config/swap/networks';
import { default as TokenConfig } from '@/config/tokens';
import useAccount from '@/hooks/useAccount';
import useSwitchChain from '@/hooks/useSwitchChain';
import useUnizen from '@/hooks/useUnizen';
import { useImportTokensStore } from '@/stores/import-tokens';
import { useSuperSwapStore } from '@/stores/super-swap';
import type { Token } from '@/types';

import Arrow2Down from './components/Arrow2Down';
import Button from './components/Button';
import Header from './components/Header';
import InputCard from './components/InputCard';
import MarketsModal from './components/MarketsModal';
// import KLineChart from './components/KLineChart';
import PriceBoard from './components/PriceBoard';
import Result from './components/Result';
import SelectTokensModal from './components/SelectTokensModal';
import useTrade from './hooks/useTrade';
import { StyledContainer, StyledContent, StyledInputs, StyledMain, StyledTradeFooter, StyledTradeIcon } from './styles';

export default function SuperSwap() {
  const { chainId } = useAccount();
  const [currentChain, setCurrentChain] = useState<any>({});
  const [updater, setUpdater] = useState(1);
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState<string>('');
  const cachedTokens = useSuperSwapStore((store: any) => store.tokens);
  const [inputCurrency, setInputCurrency] = useState<Token>();
  const [outputCurrency, setOutputCurrency] = useState<Token>();
  const [selectType, setSelectType] = useState<'in' | 'out'>('in');
  const [showTokensSelector, setShowTokensSelector] = useState<boolean>(false);
  const [errorTips, setErrorTips] = useState('');
  const [inputBlance, setInputBalance] = useState('0');
  const { importTokens, addImportToken }: any = useImportTokensStore();
  // const [showChart, setShowChart] = useState(false);
  const { switchChain } = useSwitchChain();
  const [isSelectedChain, setIsSelectedChain] = useState(false);

  const {
    tokens = [],
    tokensLoading,
    loading,
    quoting,
    markets,
    trade,
    bestTrade,
    onQuoter,
    onSelectMarket,
    onSwap,
    setTrade,
    setMarkets,
    onUpdateTxn
  } = useTrade({
    chainId: currentChain?.chain_id,
    onSuccess() {
      setUpdater(Date.now());
      runQuoter();
    }
  });
  const { tokens: unizenTokens = [], tokensLoading: unizenTokensLoading } = useUnizen({
    chainId: currentChain?.chain_id
  });

  const { run: runQuoter } = useDebounceFn(
    () => {
      onQuoter({ inputCurrency, outputCurrency, inputCurrencyAmount });
    },
    {
      wait: 500
    }
  );

  const mergedTokens = useMemo(() => {
    const sortArray = ['GRAIL', 'PEAR', 'GMX', 'EQB', 'DMT', 'Boop', 'SMOL', 'PENDLE'];

    const uniqTokens = uniqBy(
      [...unizenTokens, ...tokens, ...((chainId && importTokens[chainId]) || [])].map((token: any) => ({
        ...token,
        address: token.address.toLowerCase()
      })),
      'address'
    );
    sortArray.reverse().forEach((symbol: string) => {
      const idx = uniqTokens.findIndex((token: any) => token.symbol === symbol);
      if (idx > -1) {
        const spliceTokens = uniqTokens.splice(idx, 1);
        uniqTokens.unshift(spliceTokens[0]);
      }
    });
    return uniqTokens;
  }, [importTokens, tokens, chainId, unizenTokens]);

  const onSelectToken = useCallback(
    (token: any) => {
      let _inputCurrency: any = inputCurrency;
      let _outputCurrency: any = outputCurrency;

      if (selectType === 'in') {
        _inputCurrency = token;
        if (token.address.toLowerCase() === outputCurrency?.address.toLowerCase()) _outputCurrency = null;
      }
      if (selectType === 'out') {
        _outputCurrency = token;
        if (token.address.toLowerCase() === inputCurrency?.address.toLowerCase()) _inputCurrency = null;
      }

      setInputCurrency(_inputCurrency);
      setOutputCurrency(_outputCurrency);
      setShowTokensSelector(false);
    },
    [selectType, inputCurrency, outputCurrency, inputCurrencyAmount]
  );

  useEffect(() => {
    if (!inputCurrency || !outputCurrency) {
      setErrorTips('Select a token');
      return;
    }
    if (Number(inputCurrencyAmount || 0) === 0) {
      setErrorTips('Enter an amount');
      return;
    }
    if (Big(inputCurrencyAmount).gt(inputBlance || 0)) {
      setErrorTips(`Insufficient ${inputCurrency?.symbol} Balance`);
    } else {
      setErrorTips('');
    }

    onSelectMarket(null);
    runQuoter();
  }, [inputCurrency, outputCurrency, inputCurrencyAmount, inputBlance]);

  useEffect(() => {
    if (!chainId) return;
    if (cachedTokens[chainId]) {
      setInputCurrency(cachedTokens[chainId].inputCurrency);
      setOutputCurrency(cachedTokens[chainId].outputCurrency);
    } else {
      setInputCurrency(null as any);
      setOutputCurrency(null as any);
    }
    setInputCurrencyAmount('');

    setMarkets([]);
    setTrade(null);
    if (!isSelectedChain) {
      setInputCurrency(null as any);
    }
    setIsSelectedChain(false);
  }, [chainId]);

  const swapToken = useCallback(() => {
    const tempInputCurrency = inputCurrency;
    const tempOutputCurrency = outputCurrency;

    setInputCurrency(tempOutputCurrency);
    setOutputCurrency(tempInputCurrency);

    setSelectType('in');

    if (trade) {
      setInputCurrencyAmount(trade.outputCurrencyAmount);
      setTimeout(() => {
        runQuoter();
      }, 0);
    }
  }, [inputCurrency, outputCurrency, trade, runQuoter]);

  const onSelectChain = useCallback((chainId: number) => {
    setIsSelectedChain(false);
    switchChain({ chainId }, () => {
      if (!networks[chainId]) return;

      setCurrentChain({
        chain_id: chainId
      });
      setIsSelectedChain(true);
      setInputCurrency(TokenConfig?.[chainId]?.eth || networks[chainId].defalutInputCurrency);
    });
  }, []);

  return (
    <StyledContainer>
      <StyledMain>
        <StyledContent>
          <Header
            onLoadChain={(chain: any) => {
              setCurrentChain(chain);
            }}
          />
          <StyledInputs>
            <InputCard
              title="You pay"
              isFrom={true}
              amount={inputCurrencyAmount}
              currency={inputCurrency}
              onAmountChange={(amount: any) => {
                setInputCurrencyAmount(amount);
              }}
              key={`in-${updater}`}
              onTokenSelect={() => {
                setSelectType('in');
                setShowTokensSelector(true);
              }}
              onLoad={(balance: string) => {
                setInputBalance(balance);
              }}
            />
            <StyledTradeIcon disabled={false} onClick={swapToken}>
              <Arrow2Down />
            </StyledTradeIcon>
            <InputCard
              title="Receive"
              amount={trade?.outputCurrencyAmount}
              currency={outputCurrency}
              disabled
              key={`out-${updater}`}
              onTokenSelect={() => {
                setSelectType('out');
                setShowTokensSelector(true);
              }}
              style={{ marginTop: -30 }}
            />
          </StyledInputs>
          <StyledTradeFooter>
            {/* {trade && <Result markets={markets} trade={trade} bestTrade={bestTrade} showChart={showChart} onShowChart={() => setShowChart(!showChart)} />} */}
            {trade && <Result markets={markets} trade={trade} bestTrade={bestTrade}></Result>}
          </StyledTradeFooter>

          <Button
            amount={inputCurrencyAmount}
            errorTips={errorTips}
            trade={trade}
            token={inputCurrency}
            loading={loading}
            onClick={onSwap}
            disabled={!trade?.txn}
            currentChain={currentChain}
            onRefresh={() => {
              if (!trade.txn && trade.from === 'Dapdap') onUpdateTxn(trade);
            }}
          />
        </StyledContent>
        <MarketsModal
          markets={markets}
          trade={trade}
          bestTrade={bestTrade}
          outputCurrency={outputCurrency}
          onSelectMarket={onSelectMarket}
          loading={quoting}
          errorTips={errorTips}
          onRefresh={() => {
            if (loading) return;
            onQuoter({ inputCurrency, outputCurrency, inputCurrencyAmount });
          }}
        />
      </StyledMain>

      <PriceBoard onSelectChain={onSelectChain} />
      <SelectTokensModal
        tokens={mergedTokens || []}
        display={showTokensSelector}
        onClose={() => setShowTokensSelector(false)}
        currency={selectType === 'in' ? inputCurrency : outputCurrency}
        onSelect={onSelectToken}
        loading={tokensLoading}
        chainId={currentChain.chain_id}
        onImport={addImportToken}
      />
    </StyledContainer>
  );
}
