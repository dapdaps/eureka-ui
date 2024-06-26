import { Desc, StyledContainer, Title, CtrolImg, UnionImg } from './styles';

import ctrolImg from '../img/ctrol-Img.svg'
import unionImg from '../img/union.svg'

export default function Pilcrow({ title, desc }: any) {
  return (
    <StyledContainer>
      <Title>
        {title}
        <UnionImg src={unionImg.src}/>
        <CtrolImg src={ctrolImg.src}/>
      </Title>
      <Desc>{desc}</Desc>
      
    </StyledContainer>
  );
}
