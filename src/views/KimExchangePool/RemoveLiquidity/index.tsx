import { memo, useState, useMemo } from 'react';
import Big from 'big.js';
import Loading from '@/components/Icons/Loading';
import Tokens from '@/views/Pool/Detail/components/Tokens';
import Amount from '@/views/Pool/RemoveLiquidity/components/Amount';
import Token from '@/views/Pool/RemoveLiquidity/components/Token';
import Button from '@/views/Pool/components/Button';
import ConnectWalletButton from '@/views/Pool/components/ConnectWalletButton';
import SwitchNetworkButton from '@/views/Pool/components/SwitchNetworkButton';
import { getTokenAmounts } from '@/views/Pool/Detail/helpers';
import { useRouter } from 'next/router';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';
import usePoolDetail from '../hooks/usePoolDetail';
import useCollectInfo from '@/views/Pool/Detail/hooks/useCollectInfo';
import useRemove from '@/views/Pool/RemoveLiquidity/hooks/useRemove';
import useAccount from '@/hooks/useAccount';
import { StyledContainer, StyledLoadingWrapper, StyledHeader, StyledContent } from './styles';

const RemoveLiquidity = () => {
  const [percent, setPercent] = useState(0);
  const { theme = {}, tokenId, contracts, currentChain } = useDappConfig();
  const { detail, loading } = usePoolDetail(tokenId);
  const { account, chainId } = useAccount();
  const router = useRouter();
  const { info = {} } = useCollectInfo(tokenId, contracts);

  const [amount0, amount1] = useMemo(() => {
    if (!detail) return [0, 0];
    return getTokenAmounts({
      liquidity: detail.liquidity,
      tickLower: detail.tickLower,
      tickUpper: detail.tickUpper,
      currentTick: detail.currentTick,
      token0: detail.token0,
      token1: detail.token1,
    });
  }, [detail]);

  const { loading: removing, onRemove } = useRemove({
    detail,
    percent,
    amount0,
    amount1,
    onSuccess: () => {
      router.back();
    },
  });

  const [feeAmount0, feeAmount1] = useMemo(() => {
    if (!detail) return [0, 0];
    return [
      new Big(info.amount0 || 0).div(10 ** detail.token0.decimals),
      new Big(info.amount1 || 0).div(10 ** detail.token1.decimals),
    ];
  }, [detail, info]);

  return (
    <StyledContainer style={{ ...theme, width: '605px' }}>
      {loading || !detail ? (
        <StyledLoadingWrapper>
          <Loading size={36} />
        </StyledLoadingWrapper>
      ) : (
        <>
          <StyledHeader
            onClick={() => {
              router.back();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
              <path d="M7.5 1L2 6.49992L7.5 12" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Remove Liquidity
          </StyledHeader>
          <StyledContent>
            <Tokens {...detail} />
            <Amount percent={percent} setPercent={setPercent} />
            <Token
              amount0={amount0}
              amount1={amount1}
              feeAmount0={feeAmount0}
              feeAmount1={feeAmount1}
              token0={detail.token0}
              token1={detail.token1}
              percent={percent}
            />
            {!account ? (
              <ConnectWalletButton style={{ width: '100%', height: 62, marginTop: 20 }} />
            ) : chainId !== currentChain.chain_id ? (
              <SwitchNetworkButton style={{ width: '100%', height: 62, marginTop: 20 }} chain={currentChain} />
            ) : (
              <Button
                style={{ width: '100%', height: 62, marginTop: 20 }}
                onClick={() => {
                  onRemove();
                }}
              >
                {removing ? <Loading size={20} /> : 'Remove'}
              </Button>
            )}
          </StyledContent>
        </>
      )}
    </StyledContainer>
  );
};

export default memo(RemoveLiquidity);
