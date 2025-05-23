import Connector from '../Connector/Steer';
import { StyledContainer } from '../styles';
export default function Steer(props: any) {
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
