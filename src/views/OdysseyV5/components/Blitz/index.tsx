import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Loading from '@/components/Icons/Loading';
import useDappOpen from '@/hooks/useDappOpen';
import { StyledLoadingWrapper } from '@/styled/styles';
import {
  StyledArrow,
  StyledContainer,
  StyledContent,
  StyledEarnedCardContent,
  StyledEarnedItem,
  StyledFoot,
  StyledHead,
  StyledInner,
  StyledLeftBtn,
  StyledPageBtn,
  StyledRightBtn,
  StyledTitle
} from '@/views/OdysseyV5/components/Blitz/styles';
import EarnedCard from '@/views/OdysseyV5/components/EarnedCard';
import { EmptyContainer } from '@/views/OdysseyV5/components/Lending/styles';

const earned = [
  {
    key: 1,
    icon: '/images/odyssey/v5/mastery/temp/smd.svg',
    text: '$SMD',
    lightText: '20-25K'
  },
  {
    key: 4,
    icon: '',
    text: '',
    lightText: ''
  },
  {
    key: 2,
    icon: '/images/odyssey/v5/mastery/temp/mode.svg',
    text: 'MODE POINTS',
    lightText: '3-5X'
  }
  // {
  //   key: 3,
  //   icon: '/images/odyssey/v5/mastery/temp/renzo-points.svg',
  //   text: 'DapDap PTS',
  //   lightText: '200'
  // },
];
const submit = 'Swap';

const ICON_MAP: any = {
  'Li.Fi': 'https://s3.amazonaws.com/dapdap.main/images/lifi.png',
  Stargate: 'https://s3.amazonaws.com/dapdap.main/images/stargate.png',
  Orbiter: '/images/apps/orbiter.png'
};

const IconArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
    <path
      d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM27.7071 8.7071C28.0976 8.31658 28.0976 7.68342 27.7071 7.29289L21.3431 0.92893C20.9526 0.538406 20.3195 0.538406 19.9289 0.928931C19.5384 1.31945 19.5384 1.95262 19.9289 2.34314L25.5858 8L19.9289 13.6569C19.5384 14.0474 19.5384 14.6805 19.9289 15.0711C20.3195 15.4616 20.9526 15.4616 21.3431 15.0711L27.7071 8.7071ZM1 9L27 9L27 7L1 7L1 9Z"
      fill="currentColor"
    />
  </svg>
);

const Blitz = ({
  list,
  loading,
  onRefreshDetail,
  detailLoading,
  setDetailLoading
}: {
  list: Record<string, any>[];
  loading: boolean;
  onRefreshDetail: () => void;
  detailLoading: boolean;
  setDetailLoading: (v?: any) => void;
}) => {
  const { open: dappOpen } = useDappOpen();
  const swiperRef = useRef<any>();

  const handleDappRedirect = (earnItem: any) => {
    if (earnItem.website) {
      window.open(earnItem.website);
      return;
    }
    if (!earnItem.operators || !earnItem.operators.length) {
      return;
    }
    const dapp = earnItem.operators[0];
    if (dapp.route) {
      dappOpen({
        dapp: { ...dapp, route: `/${dapp.route}` },
        from: 'quest',
        isCurrentTab: false
      });
    }
  };

  const getEarnedList = (earnItem: any) => {
    if (earnItem.earned) return earnItem.earned;
    return earned;
  };

  const getEarnedHeadIconList = (earnItem: any) => {
    if (earnItem.operators && earnItem.operators.length) {
      return earnItem.operators.map((it: any) => it.dapp_logo);
    }
    return ICON_MAP[earnItem.name];
  };

  useEffect(() => {
    if (list.length === 2 && swiperRef.current) {
      const containerWidth = parseFloat(getComputedStyle(swiperRef.current.el).width);
      const timer = setTimeout(() => {
        swiperRef.current.setTranslate(containerWidth / 6);
        clearTimeout(timer);
      }, 300);
    }
  }, [list]);

  return (
    <StyledContainer id="odysseySectionModeDAppBlitz">
      <StyledInner>
        <StyledHead>
          <StyledTitle>
            <h2 className="title">Mode DApp Blitz</h2>
            <h5 className="title sub">Experience the Madness, Snatch Extraordinary Bounties!</h5>
          </StyledTitle>
        </StyledHead>
        <StyledContent>
          <Swiper
            style={{ width: '100%' }}
            slidesPerView={3}
            spaceBetween={27}
            centeredSlides={true}
            modules={[FreeMode]}
            freeMode={true}
            className="modeDappBlitzSwiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {loading ? (
              <StyledLoadingWrapper $h="100px">
                <Loading size={30} />
              </StyledLoadingWrapper>
            ) : list?.length ? (
              list.map((earn) => (
                <SwiperSlide key={earn.id}>
                  <EarnedCard
                    id={earn.id}
                    total_spins={earn.total_spins}
                    spins={earn.spins}
                    handleSubmit={() => handleDappRedirect(earn)}
                    title={earn.name}
                    icon={getEarnedHeadIconList(earn)}
                    iconBorder="#DFFE00"
                    submit={earn.submit || submit}
                    styles={{
                      flex: 1,
                      height: '100%'
                    }}
                    reload={false}
                    refreshDetail={onRefreshDetail}
                    detailLoading={detailLoading}
                    setDetailLoading={setDetailLoading}
                  >
                    <StyledEarnedCardContent>
                      <div className="tips">
                        Use {earn.name} to complete transactions on dapdap and get extra rewards
                      </div>
                      <section className="section earned">
                        <div className="title">Tokens & Points earned:</div>
                        <ul className="list mt">
                          {getEarnedList(earn).map((item: any) =>
                            item.text ? (
                              <StyledEarnedItem className="item" key={item.key}>
                                <Image src={item.icon} alt="" width={30} height={30} />
                                <span className="hilight">{item.lightText}</span> {item.text}
                              </StyledEarnedItem>
                            ) : (
                              <div style={{ width: '300px' }} key={item.key}></div>
                            )
                          )}
                        </ul>
                      </section>
                      <section className="section requirements">
                        <div className="title">Requirements:</div>
                        <ul className={`list ${earn.requirements ? 'styled' : ''}`}>
                          {earn.requirements ? (
                            earn.requirements.map((requirement: string, idx: number) => (
                              <li key={idx} className="item" dangerouslySetInnerHTML={{ __html: requirement }} />
                            ))
                          ) : (
                            <li className="item">
                              Swap through {earn.name} on DapDap to earn token rewards based on your trading volume.
                            </li>
                          )}
                        </ul>
                      </section>
                    </StyledEarnedCardContent>
                  </EarnedCard>
                </SwiperSlide>
              ))
            ) : (
              <EmptyContainer>No Data</EmptyContainer>
            )}
          </Swiper>
          {list?.length > 3 && (
            <StyledPageBtn>
              <StyledLeftBtn
                className="btn"
                onClick={() => {
                  swiperRef.current && swiperRef.current.slidePrev();
                }}
              >
                <StyledArrow>{IconArrow}</StyledArrow>
              </StyledLeftBtn>
              <StyledRightBtn
                className="btn"
                onClick={() => {
                  swiperRef.current && swiperRef.current.slideNext();
                }}
              >
                {IconArrow}
              </StyledRightBtn>
            </StyledPageBtn>
          )}
        </StyledContent>
        <StyledFoot></StyledFoot>
      </StyledInner>
    </StyledContainer>
  );
};

export default Blitz;
