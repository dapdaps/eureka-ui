import { memo } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
  border-radius: 16px;
  background-color: #62ddff;
  font-size: 18px;
  color: #1b1b1b;
  font-weight: 600;
  margin-top: 15px;
  ${({ disabled }) => (disabled ? 'opacity: 0.3; cursor: not-allowed;' : 'cursor: pointer;')}
`;

const IncreaseButton = () => {
  return <StyledWrapper disabled={true}>Preview</StyledWrapper>;
};

export default memo(IncreaseButton);
