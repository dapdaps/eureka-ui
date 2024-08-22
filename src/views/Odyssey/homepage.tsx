import { useConnectWallet } from '@web3-onboard/react';
import { cloneDeep } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import odyssey from '@/config/odyssey';
import useAuthCheck from '@/hooks/useAuthCheck';
import { StyledContainer, StyledFlex, StyledFont } from '@/styled/styles';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import Tag from '@/views/Odyssey/components/Tag';

import useClaim from './hooks/useClaim';
import useDetail from './hooks/useDetail';

const StyledLogo = styled.img`
  width: 340px;
`;
const StyledSwiperContainer = styled.div`
  position: relative;
  margin: 69px 0 29px;
  .swiper-slide {
    width: 500px;
    border-radius: 16px;
    overflow: hidden;
    /* height: 454px; */
  }
`;
const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 216px;
  height: 60px;
  border-radius: 10px;
  cursor: pointer;

  color: #02051e;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StyledJoinButton = styled(StyledButton)`
  background-color: #ebf479;
  &:hover {
    opacity: 0.8;
  }
`;
const StyledClaimButton = styled(StyledButton)`
  color: #ebf479;
  border: 1px solid #ebf479;
`;
const StyledQuestionList = styled.div`
  margin-top: 69px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-bottom: 30px;
