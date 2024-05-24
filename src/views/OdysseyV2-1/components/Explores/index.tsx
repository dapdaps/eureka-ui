import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import ExporeItem from './ExporeItem';
import {  StyledContent, StyledItemWrap, StyledTitle,  StyledSubTitle, StyledContainer, StyledTitleBox} from './styles';

export default function Explores({ list, userInfo, authConfig, onRefreshDetail }: any) {


  return (
    <StyledContainer>
      <StyledTitle>Dive into DapDap Social</StyledTitle>
      <StyledSubTitle>Explore DapDap&lsquo;s Social Features, Receive Points</StyledSubTitle>
      <StyledContent>
        <StyledItemWrap show={list?.length > 0}>
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
      </StyledContent>
      <StyledTitleBox />
    </StyledContainer>
  );
}
