import Image from 'next/image';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import EarnedCard from "@/views/OdysseyV5/components/EarnedCard";
import MasteryCard from "@/views/OdysseyV5/components/Mastery/Card";
import {
  StyledArrow,
  StyledContainer,
  StyledContent,
  StyledEarnedContent,
  StyledEarnedList,
  StyledInner,
  StyledLeftBtn,
  StyledPageBtn,
  StyledRightBtn,
  StyledTitle,
} from "@/views/OdysseyV5/components/Mastery/styles";

const MasteryData = [
  {
    key: 1,
    title: 'Minor Leverage Long (1.25x)',
    pointsEarned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/ironclad.svg',
        name: 'IRONCLAD EMBERS',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/kim.svg',
        name: 'KIM & xKIM',
      },
      {
        key: 3,
        icon: '/images/odyssey/v5/mastery/temp/mode.svg',
        name: 'MODE POINTS',
      },
    ],
    result: [
      '1.25x leverage long on ETH, APR delta on Ironclad, swap fees from Kim, points accrual',
      'A short can be obtained in the same way, but instead you supply USDC and borrow ETH',
    ],
    earned: [
      {
        key: 1,
        name: 'Ironclad',
        icon: '/images/odyssey/v5/mastery/temp/ironclad-rect.svg',
        conditions: [
          'Supply ETH (current APR ~14%)',
          'Borrow 50% value in USDC (current borrow APR ~ -8.73%)',
        ],
        submit: 'Supply',
        link: '/dapp/ironclad-finance',
      },
      {
        key: 2,
        name: 'Kim',
        icon: '/images/odyssey/v5/mastery/temp/kim-rect.svg',
        conditions: [
          'Swap half USDC to ETH',
          'Add ETH-USDC liquidity',
        ],
        submit: 'Trade',
        link: '/dapp/kim-exchange',
      },
    ],
  },
  {
    key: 2,
    title: 'The Arbitragooor',
    pointsEarned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/ironclad.svg',
        name: 'IRONCLAD EMBERS',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/ezeth.svg',
        name: 'EZETH POINTS',
      },
    ],
    result: [
      'Net APR of ~27% on ETH, points accrual',
    ],
    earned: [
      {
        key: 1,
        name: 'Ironclad',
        icon: '/images/odyssey/v5/mastery/temp/ironclad-rect.svg',
        conditions: [
          'Supply ETH (current APR ~14%)',
          'Borrow 50% value in USDC (current borrow APR ~ -8.73%)',
        ],
        submit: 'Supply',
        link: '/dapp/ironclad-finance',
      },
      {
        key: 2,
        name: 'STURDY FINANCE',
        icon: '/images/odyssey/v5/mastery/temp/ezeth-rect.svg',
        conditions: [
          'Supply ezETH (current APR ~26%)',
        ],
        submit: 'Supply',
        link: '/dapp/sturdy',
      },
    ],
  },
  {
    key: 3,
    title: 'Use wrsETH And Explore Rewards',
    pointsEarned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/mode.svg',
        name: 'MODE POINTS',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/kelp.svg',
        name: 'KELP MILES',
      },
      {
        key: 3,
        icon: '/images/odyssey/v5/mastery/temp/ironclad.svg',
        name: 'IRONCLAD EMBERS',
      },
      {
        key: 4,
        icon: '/images/odyssey/v5/mastery/temp/eigenlayer.svg',
        name: 'EIGENLAYER POINTS',
      },
      {
        key: 5,
        icon: '/images/odyssey/v5/mastery/temp/ionic.svg',
        name: 'IONIC POINTS',
      }
    ],
    result: [
      'Restake ETH get wrsETH',
      'Use wrsETH by following dApps to get corresponding points'
    ],
    earned: [
      {
        key: 1,
        name: 'Ironclad',
        icon: '/images/odyssey/v5/mastery/temp/ironclad-rect.svg',
        conditions: [
          'Supply wrsETH'
        ],
        submit: 'Supply',
        link: '/dapp/ironclad-finance',
      },
      {
        key: 2,
        name: 'Sturdy',
        icon: '/images/odyssey/v5/mastery/temp/sturdy.svg',
        conditions: [
          'Collateral wrsETH'
        ],
        submit: 'Colateral',
        link: '/dapp/sturdy',
      },
      {
        key: 3,
        name: 'Ionic',
        icon: '/images/odyssey/v5/mastery/temp/ionic-rect.svg',
        conditions: [
          'Supply wrsETH'
        ],
        submit: 'Supply',
        link: '/dapp/ionic',
      }
    ]
  },
  {
    key: 4,
    title: 'Unlock Kim\'s Hidden Wealth',
    pointsEarned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/mode.svg',
        name: 'MODE POINTS',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/kim.svg',
        name: '<span class="primary-text">200K</span> KIM & XKIM',
      },
    ],
    result: [
      'Protocol yield distribution, participate in 200k reward allocation, accumulate points',
    ],
    earned: [
      {
        key: 1,
        name: 'KIM',
        icon: '/images/odyssey/v5/mastery/temp/kim-rect.svg',
        conditions: [
          'Swap KIM and stake to obtain xKIM'
        ],
        submit: 'Trade',
        link: '/dapp/kim-exchange',
      },
      {
        key: 2,
        name: 'KIM',
        icon: '/images/odyssey/v5/mastery/temp/kim-rect.svg',
        conditions: [
          'Providing LP on top pools'
        ],
        submit: 'Add Liquidity',
        link: '/dapp/kim-exchange-liquidity',
        coinList: [
          {
            key: 1,
            coin1Name: 'KIM',
            coin2Name: 'MODE',
            coin1: '/images/odyssey/v5/mastery/coin/kim.svg',
            coin2: '/images/odyssey/v5/mastery/coin/mode.svg',
          },
          {
            key: 2,
            coin1Name: 'ETH',
            coin2Name: 'KIM',
            coin1: '/images/odyssey/v5/mastery/coin/eth.svg',
            coin2: '/images/odyssey/v5/mastery/coin/kim.svg',
          },
          {
            key: 3,
            coin1Name: 'ETH',
            coin2Name: 'USDC',
            coin1: '/images/odyssey/v5/mastery/coin/eth.svg',
            coin2: '/images/odyssey/v5/mastery/coin/usdc.svg',
          },
          {
            key: 4,
            coin1Name: 'ETH',
            coin2Name: 'MODE',
            coin1: '/images/odyssey/v5/mastery/coin/eth.svg',
            coin2: '/images/odyssey/v5/mastery/coin/mode.svg',
          },
          {
            key: 5,
            coin1Name: 'ezETH',
            coin2Name: 'ETH',
            coin1: '/images/odyssey/v5/mastery/coin/ez-eth.svg',
            coin2: '/images/odyssey/v5/mastery/coin/eth.svg',
          },
          {
            key: 6,
            coin1Name: 'ETH',
            coin2Name: 'wrsETH',
            coin1: '/images/odyssey/v5/mastery/coin/eth.svg',
            coin2: '/images/odyssey/v5/mastery/coin/wrs-eth.svg',
          },
          {
            key: 7,
            coin1Name: '(NEW) weETH.mode',
            coin2Name: 'ETH',
            coin1: '/images/odyssey/v5/mastery/coin/we-eth.svg',
            coin2: '/images/odyssey/v5/mastery/coin/eth.svg',
          },
        ],
      },
    ]
  },
];

