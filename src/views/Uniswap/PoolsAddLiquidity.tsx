import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import useAddLiquidity from './hooks/useAddLiquidity';
import useTicks from './hooks/useTickPrices';

import Loading from '@/components/Icons/Loading';
import Head from './components/pools/AddHead';
import Chart from './components/pools/Chart';
import DepositAmount from './components/pools/DepositAmount';
import Fee from './components/pools/Fee';
import SelectPair from './components/pools/SelectPair';
import SetPriceRange from './components/pools/SetPriceRange';
import SubmitButton from './components/pools/SubmitButton';

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
  const { token0, token1, fee, onSelectToken, onCleanAll, onSelectFee, onExchangeTokens } = useAddLiquidity();
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [ready, setReady] = useState(false);
  const {
    loading,
    noPair,
    lowerTick,
    highTick,
    currentTick,
    poolTokens,
    reverse,
    setReverse,
    setLowerTick,
    setHighTick,
  } = useTicks({
    fee,
    token0,
    token1,
  });
  useEffect(() => {
    setReady(true);
  }, []);
  return ready ? (
    <StyledContainer>
      <Head onCleanAll={onCleanAll} />
      <SelectPair token0={token0} token1={token1} onSelectToken={onSelectToken} />
      <StyledBody disabled={false}>
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
              poolTokens={poolTokens}
              onExchangeTokens={() => {
                onExchangeTokens();
                setReverse(!reverse);
              }}
            />
            <Chart />
          </>
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
          poolTokens={poolTokens}
        />
        <SubmitButton />
      </StyledBody>
    </StyledContainer>
  ) : (
    <div />
  );
};

export default memo(PoolsAddLiquidity);
