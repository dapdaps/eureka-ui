import Image from 'next/image';

import LottieEyes from '../LottieEyes';
import { StyledContainer, StyledContent } from './styles';

export default function Noti({ onClose }: any) {
  return (
    <StyledContainer>
      <StyledContent>
        <LottieEyes />
        Spin-To-Win is temporarily under maintenance - we will be back soon!
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
