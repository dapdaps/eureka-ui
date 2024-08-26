import { memo } from 'react';

import { StyledContainer, StyledItem } from './style';

const VersionTypes = ({ version, onChange }: any) => {
  return (
    <StyledContainer>
      {['All', 'V3', 'V2'].map((item, i) => (
        <StyledItem
          key={item}
          $active={item === version}
          onClick={() => {
            onChange(item);
          }}
        >
          {item}
        </StyledItem>
      ))}
    </StyledContainer>
  );
};

export default memo(VersionTypes);
