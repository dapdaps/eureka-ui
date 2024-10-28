import Connector from '../Connector/Pencil';
import { StyledContainer } from '../styles';
export default function Pencil(props: any) {
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
