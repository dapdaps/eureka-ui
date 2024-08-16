import { useSize } from 'ahooks';
import { useRouter } from 'next/router';
import { memo, useMemo, useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '@/components/Icons/Loading';
import odyssey from '@/config/odyssey';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { StyledFlex, StyledFont } from '@/styled/styles';
import ChainMap from '@/config/chains';
import Skeleton from 'react-loading-skeleton';

import IconArrow from '@public/images/home/arrow-right.svg';
import IconClickArrow from '@public/images/home/click-arrow.svg';
import OdysseyVideo from '@/views/Dapp/components/DappDetail/RelativeOdyssey/Video';

import {
  StyledCard,
  StyledCardBackgroundImage,
  StyledCardMainContent,
  StyledContainer,
  StyledContent,
  StyledInner,
  StyledLoadingWrapper,
  StyledSwiperNextButton,
  StyledSwiperPrevButton,
  StyledSwiperWrapper,
  StyledCardTitle,
  StyledCominsoon,
  StyledCompassButton,
  StyledOdysseyIconTitle,
  StyledOdysseyHead,
  StyledOdysseyInfo,
  StyledOdysseyIcon,
  StyleList,
  StyledVideo,
  StyledVideoIcon,
  StyleChainIconImg, StyledSwiperPagination,
} from './styles';

import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import Tag, { StatusType } from '../Tag';
import RewardList from '../Reward';
import MedalList from '../Medal';
import { StyledComingSoon } from '@/views/Home/components/Compass/styles';

export const formatCompassName = (name: string) => {
  if (!name) return '';

  const parts = name.split(': ');
  return parts.length > 1 ? (
    <>
      {parts[0]}：<br />
      {parts[1]}
    </>
  ) : (
    name
  );
};

const parseChainsId = (chains_id: string | null): string[] =>
  chains_id ? chains_id.split(',').map((id) => id.trim()) : [];

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

  const renderVolNo = (options: { name: string; id: number }) => {
    const { name, id } = options;
    if (!name) return null;
    if (name.indexOf('Vol.4+:') > -1) {
      return '4+';
    }
    // ⚠️ Special: mode-odyssey id is 7, but show number is 5
    if (id === 7) {
      return 5;
    }
    return id;
  };

  return (
    <StyledCard>
      <StyledFlex gap="32px" alignItems="flex-start" style={{ width: '100%', height: '100%' }}>
        <StyledCardBackgroundImage
          src={compass.banner || '/images/odyssey/v2/default.jpg'}
          alt={compass.name}
          style={{
            filter: compass.status === 'ended' ? 'grayscale(100%)' : 'grayscale(0%)',
          }}
        />
        <StyledCardMainContent>
          <StyledOdysseyHead>
            <StyledOdysseyInfo>
              <StyledOdysseyIcon />
              <StyledOdysseyIconTitle>Vol.{renderVolNo({ name: compass.name, id: compass.id })}</StyledOdysseyIconTitle>
              <div className="chainList">
                {parseChainsId(compass.chains_id).map((chain: any) => (
                  <StyleChainIconImg src={ChainMap[chain].icon} alt="" />
                ))}
              </div>
            </StyledOdysseyInfo>
            <Tag status={compass.status} />
          </StyledOdysseyHead>
          <StyledCardTitle>{formatCompassName(compass.name)}</StyledCardTitle>
          <StyleList>
            <RewardList odyssey={compass} />
            <MedalList medals={compass.medals} />
          </StyleList>
          {/* <StyledCardDesc>{compass.description}</StyledCardDesc> */}
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
                <div>Explore Now</div>
                <IconClickArrow />
              </StyledCompassButton>
              {/* <StyledCompassButton
                className="plain"
                onClick={() => {
                  router.push('/odyssey');
                }}
              >
                <div>Explore All</div>
                <IconClickArrow />
              </StyledCompassButton> */}
            </div>
          )}
        </StyledCardMainContent>
      </StyledFlex>
    </StyledCard>
  );
};

const Compass = () => {
  const size: any = useSize(window.document.getElementsByTagName('body')[0]);

  const { loading, compassList } = useCompassList();

  const swiperRef = useRef<any>();

  const [show, setShow] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const showVideo = (_video: string) => {
    console.log(_video, '_video');

    if (!_video) {
      return;
    }
    setVideoUrl(_video);
    setShow(true);
  };

  const filterCompassList = useMemo(() => {
    // fix#DAP-785
    const hasLive = compassList.some((compass: any) => [StatusType.ongoing, StatusType.un_start].includes(compass.status));
    return hasLive ? compassList.filter((compass: any) => [StatusType.ongoing, StatusType.un_start].includes(compass.status)) : compassList;
  }
  , [compassList]);

  return loading ? (
    <Skeleton height={405} borderRadius={12} />
  ) : (
    <StyledContainer>
      <StyledContent>
        <StyledInner>
          <StyledSwiperWrapper>
            <Swiper
              width={1244}
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              autoplay={{ delay: 113000 }}
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
              {filterCompassList.map((compass: any, index: number) => (
                <SwiperSlide key={index}>
                  <CompassCard compass={compass} />
                  {odyssey[compass?.id]?.video && (
                    <StyledVideo
                      url={compass.banner}
                      onClick={(e) => {
                        e.stopPropagation();
                        showVideo(odyssey[compass?.id]?.video);
                      }}
                    >
                      <StyledVideoIcon src="/images/alldapps/icon-play.svg" />
                    </StyledVideo>
                  )}
                  {/* <StyledCompassIcon>
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
                   )} */}
                </SwiperSlide>
              ))}
            </Swiper>
            <OdysseyVideo
              src={videoUrl}
              visible={show}
              close={() => {
                setShow(false);
              }}
            />
            {
              filterCompassList?.length > 1 && (
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
                </>
              )
            }
          </StyledSwiperWrapper>
        </StyledInner>
      </StyledContent>
      <StyledSwiperPagination className="swiper-pagination" />
    </StyledContainer>
  );
};

export default memo(Compass);
