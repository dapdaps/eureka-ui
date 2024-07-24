import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  background: rgba(50, 50, 50, 0.6);
  backdrop-filter: blur(10px);
  transition: all 0.2s;
  color: #fff;
  text-align: center;
  font-family: Orbitron;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  &.active {
    background: #414141;
  }
`;
export const PageButton = (props: PageButtonProps) => {
  const { page, current, className, style, onChange } = props;

  const handleClick = () => {
    if (typeof page !== 'number' || page === current) return;
    onChange?.(page);
  };

  return (
    <StyledButton
      className={`page-${page} ${current === page ? 'active' : ''} ${className}`}
      style={style}
      onClick={handleClick}
    >
      {page}
    </StyledButton>
  );
};

interface PageButtonProps {
  page: number | string;
  current?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?(page: number): void;
}
