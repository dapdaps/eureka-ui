import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';

import Stats from '../Stats/index';
import FailModal from './FailModal';
import NFT from './NFT';
import SuccessModal from './SuccessModal';
import TicketModal from './TicketModal';
import { useTickets } from './useTickets';

const Container = styled.div`
  position: relative;
  height: 1950px;
  font-family: Montserrat;
  .notice-title {
    color: #979abe;
  }
`;

const Warpper = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  padding-top: 100px;
  height: 1450px;
`;

const Light = styled.div`
  width: 1223px;
  height: 1252px;
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  background: url('/images/odyssey/lineaLiquid2/light.svg') 0 0 no-repeat;
  background-size: 100% 100%;
  top: -80px;
`;

const Tales = styled.div`
  width: 205px;
  height: 40px;
  background: url(/images/odyssey/lineaLiquid2/tales.png);
  background-size: 100% 100%;
  text-indent: -9999px;
  margin: 0 auto;
`;

const Legends = styled.div`
  width: 890px;
  height: 210px;
  background: url('/images/odyssey/lineaLiquid2/sub-title.svg') 0 0 no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 80px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 514px;
  }
`;

const Horse = styled.div`
  height: 488px;
  background: url('/images/odyssey/lineaLiquid2/horse.svg') center 0 no-repeat;
  background-size: auto 100%;
  margin-top: 40px;
`;

const Reawrds = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
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
      color: #fff;
      font-size: 36px;
      font-weight: 900;
      display: flex;
      justify-content: center;
      align-items: center;
      .total-reward {
        position: relative;
        border-bottom: 1px dashed #fff;
        cursor: default;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          .total-reward-list {
            display: block;
          }
        }
        .total-reward-list {
          position: absolute;
          display: none;
          left: 110%;
          top: 0;
          font-size: 12px;
          font-weight: 500;
          background-color: rgba(38, 40, 54, 1);
          border: 1px solid rgba(55, 58, 83, 1);
          border-radius: 8px;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
          padding: 5px 10px;
          .total-reward-item {
            display: flex;
            align-items: center;
            white-space: nowrap;
            padding: 5px 0;
            width: 150px;
            gap: 10px;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      .nft {
        background-color: rgba(151, 154, 190, 0.3);
        border-radius: 18px;
        font-size: 16px;
        font-weight: 500;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .notice {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      width: 235px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      margin: 30px auto 0;
      cursor: pointer;
      position: relative;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
      img {
        width: 26px;
      }
      .arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;

const RewordsNoNum = styled.div`
  width: 885px;
  height: 260px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  /* .item-no-num {
    width: 160px;
    height: 150px;
    background-color: rgba(33, 33, 33, 1);
    border-radius: 20px;
  } */
  .num-tip {
    color: rgba(151, 154, 190, 1);
    font-size: 12px;
    padding: 6px 0px 0;
  }
  .item-with-num {
    width: 160px;
    height: 185px;
    background-color: rgba(33, 33, 33, 1);
    border-radius: 20px;
    .num {
      height: 140px;
      background-color: rgba(235, 244, 121, 1);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
      font-weight: 900;
      color: #000;
      &.no-num {
        background-color: rgba(70, 75, 86, 1);
      }
    }
  }
`;

const Round = styled.div`
  text-align: center;
  margin: 100px auto 0;
  width: 885px;
  .title {
    color: #fff;
    font-weight: 600;
    font-size: 20px;
  }
  .prize {
    color: #fff;
    font-size: 42px;
    font-weight: 900;
    margin-top: 5px;
    &.delete-line {
      text-decoration: line-through;
    }
  }
  .notice {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s;
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
    margin: 40px auto;
    background-color: #000;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }

  .congrats-result {
    height: 120px;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 30px auto 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    &.success {
      background: rgba(255, 85, 147, 1) url('/images/odyssey/lineaLiquid2/star.svg') center 0 no-repeat;
      border-radius: 20px;
    }
    &.fail {
      background: url('/images/odyssey/lineaLiquid/no-prize-2.svg') center 0 no-repeat;
      background-size: auto 100%;
    }
    .prize-c-title {
      font-weight: 500;
    }
    .prize-number {
      font-weight: 900;
      font-size: 42px;
    }
  }
`;

const ArrowLeft = styled.div`
  position: absolute;
  top: 1350px;
  left: 50%;
  transform: translateX(-440px);
  width: 60px;
  height: 60px;
  border: 2px solid #3c445e;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 11;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const ArrowRight = styled.div`
  position: absolute;
  top: 1350px;
  left: 50%;
  transform: translateX(385px);
  width: 60px;
  height: 60px;
  border: 2px solid #3c445e;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 11;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const numTip: any = {
  0: (
    <div>
      Total <strong>BTC</strong> price <br /> (final digit)
    </div>
  ),
  1: (
    <div>
      Total <strong>ETH</strong> price <br /> (final digit)
    </div>
  ),
  2: (
    <div>
      Total <strong>Across</strong> followers <br /> (final digit)
    </div>
  ),
  3: (
    <div>
      Total <strong>Nile</strong> followers <br /> (final digit)
    </div>
  ),
  4: (
    <div>
      Total <strong>ZeroLend</strong> followers <br /> (final digit)
    </div>
  )
};

