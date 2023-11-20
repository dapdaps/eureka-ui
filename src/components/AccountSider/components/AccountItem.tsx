import { memo } from 'react';
import styled from 'styled-components';

import CopyButton from '@/components/CopyButton';
import useAccount from '@/hooks/useAccount';
import { ellipsAccount } from '@/utils/account';

const StyledItem = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
const Logo = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-image: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
`;
const Account = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
const StyledCopyButton = styled.div`
  @media (max-width: 768px) {
    border-radius: 10px;
    border: 1px solid #343838;
    background: #242424;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: 10px;
  }
`;

const AccountItem = ({ showCopy = true, logoSize = 38 }: { showCopy?: boolean; logoSize?: number }) => {
  const { account } = useAccount();
  return (
    <StyledItem>
      <Logo size={logoSize} />
      <Account>{ellipsAccount(account)}</Account>
      {account && showCopy && (
        <StyledCopyButton>
          <CopyButton
            size={16}
            text={account}
            tooltipMessage="Copied"
            tooltipTop={-31}
            tooltipRight={-12}
            tooltipFontSize={12}
          />
        </StyledCopyButton>
      )}
    </StyledItem>
  );
};

export default memo(AccountItem);
