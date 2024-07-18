import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 4px 7px;
`;

const VersionTag = ({ type }: any) => {
  return (
    <StyledContainer
      style={{
        backgroundColor: type === 'V2' ? '#BE6B69' : '#743231',
      }}
    >
      {type}
    </StyledContainer>
  );
};

export default memo(VersionTag);
