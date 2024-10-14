import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';

import { useBasic } from '../../RubicHoldstation/hooks/useBasic';
import FailModal from './FailModal';
import SuccessModal from './SuccessModal';
import TicketModal from './TicketModal';
import { useTickets } from './useTickets';

const Container = styled.div`
  position: relative;
  height: 1550px;
  font-family: Montserrat;
`;

const Warpper = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  padding-top: 100px;
  height: 1450px;
`;

const Tales = styled.div`
  text-align: center;
  color: #979abe;
  font-size: 22px;
  font-weight: 700;
  z-index: 3;
`;

const Light = styled.div`
  width: 1223px;
  height: 1252px;
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  background: url('/images/odyssey/lineaLiquid/light.svg') 0 0 no-repeat;
  background-size: 100% 100%;
  top: -30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 72px;
  font-weight: 700;
  gap: 10px;
  img {
    width: 78px;
  }
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 675px;
  }
`;

const Reawrds = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 100px;
  .item {
    width: 300px;
    text-align: center;
    font-family: Montserrat;
    .top-img {
      width: 112px;
      margin: 0 auto;
    }
    .title {
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      margin-top: 20px;
    }
    .value {
      color: #ebf479;
      font-size: 42px;
      font-weight: 600;
      &.under-line {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .notice {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }
`;

const ET = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  left: 50%;
  transform: translateX(-50%);
  top: 617px;
  z-index: 2;
  background: url('/images/odyssey/lineaLiquid/et.png') 0 0 no-repeat;
  background-size: 100% 100%;
  /* border-radius: 600px; */
  /* opacity: .5; */
  /* mix-blend-mode: multiply; */
  mix-blend-mode: exclusion;
`;

const ETSeat = styled.div`
  width: 1229px;
  height: 182px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: url('/images/odyssey/lineaLiquid/et-seat.svg') 0 0 no-repeat;
  background-size: 100% 100%;
  top: 1270px;
`;

const LightLeft = styled.div`
  width: 194px;
  height: 390px;
  position: absolute;
  left: 50%;
  transform: translateX(-650px);
  background: url('/images/odyssey/lineaLiquid/light-left.svg') 0 0 no-repeat;
  background-size: 100% 100%;
  top: 780px;
`;

const LightRight = styled.div`
  width: 194px;
  height: 390px;
  position: absolute;
  left: 50%;
  transform: translateX(460px);
  background: url('/images/odyssey/lineaLiquid/light-right.svg') 0 0 no-repeat;
  background-size: 100% 100%;
  top: 780px;
