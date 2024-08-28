import IconArrow from '@public/images/home/arrow-right.svg';
import IconClickArrow from '@public/images/home/click-arrow.svg';
import { useSize } from 'ahooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import CompassIcon from '@/components/Icons/Compass';
import odyssey from '@/config/odyssey';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import { extractPathFromUrl } from '@/utils/formate';

import useCompassCombineAd from './hooks/useCompassCombineAd';
import {
  StyleAdTitle,
  StyledCard,
  StyledCardBackgroundImage,
  StyledCardDesc,
  StyledCardMainContent,
  StyledCardTitle,
  StyledComingSoon,
  StyledCompassButton,
  StyledCompassIcon,
  StyledContainer,
  StyledContent,
  StyledInner,
  StyledSwiperNextButton,
  StyledSwiperPrevButton,
  StyledSwiperWrapper
} from './styles';

const AdCard = function ({ ad }: any) {
  const router = useRouter();
  return (
    <StyledCard>
      <StyledFlex gap="32px" alignItems="flex-start" style={{ width: '100%', height: '100%' }}>
        <StyledCardBackgroundImage src={ad.ad_images} alt={ad.title} width={720} height={400} />
        <StyledCardMainContent>
          <div className="title">Featured</div>
          <div className="card_section">
            {ad.title.indexOf('Super') > -1 ? (
              <StyledFlex gap={ad.title.indexOf('Bridge') ? '2px' : '10px'}>
                {ad.title.indexOf('Bridge') > -1 ? (
                  <StyledSvg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="52" viewBox="0 0 34 52" fill="none">
                      <path
                        d="M0.774696 23.7007L25.3431 0.601338C26.2923 -0.291079 27.7804 0.767292 27.2489 1.95676L19.4189 19.4798C19.0884 20.2195 19.5758 21.0664 20.3814 21.1523L32.8501 22.4806C33.8808 22.5904 34.2905 23.872 33.5146 24.5592L3.97155 50.7269C2.97277 51.6115 1.49646 50.4387 2.13232 49.2657L13.2326 28.7893C13.6344 28.0481 13.1611 27.1353 12.3238 27.0365L1.4519 25.754C0.445479 25.6353 0.0363794 24.3949 0.774696 23.7007Z"
                        fill="#EBF479"
                      />
                    </svg>
                  </StyledSvg>
                ) : (
                  <StyledSvg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="31" viewBox="0 0 36 31" fill="none">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.0329 0C13.6829 0 13.3472 0.139032 13.0997 0.386518L0.389346 13.0944C-0.442312 13.9259 0.146589 15.3478 1.32262 15.3478L21.0889 15.3478C21.789 15.3478 22.4604 15.0697 22.9555 14.5747L35.2792 2.25341C36.1109 1.42192 35.522 0 34.3459 0H14.0329ZM0.389361 28.3892L11.7479 17.0328H21.7629C22.4629 17.0328 23.1343 16.7548 23.6294 16.2598L24.5946 15.2948H34.3459C35.522 15.2948 36.1109 16.7167 35.2792 17.5482L22.9555 29.8695C22.4604 30.3645 21.789 30.6426 21.089 30.6426L1.32263 30.6426C0.146604 30.6426 -0.442297 29.2207 0.389361 28.3892Z"
                        fill="#EBF479"
                      />
                    </svg>
                  </StyledSvg>
                )}
                <StyleAdTitle>{ad.title}</StyleAdTitle>
              </StyledFlex>
            ) : (
              <StyleAdTitle>{ad.title}</StyleAdTitle>
            )}
            <div className="card-tips">{ad.description}</div>
          </div>
          {ad.btn && (
            <div className="btns">
              <StyledCompassButton
                onClick={() => {
                  const route = extractPathFromUrl(ad.ad_link);
                  if (route) {
                    router.push(route);
                  }
                }}
                data-bp="1001-003"
              >
                <div>{ad.btn}</div>
                <IconClickArrow />
              </StyledCompassButton>
            </div>
          )}
        </StyledCardMainContent>
      </StyledFlex>
    </StyledCard>
  );
};

