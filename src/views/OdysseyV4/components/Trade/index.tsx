import { useState } from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import DappCard from '../DappCard';
import Title from '../Title';
import WrapAndUnwrap from '../WrapAndUnwrap';
import { StyledContainer, StyledContent, StyledWrapButton } from './styles';

export default function Trade({ list, onRefreshDetail }: any) {
  const [showWrapModal, setShowWrapModal] = useState(false);
  return (
    <StyledContainer>
      <Title title="Trade" subtitle="Execute a flawless trade in Blast" />
      <StyledContent>
        {list?.length ? (
          list.map((item: any) => <DappCard key={item.id} {...item} onRefreshDetail={onRefreshDetail} />)
        ) : (
          <StyledLoadingWrapper $h="100px">
            <Loading size={30} />
          </StyledLoadingWrapper>
        )}
      </StyledContent>
      <WrapAndUnwrap
        open={showWrapModal}
        onClose={() => {
          setShowWrapModal(false);
        }}
      />
    </StyledContainer>
  );
}
