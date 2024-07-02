import { memo, useEffect, useMemo, useState } from 'react';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import Header from './components/Header';
import Tokens from './components/Tokens';
import Actions from './components/Actions';
import LiquidityPanel from './components/LiquidityPanel/V3';
import FeesPanel from './components/FeesPanel';
import Range from './components/Range';
import RemoveLiquidity from '../RemoveLiquidity/V3';
import IncreaseLiquidity from '../IncreaseLiquidity/V3';
import { getTokenAmounts } from './helpers';
import useToken from '@/views/Pool/hooks/useToken';
import usePoolDetail from './hooks/usePoolDetail';
import useCollectInfo from './hooks/useCollectInfo';
import { StyledLoadingWrapper, StyledPanels } from './styles';
import useDappConfig from '../hooks/useDappConfig';

const Detail = ({ tokenId }: any) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showIncreaseModal, setShowIncreaseModal] = useState(false);
  const { contracts } = useDappConfig();
  const { detail = {}, loading, queryDetail } = usePoolDetail(tokenId);
  const { loading: collectLoading, info = {}, queryCollectInfo } = useCollectInfo(tokenId, contracts);
  const _token0 = useToken(detail?.token0, detail?.chainId);
  const _token1 = useToken(detail?.token1, detail?.chainId);

  const [amount0, amount1] = useMemo(() => {
    if (!_token0 || !_token1) return [0, 0];
    return getTokenAmounts({
      liquidity: detail?.liquidity,
      tickLower: detail?.tickLower,
      tickUpper: detail?.tickUpper,
      currentTick: detail?.currentTick,
      token0: _token0,
      token1: _token1,
    });
  }, [detail, _token0, _token1]);

  const [feeAmount0, feeAmount1] = useMemo(() => {
    if (!_token0 || !_token1) return [0, 0];
    return [
      new Big(info.amount0 || 0).div(10 ** _token0.decimals),
      new Big(info.amount1 || 0).div(10 ** _token1.decimals),
    ];
  }, [_token0, _token1, info]);

  useEffect(() => {
    queryCollectInfo();
  }, [tokenId]);

  return (
    <>
      <Header />
      {loading || !_token0 || !_token1 ? (
        <StyledLoadingWrapper>
          <Loading size={36} />
        </StyledLoadingWrapper>
      ) : (
        <>
          <StyledPanels>
            <Tokens {...detail} token0={_token0} token1={_token1} type="V3" />
            <Actions
              id={tokenId}
              liquidity={detail.liquidity}
              onRemove={() => {
                setShowRemoveModal(true);
              }}
              onIncrease={() => {
                setShowIncreaseModal(true);
              }}
            />
          </StyledPanels>
          <StyledPanels>
            <LiquidityPanel
              amount0={amount0}
              amount1={amount1}
              currentTick={detail.currentTick}
              token0={_token0}
              token1={_token1}
            />
            <FeesPanel
              id={tokenId}
              token0={_token0}
              token1={_token1}
              amount0={feeAmount0}
              amount1={feeAmount1}
              loading={collectLoading}
              onCollectSuccess={() => {
                queryCollectInfo();
              }}
            />
          </StyledPanels>
          <Range
            token0={_token0}
            token1={_token1}
            tickLower={detail.tickLower}
            tickUpper={detail.tickUpper}
            currentTick={detail.currentTick}
            from="detail"
          />
          <RemoveLiquidity
            open={showRemoveModal}
            amount0={amount0}
            amount1={amount1}
            feeAmount0={feeAmount0}
            feeAmount1={feeAmount1}
            detail={{ ...detail, token0: _token0, token1: _token1, tokenId }}
            onClose={() => {
              setShowRemoveModal(false);
            }}
            onSuccess={() => {
              setShowRemoveModal(false);
              queryDetail();
              queryCollectInfo();
            }}
          />
          <IncreaseLiquidity
            text="Increase Liquidity"
            open={showIncreaseModal}
            amount0={amount0}
            amount1={amount1}
            detail={{ ...detail, token0: _token0, token1: _token1, tokenId }}
            onClose={() => {
              setShowIncreaseModal(false);
            }}
            onSuccess={() => {
              setShowIncreaseModal(false);
              queryDetail();
              queryCollectInfo();
            }}
          />
        </>
      )}
    </>
  );
};

export default memo(Detail);
