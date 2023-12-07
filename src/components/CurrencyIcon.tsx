import styled from 'styled-components';
import { DEFAULT_TOKEN_ICON } from '@/views/Uniswap/components/TokenIcon';

const CurrencyIconWrapper = styled.div<{ mr: number }>`
  position: relative;
  margin-right: ${({ mr }) => mr}px;
`;
const StyledCurrencyIcon = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;
const ChainIcon = styled.img<{ size: number }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 4px;
  right: -${({ size }) => size / 3}px;
  bottom: -3px;
  padding: 3px;
`;

export default function CurrencyIcon({
  token,
  chain,
  size = 38,
  mr = 20,
  className,
}: {
  token?: string;
  chain?: string;
  size?: number;
  mr?: number;
  className?: string;
}) {
  return (
    <CurrencyIconWrapper mr={mr} className={className}>
      <StyledCurrencyIcon size={size} src={token || DEFAULT_TOKEN_ICON} />
      {chain && <ChainIcon size={size * 0.6} src={chain} />}
    </CurrencyIconWrapper>
  );
}
