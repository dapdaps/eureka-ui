import { memo } from 'react';

import WarningIcon from '@/components/Icons/WarningIcon';

import { StyledContainer } from './styles';

const FeeNoExsitHints = () => {
  return (
    <StyledContainer>
      <WarningIcon width="20px" height="20px" style={{ flexShrink: 0 }} />
      <div>Please select fee tier</div>
    </StyledContainer>
  );
};

export default memo(FeeNoExsitHints);
