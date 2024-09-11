

import Connector from '../Connector/RangeProtocol'
import { StyledContainer } from '../styles';
export default function RangeProtocol(props: any) {
  const {
    dexConfig
  } = props
  return (
    <StyledContainer style={dexConfig.theme}>
      <Connector
        {...{
          ...props
        }}
      />
    </StyledContainer>
  )
}