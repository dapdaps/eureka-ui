import { memo, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import Big from 'big.js';

import useAddLiquidityData from './hooks/useAddLiquidityData';
import useTicks from './hooks/useTickPrices';
import useTokensBalance from './hooks/useTokensBalance';
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

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
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
  const { token0, token1, fee, onSelectToken, onCleanAll, onSelectFee, onExchangeTokens } = useAddLiquidityData();
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [price, setPrice] = useState('');
  const [ready, setReady] = useState(false);
  const [errorTips, setErrorTips] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const { loading, noPair, lowerTick, highTick, currentTick, reverse, setReverse, setLowerTick, setHighTick } =
    useTicks({
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

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!token0 || !token1) return;
    const [_token0, _token1] = sortTokens(token0, token1);
    setReverse(_token0.address === token1.address);
  }, [token0, token1]);

  useEffect(() => {
    if (new Big(value0 || 0).eq(0) || new Big(value1 || 0).eq(0)) {
      setErrorTips('Enter an Amount');
      return;
    }
    if (!token0 || !token1) {
      setErrorTips('Select a Token');
      return;
    }
    if (
      !balanceLoading &&
      (new Big(value0 || 0).gt(balances[token0.address] || 0) || new Big(value1 || 0).gt(balances[token1.address] || 0))
    ) {
      setErrorTips('Insufficient balance');
      return;
    }
    setErrorTips('');
  }, [value0, value1, balanceLoading, token0, token1]);
  return ready ? (
    <StyledContainer>
      <Head
        onCleanAll={() => {
          onCleanAll();
          setLowerTick(undefined);
          setHighTick(undefined);
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
              onExchangeTokens={() => {
                onExchangeTokens();
                setReverse(!reverse);
              }}
            />
            {!noPair && <Chart />}
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
          />
        )}
        <DepositAmount
          token0={token0}
          token1={token1}
          value1={value1}
          value0={value0}
          currentTick={currentTick}
          reverse={reverse}
          setValue0={setValue0}
          setValue1={setValue1}
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
