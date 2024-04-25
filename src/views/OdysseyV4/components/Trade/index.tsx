import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import DappCard from '../DappCard';
import Title from '../Title';
import { StyledContainer, StyledContent } from './styles';

export default function Trade({ list, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <Title title="Trade" subtitle="Execute a flawless trade in Blast" />
      <StyledContent>
        {list?.length ? (
          list.map((item: any) => <DappCard key={item.id} {...item} onRefreshDetail={onRefreshDetail} />)
        ) : (
          <StyledLoadingWrapper $h="100px">
            <Loading size={30} />
          </StyledLoadingWrapper>
        )}
      </StyledContent>
    </StyledContainer>
  );
}
