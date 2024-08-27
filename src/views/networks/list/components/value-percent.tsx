import Big from 'big.js';
import React, { memo } from 'react';
import styled from 'styled-components';

const ValuePercent = (props: Props) => {
  const {
    children,
    percent,
    styles,
    className = 'value-percent',
  } = props;

  const direction = percentDirection(percent);

  return (
    <StyledContainer style={styles} className={className}>
      <StyledValue className={`${className}-value`}>{children}</StyledValue>
      {
        direction.rotate === false ? null : (
          <StyledPercent
            className={`${className}-percent`}
            style={{
              color: direction.color,
            }}
          >
            <div
              style={{
                transform: `rotate(${direction.rotate}deg) translateY(-1px)`,
              }}
            >
              <PercentDirectionIcon color={direction.color} />
            </div>
            {Big(percent || 0).toFixed(2)}%
          </StyledPercent>
        )
      }
    </StyledContainer>
  );
};

export default memo(ValuePercent);

export interface Props {
  children: any;
  percent?: string;
  styles?: React.CSSProperties;
  className?: string;
}

export const percentDirection = (percent?: string) => {
  if (!percent) return { rotate: false, color: '#FFFFFF' };
  if (Big(percent || 0).gt(0)) return { rotate: 0, color: '#06C17E' };
  if (Big(percent || 0).lt(0)) return { rotate: 180, color: '#FF3D83' };
  return { rotate: false, color: '#FFFFFF' };
};

export const PercentDirectionIcon = (props: { color: string; }) => {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.13397 0.5C4.51887 -0.166667 5.48113 -0.166666 5.86603 0.5L9.33013 6.5C9.71503 7.16667 9.2339 8 8.4641 8H1.5359C0.766098 8 0.284973 7.16667 0.669873 6.5L4.13397 0.5Z"
        fill={props.color}
      />
    </svg>
  );
};

const StyledContainer = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;
const StyledValue = styled.div``;
const StyledPercent = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;
