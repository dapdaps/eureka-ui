import { maxBy } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useAuthCheck from '@/hooks/useAuthCheck';

const StyledContainer = styled.div<{ width?: number; top?: number }>`
  width: ${({ width }) => `${width}px`};
  position: absolute;
  right: -170px;
  top: ${({ top }) => `${top || 5}px`};
  z-index: -1;
  cursor: pointer;
  transition: 0.5s;
  overflow: hidden;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }

  .odyssey-entry-swiper {
    > .swiper-wrapper {
      align-items: stretch;
      > .swiper-slide {
      }
    }
  }
`;

const RelativeContainerHeight = 40;
const OdysseyList = [
  {
    id: 6,
    img: '/images/odyssey/welcome/logo.gif',
    width: 117,
    height: 16.5,
    offsetY: 0
  }
  // {
  //   id: 6,
  //   img: '/images/odyssey/thruster/head-entry.svg',
  //   width: 158,
  //   height: 59,
  //   offsetY: -2.5,
  // },
  // {
  //   id: 7,
  //   img: '/images/odyssey/v5/ody-logo.svg',
  //   width: 112,
  //   height: 40,
  //   offsetY: 0,
  // },
];

const MaxHeight = maxBy(OdysseyList, 'height')?.height as number;
const MaxWidth = maxBy(OdysseyList, 'width')?.width as number;
const EntryTop = (RelativeContainerHeight - MaxHeight) / 2;

// for test env
if (process.env.NEXT_PUBLIC_API !== 'https://api.dapdap.net') {
  OdysseyList[0].id = 9;
  // OdysseyList[1].id = 5;
}

export default function OdysseyIcon() {
  const { check } = useAuthCheck({ isNeedAk: true });
  const router = useRouter();
  const odysseyId = process.env.NEXT_PUBLIC_API === 'https://test-api.dapdap.net' ? '9' : '6';

  return (
    <StyledContainer className="swiper-no-swiping" width={MaxWidth} top={EntryTop}>
      {OdysseyList.length > 1 ? (
        <Swiper
          spaceBetween={5}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            pauseOnMouseEnter: true
          }}
          modules={[Autoplay]}
          slidesPerView={1}
          className="odyssey-entry-swiper"
          style={{ height: MaxHeight }}
        >
          {OdysseyList.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => {
                check(() => {
                  router.push(`/campaigns/home?id=${item.id}`);
                });
              }}
            >
              <Image
                src={item.img}
                alt=""
                width={item.width}
                height={item.height}
                style={{ transform: `translateY(${item.offsetY || 0}px)` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Image
          src={OdysseyList[0].img}
          alt=""
          width={OdysseyList[0].width}
          height={OdysseyList[0].height}
          onClick={() => {
            check(() => {
              // router.push(`/odyssey/home?id=${odysseyId}`);
              router.push(`/campaigns/homepage`);
            });
          }}
        />
      )}
      {/* <Image src="/images/odyssey/v8/gold-rush.svg" alt="" width={149} height={51} /> */}
      {/* <StyledIcon /> */}
    </StyledContainer>
  );
}
