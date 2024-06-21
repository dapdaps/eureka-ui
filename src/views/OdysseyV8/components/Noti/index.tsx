import Image from 'next/image';

import LottieEyes from '../LottieEyes';
import { StyledContainer, StyledContent } from './styles';

export default function Noti({ onClose }: any) {
  return (
    <StyledContainer>
      <StyledContent>
        <LottieEyes />
        ‘SPIN-TO-WIN’ Prize Pool has been distributed and the function is temporarily closed.
      </StyledContent>
      <Image
        className="close"
        src="/images/odyssey/v4/noti-close.svg"
        alt=""
        width={12}
        height={12}
        onClick={onClose}
      />
    </StyledContainer>
  );
}
