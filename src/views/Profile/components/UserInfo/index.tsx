import { memo } from 'react';

import { ellipsAccount } from '@/utils/account';
import UserAvatar from '../UserAvatar';
import {
  StyledAddress,
  StyledBg,
  StyledCircle,
  StyledContainer,
  StyledContent,
  StyledInfo,
  StyledName,
  StyledNameWrapper
} from './styles';

const UserInfo = ({ info, rewardInfo }: any) => {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledInfo>
          <UserAvatar userInfo={info} />
          <StyledNameWrapper>
            <StyledName>{info.username}</StyledName>
            <StyledAddress>{ellipsAccount(info.address)}</StyledAddress>
          </StyledNameWrapper>
        </StyledInfo>

      </StyledContent>
      <StyledBg />
      <StyledCircle />
    </StyledContainer>
  );
};

export default memo(UserInfo);
