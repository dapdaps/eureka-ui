import Image from 'next/image';

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
  return (
    <>
      <StyledContainer id='odysseySectionDiveIntoDAppDiversity'>
       <Image src='/images/odyssey/v5/dive-head.svg' alt='Dive into DApp Diversity' width={305} height={305} className='head-img' />
        <StyledTitle>Dive into <span className='hilight'>DApp Diversity</span></StyledTitle>
        <StyledDesc>Exploring Mode&lsquo;s DApp Ecosystem for Richer Rewards</StyledDesc>
        <StyledExploreContainer>
          <StyledExploreTitle>Explore Mode</StyledExploreTitle>
          <StyledExploreDesc>Complete tasks easily to earn DapDap PTS</StyledExploreDesc>
        </StyledExploreContainer>
        <StyledItemWrap>
          {list?.length ? (
            list.map((item: any) => (
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
      </StyledContainer>
    </>
  );
}
