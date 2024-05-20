import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import DappCard from '../DappCard';
import Title from '../Title';
import { StyledContainer, StyledContent } from './styles';
import { EmptyContainer } from '@/views/OdysseyV5/components/Lending/styles';

export default function Bridge({ list, onRefreshDetail, loading, detailLoading, setDetailLoading }: any) {
  return (
    <StyledContainer>
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
