import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowLineIcon } from '@/components/Icons/ArrowLineIcon';

const Card = (
  {
    classname = 'advertise',
    image,
    buttonText,
    link,
  }: Card) => {

  const router = useRouter();

  const onLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!link) {
      return;
    }
    router.push(link);
  };

  const onHover = () => {
    if (!link) {
      return;
    }
    router.prefetch(link);
  };

  return (
    <StyledCardContainer className={`${classname}-card`} onClick={onLink} onMouseEnter={onHover}>
      <StyledCardImage
        src={image}
        className={`${classname}-card-img ${buttonText ? 'min-height' : ''}`}
        width={100}
        height={100}
        alt=""
      />
      {
        buttonText ? (
          <StyledCardBottom className={`${classname}-card-bottom`}>
            <StyledCardButton className={`${classname}-card-button`} onClick={onLink}>
              <span>{buttonText}</span>
              <ArrowLineIcon />
            </StyledCardButton>
          </StyledCardBottom>
        ) : null
      }
    </StyledCardContainer>
  );
};

const AdvertiseCard = (
  {
    classname = '',
    adList = [],
  }: Props) => {

  const swiperRef = useRef<any>(null);

  return adList.length > 1 ? (
    <StyledSwiper className={classname}>
      <Swiper
        className="advertise-swiper"
        width={405}
        modules={[Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        speed={1000}
        spaceBetween={20}
        updateOnWindowResize={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={false}
      >
        {
          adList.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                classname={classname}
                image={item.ad_images ?? ''}
                link={item.ad_link ?? ''}
                buttonText={item.btn ?? ''}
              />
            </SwiperSlide>
          ))
        }

      </Swiper>

      <div className="swiper-pagination"></div>
    </StyledSwiper>
  ) : adList.map((item: Partial<Card>, idx: number) => (
      <Card
        classname={classname}
        image={item.ad_images ?? ''}
        link={item.ad_link ?? ''}
        key={idx}
        buttonText={item.btn ?? ''}
      />
    ),
  );
};


export default AdvertiseCard;

interface Card {
  image: string;
  buttonText: string;
  link: string;
  id?: number;
  ad_images?: string;
  ad_link?: string;
  btn?: string;
  classname?: string;
}

interface Props {
  adList: Partial<Card>[];
  classname?: string;
}

const StyledSwiper = styled.div`

  .advertise-swiper {
    overflow: hidden;
    height: 100%;
  }
`;

const StyledCardContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191E;
  height: 100%;
`;

const StyledCardBottom = styled.div`
  padding: 20px 16px;
  flex-shrink: 0;
  background: #18191E;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  height: 90px;
`;

const StyledCardButton = styled.div`
  border-radius: 10px;
  background: #EBF479;
  width: 100%;
  line-height: 1;
  padding-top: 17px;
  padding-bottom: 17px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  opacity: 0.8;
  transition: opacity .2s ease;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 1;
  }
`;

const StyledCardImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  flex-grow: 1;
  cursor: pointer;
  height: 70.51%;

  &.min-height {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    cursor: default;
  }
`;