import Title from '../Title';
import DappCard from '../DappCard';
import { StyledContainer, StyledContent, StyledBody, StyledRocket } from './styles';

export default function Lending({ list, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <StyledBody>
      <Title title="LENDING" />
      <StyledContent>
        {list.map((item: any) => (
          <DappCard key={item.id} {...item} onRefreshDetail={onRefreshDetail} />
        ))}
      </StyledContent>
      </StyledBody>
      <StyledRocket />
    </StyledContainer>
  );
}
