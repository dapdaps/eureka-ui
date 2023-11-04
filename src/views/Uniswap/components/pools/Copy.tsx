import { memo } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
const Header = () => {
  return <StyledHeader></StyledHeader>;
};

export default memo(Header);
