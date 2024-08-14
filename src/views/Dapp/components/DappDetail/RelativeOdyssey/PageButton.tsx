import { memo } from 'react';
import styled from 'styled-components';

const PageButton = (props: Props) => {
  const { direction, className, onClick } = props;

  return (
    <StyledContainer className={className} onClick={onClick}>
      <svg
        width="6"
        height="12"
        viewBox="0 0 6 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${direction === 'prev' ? 180 : 0}deg)` }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.30932 11.8186C-0.0460839 11.5331 -0.103706 11.0123 0.180617 10.6554L3.88927 6L0.180616 1.3446C-0.103707 0.987694 -0.0460843 0.466902 0.309319 0.181378C0.664722 -0.104145 1.18332 -0.04628 1.46765 0.310625L6 6L1.46765 11.6894C1.18332 12.0463 0.664723 12.1041 0.30932 11.8186Z"
          fill="white"
        />
      </svg>
    </StyledContainer>
  );
};

export default memo(PageButton);

interface Props {
  direction: 'prev' | 'next';
  className?: string;
  onClick?(): void;
}

const StyledContainer = styled.button`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background: #18191E;
  border: 1px solid #333648;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
