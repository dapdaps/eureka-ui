import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import DappCard from '../DappCard';
import Title from '../Title';
import { StyledContainer, StyledContent, EmptyContainer } from './styles';

export default function Lending({ list, onRefreshDetail, loading }: any) {

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
              list?.length ? list.map((item: any) => (<DappCard type='lending' key={item.id} {...item} onRefreshDetail={onRefreshDetail} />))
                : <EmptyContainer>
                    No Data
                </EmptyContainer>
            )
        }
      </StyledContent>
    </StyledContainer>
  );
}
