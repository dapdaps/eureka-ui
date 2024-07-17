import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import { useLrtDataStore } from '@/stores/lrts';

import { Gems, NpcDialog, TabCard } from './components';
import StakeModal from './components/modal/stake';
import SwapModal from './components/modal/swap';
import { ActionType } from './components/tab-card';
import useLrtsList from './hooks/useLrtsList';
import { Banner, Container, Desc, Title } from './styles/index.style';

const Home = () => {
  const { chainId, account } = useAccount();

  const [isShowNpc, setIsShowNpc] = useState(false);
  const initialSlide = 1;
  const [lstIndex, setLstIndex] = useState(initialSlide);
  // const prices = usePriceStore((store) => store.price);
  const { completed } = useLrtsList();

  const [curLrt, setCurLrt] = useState<any>(null);
  const [actionType, setActionType] = useState<ActionType>();

  const [isShowStakeModal, setIsShowStakeModal] = useState(false);

  const lrtsData = useLrtDataStore((store: any) => store.data);

  const [showSwapModal, setShowSwapModal] = useState(false);

  const handleSlideChange = ({ activeIndex }: any) => {
    setCurLrt(null)
    setLstIndex(activeIndex);
    setIsShowNpc(false);
  };

  useEffect(() => {
    // wait for tvl & apr
    if (!completed) return;
    setIsShowNpc(true);
  }, [lstIndex, completed]);

  const handleClickGem = (lrt: any) => {
    console.log('=lrt', lrt)
    setCurLrt(lrt);
  };
  const onTabChange = (symbol: string) => {
    const _curLrt = lrtsData[lstIndex].lrtTokens.find((item: any) => item.token.symbol === symbol);
    setCurLrt(_curLrt);
  };

  const handleShowModal = (_actionType: any) => {
    setActionType(_actionType);
    if (_actionType === 'swap') {
      setShowSwapModal(true);
    } else {
      setIsShowStakeModal(true);
    }
  };

  // useEffect(() => {
  //   if (!isShowStakeModal) {
  //     setCurLrt(null)
  //   }
  // }, [isShowStakeModal])

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
          slidesPerView={4}
          className="mySwiper"
          slideToClickedSlide={true}
          onSlideChange={handleSlideChange}
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
                    <span className="min-apr">{Number(item?.minApr).toFixed(2)}% -</span>
                    <span className="max-apr">{Number(item?.maxApr).toFixed(2)}%</span>
                    <img className="lst-img" src={item.lstIcon} alt="lst" />
                  </div>
                );
              }}
            </SwiperSlide>
          ))}
        </Swiper>
      </Banner>

      <Gems dataSource={lrtsData[lstIndex].lrtTokens} onGemClick={handleClickGem} />

      <TabCard lstIndex={lstIndex} curLrt={curLrt?.token} handleShowModal={handleShowModal} onTabChange={onTabChange} />

      {isShowNpc ? <NpcDialog lstIndex={lstIndex} onClose={() => setIsShowNpc(false)} /> : null}

      <StakeModal
        box={lrtsData[lstIndex].lstIcon}
        gem={curLrt}
        dapp={{
          name: lrtsData[lstIndex].dapp.name,
          logo: lrtsData[lstIndex].dapp.logo,
          minApr: lrtsData[lstIndex]?.minApr,
          maxApr: lrtsData[lstIndex]?.maxApr,
        }}
        token0={actionType === ActionType.STAKE ? ethereum['eth'] : lrtsData[lstIndex].token}
        token1={actionType === ActionType.STAKE ? lrtsData[lstIndex].token : curLrt?.token}
        chainId={chainId as number}
        show={isShowStakeModal}
        setShow={setIsShowStakeModal}
      />
      <SwapModal show={showSwapModal} setShow={setShowSwapModal} token0={lrtsData[lstIndex].token} />
    </Container>
  );
};

export default Home;
