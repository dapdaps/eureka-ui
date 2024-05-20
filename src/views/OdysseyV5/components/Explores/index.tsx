import Image from 'next/image';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import { EmptyContainer } from '@/views/OdysseyV5/components/Lending/styles';

import ExploreItem from './ExploreItem';
import {
  StyledContainer,
  StyledDesc,
  StyledExploreContainer,
  StyledExploreDesc,
  StyledExploreTitle,
  StyledItemWrap,
  StyledTitle,
} from './styles';

export default function Explores({ list, userInfo, authConfig, onRefreshDetail, loading, detailLoading, setDetailLoading }: any) {
  return (
    <>
      <StyledContainer id="odysseySectionDiveIntoDAppDiversity">
        <Image
          src="/images/odyssey/v5/dive-head.svg"
          alt="Dive into DApp Diversity"
          width={305}
          height={305}
          className="head-img"
        />
        <StyledTitle>
          Dive into <span className="hilight">DApp Diversity</span>
        </StyledTitle>
        <StyledDesc>Exploring Mode&lsquo;s DApp Ecosystem for Richer Rewards</StyledDesc>
        <StyledExploreContainer>
          <StyledExploreTitle>Explore Mode</StyledExploreTitle>
          <StyledExploreDesc>Complete tasks easily to earn DapDap PTS</StyledExploreDesc>
        </StyledExploreContainer>
        <StyledItemWrap>
          {
            loading ? <StyledLoadingWrapper $h="100px">
                <Loading size={30} />
              </StyledLoadingWrapper>
              : (list?.length ? list.map((item: any) => (
                  <ExploreItem
                    key={item.id}
                    {...item}
                    authConfig={authConfig}
                    userInfo={userInfo}
                    onRefreshDetail={onRefreshDetail}
                    detailLoading={detailLoading}
                    setDetailLoading={setDetailLoading}
                  />
                ))
                : <EmptyContainer>No Data</EmptyContainer>)
          }
        </StyledItemWrap>
      </StyledContainer>
    </>
  );
}
