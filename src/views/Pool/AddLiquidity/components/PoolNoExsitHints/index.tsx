import { memo } from 'react';

import WarningIcon from '@/components/Icons/WarningIcon';

import { StyledContainer } from './styles';

const PoolNoExsitHints = () => {
  return (
    <StyledContainer>
      <WarningIcon width="20" height="20" />
      <div>Oops! This pool is not exsit.</div>
    </StyledContainer>
  );
};

export default memo(PoolNoExsitHints);
