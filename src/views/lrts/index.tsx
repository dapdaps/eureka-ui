import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useChainsStore } from '@/stores/chains';

import { Gems, NpcDialog, TabCard } from './components';
import type { CardData } from './components/tab-card';
import { Banner, Container, Desc, Title } from './styles';

enum CardType {
  LST = 'LST',
  LRT = 'LRT',
}

const Home = () => {
  const chains = useChainsStore((store: any) => store.chains);

  const initialSlide = 1;
  const [isShowNpc, setIsShowNpc] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialSlide);

  const [cardType, setCardType] = useState(CardType.LST);
  const [cardData, setCardData] = useState<CardData>({
    tokenName: '',
    apr: 0,
    tvl: 0,
    balance: 0,
  });

  const lsts = [
    {
      key: 0,
      lstName: 'mETH',
      lstIcon: '/images/lrts/box_1.svg',
      dappName: '',
      dappLogo: '',
      gems: {
        3: '/images/lrts/gem-inmeth.svg',
        15: '/images/lrts/gem-mmeth.svg',
        21: '/images/lrts/gem-kmeth.svg',
        40: '/images/lrts/gem-rmeth.svg',
      },
      userGems: [3, 15, 21, 40],
    },
    {
      key: 1,
      lstName: 'stETH',
      lstIcon: '/images/lrts/box_2.svg',
      dappName: 'LIDO',
      dappLogo: '',
      gems: {
        3: '/images/lrts/gem-rseth.svg',
        7: '/images/lrts/gem-insteth.svg',
        13: '/images/lrts/gem-msteth.svg',
        15: '/images/lrts/gem-pufeth.svg',
        25: '/images/lrts/gem-weeth.svg',
        31: '/images/lrts/gem-ezeth.svg',
        40: '/images/lrts/gem-rsteth.svg',
      },
      userGems: [3, 7, 13, 15, 25, 31, 40],
    },
    {
      key: 2,
      lstName: 'rETH',
      lstIcon: '/images/lrts/box_3.svg',
      dappName: 'Rocket Pool',
      dappLogo: '',
      gems: {
        7: '/images/lrts/gem-inreth.svg',
        13: '/images/lrts/gem-kreth.svg',
        40: '/images/lrts/gem-mreth.svg',
      },
      userGems: [13, 40],
    },
    {
      key: 3,
      lstName: 'sfrxETH',
      lstIcon: '/images/lrts/box_4.svg',
      dappName: 'Frax Finance',
      dappLogo: '',
      gems: {
        7: '/images/lrts/gem-insfrseth.svg',
        13: '/images/lrts/gem-ksfrxeth.svg',
        25: '/images/lrts/gem-msfrxeth.svg',
        40: '/images/lrts/gem-rsfrxeth.svg',
      },
      userGems: [7],
    },
  ];
  const handleSlideChange = ({ activeIndex }: any) => {
    setIsShowNpc(true);
    setCurrentIndex(activeIndex);
    setCardType(CardType.LST);
    const { lstName, dappName } = lsts[activeIndex];
    setCardData({
      tokenName: lstName,
      apr: 0,
      tvl: 0,
      balance: 0,
    });
    console.log('click lst', activeIndex, lsts[activeIndex]);
  };

  return (
    <Container>
      <Banner>
        <Title>LRTS</Title>
        <Desc>
          The DapDap LRTs Aggregator brings the <span className="bold">LSTs</span> and{' '}
          <span className="bold">LRTs</span> on the market together. <br />
          It is convenient for users to check the path and APR, and follow the convenient operation.
        </Desc>
        <Swiper
          // spaceBetween={0}
          centeredSlides={true}
          initialSlide={initialSlide}
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
      </Banner>
      <Gems data={lsts[currentIndex]} userGems={lsts[currentIndex].userGems} />
      <TabCard type={cardType} data={cardData} />

      {isShowNpc ? <NpcDialog onClose={() => setIsShowNpc(false)} /> : null}
    </Container>
  );
};

export default Home;