const Logo = (
  <svg xmlns="http://www.w3.org/2000/svg" width="101" height="22.87" viewBox="0 0 78 18" fill="none">
    <path
      d="M1.07385 8.75937C0.77893 7.47219 2.16913 4.17049 2.16913 4.17049L9.61565 3.6756C11.0559 3.28969 12.5363 4.14439 12.9222 5.58462L16.0711 10.7739C15.5649 13.3049 15.1454 14.7399 13.7052 15.1258L6.15761 17.3012C4.71738 17.6871 3.237 16.8324 2.8511 15.3921L1.07385 8.75937Z"
      fill="currentColor"></path>
    <path
      d="M2.00917 5.95521C1.61173 4.47197 2.49196 2.94738 3.9752 2.54994L10.8061 0.719618C12.2893 0.322185 13.8139 1.20241 14.2113 2.68565L16.0417 9.51652C16.4391 10.9998 15.5589 12.5244 14.0756 12.9218L7.24476 14.7521C5.76152 15.1495 4.23693 14.2693 3.83949 12.7861L2.00917 5.95521Z"
      fill="black"></path>
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M10.986 1.39103L4.1551 3.22136C3.04267 3.51943 2.38251 4.66287 2.68058 5.77531L4.51091 12.6062C4.80898 13.7186 5.95242 14.3788 7.06485 14.0807L13.8957 12.2504C15.0082 11.9523 15.6683 10.8089 15.3702 9.69642L13.5399 2.86555C13.2418 1.75312 12.0984 1.09296 10.986 1.39103ZM3.9752 2.54994C2.49196 2.94738 1.61173 4.47197 2.00917 5.95521L3.83949 12.7861C4.23693 14.2693 5.76152 15.1495 7.24476 14.7521L14.0756 12.9218C15.5589 12.5244 16.4391 10.9998 16.0417 9.51652L14.2113 2.68565C13.8139 1.20241 12.2893 0.322185 10.8061 0.719618L3.9752 2.54994Z"
          fill="currentColor"></path>
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M8.42202 4.45054L6.97448 4.83841C6.46865 4.97394 6.16847 5.49387 6.304 5.9997C6.43954 6.50553 6.95947 6.80571 7.4653 6.67018L8.74649 6.32688C9.35499 6.16384 9.98045 6.52495 10.1435 7.13345C10.3065 7.74195 9.94544 8.36742 9.33693 8.53047L8.07138 8.86957C7.55692 9.00742 7.25161 9.53622 7.38946 10.0507C7.52731 10.5651 8.05611 10.8705 8.57058 10.7326L10.0025 10.3489C11.6313 9.91249 12.5979 8.23829 12.1615 6.6095C11.725 4.9807 10.0508 4.0141 8.42202 4.45054Z"
          fill="currentColor"></path>
    <path
      d="M20.875 4.30078H24.8834C25.8487 4.30078 26.7022 4.4854 27.444 4.85464C28.1948 5.22388 28.7757 5.7391 29.1868 6.4003C29.6069 7.06149 29.8169 7.81715 29.8169 8.66726C29.8169 9.5603 29.6113 10.346 29.2002 11.0244C28.798 11.7028 28.2216 12.2309 27.4708 12.6087C26.729 12.9779 25.8666 13.1625 24.8834 13.1625H20.875V4.30078ZM24.7494 10.8441C25.4197 10.8441 25.9291 10.6423 26.2777 10.2387C26.6352 9.8265 26.8139 9.29411 26.8139 8.6415C26.8139 8.02323 26.6396 7.53378 26.2911 7.17312C25.9515 6.80388 25.4376 6.61926 24.7494 6.61926H23.8378V10.8441H24.7494Z"
      fill="currentColor"></path>
    <path
      d="M33.8746 13.2656C33.2936 13.2656 32.7484 13.1196 32.239 12.8276C31.7385 12.5271 31.3363 12.1235 31.0325 11.6169C30.7286 11.1017 30.5767 10.5306 30.5767 9.90378C30.5767 9.28552 30.7286 8.72737 31.0325 8.22932C31.3363 7.72269 31.743 7.32769 32.2524 7.04432C32.7619 6.76095 33.3026 6.61926 33.8746 6.61926C34.3393 6.61926 34.7683 6.74378 35.1616 6.9928C35.5637 7.24182 35.8676 7.61535 36.0732 8.1134V6.61926H38.8885V13.1625H36.0732V11.9647C35.6263 12.8319 34.8934 13.2656 33.8746 13.2656ZM34.746 11.2305C35.1035 11.2305 35.4073 11.1103 35.6576 10.8698C35.9168 10.6208 36.0553 10.3288 36.0732 9.99395V9.8909C36.0553 9.54742 35.9123 9.25547 35.6442 9.01503C35.385 8.77459 35.0856 8.65438 34.746 8.65438C34.3706 8.65438 34.0488 8.78318 33.7807 9.04079C33.5215 9.28981 33.3919 9.59036 33.3919 9.94242C33.3919 10.3031 33.526 10.6079 33.7941 10.8569C34.0622 11.106 34.3795 11.2305 34.746 11.2305Z"
      fill="currentColor"></path>
    <path
      d="M40.2464 6.79959H43.0751V7.92019C43.504 7.05291 44.2325 6.61926 45.2603 6.61926C45.8591 6.61926 46.4087 6.76524 46.9092 7.0572C47.4186 7.34057 47.8164 7.73557 48.1024 8.2422C48.3973 8.74883 48.5448 9.31557 48.5448 9.94242C48.5448 10.5693 48.3928 11.136 48.089 11.6426C47.794 12.1493 47.3918 12.5486 46.8824 12.8405C46.3819 13.1239 45.8457 13.2656 45.2737 13.2656C44.2548 13.2656 43.5219 12.8319 43.0751 11.9647V14.837L40.2464 15.3522V6.79959ZM44.4157 11.2305C44.7821 11.2305 45.0949 11.1017 45.3541 10.8441C45.6133 10.5864 45.7429 10.2859 45.7429 9.94242C45.7429 9.58177 45.6088 9.27693 45.3407 9.02791C45.0815 8.77889 44.7732 8.65438 44.4157 8.65438C44.0492 8.65438 43.7364 8.77889 43.4772 9.02791C43.2181 9.26835 43.0885 9.55601 43.0885 9.8909V9.94242C43.0885 10.3031 43.2181 10.6079 43.4772 10.8569C43.7454 11.106 44.0582 11.2305 44.4157 11.2305Z"
      fill="currentColor"></path>
    <path
      d="M49.6904 4.30078H53.6988C54.664 4.30078 55.5176 4.4854 56.2594 4.85464C57.0101 5.22388 57.591 5.7391 58.0022 6.4003C58.4222 7.06149 58.6323 7.81715 58.6323 8.66726C58.6323 9.5603 58.4267 10.346 58.0156 11.0244C57.6134 11.7028 57.0369 12.2309 56.2862 12.6087C55.5444 12.9779 54.6819 13.1625 53.6988 13.1625H49.6904V4.30078ZM53.5647 10.8441C54.235 10.8441 54.7445 10.6423 55.093 10.2387C55.4505 9.8265 55.6293 9.29411 55.6293 8.6415C55.6293 8.02323 55.455 7.53378 55.1064 7.17312C54.7668 6.80388 54.2529 6.61926 53.5647 6.61926H52.6531V10.8441H53.5647Z"
      fill="currentColor"></path>
    <path
      d="M62.6899 13.2656C62.109 13.2656 61.5638 13.1196 61.0544 12.8276C60.5539 12.5271 60.1517 12.1235 59.8478 11.6169C59.5439 11.1017 59.392 10.5306 59.392 9.90378C59.392 9.28552 59.5439 8.72737 59.8478 8.22932C60.1517 7.72269 60.5583 7.32769 61.0678 7.04432C61.5772 6.76095 62.1179 6.61926 62.6899 6.61926C63.1547 6.61926 63.5837 6.74378 63.9769 6.9928C64.3791 7.24182 64.683 7.61535 64.8885 8.1134V6.61926H67.7038V13.1625H64.8885V11.9647C64.4417 12.8319 63.7088 13.2656 62.6899 13.2656ZM63.5613 11.2305C63.9188 11.2305 64.2227 11.1103 64.4729 10.8698C64.7321 10.6208 64.8707 10.3288 64.8885 9.99395V9.8909C64.8707 9.54742 64.7277 9.25547 64.4595 9.01503C64.2003 8.77459 63.9009 8.65438 63.5613 8.65438C63.186 8.65438 62.8642 8.78318 62.5961 9.04079C62.3369 9.28981 62.2073 9.59036 62.2073 9.94242C62.2073 10.3031 62.3414 10.6079 62.6095 10.8569C62.8776 11.106 63.1949 11.2305 63.5613 11.2305Z"
      fill="currentColor"></path>
    <path
      d="M69.0617 6.79959H71.8904V7.92019C72.3194 7.05291 73.0478 6.61926 74.0756 6.61926C74.6744 6.61926 75.2241 6.76524 75.7246 7.0572C76.234 7.34057 76.6317 7.73557 76.9177 8.2422C77.2127 8.74883 77.3601 9.31557 77.3601 9.94242C77.3601 10.5693 77.2082 11.136 76.9043 11.6426C76.6094 12.1493 76.2072 12.5486 75.6978 12.8405C75.1973 13.1239 74.661 13.2656 74.089 13.2656C73.0702 13.2656 72.3373 12.8319 71.8904 11.9647V14.837L69.0617 15.3522V6.79959ZM73.231 11.2305C73.5975 11.2305 73.9103 11.1017 74.1695 10.8441C74.4286 10.5864 74.5582 10.2859 74.5582 9.94242C74.5582 9.58177 74.4242 9.27693 74.1561 9.02791C73.8969 8.77889 73.5885 8.65438 73.231 8.65438C72.8646 8.65438 72.5518 8.77889 72.2926 9.02791C72.0334 9.26835 71.9038 9.55601 71.9038 9.8909V9.94242C71.9038 10.3031 72.0334 10.6079 72.2926 10.8569C72.5607 11.106 72.8735 11.2305 73.231 11.2305Z"
      fill="currentColor"></path>
  </svg>
);

const IconArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
    <path
      d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM27.7071 8.7071C28.0976 8.31658 28.0976 7.68342 27.7071 7.29289L21.3431 0.92893C20.9526 0.538406 20.3195 0.538406 19.9289 0.928931C19.5384 1.31945 19.5384 1.95262 19.9289 2.34314L25.5858 8L19.9289 13.6569C19.5384 14.0474 19.5384 14.6805 19.9289 15.0711C20.3195 15.4616 20.9526 15.4616 21.3431 15.0711L27.7071 8.7071ZM1 9L27 9L27 7L1 7L1 9Z"
      fill="currentColor"
    />
  </svg>
);

const Mastery = () => {

  const swiperRef = useRef<any>();

  return (
    <StyledContainer id="odysseySectionAirdropMastery">
      <StyledInner>
        <StyledTitle>
          <h2 className="title">
            Dynamic <span className="primary">Airdrop</span> Strategies
          </h2>
          <h5 className="title sub">
            Harness the Power of <span className="logo">{Logo}</span> for Maximum Mode Rewards
          </h5>
        </StyledTitle>
        <StyledContent>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            centeredSlides={false}
            modules={[]}
            className="modeDappMasterySwiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
          {
            MasteryData.map((item, idx) => (
              <SwiperSlide key={item.key}>
                <MasteryCard
                  key={item.key}
                  title={item.title}
                  pointsEarned={item.pointsEarned}
                  result={item.result}
                  styles={{ flex: 1 }}
                >
                  <StyledEarnedList>
                    {
                      item.earned.map((earn) => (
                        <EarnedCard
                          key={earn.key}
                          title={earn.name}
                          icon={earn.icon}
                          submit={earn.submit}
                          styles={{
                            background: '#2A2A2A',
                            paddingLeft: idx === MasteryData.length - 1 ? 15 : 20,
                            paddingRight: idx === MasteryData.length - 1 ? 15 : 20,
                            flex: 1,
                          }}
                          handleSubmit={() => {
                            if (earn.link) {
                              window.open(`${window.origin}${earn.link}`, '_blank');
                            }
                          }}
                        >
                          <StyledEarnedContent>
                            {
                              earn.conditions.map((condition, idx) => (
                                <li className="condition-item" key={idx}>
                                  <div className="condition-item-inner">
                                    <div className="point" />
                                    {condition}
                                  </div>
                                  {
                                    // special content: will display the kim liquidity pools
                                    earn.coinList && (
                                      <ul className="kim-liquidity-coins">
                                        {
                                          earn.coinList.map((coin) => (
                                            <li className="coin-item" key={coin.key}>
                                              <div className="item-icon">
                                                <Image className="coin-icon" src={coin.coin1} alt={coin.coin1Name} width={20} height={20} />
                                                <Image className="coin-icon" src={coin.coin2} alt={coin.coin2Name} width={20} height={20} />
                                              </div>
                                              <div className="item-name">
                                                <i>{coin.coin1Name} / </i>
                                                <i>{coin.coin2Name}</i>
                                              </div>
                                            </li>
                                          ))
                                        }
                                      </ul>
                                    )
                                  }
                                </li>
                              ))
                            }
                          </StyledEarnedContent>
                        </EarnedCard>
                      ))
                    }
                  </StyledEarnedList>
                </MasteryCard>
              </SwiperSlide>
            ))
          }
          </Swiper>
        </StyledContent>
        {MasteryData.length > 2 && (
          <StyledPageBtn>
            <StyledLeftBtn
              className='btn'
              onClick={() => {
                swiperRef.current && swiperRef.current.slidePrev();
              }}
            >
              <StyledArrow>{ IconArrow }</StyledArrow>
            </StyledLeftBtn>
            <StyledRightBtn
              className='btn'
              onClick={() => {
                swiperRef.current && swiperRef.current.slideNext();
              }}
            >
              { IconArrow }
            </StyledRightBtn>
          </StyledPageBtn>
        )}
      </StyledInner>
    </StyledContainer>
  );
};

export default Mastery;
