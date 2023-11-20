import { memo } from 'react';
import styled from 'styled-components';

import AccountItem from './AccountItem';
import SubtractItem from './SubtractItem';

const StyledHeader = styled.div<{ tab: 'account' | 'bridge' }>`
  width: 100%;
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: initial;
    ${({ tab }) => tab === 'bridge' && 'display: none'}
  }
`;

const Header = ({ tab }: { tab: 'account' | 'bridge' }) => {
  return (
    <StyledHeader tab={tab}>
      <AccountItem />
      <SubtractItem />
    </StyledHeader>
  );
};

export default memo(Header);
