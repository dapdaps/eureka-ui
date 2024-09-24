import type { Pool } from '@/modules/lending/models';

import { StyledContainer, StyledLabel, StyledPoolBox, StyledPoolFont, StyledPools } from './styles';

const LendingPools = (props: Props) => {
  const { pools = [], curPool, onSwitchPool } = props;

  const isMulti = pools.length > 1;

  const handleSwitchChain = (pool: Pool) => {
    onSwitchPool?.(pool);
  };

  return (
    <StyledContainer className={isMulti ? 'multi' : ''}>
      <StyledLabel>{isMulti ? 'Pools:' : 'Pool:'}</StyledLabel>
      <StyledPools>
        {pools.map((pool) => (
          <StyledPoolBox
            key={pool.key}
            className={curPool === pool.key ? 'active' : ''}
            onClick={() => {
              handleSwitchChain(pool);
            }}
          >
            <StyledPoolFont>{pool.label}</StyledPoolFont>
          </StyledPoolBox>
        ))}
      </StyledPools>
    </StyledContainer>
  );
};

export default LendingPools;

export interface Props {
  pools: Pool[];
  curPool?: string;

  onSwitchPool?(params: Pool): void;
}
