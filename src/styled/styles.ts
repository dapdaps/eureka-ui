import styled, { css } from 'styled-components';

import type { FlexProps, FontProps } from './types';

export const StyledContainer = styled.div``;

export const StyledFont = styled.div<FontProps>`
  color: ${(props) => props.color || '#000'};
  font-family: ${(props) => props.fontFamily || 'Montserrat'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || '400'};
  line-height: ${(props) => props.lineHeight || 'normal'};
  white-space: ${(props) => props.whiteSpace || 'normal'};
  text-align: ${(props) => props.textAlign || 'left'};
  &.ellipsis {
    ${(props) => {
    if ((props.lineClamp || 1) === 1) {
      return css`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        `
    } else {
      return css`
          display: -webkit-box;
          -webkit-line-clamp: ${props.lineClamp};
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        `
    }
  }}
  }
`;
export const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
  flex-wrap: ${(props) => props.flexWrap || 'nowrap'};
`;
export const StyledSvg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledLoadingWrapper = styled.div<{ $h: string }>`
  width: 100%;
  height: ${({ $h }) => $h};
  display: flex;
  align-items: center;
  justify-content: center;
`;
