import styled from 'styled-components';

const Wrapper = styled.div`
  background: url('/images/odyssey/lineaLiquid2/horse-bg.png') 0 bottom no-repeat;
  background-size: auto 80%;
  padding-bottom: 200px;
`;

export default function TaskWrapper({ children }: any) {
  return <Wrapper>{children}</Wrapper>;
}
