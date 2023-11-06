import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { Token } from '@/types';

const StyledTokenLogo = styled(Logo)<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;

const StyledLogoWrapper = styled.div`
  position: relative;
`;

export default function CurrencyLogo({
  currency,
  size = 24,
  style,
}: {
  currency: Token;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <StyledLogoWrapper>
      <StyledTokenLogo size={size} srcs={[currency.icon]} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
    </StyledLogoWrapper>
  );
}
