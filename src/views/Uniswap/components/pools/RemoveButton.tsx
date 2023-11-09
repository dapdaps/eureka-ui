import { memo } from 'react';
import styled from 'styled-components';
import Loading from '@/components/Icons/Loading';
import useRemoveLiquidity from '../../hooks/useRemoveLiquidity';

const StyledWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
  border-radius: 16px;
  background-color: #62ddff;
  font-size: 18px;
  color: #1b1b1b;
  font-weight: 600;
  margin-top: 15px;
  ${({ disabled }) => (disabled ? 'opacity: 0.3; cursor: not-allowed;' : 'cursor: pointer;')}
`;

const SubmitButton = ({ token0, token1, liquidityToken0, liquidityToken1, liquidity, percent, tokenId }: any) => {
  const { loading, onRemove } = useRemoveLiquidity(
    () => {},
    () => {},
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
