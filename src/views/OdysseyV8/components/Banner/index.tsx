import Image from 'next/image';

import {
  Rush,
  StyledBottomBg,
  StyledContainer,
  StyledContent,
  StyledFrame,
  StyledLeftBg,
  StyledLeftDoor,
  StyledRightBg,
  StyledRightDoor,
} from './styles';

export default function Banner() {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledFrame />
        <StyledLeftDoor animate={{ x: '-50%', transition: { delay: 1, duration: 2 } }} />
        <StyledRightDoor animate={{ x: '50%', transition: { delay: 1, duration: 2 } }} />
        <StyledLeftBg />
        <StyledRightBg />
        <StyledBottomBg />
        <Image src="/images/odyssey/v8/logo.svg" alt="" width={425} height={42} />
        <Rush>
          <div className="animation-title" data-text="GOLD RUSH">
            GOLD RUSH
          </div>
          <div style={{ color: '#FDFE03' }} className="animation-title" data-text="RELOADED!">
            RELOADED!
          </div>
        </Rush>
      </StyledContent>
    </StyledContainer>
  );
}
