import { useRouter } from 'next/router';
import { memo, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import odyssey from '@/config/odyssey';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { StyledSvg } from '@/styled/styles';
import { get } from '@/utils/http';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import Tag from '@/views/Odyssey/components/Tag';

import { LeftButton, RightButton } from './ArrowBtn';

interface FlexProps {
  flexDirection?: 'row' | 'column';
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
}
interface FontProps {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?: string;
  lineHeight?: string;
}
const StyledOdyssey = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #393c47;
`;
const StyledContainer = styled.div``;
const StyledImage = styled.div`
  width: 330px;
  height: 165px;
  background-repeat: no-repeat;
  border-radius: 16px;
  background-size: 100% 100%;
  border: 2px solid #373a53;
`;
const StyledMakser = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
`;
const StyledFont = styled.div<FontProps>`
  color: ${(props) => props.color || '#000'};
  font-family: Montserrat;
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || '400'};
  line-height: ${(props) => props.lineHeight || 'normal'};
`;
const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
`;
const StyledOdysseyWrapper = styled.div`
  width: calc(100% - 388px);
  position: relative;
`;
const StyledOdysseyContainer = styled.div`
  overflow: hidden;
`;

const StyledMask = styled.div`
  width: 129px;
  height: 227px;
  background: linear-gradient(270deg, #262836 0%, rgba(38, 40, 54, 0) 100%);
  position: absolute;
  top: 0px;
  z-index: 4;
`;

const Odyssey = function ({ setShow }: any) {
  const toast = useToast();
  const { loading, compassList } = useCompassList();
  const [showBeginMask, setShowBeginMask] = useState(false);
  const [showEndMask, setShowEndMask] = useState(true);
  const router = useRouter();
  const { check } = useAuthCheck({ isNeedAk: true });
  const swiperRef = useRef<any>();

  const handleClick = async function (compass: any) {
    let status = compass.status;
    if (status === 'un_start') {
      const response = await get('/api/compass?id=' + compass.id);
      status = response.data.status;
    }
    if (status === 'un_start') {
      toast.fail({
        title: 'Odyssey is upcoming...'
      });
      return;
    }
    if (!odyssey[compass.id]) return;
    router.push(odyssey[compass.id].path);
    setShow(false);
  };
  return (
    <StyledOdyssey>
      <StyledFlex alignItems="flex-start" gap="70px" style={{ width: '100%' }}>
        <StyledFlex alignItems="flex-start" gap="17px" style={{ marginTop: 41 }}>
          <StyledFlex
            flexDirection="column"
            alignItems="flex-start"
            gap="15px"
            style={{ width: '316px', flexShrink: '0' }}
          >
            <StyledFont color="#FFF" fontSize="20px" fontWeight="700">
              Odyssey
            </StyledFont>
            <StyledFont color="#979ABE" fontSize="14px">
              Obtain spins through on-chain interactive quests as you explore the untapped potential of Ethereum L2s.
            </StyledFont>
          </StyledFlex>
          <StyledSvg
            style={{
              cursor: 'pointer'
            }}
            onClick={() => {
              router.push('/campaigns/homepage');
              setShow(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M10.2929 28.2929C9.90237 28.6834 9.90237 29.3166 10.2929 29.7071C10.6834 30.0976 11.3166 30.0976 11.7071 29.7071L10.2929 28.2929ZM29 12C29 11.4477 28.5523 11 28 11L19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13L27 13L27 21C27 21.5523 27.4477 22 28 22C28.5523 22 29 21.5523 29 21L29 12ZM11.7071 29.7071L28.7071 12.7071L27.2929 11.2929L10.2929 28.2929L11.7071 29.7071Z"
                fill="#979ABE"
              />
              <rect x="0.5" y="0.5" width="39" height="39" rx="5.5" stroke="#979ABE" stroke-opacity="0.3" />
            </svg>
          </StyledSvg>
        </StyledFlex>
        <StyledOdysseyWrapper>
          <StyledOdysseyContainer>
            <Swiper
              width={860}
              slidesPerView={2.4}
              speed={500}
              spaceBetween={28}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={true}
            >
              {compassList.map((compass: any, index: number) => (
                <SwiperSlide key={index}>
                  <StyledFlex
                    flexDirection="column"
                    gap="14px"
                    style={{
                      width: '330px',
                      filter: compass.status === 'ended' ? 'grayscale(100%)' : 'grayscale(0%)',
                      position: 'relative'
                    }}
                    key={compass.id}
                  >
                    <StyledContainer
                      style={{
                        cursor: compass.status === 'un_start' ? 'not-allowed' : 'pointer',
                        position: 'relative'
                      }}
                      onClick={() => {
                        check(() => {
                          handleClick(compass);
                        });
                      }}
                    >
                      <StyledImage style={{ backgroundImage: `url("${compass.banner}")` }} />
                      {compass.status === 'un_start' && (
                        <StyledMakser>
                          <StyledFont color="#FFF" fontSize="16px" fontWeight="500">
                            Coming soon...
                          </StyledFont>
                        </StyledMakser>
                      )}
                    </StyledContainer>
                    <StyledFont color="#FFF" fontSize="16px" fontWeight="700">
                      {compass.name}
                    </StyledFont>
                    <div
                      style={{
                        position: 'absolute',
                        left: 10,
                        top: 10
                      }}
                    >
                      <Tag status={compass.status} />
                    </div>
                  </StyledFlex>
                </SwiperSlide>
              ))}
            </Swiper>
          </StyledOdysseyContainer>
          {showBeginMask && <StyledMask style={{ left: '0px', transform: 'rotate(-180deg)' }} />}
          {showEndMask && compassList?.length > 2 && <StyledMask style={{ right: '0px' }} />}
          {compassList.length > 2 && (
            <>
              <LeftButton
                onClick={() => {
                  swiperRef.current && swiperRef.current.slidePrev();
                  setShowEndMask(!swiperRef.current?.isEnd);
                  setShowBeginMask(!swiperRef.current?.isBeginning);
                }}
              />
              <RightButton
                onClick={() => {
                  swiperRef.current && swiperRef.current.slideNext();
                  setShowEndMask(!swiperRef.current?.isEnd);
                  setShowBeginMask(!swiperRef.current?.isBeginning);
                }}
              />
            </>
          )}
        </StyledOdysseyWrapper>
      </StyledFlex>
    </StyledOdyssey>
  );
};
export default memo(Odyssey);
