import styled from 'styled-components';

import { useBasic } from '../../RubicHoldstation/hooks/useBasic';

const Wrapper = styled.div`
  height: 580px;
  background: url(/images/odyssey/lineaLiquid/et-bottom.png) center bottom no-repeat;
  background-size: auto 100%;
  mix-blend-mode: exclusion;
  font-family: Montserrat;
`;

interface Props {
  category: string;
}

export default function Stats({ category }: Props) {
  // console.log('data:', data);

  return <Wrapper></Wrapper>;
}
