import { memo } from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/views/Dapp/styles';

const DappFallback = () => {

  return (
    <StyledLoadingWrapper>
      <Loading size={60} />
    </StyledLoadingWrapper>
  );
};

export default memo(DappFallback);
