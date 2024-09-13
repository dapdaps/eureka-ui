// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

import Content from './components/Content';
const StyledContainer = styled.div``;

export default memo(function Beefy(props) {
  const { dexConfig } = props;
  return (
    <StyledContainer style={dexConfig.theme}>
      <Content
        {...{
          ...props
        }}
      />
    </StyledContainer>
  );
});
