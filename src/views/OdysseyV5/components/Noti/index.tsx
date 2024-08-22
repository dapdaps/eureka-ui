import Image from 'next/image';
import { useState } from "react";

import LottieEyes from '../LottieEyes';
import { StyledContainer, StyledContent } from './styles';

export default function Noti() {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <StyledContainer>
      <StyledContent>
        <LottieEyes />
        <div className="text">
          Follow Strategies and Complete Tasks to get the best returns and win rewards. Final rewards are ranked by Trading Volume during the odyssey.
        </div>
      </StyledContent>
      <Image
        className="close"
        src="/images/odyssey/v5/noti-close.svg"
        alt=""
        width={12}
        height={12}
        onClick={handleClose}
      />
    </StyledContainer>
  );
}
