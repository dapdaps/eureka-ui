import { memo } from 'react';

import { ellipsAccount } from '@/utils/account';
import {
  StyledAddress,
  StyledAvatar,
  StyledAvatarBox,
  StyledAvatarContainer,
  StyledBg,
  StyledCircle,
  StyledContainer,
  StyledContent,
  StyledInfo,
  StyledKol,
  StyledName,
  StyledNameWrapper
} from './styles';
import UserAvatar from '../UserAvatar';

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
