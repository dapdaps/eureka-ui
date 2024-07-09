import { Swiper, SwiperSlide } from 'swiper/react';

import { useChainsStore } from '@/stores/chains';

import { Desc, StyledContainer, Title } from './styles';

const Home = () => {
  const chains = useChainsStore((store: any) => store.chains);
  return (
    <StyledContainer>
      <Title>LRTS</Title>
      <Desc>
        The DapDap LRTs Aggregator brings the <span className="bold">LSTs</span> and <span className="bold">LRTs</span>{' '}
        on the market together. <br />
        It is convenient for users to check the path and APR, and follow the convenient operation.
      </Desc>
      <Swiper
        // spaceBetween={0}
        centeredSlides={true}
        initialSlide={1}
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        // navigation={navigation}
        // modules={modules}
        slidesPerView={4}
        className="mySwiper"
        slideToClickedSlide={true}
        // on={{setTranslate:function(){
        //   slide.css({'opacity': '','background': ''});slide.transform('');//清除样式
        //   slide.transform('scale('+(1 - Math.abs(progress)/8)+')');
        // slide.css('opacity',(1-Math.abs(progress)/6));
        //   slide.transform('translate3d(0,'+ Math.abs(progress)*20+'px, 0)');
        // }}}
      >
        <SwiperSlide key={1}>{({ isActive }) => <img src="/images/lrts/box_1.svg" alt="" />}</SwiperSlide>
        <SwiperSlide key={2}>{({ isActive }) => <img src="/images/lrts/box_2.svg" alt="" />}</SwiperSlide>
        <SwiperSlide key={3}>{({ isActive }) => <img src="/images/lrts/box_3.svg" alt="" />}</SwiperSlide>
        <SwiperSlide key={4}>{({ isActive }) => <img src="/images/lrts/box_4.svg" alt="" />}</SwiperSlide>
      </Swiper>
    </StyledContainer>
  );
};

export default Home;