const CompassCard = function ({ compass }: any) {
  const toast = useToast();
  const router = useRouter();
  const { check } = useAuthCheck({ isNeedAk: true });
  const handleExplore = async function () {
    if (compass.status === 'un_start') {
      toast.fail({
        title: 'Odyssey is upcoming...'
      });
      return;
    }
    if (!odyssey[compass.id]) return;
    router.push(odyssey[compass.id].path);
  };

  return (
    <StyledCard>
      <StyledFlex gap="32px" alignItems="flex-start" style={{ width: '100%', height: '100%' }}>
        <StyledCardBackgroundImage
          src={compass.banner || '/images/odyssey/v2/default.jpg'}
          alt={compass.name}
          width={720}
          height={400}
          style={{
            filter: compass.status === 'ended' ? 'grayscale(100%)' : 'grayscale(0%)'
          }}
        />
        <StyledCardMainContent>
          <div className="title">Odyssey</div>
          {/* <StyledOdysseyHead>
            <StyledOdysseyInfo>
              <StyledOdysseyIcon />
              <StyledOdysseyIconTitle>Vol.{renderVolNo({ name: compass.name, id: compass.id })}</StyledOdysseyIconTitle>
              {odyssey[compass.id]?.chainsImg && (
                <StyledChainsImg
                  src={odyssey[compass.id]?.chainsImg}
                  style={{ height: odyssey[compass.id]?.chainsHeight }}
                />
              )}
            </StyledOdysseyInfo>
            <Tag status={compass.status} />
          </StyledOdysseyHead> */}
          <StyledCardTitle>{compass.name}</StyledCardTitle>
          <StyledCardDesc>{compass.description}</StyledCardDesc>
          {compass.status === 'un_start' ? (
            <StyledComingSoon className="btns">Coming soon...</StyledComingSoon>
          ) : (
            <div className="btns">
              <StyledCompassButton
                onClick={() => {
                  check(handleExplore);
                }}
                data-bp="1001-003"
              >
                <div>Start now</div>
                <IconClickArrow />
              </StyledCompassButton>
              <StyledCompassButton
                className="plain"
                onClick={() => {
                  router.push('/odyssey');
                }}
              >
                <div>Explore All</div>
                <IconClickArrow />
              </StyledCompassButton>
            </div>
          )}
        </StyledCardMainContent>
      </StyledFlex>
    </StyledCard>
  );
};

const Compass = () => {
  const size: any = useSize(window.document.getElementsByTagName('body')[0]);

  const { loading, adList, compassList } = useCompassCombineAd();

  const swiperRef = useRef<any>();

  return loading ? (
    <StyledContent>
      <Skeleton height={500} borderRadius={12} />
    </StyledContent>
  ) : (
    <StyledContainer>
      <StyledContent>
        <StyledInner>
          <StyledSwiperWrapper>
            <Swiper
              width={1244}
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              speed={1000}
              spaceBetween={(size?.width - 1244) / 2 + 100}
              updateOnWindowResize={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className} swiper-pagination-bullet-${index}"></span>`;
                }
              }}
              loop={true}
            >
              {adList.map((ad: any, index: number) => (
                <SwiperSlide key={index}>
                  <AdCard ad={ad} />
                </SwiperSlide>
              ))}

              {compassList.map((compass: any, index: number) => (
                <SwiperSlide key={index}>
                  <CompassCard compass={compass} />
                  <StyledCompassIcon>
                    <CompassIcon />
                  </StyledCompassIcon>
                  {compass.name === 'THRUSTER TURBO SPIN' ? null : (
                    <StyledCompassIcon>
                      <CompassIcon />
                    </StyledCompassIcon>
                  )}
                  {odyssey[compass.id]?.reward && (
                    <div
                      style={
                        compass.name === 'THRUSTER TURBO SPIN'
                          ? {
                              position: 'absolute',
                              right: -27,
                              top: -33,
                              zIndex: 20
                            }
                          : {
                              position: 'absolute',
                              right: -34,
                              top: 0,
                              zIndex: 20
                            }
                      }
                    >
                      {['ended', 'un_start'].includes(compass.status) ? (
                        <Image src={odyssey[compass.id]?.rewardDisableIcon as string} alt="" width={111} height={111} />
                      ) : (
                        <Image src={odyssey[compass.id]?.rewardEnableIcon as string} alt="" width={111} height={111} />
                      )}
                      <StyledFont
                        fontSize="18px"
                        fontWeight="700"
                        lineHeight="150%"
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: -8,
                          top: odyssey[compass.id]?.rewardTop ? odyssey[compass.id]?.rewardTop : 45,
                          textAlign: 'center',
                          fontWeight: 900,
                          transform: 'rotate(-15deg)'
                        }}
                      >
                        {odyssey[compass.id]?.reward}
                      </StyledFont>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            {adList?.length + compassList?.length > 0 && (
              <>
                <StyledSwiperPrevButton
                  onClick={() => {
                    swiperRef.current && swiperRef.current.slidePrev();
                  }}
                >
                  <IconArrow />
                </StyledSwiperPrevButton>
                <StyledSwiperNextButton
                  onClick={() => {
                    swiperRef.current && swiperRef.current.slideNext();
                  }}
                >
                  <IconArrow />
                </StyledSwiperNextButton>
                <div className="swiper-pagination"></div>
              </>
            )}
          </StyledSwiperWrapper>
        </StyledInner>
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Compass);