const reg = /(.*\d{4})(\s+)(\d{2}:.*)/;
function formatTimeArrow(time: string) {
  return time.replace(reg, ($1, $2, $3, $4) => {
    return `<${$2}> <${$4}>`;
  });
}

interface Props {
  category: string;
}

export default function Detail({ category }: Props) {
  const data = useTickets({ category });
  const swiperRef = useRef<any>();
  const initSwip = useRef<any>(false);
  const { account } = useAccount();
  const { onConnect } = useConnectWallet();
  const [myTciketsShow, setMyTicketShow] = useState(false);
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [failModalShow, setFailModalShow] = useState(false);
  const [nftModalShow, setNftModalShow] = useState(false);
  const [successNum, setSuccessNum] = useState<any>([]);
  const [successMyNum, setSuccessMyNum] = useState<any>([]);
  const [currentRound, setCurrentRound] = useState<any>(null);
  const [initSlide, setInitSlide] = useState<any>(0);

  // console.log(data);
  const { rewards, userVouchers, totalReward, userTotalReward, handleCheck, getData, loading } = data;

  useEffect(() => {
    if (account) {
      getData();
    }
  }, [account]);

  useEffect(() => {
    if (data && data.rewards && swiperRef.current && !initSwip.current) {
      data.rewards.some((item: any, index) => {
        if (!item.userChecked || !item.expired) {
          setInitSlide(index);
          swiperRef.current.swiper.slideTo(index);
          initSwip.current = true;
          return true;
        }
      });
    }
  }, [data]);

  return (
    <Container>
      <Legends />
      <Light />
      <ArrowLeft
        onClick={() => {
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
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
          if (swiperRef.current && swiperRef.current.swiper) {
            console.log(swiperRef.current.swiper);
            swiperRef.current.swiper.slideNext();
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
          <div>The Dark Horses</div>
        </Title>
        <SubTitle>
          <img src="/images/odyssey/lineaLiquid2/sub-item.png" />
        </SubTitle>
        <Stats category={category} />
        <Horse />
        <Reawrds>
          <div className="item">
            <div className="title">Total Prize</div>
            <div className="value">
              <div className="total-reward">
                <div>{totalReward}</div>
                <div className="total-reward-list">
                  <div className="total-reward-item">
                    <img src="/images/odyssey/lineaLiquid2/reward-nile.png" />
                    <div>$2.5K NILE</div>
                  </div>
                  <div className="total-reward-item">
                    <img src="/images/odyssey/lineaLiquid2/reward-zero.png" />
                    <div>$2.5K ZERO</div>
                  </div>
                  <div className="total-reward-item">
                    <img src="/images/odyssey/lineaLiquid2/reward-across.png" />
                    <div>$2.5K USD(Across)</div>
                  </div>
                  <div className="total-reward-item">
                    <img src="/images/odyssey/lineaLiquid2/reward-dapdap.png" />
                    <div>$2.5K USD(DapDap)</div>
                  </div>
                </div>
              </div>
              <div
                className="nft"
                onClick={() => {
                  setNftModalShow(true);
                }}
              >
                +4 NFTs
              </div>
            </div>
            <div
              className="notice"
              onClick={() => {
                const ticket = document.getElementById('get_ticket');
                if (ticket) {
                  ticket.scrollIntoView();
                }
              }}
            >
              <div>Get Tickets</div>
              <svg
                className="arrow"
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1C9 0.447715 8.55228 2.41411e-08 8 0C7.44772 -2.41411e-08 7 0.447715 7 1L9 1ZM7.29289 17.7071C7.68342 18.0976 8.31658 18.0976 8.70711 17.7071L15.0711 11.3431C15.4616 10.9526 15.4616 10.3195 15.0711 9.92893C14.6805 9.53841 14.0474 9.53841 13.6569 9.92893L8 15.5858L2.34315 9.92893C1.95262 9.53841 1.31946 9.53841 0.928932 9.92893C0.538407 10.3195 0.538407 10.9526 0.928932 11.3431L7.29289 17.7071ZM7 1L7 17L9 17L9 1L7 1Z"
                  fill="#979ABE"
                />
              </svg>
            </div>
          </div>

          <div className="item">
            <div className="title ">Your Tickets</div>
            <div className="value">{userVouchers?.list?.length}</div>
            <div
              className="notice"
              onClick={() => {
                setMyTicketShow(true);
              }}
            >
              <div>View Your Tickets</div>
            </div>
          </div>

          <div className="item">
            <div className="title">You Won</div>
            <div className="value">{userTotalReward?.str}</div>
          </div>
        </Reawrds>

        <div className="h-[76px] py-[12px] mt-[26px]" style={{ background: 'rgba(151, 154, 190, .2)' }}>
          <div className="text-center notice-title">
            No worries if you don’t win—your Tickets will still earn you Gems, with a maximum reward of 1000 Gems.
          </div>
          <div className="flex justify-center items-center gap-[10px] mt-[2px]">
            <div className="text-[#fff] font-[700] text-[16px]">1 Ticket = 2 Gems</div>
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.75842 17.9761L0.000152588 10.636V7.34049L7.75842 0.000436783H11.2417L19 7.34049V10.636L11.2417 17.9761H7.75842Z"
                fill="#F4DC27"
              />
              <path
                d="M15.8334 8.58154L9.92979 2.99621L11.2417 0.000272751L19 7.34033L15.8334 8.58154Z"
                fill="#ED9B0D"
              />
              <path
                d="M7.75837 17.9761L0.000102043 10.636L3.16674 9.3948L9.07031 14.9801L7.75837 17.9761Z"
                fill="#F1B600"
              />
              <path d="M11.2422 17.9761L9.93056 14.9801H9.07082L7.75888 17.9761H11.2422Z" fill="#F1F50E" />
              <path d="M11.2422 0.000642061L9.93025 2.99658H9.07114L7.75888 0.000642061H11.2422Z" fill="#EDC102" />
              <path d="M3.16406 8.58148V9.39428L-0.00257874 10.6355V7.33996L3.16406 8.58148Z" fill="#F6CA18" />
              <path d="M15.8334 8.58118L19 7.33996V10.6355L15.8334 9.39458V8.58118Z" fill="#F1B600" />
              <path
                d="M7.75837 -2.57492e-05L9.07031 2.99591L3.16674 8.58154L0.000102043 7.34003L7.75837 -2.57492e-05Z"
                fill="#EFB000"
              />
              <path d="M15.8334 9.3948L19 10.636L11.2417 17.9761L9.92979 14.9801L15.8334 9.3948Z" fill="#F0CC00" />
            </svg>
          </div>
        </div>

        <div style={{ width: 885, overflow: 'hidden', margin: '0 auto' }}>
          <Swiper
            modules={[]}
            width={885}
            slidesPerView={1}
            speed={500}
            spaceBetween={10}
            ref={swiperRef}
            initialSlide={initSlide}
            onSwiper={(swiper) => {
              // swiperRef.current = swiper;
            }}
            loop={true}
          >
            {rewards.map((item, index) => {
              return (
                <SwiperSlide key={item.round}>
                  <div style={{ width: 885 }}>
                    <Round>
                      <div className="title">Round {item.round}</div>
                      <div className={'prize ' + (item.userChecked && item.is_draw_completed ? ' delete-line' : '')}>
                        {!!item.amountAddStr.length ? (
                          <>
                            {item.amountAddStr.join(' + ')} + {item.amountStr}
                          </>
                        ) : (
                          item.amountStr
                        )}
                      </div>
                      <div className="desc">
                        Mystic number identified on <span className="time">{formatTimeArrow(item.rewardTime)}</span>
                      </div>

                      {item.voucherArr && item.voucherArr.length ? (
                        <RewordsNoNum>
                          {item.voucherArr.map((item, index) => {
                            return (
                              <div key={index} className="item-with-num">
                                <div className="num">{item}</div>
                                <div className="num-tip">{numTip[index]}</div>
                              </div>
                            );
                          })}
                        </RewordsNoNum>
                      ) : (
                        <RewordsNoNum>
                          {new Array(5).fill(0).map((item, index) => {
                            return (
                              <div key={index} className="item-with-num">
                                <div className="num no-num">?</div>
                                <div className="num-tip">{numTip[index]}</div>
                              </div>
                            );
                          })}
                        </RewordsNoNum>
                      )}

                      {item.userChecked &&
                        item.is_draw_completed &&
                        (Number(item?.user_reward_amount) > 0 ? (
                          <div className="congrats-result success">
                            <div className="prize-c-title">You won</div>
                            <div className="prize-c-content">
                              <span className="prize-number">{item.userRewardAmount}</span>
                            </div>
                            <div>in this round</div>
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

      {nftModalShow && (
        <NFT
          onClose={() => {
            setNftModalShow(false);
          }}
        />
      )}
    </Container>
  );
}
