import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { PageButtonDirection} from '@/views/Home/components/DAvinci/Page';
import { PageButton, Pagination } from '@/views/Home/components/DAvinci/Page';
import { StyledButton, StyledClose, StyledContainer, StyledFoot } from '@/views/Home/components/DAvinci/styles';

import Card from './Card';
import { SwiperList } from './config';

const DAvinci = (props: DAvinciProps) => {
  const { onClose } = props;

  const swiperRef = useRef<any>(null);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageButton = (direction: PageButtonDirection) => {
    if (direction === 'prev') {
      swiperRef.current && swiperRef.current.slidePrev();
      return;
    }
    swiperRef.current && swiperRef.current.slideNext();
  };

  const handlePage = (page: number) => {
    if (page === currentPage) return;
    swiperRef.current && swiperRef.current.slideTo(page);
  };

  const handleExplore = () => {
    onClose();
  };

  return (
    <StyledContainer>
      <Swiper
        width={680}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onActiveIndexChange={(swiper) => {
          setCurrentPage(swiper.activeIndex);
        }}
        modules={[Parallax]}
        parallax={true}
        simulateTouch={false}
      >
        {
          SwiperList.map((item) => (
            <SwiperSlide key={item.key}>
              <Card swiperItem={item} />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <StyledFoot>
        <AnimatePresence mode="wait">
          {
            currentPage === 1 ? (
              <PageButton
                key="prev"
                direction="prev"
                onClick={handlePageButton}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              />
            ) : (
              <div key="empty" />
            )
          }
        </AnimatePresence>
        <Pagination
          list={SwiperList}
          currentPage={currentPage}
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
          onPage={handlePage}
        />
        <AnimatePresence mode="wait">
          {
            currentPage === 0 ? (
              <PageButton
                key="next"
                direction="next"
                onClick={handlePageButton}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              />
            ) : (
              <StyledButton
                key="explore"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                onClick={handleExplore}
              >
                Explore now
              </StyledButton>
            )
          }
        </AnimatePresence>
      </StyledFoot>

      <StyledClose onClick={onClose}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="13" r="13" fill="#1F2229" />
          <path
            d="M14.444 13L17.7799 9.66415C18.0307 9.41332 18.0735 9.0494 17.8756 8.85157L17.1482 8.12424C16.9503 7.92632 16.5869 7.96974 16.3356 8.22041L13.0001 11.5561L9.66433 8.22049C9.41349 7.96941 9.04957 7.92632 8.85165 8.12449L8.12431 8.8519C7.92648 9.04949 7.96931 9.4134 8.22048 9.66423L11.5563 13L8.22048 16.336C7.96973 16.5866 7.92631 16.9503 8.12431 17.1482L8.85165 17.8756C9.04957 18.0735 9.41349 18.0306 9.66433 17.7799L13.0003 14.4439L16.3357 17.7794C16.587 18.0307 16.9504 18.0735 17.1483 17.8756L17.8757 17.1482C18.0735 16.9503 18.0307 16.5866 17.78 16.3356L14.444 13Z"
            fill="white"
          />
        </svg>
      </StyledClose>
    </StyledContainer>
  );
};

export default DAvinci;

export interface DAvinciProps {
  onClose(): void;
}
