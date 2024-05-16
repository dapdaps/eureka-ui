import { memo } from 'react';
import styled from 'styled-components';
import Loading from '@/components/Icons/Loading';
import useRemoveLiquidity from '../../hooks/useRemoveLiquidity';

const StyledWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background: var(--button-bg-color);
  color: var(--button-text-color);
  border-radius: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 15px;
  ${({ disabled }) => (disabled ? 'opacity: 0.3; cursor: not-allowed;' : 'cursor: pointer;')}
`;

const SubmitButton = ({ token0, token1, liquidityToken0, liquidityToken1, liquidity, percent, tokenId }: any) => {
  const { loading, onRemove } = useRemoveLiquidity(
    () => {
      console.log('success callback');
    },
    () => {
      console.log('error callback');
    },
  );
  return (
    <StyledWrapper
      disabled={loading || !percent}
      onClick={() => {
        if (percent) onRemove({ token0, token1, liquidityToken0, liquidityToken1, liquidity, percent, tokenId });
      }}
    >
      {loading && <Loading />} Remove
    </StyledWrapper>
  );
};

export default memo(SubmitButton);
