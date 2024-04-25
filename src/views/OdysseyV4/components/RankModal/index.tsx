import Image from 'next/image';

import { StyledContainer, StyledContent } from './styles';

export default function Modal({ type, children, onClose }: any) {
  return (
    <StyledContainer>
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
}
