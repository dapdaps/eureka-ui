import { useState } from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import DappCard from '../DappCard';
import Title from '../Title';
import { StyledContainer, StyledContent } from './styles';
import { EmptyContainer } from '@/views/OdysseyV5/components/Lending/styles';

export default function Trade({ list, onRefreshDetail, loading }: any) {
  return (
    <StyledContainer>
      <Title title="Trade" subtitle="Seamlessly interact with assets in Mode within dapdap" />
      <StyledContent>
        {
          loading ? <StyledLoadingWrapper $h="100px">
            <Loading size={30} />
          </StyledLoadingWrapper> : (
            list?.length ? list.map((item: any) => (
                <DappCard type="trade" key={item.id} {...item} onRefreshDetail={onRefreshDetail} />))
              : <EmptyContainer>No Data</EmptyContainer>
          )
        }
      </StyledContent>
    </StyledContainer>
  );
}
