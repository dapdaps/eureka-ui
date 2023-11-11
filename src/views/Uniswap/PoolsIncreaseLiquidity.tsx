import { memo, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import Big from 'big.js';
import Spinner from '@/components/Spinner';
import Head from './components/pools/AddHead';
import IncreaseButton from './components/pools/IncreaseButton';
import PoolIncreaseLiquidityData from './components/pools/PoolIncreaseLiquidityData';
import PoolIncreaseMore from './components/pools/PoolIncreaseMore';
import PoolPriceRange from './components/pools/PoolPriceRange';
import PoolRemovePair from './components/pools/PoolRemovePair';
import useIncreaseDetail from './hooks/useIncreaseDetail';
import useTokensBalance from './hooks/useTokensBalance';

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
  background-color: #131313;
`;
const StyledBody = styled.div`
  padding: 20px;
`;

const PoolsIncreaseLiquidity = () => {
  const searchParams = useSearchParams();
  const detail = useIncreaseDetail(searchParams.get('id') || '');
  const [reverse, setReverse] = useState(false);
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [errorTips, setErrorTips] = useState('');
  const tokens = useMemo(() => {
    const _tokens: any = {};
    if (detail?.token0) {
      _tokens[detail.token0.address] = detail.token0;
    }
    if (detail?.token1) {
      _tokens[detail.token1.address] = detail.token1;
    }
    return _tokens;
  }, [detail]);
  const { balances, loading: balanceLoading } = useTokensBalance(tokens, 1);

  useEffect(() => {
    if ((detail?.token0 && new Big(value0 || 0).eq(0)) || (detail?.token1 && new Big(value1 || 0).eq(0))) {
      setErrorTips('Enter an Amount');
      return;
    }
    if (!detail?.token0 || !detail?.token1) {
      setErrorTips('Select a Token');
      return;
    }
    if (
      !balanceLoading &&
      (new Big(value0 || 0).gt(balances[detail?.token0.address] || 0) ||
        new Big(value1 || 0).gt(balances[detail?.token1.address] || 0))
    ) {
      setErrorTips('Insufficient balance');
      return;
    }
    setErrorTips('');
  }, [value0, value1, balanceLoading, detail]);

  return (
    <StyledContainer>
      {detail ? (
        <>
          <Head showCleanAll={false} />
          <StyledBody>
            <PoolRemovePair token0={detail.token0} token1={detail.token1} fee={detail.fee} status={detail.status} />
            <PoolIncreaseLiquidityData
              token0={detail.token0}
              token1={detail.token1}
              value0={detail.liquidityToken0}
              value1={detail.liquidityToken1}
            />
            <PoolPriceRange
              type="1"
              detail={detail}
              isReverse={reverse}
              onSetReverse={() => {
                setReverse(!reverse);
              }}
            />
            <PoolIncreaseMore
              detail={detail}
              value0={value0}
              setValue0={setValue0}
              value1={value1}
              setValue1={setValue1}
              reverse={reverse}
              balances={balances}
              balanceLoading={balanceLoading}
            />
            <IncreaseButton
              errorTips={errorTips}
              token0={detail?.token0}
              value0={value0}
              token1={detail?.token1}
              value1={value1}
              fee={detail?.fee}
              tickLow={detail?.tickLow}
              tickHigh={detail?.tickHigh}
              tick={detail?.tick}
              tokenId={detail?.tokenId}
            />
          </StyledBody>
        </>
      ) : (
        <Spinner />
      )}
    </StyledContainer>
  );
};

export default memo(PoolsIncreaseLiquidity);
