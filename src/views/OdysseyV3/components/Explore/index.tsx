import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import Title from '../Title';
import ExporeItem from './ExporeItem';
import { StyledContainer, StyledContent } from './styles';

export default function Explore({ list, userInfo, authConfig, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <Title title="Explore Scroll" subtitle="Complete quests and collect fragments" titleSize={42} />
      <StyledContent>
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
      </StyledContent>
    </StyledContainer>
  );
}
