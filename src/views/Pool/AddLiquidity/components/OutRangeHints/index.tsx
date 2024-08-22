import { memo } from 'react';

import WarningIcon from '@/components/Icons/WarningIcon';

import { StyledContainer } from './styles';

const OutRangeHints = ({ type }: any) => {
  return (
    <StyledContainer>
      <WarningIcon width="20px" height="20px" style={{ flexShrink: 0 }} />
      <div>
        {type === -1
          ? `Invalid range selected. The min price must be lower than the max price.`
          : `Your position will not earn fees or to be used in trades until the
        market price move into your price range.`}
      </div>
    </StyledContainer>
  );
};

export default memo(OutRangeHints);
