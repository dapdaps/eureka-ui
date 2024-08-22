import { memo } from 'react';

import useAccount from '@/hooks/useAccount';
import useUserInfo from '@/hooks/useUserInfo';
import { ellipsAccount } from '@/utils/account';

import Beta from '../Beta';
import {
  StyledAccount,
  StyledAvatar,
  StyledContainer,
  StyledTitle,
} from './styles';

const Top = () => {
  const { account } = useAccount();
  const { userInfo } = useUserInfo();

  return (
    <StyledContainer>
      <StyledTitle>
        YOUR PORTFOLIO
        {userInfo.avatar && <StyledAvatar url={userInfo.avatar} />}
        <Beta />
      </StyledTitle>
      {account && <StyledAccount>{ellipsAccount(account)}</StyledAccount>}
    </StyledContainer>
  );
};

export default memo(Top);
