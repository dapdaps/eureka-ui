import { memo } from 'react';
import styled from 'styled-components';

import SelectToken from './SelectToken';

const StyledSelectPair = styled.div``;
const StyledTitle = styled.div`
  font-size: 16px;
  color: #fff;
  margin-bottom: 16px;
`;
const StyledSelectTokens = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
const SelectPair = () => {
  return (
    <StyledSelectPair>
      <StyledTitle>Select pair</StyledTitle>
      <StyledSelectTokens>
        <SelectToken />
        <SelectToken />
      </StyledSelectTokens>
    </StyledSelectPair>
  );
};

export default memo(SelectPair);
