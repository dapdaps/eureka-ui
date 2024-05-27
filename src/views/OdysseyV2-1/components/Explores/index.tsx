import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import ExporeItem from './ExporeItem';
import {  StyledContent, StyledItemWrap, StyledTitle,  StyledSubTitle, StyledContainer } from './styles';
import { StyledEmptyContainer } from '@/views/OdysseyV2-1/styles';

export default function Explores({ list, userInfo, authConfig, onRefreshDetail, loading, detailLoading, setDetailLoading }: any) {


  return (
    <StyledContainer>
      <StyledTitle>Dive into DapDap Social</StyledTitle>
      <StyledSubTitle>Explore DapDap&lsquo;s Social Features, Receive Points</StyledSubTitle>
      <StyledContent>
        <StyledItemWrap show={list?.length > 0}>
        {
          loading
            ? <StyledLoadingWrapper $h="100px">
                <Loading size={30} />
              </StyledLoadingWrapper>
            : (
              list?.length
                ? list.map((item: any) => (
                    <ExporeItem
                      key={item.id}
                      {...item}
                      authConfig={authConfig}
                      userInfo={userInfo}
                      onRefreshDetail={onRefreshDetail}
                      detailLoading={detailLoading}
                      setDetailLoading={setDetailLoading}
              />)) : <StyledEmptyContainer>No Data</StyledEmptyContainer>
            )
        }
        </StyledItemWrap>
      </StyledContent>
    </StyledContainer>
  );
}
