import { memo } from 'react';
import Status from '@/views/Pool/components/Status';
import TokenIcon from '@/views/Pool/components/TokenIcon';
import Fee from '@/views/Pool/components/Fee';
import VersionTag from '@/views/Pool/Pools/components/VersionTag';
import { StyledContainer, StyledLeft, StyledTokens, StyledSymbol } from './styles';

const Tokens = ({
  from = 'add',
  rangeType,
  token0,
  token1,
  fee,
  tickLower,
  tickUpper,
  liquidity,
  currentTick,
  type,
}: any) => {
  return (
    <StyledContainer>
      <StyledLeft>
        <StyledTokens>
          <TokenIcon token={token0} />
          <TokenIcon token={token1} style={{ marginLeft: '-6px' }} />
        </StyledTokens>
        <StyledSymbol>
          {token0?.symbol}/{token1?.symbol}
        </StyledSymbol>
        <Fee fee={fee} />
        <VersionTag type={type} />
      </StyledLeft>
      <Status
        from="add"
        rangeType={rangeType}
        tickLower={tickLower}
        tickUpper={tickUpper}
        liquidity={liquidity}
        currentTick={currentTick}
        loading={false}
        type={type}
      />
    </StyledContainer>
  );
};

export default memo(Tokens);
