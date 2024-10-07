import { memo, useMemo } from 'react';

import { formateValue } from '@/utils/formate';
import usePoolInfo from '@/views/Pool/AddLiquidity/hooks/usePoolInfo';
import Fee from '@/views/Pool/components/Fee';
import Status from '@/views/Pool/components/Status';
import TokenIcon from '@/views/Pool/components/TokenIcon';
import useToken from '@/views/Pool/hooks/useToken';

import { nearestUsableTick, tickToPrice } from '../../../utils/tickMath';
import VersionTag from '../VersionTag';
import { StyledContainer, StyledDetails, StyledPool, StyledRange } from './style';

const Pool = ({ token0, token1, chainId, fee = 0, poolVersion, liquidity, data = {}, onClick }: any) => {
  const _token0 = useToken(token0, chainId);
  const _token1 = useToken(token1, chainId);
  const { info, loading } = usePoolInfo({ token0: _token0, token1: _token1, fee: fee * 1e6 });
  const { tickLower, tickUpper } = data;

  const isFullRange = useMemo(() => {
    if (tickLower === -887272 && tickUpper === 887272) return true;
    if (!fee && !info) return false;
    if (
      tickLower === nearestUsableTick({ tick: -887272, fee: fee * 1e6, tickSpacing: info?.tickSpacing }) &&
      tickUpper === nearestUsableTick({ tick: 887272, fee: fee * 1e6, tickSpacing: info?.tickSpacing })
    ) {
      return true;
    }
    return false;
  }, [tickLower, tickUpper, fee, info]);
  if (!_token0 || !_token1 || !info) return <div />;

  return (
    <StyledContainer onClick={onClick}>
      <StyledDetails>
        <StyledPool>
          <TokenIcon token={_token0} />
          <TokenIcon token={_token1} style={{ marginLeft: '-14px' }} />
          <span>
            {_token0.symbol}/{_token1.symbol}
          </span>
          <Fee fee={fee * 1e6} />
          <VersionTag type={poolVersion} />
        </StyledPool>
        <Status
          loading={loading}
          type={poolVersion}
          liquidity={liquidity}
          currentTick={info?.currentTick}
          tickLower={tickLower}
          tickUpper={tickUpper}
        />
      </StyledDetails>
      <StyledRange>
        <span className="gray">Min:</span>
        <span className="range-item">
          {isFullRange ? 0 : formateValue(1 / tickToPrice({ tick: tickLower, token0: _token0, token1: _token1 }), 3)}{' '}
          {_token0.symbol} per {_token1.symbol}
        </span>
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5H17V3.5H1V4.5Z"
            fill="#8E8E8E"
          />
        </svg>
        <span className="gray">Max:</span>
        <span className="range-item">
          {isFullRange ? '∞' : formateValue(1 / tickToPrice({ tick: tickUpper, token0: _token0, token1: _token1 }), 3)}{' '}
          {_token0.symbol} per {_token1.symbol}
        </span>
      </StyledRange>
    </StyledContainer>
  );
};

export default memo(Pool);
