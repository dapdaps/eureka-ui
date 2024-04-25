import Image from 'next/image';

import Trapeziform from '../Trapeziform';
import { StyledContainer, StyledContent } from './styles';

export default function Modal({ type, children, onClose }: any) {
  const TrapLayout = {
    borderColor: '#FFDD4D',
    corner: 34,
  };
  return (
    <StyledContainer>
      <StyledContent>
        {/* <Trapeziform {...TrapLayout}>
          </Trapeziform> */}
        {children}
      </StyledContent>
    </StyledContainer>
  );
}
