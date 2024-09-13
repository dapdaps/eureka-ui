

import Connector from '../Connector/Metavault'
import { StyledContainer } from '../styles';
export default function Metavault(props: any) {
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