import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import DappCard from '../DappCard';
import Title from '../Title';
import { EmptyContainer,StyledContainer, StyledContent } from './styles';

export default function Lending({ list, onRefreshDetail, loading, detailLoading, setDetailLoading }: any) {

  return (
    <StyledContainer>
      <Title
        title="Lending & Liquidity & Staking"
        subtitle="Participate in lending, liquidity providing, and restaking to earn more rewards"
      />
      <StyledContent>
        {
          loading ? <StyledLoadingWrapper $h="100px">
            <Loading size={30} />
          </StyledLoadingWrapper>
            : (
              list?.length ? list.map((item: any) => (
                <DappCard
                  type='lending'
                  key={item.id}
                  {...item}
                  onRefreshDetail={onRefreshDetail}
                  detailLoading={detailLoading}
                  setDetailLoading={setDetailLoading}
                />
                ))
                : <EmptyContainer>
                    No Data
                </EmptyContainer>
            )
        }
      </StyledContent>
    </StyledContainer>
  );
}
