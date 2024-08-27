import DappCard from '../DappCard';
import Title from '../Title';
import { StyledContainer, StyledContent } from './styles';

export default function Bridge({ list, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <Title title="Bridge" />
      <StyledContent>
        {list.map((item: any) => (
          <DappCard key={item.id} {...item} onRefreshDetail={onRefreshDetail} />
        ))}
      </StyledContent>
    </StyledContainer>
  );
}
