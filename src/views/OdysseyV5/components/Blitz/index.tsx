import {
  StyledContainer,
  StyledContent,
  StyledEarnedCardContent,
  StyledEarnedItem,
  StyledFoot,
  StyledHead,
  StyledInner,
  StyledTitle
} from '@/views/OdysseyV5/components/Blitz/styles';
import EarnedCard from '@/views/OdysseyV5/components/EarnedCard';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useDappOpen from '@/hooks/useDappOpen';
import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
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
      lightText: '4X'
    },
    {
      key: 3,
      icon: '/images/odyssey/v5/mastery/temp/renzo-points.svg',
      text: 'DapDap PTS',
      lightText: '200'
    },
  ]
const submit = 'Swap'

const ICON_MAP: any = {
  'Li.Fi': 'https://s3.amazonaws.com/dapdap.prod/images/lifi.png',
  Stargate: 'https://s3.amazonaws.com/dapdap.prod/images/stargate.png',
  Orbiter: '/images/apps/orbiter.png',
};

const Blitz = ({ list, loading, onRefreshDetail, detailLoading, setDetailLoading }: { list: Record<string, any>[], loading: boolean, onRefreshDetail: () => void, detailLoading: boolean, setDetailLoading: (v?: any) => void }) => {

  const { open: dappOpen } = useDappOpen();

  const handleDappRedirect = (operatorsList: Record<string, any>[]) => {
    if (!operatorsList.length) {
      return;
    }
    const dapp = operatorsList[0];
    dapp.route && dappOpen({ dapp: { ...dapp, route: `/${dapp.route}` }, from: 'quest', isCurrentTab: false });
  }

  return (
    <StyledContainer id="odysseySectionModeDAppBlitz">
      <StyledInner>
        <StyledHead>
          <StyledTitle>
            <h2 className="title">
              Mode DApp Blitz
            </h2>
            <h5 className="title sub">
              Experience the Madness, Snatch Extraordinary Bounties!
            </h5>
          </StyledTitle>
        </StyledHead>
        <StyledContent>
          <Swiper
            slidesPerView={3}
            spaceBetween={27}
            centeredSlides={false}
            modules={[]}
            className="modeDappBlitzSwiper"
          >
            {
              loading ? <StyledLoadingWrapper $h="100px">
                  <Loading size={30} />
                </StyledLoadingWrapper>
                : (list?.length ? list.map((earn) => (
                <SwiperSlide key={earn.key}>
                  <EarnedCard
                    id={earn.id}
                    total_spins={earn.total_spins}
                    spins={earn.spins}
                    handleSubmit={() => handleDappRedirect(earn?.operators ?? [])}
                    title={earn.name}
                    icon={ICON_MAP[earn.name] || earn.operators?.[0]?.dapp_logo}
                    iconBorder="#DFFE00"
                    submit={submit}
                    styles={{
                      flex: 1,
                    }}
                    reload={true}
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
                        <ul className="list">
                          {
                            earned.map((item) => (

                                item.text ? <StyledEarnedItem className="item" key={item.key}>
                                  <Image src={item.icon} alt="" width={30} height={30} />
                                  <span className="hilight">{item.lightText}</span> {item.text}
                                </StyledEarnedItem> : <div style={{ width: '300px' }}></div>
                            ))
                          }
                        </ul>
                      </section>
                      <section className="section requirements">
                        <div className="title">Requirements:</div>
                        <ul className="list">
                          <li className="item">Swap through {earn.name} on DapDap to earn token rewards based on your trading volume.</li>
                        </ul>
                      </section>
                    </StyledEarnedCardContent>
                  </EarnedCard>
                </SwiperSlide>
              )) :  <EmptyContainer>No Data</EmptyContainer>)
            }
          </Swiper>
        </StyledContent>
        <StyledFoot>
          <div className="summary">
            <div className="title">Your Mode Orbs</div>
            <div className="value">&lt; 25,668 &gt;</div>
          </div>
          <div className="summary">
            <div className="title">Your Mode Photons</div>
            <div className="value">&lt; 25,668 &gt;</div>
          </div>
        </StyledFoot>
      </StyledInner>
    </StyledContainer>
  );
};

export default Blitz;
