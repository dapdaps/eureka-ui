import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import { StyledDesc, StyledTitle } from '@/views/OdysseyV5/components/Explores/styles';
import { EmptyContainer } from '@/views/OdysseyV5/components/Lending/styles';

import DappCard from '../DappCard';
import Title from '../Title';
import { StyledContainer, StyledContent } from './styles';

export default function Bridge({ list, onRefreshDetail, loading, detailLoading, setDetailLoading }: any) {
  return (
    <StyledContainer>
      <StyledTitle className='bridge-title'>
        Explore Modular <span className="hilight">Mode</span>
      </StyledTitle>
      <StyledDesc>Navigate a Curated Selection of Partner dApps Across the Mode Ecosystem</StyledDesc>
      <Title
        title="Bridge"
        subtitle="Cross a bridge to Mode and discover new opportunities make sure the descriptions say assets not asset"
      />
      <StyledContent>
        {
          loading ? <StyledLoadingWrapper $h="100px">
              <Loading size={30} />
            </StyledLoadingWrapper>
            : (list?.length > 0 ? list.map((item: any) => (
                <DappCard
                  type="bridge"
                  key={item.id}
                  {...item}
                  onRefreshDetail={onRefreshDetail}
                  detailLoading={detailLoading}
                  setDetailLoading={setDetailLoading}
                />
              ))
              :
              <EmptyContainer>No Data</EmptyContainer>)
        }
      </StyledContent>
    </StyledContainer>
  );
}
