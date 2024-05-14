import Image from 'next/image';
import { useState } from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import ExporeItem from './ExporeItem';
import {
  StyledDesc,
  StyledContainer,
  StyledItemWrap,
  StyledTitle,
  StyledExploreContainer,
  StyledExploreTitle,
  StyledExploreDesc
} from './styles';

export default function Explores({ list, userInfo, authConfig, onRefreshDetail }: any) {
  const [stakeShow, setStakeShow] = useState<boolean>(false);
  const [showWrapAndUnwrap, setShowWrapAndUnwrap] = useState(false);
  const [stakeType, setStakeType] = useState<string>('renzo');

  const TrapLayout = {
    borderColor: '#1C1E2D',
    corner: 10,
  };
  const list1 = [
    {
      "id": 65,
      "created_at": "2024-05-01T03:41:00.737000+00:00",
      "updated_at": "2024-05-01T03:41:00.737000+00:00",
      "name": "Particle",
      "description": "",
      "category": "dapp",
      "category_id": 6,
      "source": "db3",
      "dapps": "",
      "networks": "18",
      "to_networks": "",
      "extra_data": "gold",
      "spins": 1,
      "times": 1,
      "compass_id": 4,
      "category_name": "Yield",
      "total_spins": 0,
      "status": 1
    },
    {
      "id": 69,
      "created_at": "2024-05-01T03:41:00.737000+00:00",
      "updated_at": "2024-05-01T03:41:00.737000+00:00",
      "name": "Particle",
      "description": "",
      "category": "dapp",
      "category_id": 6,
      "source": "db3",
      "dapps": "",
      "networks": "18",
      "to_networks": "",
      "extra_data": "gold",
      "spins": 1,
      "times": 1,
      "compass_id": 4,
      "category_name": "Yield",
      "total_spins": 0,
      "status": 1
    },
    {
      "id": 66,
      "created_at": "2024-05-01T03:42:05.658000+00:00",
      "updated_at": "2024-05-01T03:42:21+00:00",
      "name": "Ring Protocol",
      "description": "Use Ring Protocol to complete a swap on Blast",
      "category": "dapp",
      "category_id": 2,
      "source": "",
      "dapps": "149",
      "networks": "18",
      "to_networks": "",
      "extra_data": "gold",
      "spins": 1,
      "times": 1,
      "compass_id": 4,
      "category_name": "Swap",
      "total_spins": 0,
      "status": 1,
      "operators": [
        {
          "dapp_id": 149,
          "dapp_name": "Ring Protocol",
          "dapp_logo": "https://s3.amazonaws.com/dapdap.prod/images/ring.png",
          "default_chain_id": 81457,
          "route": "dapp/ring-protocol",
          "theme": "{\"swap_color\":\"\"}",
          "dapp_network": [
            {
              "dapp_id": 149,
              "network_id": 18,
              "chain_id": 81457,
              "dapp_src": "bluebiu.near/widget/Swap.Dex"
            }
          ]
        }
      ]
    }
  ];
  return (
    <>
      <StyledContainer>
       <Image src='/images/odyssey/v5/dive-head.svg' alt='Dive into DApp Diversity' width={305} height={305} className='head-img' />
        <StyledTitle>Dive into <span className='hilight'>DApp Diversity</span></StyledTitle>
        <StyledDesc>Exploring Mode&lsquo;s DApp Ecosystem for Richer Rewards</StyledDesc>
        <StyledExploreContainer>
          <StyledExploreTitle>Explore Mode</StyledExploreTitle>
          <StyledExploreDesc>Complete tasks easily to earn DapDap PTS</StyledExploreDesc>
        </StyledExploreContainer>
        <StyledItemWrap>
          {list1?.length ? (
            list1.map((item: any) => (
              <ExporeItem
                key={item.id}
                {...item}
                authConfig={authConfig}
                userInfo={userInfo}
                onRefreshDetail={onRefreshDetail}
              />
            ))
          ) : (
            <StyledLoadingWrapper $h="100px">
              <Loading size={30} />
            </StyledLoadingWrapper>
          )}
        </StyledItemWrap>
        {/*<Btns>*/}
        {/*  <Trapeziform*/}
        {/*    {...TrapLayout}*/}
        {/*    className="poly-btn"*/}
        {/*    handleClick={() => {*/}
        {/*      setShowWrapAndUnwrap(true);*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Image src="/images/odyssey/v4/btn-mask.png" alt="" width={268} height={62} className="poly-mask" />*/}
        {/*    <span className="poly-lp">*/}
        {/*      <Image src="/images/odyssey/v4/coin-eth.svg" alt="" width={26} height={26} />*/}
        {/*      <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={26} height={26} className="poly-lp-last" />*/}
        {/*    </span>*/}
        {/*    Wrap ETH to WETH*/}
        {/*    <Image src="/images/odyssey/v4/white-arrow.svg" alt="" width={28} height={16} />*/}
        {/*  </Trapeziform>*/}
        {/*  <Trapeziform*/}
        {/*    {...TrapLayout}*/}
        {/*    className="poly-btn large renzo"*/}
        {/*    handleClick={() => {*/}
        {/*      setStakeShow(true);*/}
        {/*      setStakeType('renzo');*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Image src="/images/odyssey/v4/btn-mask.png" alt="" width={268} height={62} className="poly-mask" />*/}
        {/*    <Image src="/images/odyssey/v4/coin-ezeth.svg" alt="" width={26} height={26} />*/}
        {/*    Get ezETH by RENZO*/}
        {/*    <Image src="/images/odyssey/v4/white-arrow.svg" alt="" width={28} height={16} />*/}
        {/*  </Trapeziform>*/}
        {/*  <Trapeziform*/}
        {/*    {...TrapLayout}*/}
        {/*    className="poly-btn lido"*/}
        {/*    handleClick={() => {*/}
        {/*      setStakeShow(true);*/}
        {/*      setStakeType('lido');*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Image src="/images/odyssey/v4/btn-mask.png" alt="" width={268} height={62} className="poly-mask" />*/}
        {/*    <Image src="/images/odyssey/v4/coin-eth.svg" alt="" width={26} height={26} />*/}
        {/*    Get stETH by LIDO*/}
        {/*    <Image src="/images/odyssey/v4/white-arrow.svg" alt="" width={28} height={16} />*/}
        {/*  </Trapeziform>*/}
        {/*</Btns>*/}
        {/*<svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none">*/}
        {/*  <path*/}
        {/*    d="M15.5722 30.3003C17.1266 32.8849 20.8734 32.8849 22.4278 30.3003L37.0052 6.06153C38.6086 3.3955 36.6884 0 33.5774 0H4.42265C1.31163 0 -0.608558 3.3955 0.994807 6.06153L15.5722 30.3003Z"*/}
        {/*    fill="#EBF479"*/}
        {/*  />*/}
        {/*</svg>*/}
        {/*{stakeShow && (*/}
        {/*  <SkakeModel*/}
        {/*    stakeType={stakeType}*/}
        {/*    onClose={() => {*/}
        {/*      setStakeShow(false);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
        {/*<WrapAndUnwrap*/}
        {/*  open={showWrapAndUnwrap}*/}
        {/*  onClose={() => {*/}
        {/*    setShowWrapAndUnwrap(false);*/}
        {/*  }}*/}
        {/*/>*/}
      </StyledContainer>
      {/*      <StyledContent>*/}
      {/*        <CompTitle*/}
      {/*          title="Explore Blast"*/}
      {/*          subtitle="Complete tasks easily to earn DapDap PTS*/}
      {/*"*/}
      {/*        />*/}
      {/*        <StyledItemWrap>*/}
      {/*          {list?.length ? (*/}
      {/*            list.map((item: any) => (*/}
      {/*              <ExporeItem*/}
      {/*                key={item.id}*/}
      {/*                {...item}*/}
      {/*                authConfig={authConfig}*/}
      {/*                userInfo={userInfo}*/}
      {/*                onRefreshDetail={onRefreshDetail}*/}
      {/*              />*/}
      {/*            ))*/}
      {/*          ) : (*/}
      {/*            <StyledLoadingWrapper $h="100px">*/}
      {/*              <Loading size={30} />*/}
      {/*            </StyledLoadingWrapper>*/}
      {/*          )}*/}
      {/*        </StyledItemWrap>*/}
      {/*      </StyledContent>*/}
    </>
  );
}
