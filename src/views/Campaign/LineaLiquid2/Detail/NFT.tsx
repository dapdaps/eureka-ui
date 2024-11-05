import { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import Modal from '../Modal';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 0;
  .arrow {
    cursor: pointer;
  }
`;

interface Props {
  onClose: () => void;
}

const nfts = [
  '/images/odyssey/lineaLiquid/nft-1.png',
  '/images/odyssey/lineaLiquid/nft-3.png',
  '/images/odyssey/lineaLiquid/nft-5.png',
  '/images/odyssey/lineaLiquid/nft-7.png'
];

export default function NFT({ onClose }: Props) {
  const swiperRef = useRef<any>();

  return (
    <Modal title={'NFT Prize'} onClose={onClose} width={500}>
      <Wrapper>
        <svg
          className="arrow"
          onClick={() => {
            if (swiperRef.current && swiperRef.current.swiper) {
              swiperRef.current.swiper.slidePrev();
            }
          }}
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.5"
            cx="30"
            cy="30"
            r="30"
            transform="matrix(-1 0 0 1 61 1)"
            stroke="#3C445E"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M44 30C44.5523 30 45 30.4477 45 31C45 31.5523 44.5523 32 44 32L44 30ZM17.2929 31.7071C16.9024 31.3166 16.9024 30.6834 17.2929 30.2929L23.6569 23.9289C24.0474 23.5384 24.6805 23.5384 25.0711 23.9289C25.4616 24.3195 25.4616 24.9526 25.0711 25.3431L19.4142 31L25.0711 36.6569C25.4616 37.0474 25.4616 37.6805 25.0711 38.0711C24.6805 38.4616 24.0474 38.4616 23.6569 38.0711L17.2929 31.7071ZM44 32L18 32L18 30L44 30L44 32Z"
            fill="#979ABE"
          />
        </svg>

        <div style={{ width: 250, overflow: 'hidden', margin: '0 auto' }}>
          <Swiper
            modules={[]}
            width={606}
            slidesPerView={1}
            speed={500}
            spaceBetween={10}
            ref={swiperRef}
            onSwiper={(swiper) => {
              // swiperRef.current = swiper;
            }}
            loop={true}
          >
            {nfts.map((item, index) => {
              return (
                <SwiperSlide key={item}>
                  <img src={item} style={{ width: 250 }} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <svg
          onClick={() => {
            if (swiperRef.current && swiperRef.current.swiper) {
              swiperRef.current.swiper.slideNext();
            }
          }}
          className="arrow"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.5" cx="31" cy="31" r="30" stroke="#3C445E" stroke-width="2" stroke-linejoin="round" />
          <path
            d="M18 30C17.4477 30 17 30.4477 17 31C17 31.5523 17.4477 32 18 32L18 30ZM44.7071 31.7071C45.0976 31.3166 45.0976 30.6834 44.7071 30.2929L38.3431 23.9289C37.9526 23.5384 37.3195 23.5384 36.9289 23.9289C36.5384 24.3195 36.5384 24.9526 36.9289 25.3431L42.5858 31L36.9289 36.6569C36.5384 37.0474 36.5384 37.6805 36.9289 38.0711C37.3195 38.4616 37.9526 38.4616 38.3431 38.0711L44.7071 31.7071ZM18 32L44 32L44 30L18 30L18 32Z"
            fill="#979ABE"
          />
        </svg>
      </Wrapper>
    </Modal>
  );
}
