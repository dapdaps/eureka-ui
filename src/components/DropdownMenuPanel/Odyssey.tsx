import useToast from '@/hooks/useToast';
import { get } from '@/utils/http';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useRouter } from 'next/router';
import { memo, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import odyssey from '@/config/odyssey';
import { Swiper, SwiperSlide } from 'swiper/react';
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
        title: 'Odyssey is upcoming...',
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
        <StyledFlex
          flexDirection="column"
          alignItems="flex-start"
          gap="15px"
          style={{ width: '316px', marginTop: 17, flexShrink: '0' }}
        >
          <StyledFont color="#FFF" fontSize="20px" fontWeight="700">
            Odyssey
          </StyledFont>
          <StyledFont color="#979ABE" fontSize="14px">
            Obtain spins through on-chain interactive quests as you explore the untapped potential of Ethereum L2s.
          </StyledFont>
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
            >
              {compassList.map((compass: any, index: number) => (
                <SwiperSlide key={index}>
                  <StyledFlex flexDirection="column" gap="14px" style={{ width: '330px' }} key={compass.id}>
                    <StyledContainer
                      style={{
                        cursor: compass.status === 'un_start' ? 'not-allowed' : 'pointer',
                        position: 'relative',
                      }}
                      onClick={() => {
                        check(() => {
                          handleClick(compass);
                        });
                      }}
                    >
                      <StyledImage style={{ backgroundImage: `url(${compass.banner})` }} />
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
                  </StyledFlex>
                </SwiperSlide>
              ))}
            </Swiper>
          </StyledOdysseyContainer>
          {showBeginMask && <StyledMask style={{ left: '0px', transform: 'rotate(-180deg)' }} />}
          {showEndMask && compassList?.length > 2 && <StyledMask style={{ right: '0px' }} />}
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
        </StyledOdysseyWrapper>
      </StyledFlex>
    </StyledOdyssey>
  );
};
export default memo(Odyssey);
