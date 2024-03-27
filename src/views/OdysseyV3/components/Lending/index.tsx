import Title from '../Title';
import DappCard from '../DappCard';
import { StyledLoadingWrapper } from '@/styled/styles';
import Loading from '@/components/Icons/Loading';
import { StyledContainer, StyledContent } from './styles';

export default function Lending({ list, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <Title
        title="Lending"
        subtitle="Dive into lending on Scroll and make waves & Become a liquidity provider in Scroll and make a splash!"
      />
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
