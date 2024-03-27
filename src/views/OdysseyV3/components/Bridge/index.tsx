import Title from '../Title';
import DappCard from '../DappCard';
import { StyledLoadingWrapper } from '@/styled/styles';
import Loading from '@/components/Icons/Loading';
import { StyledContainer, StyledContent } from './styles';

export default function Bridge({ list, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <Title title="Bridge" subtitle="Construct a bridge in Scroll to new opportunities" />
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
