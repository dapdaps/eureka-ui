import styled from 'styled-components';

const Wrapper = styled.div`
  background: url('/images/odyssey/lineaLiquid2/horse-bg.png') 0 0 no-repeat;
  background-size: 100% 100%;
`;

export default function TaskWrapper({ children }: any) {
  return <Wrapper>{children}</Wrapper>;
}
