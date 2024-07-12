import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import useAccount from '@/hooks/useAccount';

import { Gems, NpcDialog, TabCard } from './components';
import StakeModal from './components/modal/stake';
import type { CardData } from './components/tab-card';
import LSTS_DATA from './config/data';
import { Banner, Container, Desc, Title } from './styles';

enum CardType {
  LST = 'LST',
  LRT = 'LRT',
}
export enum ActionType {
  STAKE = 'stake',
  UNSTAKE = 'unstake',
}

const Home = () => {
  const { chainId, account } = useAccount();
  const initialSlide = 1;
  const [isShowNpc, setIsShowNpc] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialSlide);

  const [curLrtSymbol, setCurLrtSymbol] = useState('');
  const [actionType, setActionType] = useState<ActionType>();
  const [cardType, setCardType] = useState(CardType.LST);
  const [cardData, setCardData] = useState<CardData>({
    tokenName: '',
    dappName: '',
    dappLogo: '',
    apr: 0,
    tvl: 0,
    balance: 0,
  });
  const [showModal, setShowModal] = useState(true);

  const [isShowStakeModal, setIsShowStakeModal] = useState(false);

  const handleSlideChange = ({ activeIndex }: any) => {
    setIsShowNpc(true);
    setCurrentIndex(activeIndex);
    setCardType(CardType.LST);
    const { token, dapp } = LSTS_DATA[activeIndex];
    //TODO
    setCardData({
      tokenName: token.symbol as string,
      dappName: dapp.name,
      dappLogo: dapp.logo,
      apr: 0,
      tvl: 0,
      balance: 0,
    });
    console.log('click lst', activeIndex, LSTS_DATA[activeIndex]);
  };

  const handleClickGem = (lrtSymbol: string) => {
    setCurLrtSymbol(lrtSymbol);
    setCardType(CardType.LRT);
    const { token, dapp } = LSTS_DATA[currentIndex];
    //TODO
    setCardData({
      tokenName: token.symbol as string,
      dappName: dapp.name,
      dappLogo: dapp.logo,
      apr: 0,
      tvl: 0,
      balance: 0,
    });
  };

  const handleShowModal = (_actionType: ActionType) => {
    console.log(_actionType, chainId, curLrtSymbol, LSTS_DATA[currentIndex]);

    setActionType(_actionType);
    setIsShowStakeModal(true);
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
          {LSTS_DATA.map((item) => (
            <SwiperSlide key={item.key}>{({ isActive }) => <img src={item.lstIcon} alt="lst" />}</SwiperSlide>
          ))}
        </Swiper>
      </Banner>

      <Gems data={LSTS_DATA[currentIndex].lrtTokens} onClick={handleClickGem} />

      <TabCard type={cardType} data={cardData} handleStake={handleShowModal} />

      {isShowNpc ? <NpcDialog onClose={() => setIsShowNpc(false)} /> : null}

      {isShowStakeModal ? (
        <StakeModal
          dapp={{
            name: LSTS_DATA[currentIndex].dapp.name,
            logo: LSTS_DATA[currentIndex].dapp.logo,
          }}
          actionType={actionType as ActionType}
          token0={actionType === ActionType.STAKE ? 'ETH' : LSTS_DATA[currentIndex].token?.symbol}
          token1={actionType === ActionType.STAKE ? LSTS_DATA[currentIndex].token?.symbol : curLrtSymbol}
          chainId={chainId as number}
          show={showModal}
          setShow={setShowModal}
        />
      ) : null}
    </Container>
  );
};

export default Home;
