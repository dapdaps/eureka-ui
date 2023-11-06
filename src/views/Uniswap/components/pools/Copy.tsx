import { memo } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  .vchb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .w-full {
    width: 100%;
  }
`;
const Header = () => {
  return <StyledWrap></StyledWrap>;
};

export default memo(Header);
