// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

import Loading from './Loading';
const Wrapper = styled.button`
  --white: #fff;
  --primary: #783ae3;
  --secondary: #3a4be3;
  --green: #1aca8a;
  /* --dark:#979ABE */

  width: ${(props) => {
    return props.block ? '100%' : 'auto';
  }};

  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  border: none;
  color: var(--white);
  background-color: ${(props) => {
    switch (props.type) {
      case 'primary':
        return '#783ae3';
      case 'secondary':
        return '#3a4be3';
      case 'green':
        return '#1ACA8A';
    }
  }};

  border-radius: 8px;
  overflow: hidden;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &.pink {
    background: rgba(213, 110, 199, 1);
  }
`;
export default memo(function Button(props) {
  const { type, text, disabled, loading, className, style, onClick, block } = props;

  const handleClick = () => {
    if (loading || disabled) return false;
    if (onClick) onClick();
  };

  return (
    <Wrapper type={type} disabled={disabled} onClick={handleClick} style={style} className={className} block={block}>
      {loading ? <Loading size={16} /> : text}
    </Wrapper>
  );
});
