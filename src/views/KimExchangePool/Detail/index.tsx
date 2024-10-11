import Big from 'big.js';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';

import Loading from '@/components/Icons/Loading';
import Actions from '@/views/Pool/Detail/components/Actions';
import FeesPanel from '@/views/Pool/Detail/components/FeesPanel';
import Header from '@/views/Pool/Detail/components/Header';
import LiquidityPanel from '@/views/Pool/Detail/components/LiquidityPanel/V3';
import Range from '@/views/Pool/Detail/components/Range';
import Tokens from '@/views/Pool/Detail/components/Tokens';
import { getTokenAmounts } from '@/views/Pool/Detail/helpers';
import useCollectInfo from '@/views/Pool/Detail/hooks/useCollectInfo';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';

import usePoolDetail from '../hooks/usePoolDetail';
import { StyledContainer, StyledLoadingWrapper, StyledPanels } from './styles';

const Detail = () => {
  const router = useRouter();
  const { theme = {}, tokenId, contracts } = useDappConfig();
  const { detail, loading } = usePoolDetail(tokenId);
  const { loading: collectLoading, info = {}, queryCollectInfo } = useCollectInfo(tokenId, contracts);
  const searchParams = useSearchParams();
  const [amount0, amount1] = useMemo(() => {
    if (!detail) return [0, 0];
    return getTokenAmounts({
      liquidity: detail.liquidity,
      tickLower: detail.tickLower,
      tickUpper: detail.tickUpper,
      currentTick: detail.currentTick,
      token0: detail.token0,
      token1: detail.token1
    });
  }, [detail]);

  const [feeAmount0, feeAmount1] = useMemo(() => {
    if (!detail) return [0, 0];
    return [
      new Big(info.amount0 || 0).div(10 ** detail.token0.decimals),
      new Big(info.amount1 || 0).div(10 ** detail.token1.decimals)
    ];
  }, [detail, info]);

  return (
    <StyledContainer style={{ ...theme }}>
      <Header tab="positions" />
      {loading || !detail ? (
        <StyledLoadingWrapper>
          <Loading size={36} />
        </StyledLoadingWrapper>
      ) : (
        <>
          <StyledPanels>
            <Tokens {...detail} type="V3" />
            <Actions
              id={tokenId}
              liquidity={detail.liquidity}
              onRemove={() => {
                const params = new URLSearchParams(searchParams);
                params.set('id', tokenId);
                router.push(`/dapp/${router.query.dappRoute}/remove?${params.toString()}`);
              }}
              onIncrease={() => {
                const params = new URLSearchParams(searchParams);
                params.set('id', tokenId);
                router.push(`/dapp/${router.query.dappRoute}/increase?${params.toString()}`);
              }}
            />
          </StyledPanels>
          <StyledPanels>
            <LiquidityPanel
              amount0={amount0}
              amount1={amount1}
              currentTick={detail.currentTick}
              token0={detail.token0}
              token1={detail.token1}
            />
            <FeesPanel
              id={tokenId}
              token0={detail.token0}
              token1={detail.token1}
              amount0={feeAmount0}
              amount1={feeAmount1}
              loading={collectLoading}
              onCollectSuccess={() => {
                queryCollectInfo();
              }}
            />
          </StyledPanels>
          <Range
            token0={detail.token0}
            token1={detail.token1}
            tickLower={detail.tickLower}
            tickUpper={detail.tickUpper}
            currentTick={detail.currentTick}
            from="detail"
          />
        </>
      )}
    </StyledContainer>
  );
};

export default memo(Detail);
