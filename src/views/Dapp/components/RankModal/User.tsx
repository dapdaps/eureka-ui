import styled from 'styled-components';

import { ellipsAccount } from '@/utils/account';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledUserAvatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

export default function User({ account }: any) {
  return (
    <Wrapper>
      <StyledUserAvatar src={account.avatar} />
      <div>{ellipsAccount(account.address)}</div>
    </Wrapper>
  );
}
