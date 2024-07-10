import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useChainsStore } from '@/stores/chains';

import { NpcDialog, TabCard } from './components';
import { Desc, StyledContainer, Title } from './styles';

const Home = () => {
  const chains = useChainsStore((store: any) => store.chains);

  const [isShowNpc, setIsShowNpc] = useState(false);

  const lsts = [
    {
      key: 0,
      lstName: 'mETH',
      lstIcon: '/images/lrts/box_1.svg',
      dappName: '',
      dappLogo: '',
    },
    {
      key: 1,
      lstName: 'stETH',
      lstIcon: '/images/lrts/box_2.svg',
      dappName: 'LIDO',
      dappLogo: '',
    },
    {
      key: 2,
      lstName: 'rETH',
      lstIcon: '/images/lrts/box_3.svg',
      dappName: 'Rocket Pool',
      dappLogo: '',
    },
    {
      key: 3,
      lstName: 'sfrxETH',
      lstIcon: '/images/lrts/box_4.svg',
      dappName: 'Frax Finance',
      dappLogo: '',
    },
  ];
  const handleSlideChange = ({ activeIndex }: any) => {
    setIsShowNpc(true);
    console.log('click lst', activeIndex, lsts[activeIndex]);
  };

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
        navigation={{
          nextEl: '.next',
        }}
        // modules={modules}
        slidesPerView={4}
        className="mySwiper"
        slideToClickedSlide={true}
        onSlideChange={handleSlideChange}
        // on={{setTranslate:function(){
        //   slide.css({'opacity': '','background': ''});slide.transform('');//清除样式
        //   slide.transform('scale('+(1 - Math.abs(progress)/8)+')');
        // slide.css('opacity',(1-Math.abs(progress)/6));
        //   slide.transform('translate3d(0,'+ Math.abs(progress)*20+'px, 0)');
        // }}}
      >
        {lsts.map((item) => (
          <SwiperSlide key={item.key}>{({ isActive }) => <img src={item.lstIcon} alt="lst" />}</SwiperSlide>
        ))}
      </Swiper>

      <TabCard />

      {isShowNpc ? <NpcDialog onClose={() => setIsShowNpc(false)} /> : null}
    </StyledContainer>
  );
};

export default Home;
