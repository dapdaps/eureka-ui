import styled from 'styled-components';

const Wrapper = styled.div`
  background: url('/images/odyssey/lineaLiquid2/horse-bg.png') 0 bottom no-repeat;
  background-size: 70% auto;
`;

export default function TaskWrapper({ children }: any) {
  return <Wrapper>{children}</Wrapper>;
}
