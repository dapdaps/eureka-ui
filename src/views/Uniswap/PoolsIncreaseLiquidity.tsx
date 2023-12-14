import { memo, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import Big from 'big.js';
import Spinner from '@/components/Spinner';
import Head from './components/pools/AddHead';
import IncreaseButton from './components/pools/IncreaseButton';
import PoolIncreaseLiquidityData from './components/pools/PoolIncreaseLiquidityData';
import DepositAmount from './components/pools/DepositAmount';
import PreviewModal from './components/pools/PreviewModal';
import PoolPriceRange from './components/pools/PoolPriceRange';
import PoolRemovePair from './components/pools/PoolRemovePair';
import useIncreaseDetail from './hooks/useIncreaseDetail';
import useTokensBalance from './hooks/useTokensBalance';

const StyledContainer = styled.div`
  width: 605px;
  border-radius: 24px;
  border: 1px solid #3d363d;
  background-color: #131313;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
    border: none;
  }
`;
const StyledBody = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    padding-top: 0px;
  }
`;

const PoolsIncreaseLiquidity = () => {
  const searchParams = useSearchParams();
  const { detail, loading } = useIncreaseDetail(searchParams.get('id') || '');
  const [reverse, setReverse] = useState(false);
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [errorTips, setErrorTips] = useState('');
  const tokens = useMemo(() => {
    if (!detail) return {};
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
    if (!detail) return;
    const _highTick = detail.tickHigh;
    const _lowerTick = detail.tickLow;
    const currentTick = detail.tick;
    const doubleCheck = Number(currentTick) < Number(_highTick) && Number(currentTick) > Number(_lowerTick);

    const isFullRange = _lowerTick === -887272 && _highTick === 887272;

    if (doubleCheck && !isFullRange && (new Big(value0 || 0).eq(0) || new Big(value1 || 0).eq(0))) {
      setErrorTips('Enter an Amount');
      return;
    }
    if (isFullRange && new Big(value0 || 0).eq(0) && new Big(value1 || 0).eq(0)) {
      setErrorTips('Enter an Amount');
      return;
    }
    if (!isFullRange && Number(currentTick) > Number(_highTick) && new Big(value1 || 0).eq(0)) {
      setErrorTips('Enter an Amount');
      return;
    }
    if (!isFullRange && Number(currentTick) <= Number(_highTick) && new Big(value0 || 0).eq(0)) {
      setErrorTips('Enter an Amount');
      return;
    }

    if (!balanceLoading) {
      if (
        doubleCheck &&
        (new Big(value0 || 0).gt(balances[detail.token0.address] || 0) ||
          new Big(value1 || 0).gt(balances[detail.token1.address] || 0))
      ) {
        setErrorTips('Insufficient balance');
        return;
      }
      if (
        isFullRange &&
        new Big(value0 || 0).gt(balances[detail.token0.address] || 0) &&
        new Big(value1 || 0).gt(balances[detail.token1.address] || 0)
      ) {
        setErrorTips('Insufficient balance');
        return;
      }
      if (Number(currentTick) > Number(_highTick) && new Big(value1 || 0).gt(balances[detail.token1.address] || 0)) {
        setErrorTips('Insufficient balance');
        return;
      }
      if (Number(currentTick) <= Number(_highTick) && new Big(value0 || 0).gt(balances[detail.token0.address] || 0)) {
        setErrorTips('Insufficient balance');
        return;
      }
    }
    setErrorTips('');
  }, [value0, value1, balanceLoading, detail]);
  return !loading && detail ? (
    <StyledContainer>
      <>
        <Head showCleanAll={false} isIncrease />
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
          <DepositAmount
            token0={detail?.token0}
            token1={detail?.token1}
            value1={value1}
            value0={value0}
            currentTick={detail?.tick}
            lowerTick={detail?.tickLow}
            highTick={detail?.tickHigh}
            reverse={reverse}
            setValue0={setValue0}
            setValue1={setValue1}
            noPair={false}
            balances={balances}
            balanceLoading={balanceLoading}
            isMint={false}
            fee={detail?.fee}
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
            onPreview={() => {
              setShowPreview(true);
            }}
          />
        </StyledBody>
        <PreviewModal
          token0={detail?.token0}
          value0={value0}
          token1={detail?.token1}
          value1={value1}
          lowerTick={detail?.tickLow}
          highTick={detail?.tickHigh}
          tick={detail?.tick}
          fee={detail?.fee}
          noPair={false}
          isMint={false}
          isOpen={showPreview}
          tokenId={detail?.tokenId}
          onRequestClose={() => {
            setShowPreview(false);
          }}
        />
      </>
    </StyledContainer>
  ) : (
    <Spinner />
  );
};

export default memo(PoolsIncreaseLiquidity);
