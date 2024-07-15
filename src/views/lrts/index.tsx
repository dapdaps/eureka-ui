import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useTokensBalance from '@/hooks/useTokensBalance';
import { useLrtDataStore } from '@/stores/lrts';
import { usePriceStore } from '@/stores/price';

import { Gems, NpcDialog, TabCard } from './components';
import StakeModal from './components/modal/stake';
import type { CardData } from './components/tab-card';
import useAllTokensBalance from './hooks/useAllTokensBalance';
import { Banner, Container, Desc, Title } from './styles/index.style';

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
  // const prices = usePriceStore((store) => store.price);

  const [curLrt, setCurLrt] = useState<any>(null);
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

  const lrtsData = useLrtDataStore((store: any) => store.data);
  console.log('lrtsData----', lrtsData);

  const { loading, balances } = useAllTokensBalance();

  const handleSlideChange = ({ activeIndex }: any) => {
    setIsShowNpc(true);
    setCurrentIndex(activeIndex);
    setCardType(CardType.LST);
    const { token, dapp } = lrtsData[activeIndex];
    //TODO
    setCardData({
      tokenName: token.symbol as string,
      dappName: dapp.name,
      dappLogo: dapp.logo,
      apr: 0,
      tvl: 0,
      balance: token?.balance || 0,
    });
    console.log('click lst', activeIndex, lrtsData[activeIndex]);
  };

  const handleClickGem = (lrt: any) => {
    setCurLrt(lrt);
    setCardType(CardType.LRT);
    const { token, dapp } = lrtsData[currentIndex];
    //TODO
    setCardData({
      tokenName: token.symbol as string,
      dappName: dapp.name,
      dappLogo: dapp.logo,
      apr: 0,
      tvl: 0,
      balance: token?.balance || 0,
    });
  };

  const handleShowModal = (_actionType: ActionType) => {
    setActionType(_actionType);
    console.log('=_actionType', _actionType);
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
          // navigation={{
          //   nextEl: '.next',
          // }}
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
          {lrtsData.map((item: any) => (
            <SwiperSlide key={item.key}>
              {() => {
                return (
                  <div className="lst-content">
                    <span className="lst-title">{item.token.symbol}</span>
                    <span className="dapp-info">
                      <img src={item.dapp.logo} alt="dapp" />
                      {item.dapp.name}
                    </span>
                    <span className="lst-range">APR RANGE</span>
                    <span className="min-apr">2.3% -</span>
                    <span className="max-apr">5.3%</span>
                    <img className="lst-img" src={item.lstIcon} alt="lst" />
                  </div>
                );
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      </Banner>

      <Gems data={lrtsData[currentIndex].lrtTokens} onClick={handleClickGem} />

      <TabCard type={cardType} data={cardData} handleStake={handleShowModal} />

      {isShowNpc ? <NpcDialog onClose={() => setIsShowNpc(false)} /> : null}

      {isShowStakeModal ? (
        <StakeModal
          dapp={{
            name: lrtsData[currentIndex].dapp.name,
            logo: lrtsData[currentIndex].dapp.logo,
          }}
          actionType={actionType as ActionType}
          token0={actionType === ActionType.STAKE ? ethereum['eth'] : lrtsData[currentIndex].token}
          token1={actionType === ActionType.STAKE ? lrtsData[currentIndex].token : curLrt}
          chainId={chainId as number}
          setShow={setIsShowStakeModal}
        />
      ) : null}
    </Container>
  );
};

export default Home;
