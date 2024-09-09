import { memo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Empty from '@/components/Empty';
import useDappOpen from '@/hooks/useDappOpen';
import { StyledFlex } from '@/styled/styles';
import DappCard from '@/views/AllDapps/components/DappCard';
import AllDappsTitle from '@/views/AllDapps/components/Title';
import DappLoading from '@/views/AllDapps/Loading/Dapp';
import ViewAll from '@/views/Home/components/ViewAll';
import useDapps from '@/views/Home/hooks/useDapps';

import { StyledContainer, StyledFooter, StyledMask, StyledSwiperWrapper, StyledWrapper } from './styles';

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
          bp="1003-006"
          onCategory={onSelectCategory}
          activeCategory={category}
          dappList={featuredDapps?.titleDapps ?? []}
        />
      </StyledWrapper>
      <StyledSwiperWrapper>
        <StyledMask className="left"></StyledMask>
        <StyledWrapper style={{ flexShrink: 0, position: 'relative', zIndex: 0 }}>
          {loading ? (
            <StyledFlex gap="16px">
              <DappLoading
                length={5}
                style={{
                  flexWrap: 'nowrap',
                  marginTop: 0
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
              {featuredDapps?.dapps ? (
                featuredDapps.dapps.map((dapp: any, idx: number) => (
                  <SwiperSlide key={idx}>
                    <DappCard
                      bp={{ detail: '', dapp: '1003-007' }}
                      name={dapp.name}
                      logo={dapp.logo}
                      description={dapp.description}
                      categories={dapp.categories}
                      networks={dapp.networks}
                      onClick={() => onDappCardClick(dapp)}
                      tradingVolume={dapp?.trading_volume_general}
                      tvl={dapp.tvl}
                      users={dapp.participants}
                      route={dapp.route}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <Empty size={42} tips="No dApps found" />
              )}
            </Swiper>
          )}
        </StyledWrapper>
        <StyledMask></StyledMask>
      </StyledSwiperWrapper>
      <StyledFooter>
        <ViewAll href="/alldapps" bp="1003-008" />
      </StyledFooter>
    </StyledContainer>
  );
};

export default memo(DiscoveryDapps);
