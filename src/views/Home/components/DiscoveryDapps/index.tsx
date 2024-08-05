import { memo, useMemo, useRef } from 'react';
import { StyledContainer, StyledFooter, StyledMask, StyledSwiperWrapper, StyledViewAll, StyledWrapper } from './styles';
import AllDappsTitle from '@/views/AllDapps/components/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import DappCard from '@/views/AllDapps/components/DappCard';
import useDapps from '@/views/Home/hooks/useDapps';
import Empty from '@/components/Empty';
import DappLoading from '@/views/AllDapps/Loading/Dapp';
import { StyledFlex } from '@/styled/styles';
import useDappOpen from '@/hooks/useDappOpen';

const DiscoveryDapps = () => {
  const swiperRef = useRef<any>(null);

  const { open } = useDappOpen();
  const { loading, featuredDapps, category, onSelectCategory } = useDapps();

  const onDappCardClick = (_dapp: any) => {
    open({ dapp: _dapp, from: 'alldapps' });
  };

  return (
    <StyledContainer>
      <StyledWrapper>
        <AllDappsTitle
          onCategory={onSelectCategory}
          activeCategory={category}
          dappList={featuredDapps?.titleDapps ?? []}
        />
      </StyledWrapper>
      <StyledSwiperWrapper>
        <StyledMask className="left"></StyledMask>
        <StyledWrapper style={{ flexShrink: 0, position: 'relative', zIndex: 0 }}>
          {
            loading ? (
              <StyledFlex gap="16px">
                <DappLoading
                  length={5}
                  style={{
                    flexWrap: 'nowrap',
                    marginTop: 0,
                  }}
                />
              </StyledFlex>
            ) : (
              <Swiper
                modules={[]}
                slidesPerView={3}
                spaceBetween={16}
                updateOnWindowResize={true}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {
                  featuredDapps?.dapps ? featuredDapps.dapps.map((dapp: any, idx: number) => (
                    <SwiperSlide key={idx}>
                      <DappCard
                        bp={{ detail: '1001-004', dapp: '1001-005' }}
                        name={dapp.name}
                        logo={dapp.logo}
                        description={dapp.description}
                        categories={dapp.categories}
                        networks={dapp.networks}
                        onClick={() => onDappCardClick(dapp)}
                        trading_volume={dapp.trading_volume}
                        participants={dapp.participants}
                        badges={dapp.rewards}
                      />
                    </SwiperSlide>
                  )) : (
                    <Empty size={42} tips="No dApps found" />
                  )
                }
              </Swiper>
            )
          }
        </StyledWrapper>
        <StyledMask></StyledMask>
      </StyledSwiperWrapper>
      <StyledFooter>
        <StyledViewAll href="/alldapps">
          View all
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM15.5657 6.56569C15.8781 6.25327 15.8781 5.74674 15.5657 5.43432L10.4745 0.343147C10.1621 0.0307272 9.65557 0.0307272 9.34315 0.343147C9.03073 0.655566 9.03073 1.1621 9.34315 1.47452L13.8686 6L9.34314 10.5255C9.03073 10.8379 9.03073 11.3444 9.34314 11.6569C9.65556 11.9693 10.1621 11.9693 10.4745 11.6569L15.5657 6.56569ZM1 6.8L15 6.8L15 5.2L1 5.2L1 6.8Z"
              fill="white"
            />
          </svg>
        </StyledViewAll>
      </StyledFooter>
    </StyledContainer>
  );
};

export default memo(DiscoveryDapps);
