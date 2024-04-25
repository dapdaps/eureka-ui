import Image from 'next/image';

import { StyledContainer, StyledContent } from './styles';

export default function Banner() {
  return (
    <StyledContainer>
      <StyledContent>
        <Image src="/images/odyssey/v4/logo.svg" alt="" width={425} height={42} />
        <Image src="/images/odyssey/v4/gold-rush.svg" alt="" width={1151} height={451} />
      </StyledContent>
    </StyledContainer>
  );
}
