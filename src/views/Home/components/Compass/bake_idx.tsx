import { useSize } from 'ahooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CompassIcon from '@/components/Icons/Compass';
import Loading from '@/components/Icons/Loading';
import odyssey from '@/config/odyssey';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';
import Tag from '@/views/Odyssey/components/Tag';
import useCompassList from './hooks/useCompassList';

import IconArrow from '@public/images/home/arrow-right.svg'

import {
  StyledCard,
  StyledCardBackgroundImage,
  StyledCardButton,
  StyledCardDesc,
  StyledCardMainContent,
  StyledCardTitle,
  StyledChainsImg,
  StyledCominsoon,
  StyledCompassIcon,
  StyledContainer,
  StyledContent,
  StyledInner,
  StyledLoadingWrapper,
  StyledSwiperNextButton,
  StyledSwiperPrevButton,
  StyledSwiperWrapper,
} from './styles';

const Card = function ({ compass }: any) {
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
      <StyledFlex gap="12px">
        <StyledCardBackgroundImage
          src={compass.banner}
          alt={compass.name}
          style={{
            filter: compass.status === 'ended' ? 'grayscale(100%)' : 'grayscale(0%)',
          }}
        />
        <StyledCardMainContent>
          <StyledFlex alignItems="center" gap="12px">
            {odyssey[compass.id]?.chainsImg && (
              <StyledChainsImg
                src={odyssey[compass.id]?.chainsImg}
                style={{ height: odyssey[compass.id]?.chainsHeight }}
              />
            )}
            <Tag status={compass.status} />
          </StyledFlex>
          <StyledCardTitle>{compass.name}</StyledCardTitle>
          <StyledCardDesc>{compass.description}</StyledCardDesc>
          {compass.status === 'un_start' ? (
          <StyledCominsoon>Coming soon...</StyledCominsoon>
            ) : (
              <StyledCardButton
                onClick={() => {
                  check(handleExplore);
                }}
                data-bp="1001-003"
              >
                <div>Explore now</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <path
                    d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
                    fill="black"
                  />
                </svg>
              </StyledCardButton>
            )}
        </StyledCardMainContent>
      </StyledFlex>
    </StyledCard>
  );
};
const Compass = () => {
  const router = useRouter();
  const size: any = useSize(window.document.getElementsByTagName('body')[0]);
  const { loading, compassList } = useCompassList();
  const swiperRef = useRef<any>();

  return loading ? (
    <StyledLoadingWrapper>
      <Loading size={60} />
    </StyledLoadingWrapper>
  ) : (
    <StyledContainer>
      <StyledContent>
        <StyledInner>
          <StyledSwiperWrapper>
            <Swiper
              width={1244}
              modules={[Autoplay]}
              slidesPerView={1}
              // autoplay={{ delay: 113000 }}
              speed={1000}
              spaceBetween={(size?.width - 1244) / 2 + 100}
              updateOnWindowResize={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              // loop={true}
            >
              {compassList.map((compass: any, index: number) => (
                <SwiperSlide key={index}>
                    <Card compass={compass} />
                    <StyledCompassIcon>
                      <CompassIcon />
                    </StyledCompassIcon>
                  {compass.name === 'THRUSTER TURBO SPIN' ? null : (
                    <StyledCompassIcon>
                      <CompassIcon />
                    </StyledCompassIcon>
                  )}

                  {/* {odyssey[compass.id]?.reward && (
                    <StyledWinPtsIcon>
                      <WinPtsIcon num={odyssey[compass.id].reward} />
                    </StyledWinPtsIcon>
                  )} */}
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
          </StyledSwiperWrapper>
        </StyledInner>
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Compass);
