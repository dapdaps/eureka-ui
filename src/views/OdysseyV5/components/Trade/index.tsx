import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import { EmptyContainer } from '@/views/OdysseyV5/components/Lending/styles';

import DappCard from '../DappCard';
import Title from '../Title';
import { StyledContainer, StyledContent } from './styles';

export default function Trade({ list, onRefreshDetail, loading, detailLoading, setDetailLoading }: any) {
  return (
    <StyledContainer>
      <Title title="Trade" subtitle="Seamlessly trade your favourite assets on Mode within DapDap" />
      <StyledContent>
        {
          loading ? <StyledLoadingWrapper $h="100px">
            <Loading size={30} />
          </StyledLoadingWrapper> : (
            list?.length ? list.map((item: any) => (
                <DappCard
                  type="trade"
                  key={item.id}
                  {...item}
                  onRefreshDetail={onRefreshDetail}
                  detailLoading={detailLoading}
                  setDetailLoading={setDetailLoading}
                />
              ))
              : <EmptyContainer>No Data</EmptyContainer>
          )
        }
      </StyledContent>
    </StyledContainer>
  );
}
