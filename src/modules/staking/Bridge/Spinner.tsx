import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  color: #979abe;
`;

export default memo(function CustomSpinner() {
  return (
    <StyledSpinner>
      <Loading size={30} />
    </StyledSpinner>
  );
});
