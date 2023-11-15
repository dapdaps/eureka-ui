import { memo, useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Big from 'big.js';

import useAddLiquidityData from './hooks/useAddLiquidityData';
import useTicks from './hooks/useTickPrices';
import useTokensBalance from './hooks/useTokensBalance';
import useAccount from '@/hooks/useAccount';
import { sortTokens } from './utils/sortTokens';

import Loading from '@/components/Icons/Loading';
import Head from './components/pools/AddHead';
import Chart from './components/pools/Chart';
import DepositAmount from './components/pools/DepositAmount';
import Fee from './components/pools/Fee';
import SelectPair from './components/pools/SelectPair';
import SetPriceRange from './components/pools/SetPriceRange';
import SubmitButton from './components/pools/SubmitButton';
import AddLiquidityNoPair from './components/AddLiquidityNoPair';
import PreviewModal from './components/pools/PreviewModal';
import { getTickFromPrice } from './utils/getTick';

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
  background-color: #131313;
`;
const StyledBody = styled.div<{ disabled: boolean }>`
  padding: 0px 20px 20px;
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`;
const LoadingWrapper = styled.div`
  color: #fff;
  height: 300px;
  line-height: 300px;
  text-align: center;
`;

const PoolsAddLiquidity = () => {
  const { provider } = useAccount();
  const { token0, token1, fee, onSelectToken, onCleanAll, onSelectFee, onExchangeTokens } = useAddLiquidityData();
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [price, setPrice] = useState('');
  const [ready, setReady] = useState(false);
  const [errorTips, setErrorTips] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const {
    loading,
    noPair,
    lowerTick,
    highTick,
    currentTick,
    reverse,
    setNoPair,
    setReverse,
    setLowerTick,
    setHighTick,
    setCurrentTickFromPrice,
  } = useTicks({
    fee,
    token0,
    token1,
    price,
  });
  const tokens = useMemo(() => {
    const _tokens: any = {};
    if (token0) {
      _tokens[token0.address] = token0;
    }
    if (token1) {
      _tokens[token1.address] = token1;
    }
    return _tokens;
  }, [token0, token1]);
  const { balances, loading: balanceLoading } = useTokensBalance(tokens, 1);

  const onPriceChange = useCallback(
    async ({ type, price }: any) => {
      if (type === 'low') {
        const _tick = await getTickFromPrice({
          token0,
          token1,
          price,
          fee,
          type,
          provider,
        });
        reverse ? setHighTick(_tick) : setLowerTick(_tick);
      }
      if (type === 'up') {
        const _tick = await getTickFromPrice({
          token0,
          token1,
          price,
          fee,
          type,
          provider,
        });
        reverse ? setLowerTick(_tick) : setHighTick(_tick);
      }
    },
    [fee, provider, token0, token1, reverse],
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!token0 || !token1) return;
    const [_token0, _token1] = sortTokens(token0, token1);
    setReverse(_token0.address === token1.address);
  }, [token0, token1]);

  useEffect(() => {
    if (!token0 || !token1) {
      setErrorTips('Select a Token');
      return;
    }

    if (lowerTick === undefined || highTick === undefined || Number(lowerTick) >= Number(highTick)) {
      setErrorTips('Invalid range selected');
      return;
    }
    const doubleCheck = Number(currentTick) < Number(lowerTick) && Number(currentTick) > Number(highTick);

    const isFullRange = lowerTick === -887272 && highTick === 887272;
    if (doubleCheck && !isFullRange && (new Big(value0 || 0).eq(0) || new Big(value1 || 0).eq(0))) {
      setErrorTips('Enter an Amount');
      return;
    }
    if (isFullRange && new Big(value0 || 0).eq(0) && new Big(value1 || 0).eq(0)) {
      setErrorTips('Enter an Amount');
      return;
    }
    if (!isFullRange && Number(currentTick) > Number(highTick) && new Big((reverse ? value0 : value1) || 0).eq(0)) {
      setErrorTips('Enter an Amount');
      return;
    }
    if (!isFullRange && Number(currentTick) < Number(lowerTick) && new Big((reverse ? value1 : value0) || 0).eq(0)) {
      setErrorTips('Enter an Amount');
      return;
    }

    if (!balanceLoading) {
      if (
        doubleCheck &&
        (new Big(value0 || 0).gt(balances[token0.address] || 0) ||
          new Big(value1 || 0).gt(balances[token1.address] || 0))
      ) {
        setErrorTips('Insufficient balance');
        return;
      }
      if (
        isFullRange &&
        new Big(value0 || 0).gt(balances[token0.address] || 0) &&
        new Big(value1 || 0).gt(balances[token1.address] || 0)
      ) {
        setErrorTips('Insufficient balance');
        return;
      }
      if (Number(currentTick) >= Number(highTick) && new Big(value0 || 0).gt(balances[token0.address] || 0)) {
        setErrorTips('Insufficient balance');
        return;
      }
      if (Number(currentTick) < Number(lowerTick) && new Big(value1 || 0).gt(balances[token1.address] || 0)) {
        setErrorTips('Insufficient balance');
        return;
      }
    }
    setErrorTips('');
  }, [value0, value1, balanceLoading, token0, token1, lowerTick, highTick, reverse, currentTick]);
  return ready ? (
    <StyledContainer>
      <Head
        onCleanAll={() => {
          onCleanAll();
          setLowerTick(undefined);
          setHighTick(undefined);
          setValue0('');
          setValue1('');
          setPrice('');
          setNoPair(false);
        }}
      />
      <SelectPair token0={token0} token1={token1} onSelectToken={onSelectToken} />
      <StyledBody disabled={!token0 || !token1}>
        <Fee fee={fee} disabled={!token0 || !token1} onSelectFee={onSelectFee} />
        {loading ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : (
          <>
            <SetPriceRange
              lowerTick={lowerTick}
              highTick={highTick}
              setLowerTick={setLowerTick}
              setHighTick={setHighTick}
              token0={token0}
              token1={token1}
              reverse={reverse}
              noPair={noPair}
              fee={fee}
              onExchangeTokens={() => {
                onExchangeTokens();
                setReverse(!reverse);
              }}
            />
            {!noPair && lowerTick !== undefined && highTick !== undefined && token0 && token1 && (
              <Chart
                token0={token0}
                token1={token1}
                reverse={reverse}
                lowerTick={lowerTick}
                highTick={highTick}
                onPriceChange={onPriceChange}
              />
            )}
          </>
        )}
        {noPair && (
          <AddLiquidityNoPair
            token0={token0}
            token1={token1}
            price={price}
            reverse={reverse}
            setPrice={(value?: any) => {
              setPrice(value);
              setValue0('');
              setValue1('');
            }}
            setCurrentTickFromPrice={setCurrentTickFromPrice}
          />
        )}
        <DepositAmount
          token0={token0}
          token1={token1}
          value1={value1}
          value0={value0}
          currentTick={currentTick}
          lowerTick={lowerTick}
          highTick={highTick}
          reverse={reverse}
          setValue0={setValue0}
          setValue1={setValue1}
          currentPrice={price}
          noPair={noPair}
          balances={balances}
          balanceLoading={balanceLoading}
        />
        <SubmitButton
          errorTips={errorTips}
          token0={token0}
          value0={value0}
          token1={token1}
          value1={value1}
          onPreview={() => {
            setShowPreview(true);
          }}
        />
      </StyledBody>
      <PreviewModal
        token0={token0}
        value0={value0}
        token1={token1}
        value1={value1}
        price={price}
        lowerTick={lowerTick}
        highTick={highTick}
        tick={currentTick}
        fee={fee}
        noPair={noPair}
        isMint={true}
        isOpen={showPreview}
        onRequestClose={() => {
          setShowPreview(false);
        }}
      />
    </StyledContainer>
  ) : (
    <div />
  );
};

export default memo(PoolsAddLiquidity);