`;
const StyledQuestion = styled.div`
  width: 898px;
  /* height: 98px; */
  border-radius: 16px;
  border: 1px solid #2d3035;
  background: linear-gradient(90deg, #1e2228 0%, #0d0f12 100%);
  padding: 20px;
`;
const StyledCard = styled.div`
  padding: 0;
  width: 500px;
  min-height: 454px;

  border-radius: 16px;
  border: 1px solid #464b56;
  background: #252831;
`;
const StyledVol = styled.div`
  width: 62px;
  height: 24px;
  background: url('/images/odyssey/welcome/vol_bg.png') no-repeat center;

  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
`;
const StyledChainsImg = styled.img``;
const StyledCompassImage = styled.img`
  width: 100%;
`;
const StyledCompassVideo = styled.video`
  width: 100%;
`;
const StyledSwiperButton = styled.div`
  position: absolute;
  left: 50px;
  top: 217px;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid rgba(151, 154, 190, 0.3);
  background: rgba(33, 35, 42, 0.9);
  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  &.right {
    left: unset;
    right: 50px;
    transform: rotate(180deg);
  }
`;
const Index = function () {
  const router = useRouter();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { check } = useAuthCheck({ isNeedAk: true });
  const { loading, compassList } = useCompassList();
  const { detail, queryDetail } = useDetail();
  const { loading: claimLoading, onClaim } = useClaim();
  const [activeIndex, setActiveIndex] = useState(0);
  const [sortCompassList, setSortCompassList] = useState<any>([]);

  const swiperRef = useRef<any>(null);
  const videoListRef = useRef<any>([]);

  const currentCompass = useMemo(() => {
    return sortCompassList[activeIndex];
  }, [sortCompassList, activeIndex]);

  const handleClickClaim = function () {
    if (claimLoading) return;
    if (detail.unclaimed_reward > 0) {
      onClaim(currentCompass?.id, () => {
        queryDetail(currentCompass?.id);
      });
    }
  };
  const handleJump = function (compass: any) {
    if (['un_start'].includes(compass.status)) {
      return;
    }
    router.push(odyssey[compass.id]?.path);
  };
  const handleClickSlideButton = function (event: any, type: string) {
    event.stopPropagation();
    if (type === 'prev') {
      swiperRef.current && swiperRef.current.slidePrev();
    } else {
      swiperRef.current && swiperRef.current.slideNext();
    }
  };

  useEffect(() => {
    if (compassList.length > 0) {
      const sortList = cloneDeep(compassList).reverse();
      let i = sortList.length - 1;
      let currentIndex = i;
      while (i) {
        if (sortList[i].status === 'ongoing') {
          currentIndex = i;
        }
        i--;
      }
      setSortCompassList(sortList);
      setActiveIndex(currentIndex);
      swiperRef.current && swiperRef.current.slideTo(currentIndex, 0);
    }
  }, [compassList]);

  useEffect(() => {
    wallet && currentCompass?.id && queryDetail(currentCompass?.id);
  }, [currentCompass, wallet]);

  const renderVolNo = (compass: any) => {
    if (!compass) return null;
    if (compass.name.indexOf('Vol.4+:') > -1) {
      return '4+';
    }
    // ⚠️ Special: mode-odyssey id is 7, but show number is 5
    if (compass.id === 7) {
      return 5;
    }
    return compass.id;
  };

  return (
    <StyledContainer
      style={{
        paddingTop: 56,
        backgroundColor: '#0D0F12',
      }}
    >
      <StyledFlex flexDirection="column" gap="20px">
        <StyledLogo src="/images/odyssey/welcome/logo.png" />
        <StyledFont color="#979ABE" fontSize="20px" lineHeight="150%">
          Exclusive Seasonal Lootbox Experiences
        </StyledFont>
      </StyledFlex>
      <StyledSwiperContainer>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            scale: 0.9,
            slideShadows: true,
          }}
          loop={true}
          modules={[EffectCoverflow]}
          initialSlide={activeIndex}
          onActiveIndexChange={(event) => {
            const index = event.realIndex;
            setActiveIndex(index);
            // stop video
            videoListRef.current.forEach((video: any) => {
              if (!video.paused) {
                video.pause();
              }
            });
            if (videoListRef.current[index]) {
              videoListRef.current[index].play();
            }
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {sortCompassList.map((compass: any, index: number) => {
            return (
              <SwiperSlide key={index} className="swiper-no-swiping">
                <StyledCard>
                  <StyledContainer
                    style={{
                      padding: '16px 20px 0 24px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleJump(compass);
                    }}
                  >
                    <StyledFlex justifyContent="space-between" style={{ marginBottom: 20 }}>
                      <StyledFlex gap="13px">
                        {compass.name === 'THRUSTER TURBO SPIN' ? null : (
                          <StyledVol
                            style={{
                              backgroundImage:
                                'url(' +
                                (['ended', 'un_start'].includes(compass.status)
                                  ? '/images/odyssey/welcome/ended_vol_bg.png'
                                  : '/images/odyssey/welcome/vol_bg.png') +
                                ')',
                            }}
                          >
                            Vol. {renderVolNo(compass)}
                          </StyledVol>
                        )}

                        {odyssey[compass.id]?.chainsImg && (
                          <StyledChainsImg src={odyssey[compass.id]?.chainsImg} style={{ height: 33 }} />
                        )}
                      </StyledFlex>
                      <Tag status={compass.status} />
                    </StyledFlex>
                    <StyledFont
                      color={['ended', 'un_start'].includes(compass.status) ? '#979ABE' : '#FFF'}
                      fontSize="26px"
                      fontWeight="700"
                      style={{
                        maxHeight: 64,
                      }}
                    >
                      {compass.name}
                    </StyledFont>
                  </StyledContainer>
                  <StyledContainer
                    style={{
                      padding: '33px 16px 16px',
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}
                  >
                    <StyledContainer
                      style={{
                        position: 'relative',
                      }}
                    >
                      {odyssey[compass.id]?.reward && (
                        <StyledContainer
                          style={{
                            position: 'absolute',
                            right: -13,
                            top: -11,
                            zIndex: 10,
                          }}
                        >
                          {['ended', 'un_start'].includes(compass.status) ? (
                            <Image
                              src={odyssey[compass.id]?.rewardDisableIcon as string}
                              alt=""
                              width={91}
                              height={91}
                            />
                          ) : (
                            <Image
                              src={odyssey[compass.id]?.rewardEnableIcon as string}
                              alt=""
                              width={91}
                              height={91}
                            />
                          )}
                          <StyledFont
                            fontSize="18px"
                            fontWeight="700"
                            lineHeight="150%"
                            style={{
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              top: 36,
                              textAlign: 'center',
                              transform: 'rotate(-15deg)',
                            }}
                          >
                            {odyssey[compass.id]?.reward}
                          </StyledFont>
                        </StyledContainer>
                      )}
                      <StyledContainer
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                        }}
                      >
                        {odyssey[compass.id]?.video ? (
                          <StyledCompassVideo
                            ref={(ref) => (videoListRef.current[index] = ref)}
                            loop
                            muted={false}
                            controls
                            playsInline
                            src={odyssey[compass.id]?.video}
                          />
                        ) : (
                          <StyledCompassImage
                            src={compass.banner}
                            style={{
                              filter: ['ended', 'un_start'].includes(compass.status) ? 'grayscale(1)' : 'grayscale(0)',
                            }}
                          />
                        )}
                      </StyledContainer>
                    </StyledContainer>
                  </StyledContainer>
                </StyledCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <StyledSwiperButton onClick={() => handleClickSlideButton(event, 'prev')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24" fill="none">
            <path
              d="M27 10.5C27.8284 10.5 28.5 11.1716 28.5 12C28.5 12.8284 27.8284 13.5 27 13.5V10.5ZM0.939341 13.0607C0.353554 12.4749 0.353554 11.5251 0.939341 10.9393L10.4853 1.3934C11.0711 0.807611 12.0208 0.807611 12.6066 1.3934C13.1924 1.97919 13.1924 2.92893 12.6066 3.51472L4.12132 12L12.6066 20.4853C13.1924 21.0711 13.1924 22.0208 12.6066 22.6066C12.0208 23.1924 11.0711 23.1924 10.4853 22.6066L0.939341 13.0607ZM27 13.5H2V10.5H27V13.5Z"
              fill="#979ABE"
            />
          </svg>
        </StyledSwiperButton>
        <StyledSwiperButton className="right" onClick={(event) => handleClickSlideButton(event, 'next')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24" fill="none">
            <path
              d="M27 10.5C27.8284 10.5 28.5 11.1716 28.5 12C28.5 12.8284 27.8284 13.5 27 13.5V10.5ZM0.939341 13.0607C0.353554 12.4749 0.353554 11.5251 0.939341 10.9393L10.4853 1.3934C11.0711 0.807611 12.0208 0.807611 12.6066 1.3934C13.1924 1.97919 13.1924 2.92893 12.6066 3.51472L4.12132 12L12.6066 20.4853C13.1924 21.0711 13.1924 22.0208 12.6066 22.6066C12.0208 23.1924 11.0711 23.1924 10.4853 22.6066L0.939341 13.0607ZM27 13.5H2V10.5H27V13.5Z"
              fill="#979ABE"
            />
          </svg>
        </StyledSwiperButton>
      </StyledSwiperContainer>
      {currentCompass && (
        <StyledFlex flexDirection="column" gap="30px">
          <StyledFont
            color="#FFF"
            fontSize="20px"
            lineHeight="150%"
            lineClamp="2"
            className="ellipsis"
            style={{
              width: 898,
              textAlign: 'center',
            }}
          >
            {currentCompass?.description ?? ''}
          </StyledFont>
          <StyledFlex gap="18px">
            {['ended', 'un_start'].includes(currentCompass.status) ? (
              <StyledJoinButton
                onClick={() => {
                  check(() => {
                    handleJump(currentCompass);
                  });
                }}
                style={{
                  width: currentCompass.status === 'ended' ? 216 : 380,
                }}
              >
                {currentCompass.name === 'THRUSTER TURBO SPIN'
                  ? 'Join Thruster Turbo'
                  : currentCompass.status === 'ended'
                    ? `Join Odyssey Vol.${renderVolNo(currentCompass)}`
                    : `Odyssey Vol.${renderVolNo(currentCompass)} is coming soon!`}
              </StyledJoinButton>
            ) : (
              <StyledJoinButton
                onClick={() => {
                  check(() => {
                    handleJump(currentCompass);
                  });
                }}
              >
                {currentCompass.name === 'THRUSTER TURBO SPIN'
                  ? 'Join Thruster Turbo'
                  : `Join Odyssey Vol.${renderVolNo(currentCompass)}`}
              </StyledJoinButton>
            )}

            {(detail?.unclaimed_reward ?? 0) > 0 && (
              <StyledClaimButton
                onClick={() => {
                  check(handleClickClaim);
                }}
              >
                Claim {detail?.unclaimed_reward} PTS
              </StyledClaimButton>
            )}
          </StyledFlex>
        </StyledFlex>
      )}
      <StyledQuestionList>
        <StyledQuestion>
          <StyledFont color="#FFF" fontWeight="700" lineHeight="150%">
            Q: How often do Odyssey volumes change?
          </StyledFont>
          <StyledFont color="#979ABE" lineHeight="150%">
            A: It depends! We currently aim to keep them live for as long as possible.
          </StyledFont>
        </StyledQuestion>
        <StyledQuestion>
          <StyledFont color="#FFF" fontWeight="700" lineHeight="150%">
            Q: Can I participate in Odyssey without DapDap Points (PTS)?
          </StyledFont>
          <StyledFont color="#979ABE" lineHeight="150%">
            A: Yes! Odyssey does not require any PTS and is crafted in way to reward user attention and engagement,
            making each season&apos;s experience integrally rewarding — simply by participating.
          </StyledFont>
        </StyledQuestion>
        <StyledQuestion>
          <StyledFont color="#FFF" fontWeight="700" lineHeight="150%">
            Q: Is there a fee to participate in Odyssey?
          </StyledFont>
          <StyledFont color="#979ABE" lineHeight="150%">
            A: No, Odyssey is a complimentary feature for DapDap users, emphasizing our dedication to making DeFi
            exploration accessible and fun for everyone.
          </StyledFont>
        </StyledQuestion>
      </StyledQuestionList>
    </StyledContainer>
  );
};
export default Index;
