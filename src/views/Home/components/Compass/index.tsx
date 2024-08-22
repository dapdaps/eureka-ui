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
import Loading from '@/components/Icons/Loading';
import odyssey from '@/config/odyssey';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { StyledFlex, StyledFont } from '@/styled/styles';
import { extractPathFromUrl } from '@/utils/formate';
import Tag from '@/views/Odyssey/components/Tag';

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
  StyledSwiperWrapper,
} from './styles';

const AdCard = function ({ ad }: any) {
  const router = useRouter();
  return (
    <StyledCard>
      <StyledFlex gap="32px" alignItems="flex-start" style={{ width: '100%', height: '100%' }}>
        <StyledCardBackgroundImage
          src={ad.ad_images}
          alt={ad.title}
          width={720}
          height={400}
        />
        <StyledCardMainContent>
          <div className="title">Featured</div>
          <div className="card_section">
            {ad.title.indexOf('Super Bridge') > -1 ? (
              <img className="logo" src="/images/home/super-bridge.png" alt="" />
            ) : (
              <StyleAdTitle>{ad.title}</StyleAdTitle>
            )}
            <div className="card-tips">{ad.description}</div>
          </div>
          <div className='btns'>
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
        title: 'Odyssey is upcoming...',
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
            filter: compass.status === 'ended' ? 'grayscale(100%)' : 'grayscale(0%)',
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
                  router.push('/odyssey')
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
                },
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
                              zIndex: 20,
                            }
                          : {
                              position: 'absolute',
                              right: -34,
                              top: 0,
                              zIndex: 20,
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
                          transform: 'rotate(-15deg)',
                        }}
                      >
                        {odyssey[compass.id]?.reward}
                      </StyledFont>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            {
              compassList?.length > 0 && (
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
              )
            }

          </StyledSwiperWrapper>
        </StyledInner>
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Compass);
