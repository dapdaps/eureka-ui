import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { uniqBy } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import useSwitchChain from '@/hooks/useSwitchChain';
import { useImportTokensStore } from '@/stores/import-tokens';
import { usePriceStore } from '@/stores/price';
import { StyledFlex } from '@/styled/styles';
import Button from '@/views/AllInOne/components/Trade/Button';

import CurrencyInput from './components/CurrencyInput';
import CurrencySelect from './components/CurrencySelect';
import ExchangeIcon from './components/ExchangeIcon';
import Header from './components/Header';
import Result from './components/Result';
import useTrade from './hooks/useTrade';
import { ExchangeIconInner, ExchangeIconWrapper, StyledPanel } from './styles';

export default function Panel({
  account,
  dappChains,
  currentChain,
  chainId,
  localConfig,
  chains,
  isChainSupported,
  setCurrentChain,
  setIsChainSupported,
  style = {},
  defaultOutputToken,
  outputTokenSelectable = true,
  onSuccess
}: any) {
  const prices = usePriceStore((store) => store.price);
  const { switchChain } = useSwitchChain();

  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('');
  const [outputCurrencyAmount, setOutputCurrencyAmount] = useState('');
  const [inputCurrency, setInputCurrency] = useState<any>();
  const [outputCurrency, setOutputCurrency] = useState<any>(defaultOutputToken);
  const [displayCurrencySelect, setDisplayCurrencySelect] = useState(false);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState('');
  const [maxInputBalance, setMaxInputBalance] = useState('');
  const [errorTips, setErrorTips] = useState('');
  const [updater, setUpdater] = useState(0);
  const { importTokens, addImportToken }: any = useImportTokensStore();

  const [selectType, setSelectType] = useState<'in' | 'out'>('in');

  const chain = useMemo(() => {
    if (isChainSupported) return currentChain;
    const defaultChainId = Object.keys(localConfig.networks)[0];
    return dappChains.find((_chain: any) => Number(_chain.chain_id) === Number(defaultChainId));
  }, [dappChains, isChainSupported, currentChain]);

  const { loading, trade, onQuoter, onSwap } = useTrade({
    chainId: chain.chain_id,
    template: localConfig.basic.name,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      } else {
        setUpdater(Date.now());
        runQuoter();
      }
    }
  });

  const { run: runQuoter } = useDebounceFn(
    () => {
      onQuoter({ inputCurrency, outputCurrency, inputCurrencyAmount });
      setOutputCurrencyAmount('');
    },
    {
      wait: 500
    }
  );

  const tokens = useMemo(() => {
    return uniqBy(
      [...(localConfig.networks[chain.chain_id]?.tokens || []), ...(importTokens[chain.chain_id] || [])]
        .filter((token) => token)
        .map((token: any) => ({ ...token, address: token?.address.toLowerCase() })),
      'address'
    );
  }, [chain?.chain_id, importTokens, localConfig]);

  const onSwitchChain = (params: any) => {
    if (Number(params.chainId) === chainId) {
      setCurrentChain?.(chains.find((_chain: any) => _chain.chain_id === chainId));
      setIsChainSupported?.(true);
    } else {
      switchChain(params);
    }
  };

  const onSelectToken = (token: any) => {
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
    if (!_inputCurrency || !_outputCurrency) setOutputCurrencyAmount('');
    setInputCurrency(_inputCurrency);
    setOutputCurrency(_outputCurrency);
    setDisplayCurrencySelect(false);
  };

  useEffect(() => {
    if (!inputCurrency || !outputCurrency) {
      setErrorTips('Select a token');
      return;
    }
    if (Number(inputCurrencyAmount || 0) === 0) {
      setErrorTips('Enter an amount');
      return;
    }
    if (Big(inputCurrencyAmount).gt(maxInputBalance || 0)) {
      setErrorTips(`Insufficient ${inputCurrency?.symbol} Balance`);
    } else {
      setErrorTips('');
    }

    runQuoter();
  }, [inputCurrency, outputCurrency, inputCurrencyAmount, maxInputBalance]);

  useEffect(() => {
    setOutputCurrencyAmount(trade?.outputCurrencyAmount || '');
  }, [trade]);

  useEffect(() => {
    const defaultCurrencies = localConfig.networks[chain.chain_id]?.defaultCurrencies;
    setInputCurrency(defaultCurrencies?.input);
    setOutputCurrency(defaultOutputToken || defaultCurrencies?.output);
    setInputCurrencyAmount('');
    setOutputCurrencyAmount('');
  }, [currentChain, localConfig]);

  return (
    <>
      <StyledPanel style={style}>
        <Header
          currentChain={chain}
          chains={dappChains}
          onSwitchChain={onSwitchChain}
          onRefresh={() => {
            runQuoter();
          }}
        />
        <CurrencyInput
          type="in"
          currency={inputCurrency}
          amount={inputCurrencyAmount}
          prices={prices}
          account
          onCurrencySelectOpen={() => {
            setDisplayCurrencySelect(true);
            setSelectType('in');
            setSelectedTokenAddress(inputCurrency?.address);
          }}
          onUpdateCurrencyBalance={(balance: any) => {
            setMaxInputBalance(balance);
          }}
          onAmountChange={(val: any) => {
            setInputCurrencyAmount(val);
          }}
          key={`in-${updater}`}
        />
        <ExchangeIconWrapper>
          <ExchangeIconInner
            onClick={() => {
              if (loading) return;
              const [_inputCurrency, _outputCurrency] = [outputCurrency, inputCurrency];
              setInputCurrency(_inputCurrency);
              setOutputCurrency(_outputCurrency);
              setOutputCurrencyAmount('');
              if (Big(inputCurrencyAmount || 0).gt(0)) runQuoter();
            }}
          >
            <ExchangeIcon />
          </ExchangeIconInner>
        </ExchangeIconWrapper>
        <CurrencyInput
          type="out"
          currency={outputCurrency}
          amount={outputCurrencyAmount}
          disabled
          prices={prices}
          account
          onCurrencySelectOpen={() => {
            setDisplayCurrencySelect(true);
            setSelectType('out');
            setSelectedTokenAddress(outputCurrency?.address);
          }}
          key={`out-${updater}`}
          selectable={outputTokenSelectable}
        />
        {!!(trade && inputCurrency && outputCurrency) && (
          <Result
            inputCurrency={inputCurrency}
            outputCurrency={outputCurrency}
            inputCurrencyAmount={inputCurrencyAmount}
            outputCurrencyAmount={outputCurrencyAmount}
            priceImpact={trade?.priceImpact}
            priceImpactType={trade?.priceImpactType}
            gasUsd={trade?.gasUsd}
            routerStr={trade?.routerStr}
          />
        )}

        <StyledFlex flexDirection="column">
          <Button
            chain={{
              chainId: chain.chain_id,
              selectBgColor: localConfig.theme['--button-color'],
              textColor: localConfig.theme['--button-text-color']
            }}
            amount={inputCurrencyAmount}
            spender={trade?.routerAddress}
            errorTips={errorTips}
            token={inputCurrency}
            loading={loading}
            onClick={onSwap}
            disabled={trade?.noPair || !trade?.txn}
            onRefresh={() => {
              runQuoter();
            }}
            key={`button-${updater}`}
          />
        </StyledFlex>
      </StyledPanel>
      <CurrencySelect
        display={displayCurrencySelect}
        chainIdNotSupport={isChainSupported}
        selectedTokenAddress={selectedTokenAddress}
        chainId={chain.chain_id}
        tokens={tokens}
        account={account}
        explor={chain.block_explorer}
        onImport={addImportToken}
        onClose={() => {
          setDisplayCurrencySelect(false);
        }}
        onSelect={onSelectToken}
      />
    </>
  );
}
