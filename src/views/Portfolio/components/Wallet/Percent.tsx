import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  position: relative;
`;
const StyledBg = styled.div`
  height: 32px;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 4px;
  opacity: 0.2;
  background: #5e617e;
`;
const StyledText = styled.div`
  position: relative;
  z-index: 2;
  line-height: 32px;
  padding: 0px 12px;
`;

const Percent = ({ percent }: any) => {
  return (
    <StyledContainer>
      <StyledBg style={{ width: percent + '%' }} />
      <StyledText>{percent}%</StyledText>
    </StyledContainer>
  );
};

export default memo(Percent);
