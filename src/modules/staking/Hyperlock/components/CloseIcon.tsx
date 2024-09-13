// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';
const CloseIcon = styled.div`
  cursor: pointer;
  transition: 0.5s;
  :hover {
    opacity: 0.8;
    transform: scale(1.3);
  }
`;
export default memo(function CloseIcon(props) {
  const Size = props.size || 18;
  return (
    <CloseIcon
      style={{ width: Size * 1.5, height: Size * 1.5 }}
      onClick={() => {
        props.onClose?.();
      }}
    >
      <svg width={Size} height={Size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.5 5L5.5 15M5.5 5L15.5 15"
          stroke="currentColor"
          stroke-width="1.66667"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </CloseIcon>
  );
});
