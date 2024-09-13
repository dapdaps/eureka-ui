import { memo } from 'react';

import JuiceConnector from '../Connector/Juice'
import { StyledContainer } from '../styles';
export default memo(function Juice(props: any) {
  const {
    dexConfig,
  } = props
  return (
    <StyledContainer style={dexConfig.theme}>
      <JuiceConnector {...{ ...props }} />
    </StyledContainer>
  )
})