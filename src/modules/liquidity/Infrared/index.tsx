import Connector from '../Connector/Infrared';
import { StyledContainer } from '../styles';
export default function Infrared(props: any) {
  const { dexConfig } = props;
  return (
    <StyledContainer style={dexConfig.theme}>
      <Connector
        {...{
          ...props
        }}
      />
    </StyledContainer>
  );
}
