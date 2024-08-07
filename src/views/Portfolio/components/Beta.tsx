import { memo } from 'react';
import styled from 'styled-components';

const Beta = () => {

  return (
    <StyledContainer>
      Beta
    </StyledContainer>
  );
};

export default memo(Beta);

const StyledContainer = styled.div`
  width: 46px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  background: #7C7F96;
  line-height: 20px;
  color: #101010;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  background-clip: unset;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: #101010;
  position: absolute;
  right: 10px;
  top: 40px;
`;