`;

const RewordsNoNum = styled.div`
  /* position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%); */
  width: 606px;
  height: 230px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .item-no-num {
    width: 81px;
    height: 110px;
    background: url('/images/odyssey/lineaLiquid/light-dark.svg') 0 0 no-repeat;
    background-size: 100% 100%;
  }
  .item-with-num {
    width: 147px;
    height: 100%;
    position: relative;

    .light-bottom {
      width: 99px;
      height: 101px;
      background: url('/images/odyssey/lineaLiquid/light-white.svg') 0 0 no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
    }

    .light-top {
      width: 147px;
      height: 222px;
      /* background: linear-gradient(180deg, #000000 0%, #EBF479 100%);
            opacity: 0.5;
            backdrop-filter: blur(20px); */
      background: url('/images/odyssey/lineaLiquid/light-circle.svg') 0 0 no-repeat;
      background-size: cover;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
    }
    .num {
      width: 72px;
      height: 72px;
      border: 1px solid #ebf479;
      border-radius: 72px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 40px;
      background: radial-gradient(50% 50% at 50% 50%, #000000 60%, #656935 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
      font-weight: 600;
      color: #ebf479;
      font-family: Montserrat;
    }
  }
`;

const Round = styled.div`
  text-align: center;
  margin: 230px auto 0;
  width: 606px;
  height: 286px;
  .title {
    color: #fff;
    font-weight: 600;
    font-size: 20px;
  }
  .prize {
    color: #ebf479;
    font-size: 42px;
    font-weight: 700;
    margin-top: 5px;
    &.delete-line {
      text-decoration: line-through;
    }
  }
  .notice {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
  .desc {
    font-size: 16px;
    font-weight: 500;
    color: #979abe;
    margin-top: 20px;
    .time {
      color: #fff;
    }
  }
  .btn-linea-check {
    width: 235px;
    height: 52px;
    line-height: 52px;
    border: 1px solid #ffffff80;
    border-radius: 6px;
    color: #fff;
    margin: 30px auto;
    background-color: #000;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  .congrats-result {
    width: 397px;
    height: 90px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    margin: 30px auto 0;
    color: rgba(151, 154, 190, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    &.fail {
      background: url('/images/odyssey/lineaLiquid/no-prize-2.svg') 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .prize-c-title {
      font-size: 20px;
      font-weight: 600;
    }
    .prize-number {
      font-weight: 600;
      color: rgba(235, 244, 121, 1);
    }
  }
`;

const ArrowLeft = styled.div`
  position: absolute;
  top: 950px;
  left: 50%;
  transform: translateX(-460px);
  width: 60px;
  height: 60px;
  border: 2px solid #3c445e;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 11;
`;

const ArrowRight = styled.div`
  position: absolute;
  top: 950px;
  left: 50%;
  transform: translateX(400px);
  width: 60px;
  height: 60px;
  border: 2px solid #3c445e;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 11;
`;

interface Props {
  category: string;
}

export default function Detail({ category }: Props) {
  const data = useTickets({ category });
  const swiperRef = useRef<any>();
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const [myTciketsShow, setMyTicketShow] = useState(false);
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [failModalShow, setFailModalShow] = useState(false);
  const [successNum, setSuccessNum] = useState<any>([]);
  const [successMyNum, setSuccessMyNum] = useState<any>([]);
  const [currentRound, setCurrentRound] = useState<any>(null);

  console.log(data);
  const { rewards, userVouchers, totalReward, userTotalReward, handleCheck, getData, loading } = data;

  useEffect(() => {
    if (account) {
      getData();
    }
  }, [account]);

  return (
    <Container>
      <Light />
      <ET />
      <ETSeat />
      <LightLeft />
      <LightRight />
      <ArrowLeft
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.slidePrev();
          }
        }}
      >
        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M27 7C27.5523 7 28 7.44772 28 8C28 8.55228 27.5523 9 27 9L27 7ZM0.292894 8.70711C-0.0976295 8.31658 -0.0976296 7.68342 0.292894 7.2929L6.65685 0.928934C7.04738 0.53841 7.68054 0.538409 8.07107 0.928934C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41422 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65686 15.0711L0.292894 8.70711ZM27 9L1 9L1 7L27 7L27 9Z"
            fill="#979ABE"
          />
        </svg>
      </ArrowLeft>
      <ArrowRight
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.slideNext();
          }
        }}
      >
        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM27.7071 8.70711C28.0976 8.31658 28.0976 7.68342 27.7071 7.2929L21.3431 0.928934C20.9526 0.53841 20.3195 0.538409 19.9289 0.928934C19.5384 1.31946 19.5384 1.95262 19.9289 2.34315L25.5858 8L19.9289 13.6569C19.5384 14.0474 19.5384 14.6805 19.9289 15.0711C20.3195 15.4616 20.9526 15.4616 21.3431 15.0711L27.7071 8.70711ZM1 9L27 9L27 7L1 7L1 9Z"
            fill="#979ABE"
          />
        </svg>
      </ArrowRight>
      <Warpper>
        <Tales>DapDap Tales</Tales>
        <Title>
          <div>Linea Liquid Legends</div>
          <img src="/images/odyssey/lineaLiquid/title.png" />
        </Title>
        <SubTitle>
          <img src="/images/odyssey/lineaLiquid/subTitle.png" />
        </SubTitle>
        <Reawrds>
          <div className="item">
            <img className="top-img" src="/images/odyssey/lineaLiquid/prize.svg" />
            <div className="title">Total Prize</div>
            <div className="value">{totalReward}</div>
            <div className="notice">worth of rewards</div>
          </div>

          <div className="item">
            <img className="top-img" src="/images/odyssey/lineaLiquid/ticket.svg" />
            <div className="title ">Your Tickets</div>
            <div
              className="value under-line"
              onClick={() => {
                setMyTicketShow(true);
              }}
            >
              {userVouchers?.list?.length}
            </div>
          </div>

          <div className="item">
            <img className="top-img" src="/images/odyssey/lineaLiquid/youwon.svg" />
            <div className="title">You Won</div>
            <div className="value">{userTotalReward?.str}</div>
          </div>
        </Reawrds>

        <div style={{ width: 606, overflow: 'hidden', margin: '0 auto' }}>
          <Swiper
            modules={[]}
            width={606}
            slidesPerView={1}
            speed={500}
            spaceBetween={10}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
          >
            {rewards.map((item, index) => {
              return (
                <SwiperSlide key={item.round}>
                  <div style={{ width: 606 }}>
                    <Round>
                      <div className="title">Round {item.round}</div>
                      <div className={'prize ' + (item.userChecked && item.is_draw_completed ? ' delete-line' : '')}>
                        {/* {item.amountStr} */}
                        {!!item.amountAddStr.length && !item.expired ? (
                          <>
                            {item.amountAddStr.join(' + ')} + {item.amountStr}
                          </>
                        ) : (
                          item.amountStr
                        )}
                      </div>
                      <div className="notice">worth of rewards</div>
                      <div className="desc">
                        Mystic number opens at <span className="time">{item.rewardTime}</span>
                      </div>
                      {item.userChecked &&
                        item.is_draw_completed &&
                        (Number(item?.user_reward_amount) > 0 ? (
                          <div className="congrats-result">
                            <div className="prize-c-title">Congrats!</div>
                            <div className="prize-c-content">
                              You won <span className="prize-number">{item.userRewardAmount}</span> worth of rewards in
                              this round
                            </div>
                          </div>
                        ) : (
                          <div className="congrats-result fail">
                            <div className="prize-c-title">No Prize</div>
                            <div className="prize-c-content">You weren't selected in this round</div>
                          </div>
                        ))}

                      {!item.userChecked && (
                        <div
                          style={{ opacity: !item.is_draw_completed ? 0.5 : 1 }}
                          onClick={async () => {
                            if (!item.is_draw_completed) {
                              return;
                            }

                            if (!account) {
                              await onConnect();
                              return;
                            }

                            await handleCheck(item);
                            const _rewards: any = await getData(true);

                            const _item = _rewards[index];

                            if (_item.user_reward_amount !== '0') {
                              setSuccessModalShow(true);
                              setSuccessNum(_item.voucherArr);
                              setSuccessMyNum(_item?.userRewardVoucher);
                            } else {
                              setFailModalShow(true);
                            }

                            setCurrentRound(_item);
                          }}
                          className="btn-linea-check"
                        >
                          Check Now
                        </div>
                      )}
                    </Round>

                    {item.voucherArr && item.voucherArr.length ? (
                      <RewordsNoNum>
                        {item.voucherArr.map((item, index) => {
                          return (
                            <div key={index} className="item-with-num">
                              <div className="light-top"></div>
                              <div className="light-bottom"></div>
                              <div className="num">{item}</div>
                            </div>
                          );
                        })}
                      </RewordsNoNum>
                    ) : (
                      <RewordsNoNum>
                        {new Array(5).fill(0).map((item, index) => {
                          return <div key={index} className="item-no-num"></div>;
                        })}
                      </RewordsNoNum>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Warpper>

      {myTciketsShow && (
        <TicketModal
          data={data?.userVouchers?.list}
          onClose={() => {
            setMyTicketShow(false);
          }}
        />
      )}

      {successModalShow && (
        <SuccessModal
          data={currentRound}
          successNum={successNum}
          successMyNum={successMyNum}
          onClose={() => {
            setSuccessModalShow(false);
          }}
        />
      )}

      {failModalShow && (
        <FailModal
          data={currentRound}
          onClose={() => {
            setFailModalShow(false);
          }}
        />
      )}
    </Container>
  );
}
