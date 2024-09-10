import 'swiper/css/pagination';

import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import TooltipSimple from '@/components/Tooltip';
import MedalCard from '@/views/Profile/components/MedalCard';
import useMedalList from '@/views/Profile/hooks/useMedalList';

const Wrapper = styled.div`
  width: 414px;
  overflow: hidden;
  .swiper-bridge {
    display: flex;
    justify-content: center;
    /* padding-top: 10px; */
    .swiper-pagination-bullet {
      height: 6px;
      width: 25px;
      border-radius: 3px;
      background-color: rgba(145, 148, 177, 0.9);
      &.swiper-pagination-bullet-active {
        width: 75px;
        background: rgba(87, 90, 119, 1);
      }
    }
  }
`;

const AdWrapper = styled.div`
  width: 414px;
  .main-ad-img {
    width: 414px;
    height: 118px;
    cursor: pointer;
  }
`;

const RangoTip = styled.div`
  font-size: 16px;
  width: 270px;
  line-height: 24px;
  white-space: break-spaces;
  .money {
    font-weight: 900;
    font-style: italic;
  }
  .time {
    font-weight: 700;
  }
`;

const Rango = () => {
  const router = useRouter();
  return (
    <AdWrapper
      onClick={() => {
        router.push('/bridge-x/rango');
      }}
    >
      <TooltipSimple
        tooltip={
          <RangoTip>
            Volume-based competition: <span className="money">1000 $USDC</span> will be shared between top bridgors
            <div>
              <span className="time">Time:</span> 9/9/2024 - 23/9/2024 3PM (UTC)
            </div>
          </RangoTip>
        }
      >
        <img className="main-ad-img" src="/images/bridge/super/rango.png" />
      </TooltipSimple>
    </AdWrapper>
  );
};

const Medal = () => {
  const { loading, medalList } = useMedalList();

  const superBridgeMedal: any = useMemo(() => {
    if (medalList && medalList.length) {
      const bridges = medalList.filter((item) => {
        return item.medal_category === 'super_bridge';
      });

      if (bridges && bridges.length) {
        bridges.sort((a: any, b: any) => a.level - b.level);
        let usedMedal = bridges[0];
        for (let i = 0; i < bridges.length; i++) {
          if (!bridges[i].completed_status) {
            return bridges[i];
          }
          usedMedal = bridges[i];
        }
        return usedMedal;
      }
    }
  }, [medalList]);

  return (
    <AdWrapper>
      {!loading && superBridgeMedal ? (
        <MedalCard
          medal={superBridgeMedal}
          style={{
            fontSize: 12,
            width: 414,
            background: 'radial-gradient(108.37% 99.81% at 2.05% 4.07%, #5929A7 0%, #1E1B33 100%)',
            paddingTop: 10,
            paddingBottom: 10,
            height: 108
          }}
          nameStyle={{ fontSize: 14 }}
          contentStyle={{ fontSize: 12 }}
        />
      ) : null}
    </AdWrapper>
  );
};

const id = `id_${Math.random()}`;

export default function Advertise() {
  return (
    <Wrapper>
      <Swiper
        modules={[Autoplay, Pagination]}
        width={415}
        slidesPerView={1}
        speed={500}
        autoplay={true}
        spaceBetween={10}
        pagination={{
          clickable: true,
          el: document.getElementById(id)
        }}
        onSwiper={(swiper) => {
          // swiperRef.current = swiper;
        }}
        loop={true}
      >
        <SwiperSlide>
          <Rango />
        </SwiperSlide>

        <SwiperSlide>
          <Medal />
        </SwiperSlide>

        <div id={id} className="swiper-bridge"></div>
      </Swiper>
    </Wrapper>
  );
}
