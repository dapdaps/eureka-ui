

import ArrakisConnector from '../Connector/Arrakis'
import { StyledContainer } from '../styles';
export default function Arrakis(props: any) {
  const {
    dexConfig
  } = props
  return (
    <StyledContainer style={dexConfig.theme}>
      <ArrakisConnector
        {...{
          ...props
        }}
      />
    </StyledContainer>
  )
}