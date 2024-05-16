import Image from 'next/image';

import LottieEyes from '../LottieEyes';
import { StyledContainer, StyledContent } from './styles';
import { useState } from "react";

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
          When completing a transaction, please stay on the component page briefly to prevent any failure in reporting
          information. If you completed a transaction but not confirmed, manually try entering the transaction Tx
          address.
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
