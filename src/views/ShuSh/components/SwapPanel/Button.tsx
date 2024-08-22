import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';

const StyledContainer = styled.button`
  width: 100%;
  height: 62px;
  border-radius: 8px;
  background: #fcc42c;
  cursor: pointer;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  margin-top: 19px;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const Button = ({ disabled, loading, errorTips, onSwap }: any) => {
  if (loading)
    return (
      <StyledContainer disabled={true}>
        <Loading />
      </StyledContainer>
    );
  if (errorTips) {
    return <StyledContainer disabled={true}>{errorTips}</StyledContainer>;
  }
  return <StyledContainer onClick={onSwap}>Swap</StyledContainer>;
};

export default memo(Button);
