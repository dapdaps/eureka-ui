

import Connector from '../Connector/Gamma'
import { StyledContainer } from '../styles';
export default function Gamma(props: any) {
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