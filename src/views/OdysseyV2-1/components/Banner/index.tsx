import Image from 'next/image';
import {
  StyledBannerContainer,
  StyledContent,
  BannerTitle,
  BannerMain,
  BannerDesc
} from '@/views/OdysseyV2-1/components/Banner/styles';
import Summary from '@/views/OdysseyV2-1/components/Summary';

const Banner = (props: {
  detail: Record<string, any>;
}) => {
  const {detail} = props;
  return <StyledBannerContainer>
      <StyledContent>
          <Image src='/images/odyssey/v2-1/banner-title.svg' width={424} height={42} alt='Odyssey Vol.2*'/>
          <BannerMain>
            <BannerTitle>Odyssey Vol.2*: <span className='title-active'>Linea Surge</span></BannerTitle>
            <BannerDesc>DapDap Odyssey Vol.2 Revival：Unleash the Linea Surge</BannerDesc>
          </BannerMain>
          <Summary detail={detail} />
      </StyledContent>
  </StyledBannerContainer>;
}

export default Banner;
