import { memo } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
  border-radius: 16px;
  background-color: #62ddff;
  font-size: 18px;
  color: #1b1b1b;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
`;

const SubmitButton = () => {
  return <StyledWrapper>Approve USDC</StyledWrapper>;
};

export default memo(SubmitButton);
