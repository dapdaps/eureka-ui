import React, { memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const PageBack = (props: Props) => {
  const { defaultPath, style } = props;

  const router = useRouter();

  const onClick = () => {
    if (window.history.length <= 1 && defaultPath) {
      router.replace(defaultPath);
      return;
    }
    router.back();
  };

  return (
    <StyledContainer style={style}>
      <StyledInner onClick={onClick}>
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.8"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.52395 0.175334C5.86895 0.451342 5.92489 0.954776 5.64888 1.29979L2.04869 5.80003L5.64888 10.3003C5.92489 10.6453 5.86895 11.1487 5.52394 11.4247C5.17894 11.7007 4.6755 11.6448 4.39949 11.2998L-0.000310675 5.80003L4.39949 0.300273C4.6755 -0.0447362 5.17894 -0.100673 5.52395 0.175334Z"
            fill="white"
          />
        </svg>
        Back
      </StyledInner>
    </StyledContainer>
  );
};

export default memo(PageBack);

export interface Props {
  defaultPath?: string;
  style?: React.CSSProperties;
}

const StyledContainer = styled.div`
  display: flex;
`;

const StyledInner = styled.div`
  flex-grow: 0;
  color: #FFF;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
