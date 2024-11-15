import IconArrow from '@public/images/home/arrow-right.svg';
import IconClickArrow from '@public/images/home/click-arrow.svg';
import { useSize } from 'ahooks';
import { useRouter } from 'next/router';
import { memo, useMemo, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Loading from '@/components/Icons/Loading';
import ChainMap from '@/config/chains';
import odyssey from '@/config/odyssey';
import { CampaignData } from '@/data/campaign';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { StyledFlex, StyledFont } from '@/styled/styles';
import OdysseyVideo from '@/views/Dapp/components/DappDetail/RelativeOdyssey/Video';
import useCompassCombineAd from '@/views/Home/components/Compass/hooks/useCompassCombineAd';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import { StyledComingSoon } from '@/views/Home/components/Compass/styles';

import MedalList from '../Medal';
import RewardList from '../Reward';
import Tag, { StatusType } from '../Tag';
import {
  StyleChainIconImg,
  StyledCard,
  StyledCardBackgroundImage,
  StyledCardMainContent,
  StyledCardTitle,
  StyledCompassButton,
  StyledContainer,
  StyledContent,
  StyledInner,
  StyledOdysseyHead,
  StyledOdysseyIcon,
  StyledOdysseyIconTitle,
  StyledOdysseyInfo,
  StyledSwiperNextButton,
  StyledSwiperPagination,
  StyledSwiperPrevButton,
  StyledSwiperWrapper,
  StyledVideo,
  StyledVideoIcon,
  StyleList
} from './styles';

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
        title: 'Odyssey is upcoming...'
      });
      return;
    }
    if (compass.id < 0) {
      router.push(compass.link);
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
            filter: compass.status === 'ended' ? 'grayscale(100%)' : 'grayscale(0%)'
          }}
        />
        <StyledCardMainContent>
          <StyledOdysseyHead>
            <StyledOdysseyInfo>
              {compass.tag === 'tales' ? (
                <>
                  <img src="/images/odyssey/tales.png" alt="tales" className="info-tales" />
                </>
              ) : (
                <>
                  <StyledOdysseyIcon />
                  <StyledOdysseyIconTitle>
                    Vol.{renderVolNo({ name: compass.name, id: compass.id })}
                  </StyledOdysseyIconTitle>
                </>
              )}

              <div className="chainList">
                {compass.tag === 'tales' ? (
                  <>{compass.dapp?.map((img: any) => <img key={img} src={img} alt="" className="dapp-img" />)}</>
                ) : (
                  parseChainsId(compass.chains_id).map((chain: any, index) => (
                    <StyleChainIconImg key={index} src={ChainMap[chain].icon} alt="" />
                  ))
                )}
              </div>
            </StyledOdysseyInfo>
            <Tag status={compass.status} />
          </StyledOdysseyHead>
          <StyledCardTitle>{formatCompassName(compass.name)}</StyledCardTitle>
          <StyleList>
            <RewardList odyssey={compass} />
            {/* Todo: hide Medal  */}
            {/* <MedalList medals={compass.medals} /> */}
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
                  router.push('/campaigns');
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

function getStaticCampaignList(staticCampaignList: any, type: StatusType) {
  Object.values(CampaignData).forEach((campaign) => {
    if (!campaign.odyssey) return;
    campaign.odyssey.forEach((ody) => {
      if (!ody.superBridgeBanner || ody.status !== type || staticCampaignList.some((it: any) => it.id === ody.id))
        return;
      ody.tag = 'tales';
      ody.mock = true; // mark as static campaign
      // staticCampaignList.push(ody);

      let reward = ody.reward;
      if (ody.category === 'linea-liquid-2') {
        reward = ody._reward;
      }
      staticCampaignList.push({
        ...ody,
        reward
      });
    });
  });

  return staticCampaignList;
}

const Compass = () => {
  const size: any = useSize(window.document.getElementsByTagName('body')[0]);

  const { compassList, loading } = useCompassList();

  // static campaign data
  const staticCampaignList: any = [];

  getStaticCampaignList(staticCampaignList, StatusType.ongoing);

  const combinedList = useMemo(() => {
    const filterCompassList = compassList.filter((compass: any) => [StatusType.ongoing].includes(compass.status));
    const result = [...staticCampaignList, ...filterCompassList];
    if (result.length === 0) {
      const _staticCampaignList = getStaticCampaignList([], StatusType.ended);
      _staticCampaignList.sort((a: any, b: any) => {
        return new Date(b.start_time).getTime() - new Date(a.start_time).getTime();
      });
      const combinedEndList = [..._staticCampaignList, ...compassList];

      return combinedEndList;
    }
    return result;
  }, [compassList]);

  const swiperRef = useRef<any>();

  const [show, setShow] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const showVideo = (_video: string) => {
    if (!_video) {
      return;
    }
    setVideoUrl(_video);
    setShow(true);
  };

  // const filterCompassList = useMemo(() => {
  //   // fix#DAP-785
  //   const hasLive = compassList.some((compass: any) =>
  //     [StatusType.ongoing, StatusType.un_start].includes(compass.status)
  //   );
  //   return hasLive
  //     ? compassList.filter((compass: any) => [StatusType.ongoing, StatusType.un_start].includes(compass.status))
  //     : compassList;
  // }, [compassList]);

  if (!combinedList || combinedList.length === 0) return null;

  return loading ? (
    <Skeleton width={1244} height={405} borderRadius={12} />
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
              pagination={
                combinedList.length > 1
                  ? {
                      el: '.swiper-pagination',
                      clickable: true,
                      renderBullet: (index, className) => {
                        return `<span class="${className} swiper-pagination-bullet-${index}"></span>`;
                      }
                    }
                  : false
              }
              loop={true}
            >
              {combinedList.map((compass: any, index: number) => (
                <SwiperSlide key={index}>
                  <CompassCard compass={compass} />

                  {compass.tag === 'tales'
                    ? compass.video && (
                        <StyledVideo
                          url={compass.banner}
                          onClick={(e) => {
                            e.stopPropagation();
                            showVideo(compass.video);
                          }}
                        >
                          <StyledVideoIcon src="/images/alldapps/icon-play.svg" />
                        </StyledVideo>
                      )
                    : odyssey[compass?.id]?.video && (
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
            {combinedList?.length > 1 && (
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
            )}
          </StyledSwiperWrapper>
        </StyledInner>
      </StyledContent>
      {combinedList.length > 1 && <StyledSwiperPagination className="swiper-pagination" />}
    </StyledContainer>
  );
};

export default memo(Compass);
