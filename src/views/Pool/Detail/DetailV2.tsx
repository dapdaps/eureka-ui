import { memo, useState } from 'react';
import usePoolV2Detail from './hooks/usePoolV2Detail';
import useToken from '@/views/Pool/hooks/useToken';
import Header from './components/Header';
import Loading from '@/components/Icons/Loading';
import Tokens from './components/Tokens';
import Actions from './components/Actions';
import RemoveLiquidity from '../RemoveLiquidity/V2';
import LiquidityPanel from './components/LiquidityPanel/V2';
import IncreaseLiquidity from '../IncreaseLiquidity/V2';
import { useRouter } from 'next/router';
import { StyledLoadingWrapper, StyledPanels } from './styles';

const Detail = ({ id, fee, chainId }: any) => {
  const { loading, detail, queryDetail } = usePoolV2Detail(chainId, id);
  const _token0 = useToken(detail?.token0, chainId);
  const _token1 = useToken(detail?.token1, chainId);
  const router = useRouter();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showIncreaseModal, setShowIncreaseModal] = useState(false);

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
            <Tokens
              type="V2"
              fee={fee ? fee * 1e6 : 0}
              liquidity={detail.liquidity}
              token0={_token0}
              token1={_token1}
            />
            <Actions
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
              type="V2"
              amount0={detail.amount0}
              amount1={detail.amount1}
              token0={_token0}
              token1={_token1}
              reserve0={detail.reserve0}
              reserve1={detail.reserve1}
              share={detail.share}
            />
          </StyledPanels>
          <RemoveLiquidity
            open={showRemoveModal}
            amount0={detail.amount0}
            amount1={detail.amount1}
            chainId={chainId}
            detail={{ fee, liquidity: detail.liquidity, token0: _token0, token1: _token1, address: id }}
            onClose={() => {
              setShowRemoveModal(false);
            }}
            onSuccess={(percent: number) => {
              if (percent === 100) {
                router.push(`/dapp/${router.query.dappRoute}`);
                return;
              }
              setShowRemoveModal(false);
              queryDetail();
            }}
          />
          <IncreaseLiquidity
            text="Increase Liquidity"
            open={showIncreaseModal}
            amount0={detail.amount0}
            amount1={detail.amount1}
            chainId={chainId}
            detail={{
              fee,
              token0: _token0,
              token1: _token1,
              liquidity: detail.liquidity,
              reserve0: detail.reserve0,
              reserve1: detail.reserve1,
            }}
            onClose={() => {
              setShowIncreaseModal(false);
            }}
            onSuccess={() => {
              setShowIncreaseModal(false);
              queryDetail();
            }}
          />
        </>
      )}
    </>
  );
};

export default memo(Detail);