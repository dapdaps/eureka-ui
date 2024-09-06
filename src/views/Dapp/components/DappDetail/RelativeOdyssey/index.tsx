import { memo, useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Empty from '@/components/Empty';
import Loading from '@/components/Icons/Loading';
import { StyledFlex } from '@/styled/styles';
import { get } from '@/utils/http';

import OdysseyCard from './Card';
import PageButton from './PageButton';
import {
  StyledContainer, StyledEmpty,
  StyledOdysseyDetail,
  StyledRelatedTitle,
} from './styles';

const RelativeOdyssey = (props: Props) => {
  const {
    title,
    dappId,
    networkId,
    chainId,
    dappName,
  } = props;

  const swiperRef = useRef<any>();

  const [odysseyList, setOdysseyList] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [odysseyPage, setOdysseyPage] = useState(0);

  const getOdysseyList = async () => {
    if (loading) return;
    setLoading(true);
    let url: string = '';
    let params: any;
    if (dappId) {
      url = '/api/compass/list-by-dapp';
      params = {
        dapp_id: dappId,
      };
    }
    if (networkId) {
      url = '/api/compass/list-by-network';
      params = {
        network_id: networkId,
        chain_id: chainId,
      };
    }
    if (!url) {
      setLoading(false);
      return;
    }
    try {
      const result = await get(url, params);
      const data = result.data || [];
     
      if (dappName === 'Rango Bridge') {
        const zero = {
            "id": 0,
            "name": "Rango Exchange X DapDap：Win USDC by Birdging via Rango on DapDap!",
            "description": "Explore, Trade, Earn - Go for Gold!",
            "start_time": 1717948800000,
            "end_time": 2719244800000,
            "status": "ongoing",
            "banner": "/images/odyssey/rango-banner-round.png",
            "link": "",
            "category": "spinblast",
            "chains_id": "81457",
            "networks_id": "18",
            showSummary: false,
            "reward": "[{\"name\":\"USDC\",\"value\":\"$1000\",\"logo_key\":\"USDC\"}]",
        }
        data.unshift(zero)
      }

      setOdysseyList(data.sort((a: any, b: any) => b.end_time - a.end_time));
    } catch (err) {
      console.log(err, 'err');
    }
    setLoading(false);
  };

  const handleOdysseyPage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      swiperRef.current && swiperRef.current.slidePrev();
      return;
    }
    swiperRef.current && swiperRef.current.slideNext();
  };

  useEffect(() => {
    getOdysseyList();
  }, [dappId, networkId, chainId]);

  return (
    <StyledContainer>
      <StyledRelatedTitle>{title}</StyledRelatedTitle>
      {
        loading ? (
          <StyledFlex style={{ height: 150 }} justifyContent="center" alignItems="center">
            <Loading size={24} />
          </StyledFlex>
        ) : (
          odysseyList.length ? (
            <StyledOdysseyDetail>
              <Swiper
                className="detail-page-relative-odyssey-swiper"
                width={498}
                modules={[Pagination]}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                speed={1000}
                spaceBetween={10}
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
                onSlideChange={(swiper) => {
                  setOdysseyPage(swiper.activeIndex);
                }}
              >
                {
                  odysseyList.map((compass) => (
                    <SwiperSlide key={compass.id}>
                      <OdysseyCard
                        className="detail-page-relative-odyssey-card"
                        key={compass.id}
                        id={compass.id}
                        name={compass.name}
                        banner={compass.banner}
                        status={compass.status}
                        showSummary={compass.showSummary}
                        rewards={compass.reward}
                        volume={compass.trading_volume}
                        users={compass.total_users}
                        isHoverButton
                        bp='1006-002-009'
                        // medals={[
                        //   { icon: '/images/medals/medal-mode-bow.svg', id: 1 },
                        // ]}
                      />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              {
                odysseyList.length > 1 && (
                  <div className="swiper-pagination"></div>
                )
              }
              {
                odysseyPage > 0 && (
                  <PageButton direction="prev" className="swiper-pagination-button prev" onClick={() => handleOdysseyPage('prev')} />
                )
              }
              {
                odysseyPage < odysseyList.length - 1 && (
                  <PageButton direction="next" className="swiper-pagination-button next" onClick={() => handleOdysseyPage('next')} />
                )
              }
            </StyledOdysseyDetail>
          ) : (
            <Empty
              tips={(
                <StyledEmpty>No related campaign and rewards now.</StyledEmpty>
              )}
              size={42}
            />
          )
        )
      }
    </StyledContainer>
  );
};

export default memo(RelativeOdyssey);

export interface Props {
  title: string;
  dappId?: number;
  dappName?: string;
  networkId?: number;
  chainId?: number;
}
