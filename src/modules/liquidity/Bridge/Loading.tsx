import { memo } from 'react';
import styled from 'styled-components';
const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 1.5s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default memo(function Loading(props: any) {
  const { color, width } = props;
  return (
    <StyledLoading>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8"
          stroke={color || '#1E2028'}
          strokeWidth={width || 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StyledLoading>
  );
});
