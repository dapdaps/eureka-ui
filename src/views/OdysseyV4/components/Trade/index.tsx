import Image from 'next/image';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import DappCard from '../DappCard';
import Title from '../Title';
import { StyledContainer, StyledContent } from './styles';

export default function Trade({ list, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <Title
        title="Trade"
        subtitle="Execute a flawless trade in Blast"
        extra={
          <Image src="/images/odyssey/v4/wrap-btn.svg" alt="" width={268} height={62} style={{ cursor: 'pointer' }} />
        }
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
