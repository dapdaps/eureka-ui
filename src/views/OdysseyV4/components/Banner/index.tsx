import Image from 'next/image';

import { Rush, StyledContainer, StyledContent } from './styles';

export default function Banner() {
  return (
    <StyledContainer>
      <StyledContent>
        <Image src="/images/odyssey/v4/logo.svg" alt="" width={425} height={42} />
        {/* <Image src="/images/odyssey/v4/gold-rush.svg" alt="" width={1151} height={451} /> */}
        <Image src="/images/odyssey/v4/DapDapXBlast.svg" alt="" width={1145} height={88} className="dapdapx" />
        <Rush>
          <Image src="/images/odyssey/v4/banner-txt.svg" alt="" width={919} height={183} />
          <Image src="/images/odyssey/v4/banner-gold.svg" alt="" width={327} height={327} className="gold" />
          <Image src="/images/odyssey/v4/banner-light.svg" alt="" width={380} height={380} className="light" />
        </Rush>
      </StyledContent>
    </StyledContainer>
  );
}
