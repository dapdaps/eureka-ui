import Image from 'next/image';

import {
  StyledContainer,
  StyledContent,
  StyledMoon,
  StyledMoonDark,
  StyledMountain,
  StyledSlogan,
  StyledTitle
} from './styles';
import Summary from "@/views/OdysseyV5/components/Summary";

export default function Banner(props: any) {
  return (
    <StyledContainer>
      <StyledMoon>
        <Image src="/images/odyssey/v5/banner/moon.svg" alt="" width={799} height={799} />
      </StyledMoon>
      <StyledMoonDark>
        <Image src="/images/odyssey/v5/banner/moon-dark.svg" alt="" width={483} height={361} />
      </StyledMoonDark>
      <StyledMountain src="/images/odyssey/v5/banner/mountain.png" />
      <StyledContent>
        <StyledSlogan>
          <Image src="/images/odyssey/v5/banner/slogan.svg" alt="" width={425} height={42} />
        </StyledSlogan>
        <StyledTitle>
          <h1 className="title">DapDap X <text className="dark">Mode</text>:</h1>
          <h1 className="title">The Airdrop Ascendancy</h1>
          <h5 className="title sub">Forge Your Future Wealth in the Mode Ecosystem</h5>
        </StyledTitle>
        <Summary data={props.detail} loading={props.loading} />
      </StyledContent>
    </StyledContainer>
  );
}
