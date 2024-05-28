import { memo, useMemo, useState } from 'react';
import ChartComponent from '@/views/Portfolio/components/Protocol/Chart';
import { StyledContainer } from '@/views/Portfolio/components/Protocol/styles';

const Protocol = ({ dapps, filterFunc, loading }: any) => {

  return (
    <StyledContainer>
      <ChartComponent />
    </StyledContainer>
  );
};

export default memo(Protocol);
