import { memo } from 'react';
import styled from 'styled-components';

import Empty from '@/components/Empty';
import { StyledEmptyText } from '@/views/AllDapps/components/DappList/styles';

const NetworkEmpty = () => {
  return (
    <StyledEmpty>
      <Empty size={42} tips={<StyledEmptyText>No network found</StyledEmptyText>}/>
    </StyledEmpty>
  );
};

export default memo(NetworkEmpty);

const StyledEmpty = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
