import DappCard from '../DappCard';
import { StyledContainer, StyledContent,StyledSubTitle, StyledTitle, StyledBody, StyledLeftPlate } from './styles';
import Title from '@/views/OdysseyV2-1/components/Title';

export default function Bridge({ list, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <StyledBody>
      <StyledTitle>Explore Modular Linea</StyledTitle>
      <StyledSubTitle>Navigate a Curated Selection of Partner dApps Across the Linea Ecosystem</StyledSubTitle>
      <Title title="BRIDGE" />
      <StyledContent>
        {list.map((item: any) => (
          <DappCard key={item.id} {...item} onRefreshDetail={onRefreshDetail} />
        ))}
      </StyledContent>
      </StyledBody>
      <StyledLeftPlate />
    </StyledContainer>
  );
}
