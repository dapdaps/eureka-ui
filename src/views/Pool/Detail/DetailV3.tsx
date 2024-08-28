import Big from 'big.js';
import { useRouter } from 'next/router';
import { memo, useEffect, useMemo, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import useToken from '@/views/Pool/hooks/useToken';

import useDappConfig from '../hooks/useDappConfig';
import IncreaseLiquidity from '../IncreaseLiquidity/V3';
import RemoveLiquidity from '../RemoveLiquidity/V3';
import Actions from './components/Actions';
import FeesPanel from './components/FeesPanel';
import Header from './components/Header';
import LiquidityPanel from './components/LiquidityPanel/V3';
import Range from './components/Range';
import Tokens from './components/Tokens';
import { getTokenAmounts } from './helpers';
import useCollectInfo from './hooks/useCollectInfo';
import usePoolDetail from './hooks/usePoolDetail';
import { StyledLoadingWrapper, StyledPanels } from './styles';

const Detail = ({ tokenId, isHideBack, onClose }: DetailProps) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showIncreaseModal, setShowIncreaseModal] = useState(false);
  const { contracts, chainId } = useDappConfig();
  const { detail = {}, loading, queryDetail } = usePoolDetail(tokenId);
  const { loading: collectLoading, info = {}, queryCollectInfo } = useCollectInfo(tokenId, contracts);
  const router = useRouter();
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

  useEffect(() => {
    if (!contracts[chainId]) {
      if (onClose) {
        onClose();
        return;
      }
      router.push(`/dapp/${router.query.dappRoute}`);
    }
  }, [chainId]);

  return (
    <>
      {
        !isHideBack && (
          <Header />
        )
      }
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

interface DetailProps {
  tokenId: string;

  // fix#DAP-862
  isHideBack?: boolean;
  onClose?(): void;
}
