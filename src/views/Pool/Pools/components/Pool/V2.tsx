import { memo, useMemo } from 'react';

import { formateValue } from '@/utils/formate';
import Fee from '@/views/Pool/components/Fee';
import Status from '@/views/Pool/components/Status';
import TokenIcon from '@/views/Pool/components/TokenIcon';
import useToken from '@/views/Pool/hooks/useToken';

import VersionTag from '../VersionTag';
import { StyledContainer, StyledDetails, StyledPool, StyledRange } from './style';

const Pool = ({ token0, token1, chainId = 81457, fee, poolVersion, liquidity, data = {}, onClick }: any) => {
  const _token0 = useToken(token0, chainId);
  const _token1 = useToken(token1, chainId);

  const { reserves0, reserves1 } = data;

  const price = useMemo(() => {
    return Number(reserves1) === 0 ? 0 : reserves0 / reserves1;
  }, [reserves0, reserves1]);

  if (!_token0 || !_token1) return <div />;
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
        <Status type={poolVersion} liquidity={liquidity} />
      </StyledDetails>
      <StyledRange>
        <span className="range-item">
          {formateValue(price, 3)} {_token0.symbol} per {_token1.symbol}
        </span>
      </StyledRange>
    </StyledContainer>
  );
};

export default memo(Pool);
