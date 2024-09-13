import Connector from '../Connector/Gamma';
import { StyledContainer } from '../styles';
export default function Gamma(props: any) {
  const { dexConfig } = props;
  console.log('111122223333');
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
