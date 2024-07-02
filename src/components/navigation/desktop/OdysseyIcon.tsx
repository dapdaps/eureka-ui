import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import useAuthCheck from '@/hooks/useAuthCheck';

const StyledContainer = styled.div<{ width?: number }>`
  width: ${({ width }) => `${width}px`};
  position: absolute;
  right: -216px;
  top: -8px;
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
`;

const OdysseyList = [
  {
    id: 9,
    img: '/images/odyssey/thruster/head-entry.svg',
  },
  {
    id: 5,
    img: '/images/odyssey/v5/ody-logo.svg',
  },
];
const OdysseySize = [158, 59];

export default function OdysseyIcon() {
  const { check } = useAuthCheck({ isNeedAk: true });
  const router = useRouter();
  const odysseyId = process.env.NEXT_PUBLIC_API === 'https://test-api.dapdap.net' ? '9' : '6';

  return (
    <StyledContainer width={OdysseySize[0]}>
      {
        OdysseyList.length > 1 ? (
          <Swiper
            spaceBetween={0}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            slidesPerView={1}
          >
            {
              OdysseyList.map((item) => (
                <SwiperSlide
                  key={item.id}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={() => {
                    check(() => {
                      router.push(`/odyssey/home?id=${item.id}`);
                    });
                  }}
                >
                  <Image
                    src={item.img}
                    alt=""
                    width={OdysseySize[0]}
                    height={OdysseySize[1]}
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) : (
          <Image
            src={OdysseyList[0].img}
            alt=""
            width={OdysseySize[0]}
            height={OdysseySize[1]}
            onClick={() => {
              check(() => {
                router.push(`/odyssey/home?id=${odysseyId}`);
              });
            }}
          />
        )
      }
      {/* <Image src="/images/odyssey/v8/gold-rush.svg" alt="" width={149} height={51} /> */}
      {/* <StyledIcon /> */}
    </StyledContainer>
  );
}
