import Image from 'next/image';

import LottieEyes from '../LottieEyes';
import { StyledContainer, StyledContent } from './styles';

export default function Noti({ onClose }: any) {
  return (
    <StyledContainer>
      <StyledContent>
        <LottieEyes />
        When completing a transaction, please stay on the component page briefly to prevent any failure in reporting
        information.
      </StyledContent>
      <Image className="close" src="/images/odyssey/v4/close.svg" alt="" width={12} height={12} onClick={onClose} />
    </StyledContainer>
  );
}
