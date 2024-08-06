import { memo } from 'react';
import useAccount from '@/hooks/useAccount';
import { ellipsAccount } from '@/utils/account';
import {
  StyledContainer,
  StyledAccount,
  StyledAvatar,
  StyledTitle
} from './styles';
import useUserInfo from '@/hooks/useUserInfo';

const Top = () => {
  const { account } = useAccount();
  const { userInfo } = useUserInfo();

  return (
    <StyledContainer>
          <StyledTitle>
            YOUR PORTFOLIO
            { userInfo.avatar && <StyledAvatar url={userInfo.avatar}/>}
          </StyledTitle>
        { account && <StyledAccount>{ellipsAccount(account)}</StyledAccount> }

    </StyledContainer>
  );
};

export default memo(Top);
