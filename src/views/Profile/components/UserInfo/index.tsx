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
            {
              info?.twitter?.twitter_username ? (
                <>
                  <StyledName>{info?.twitter?.twitter_username}</StyledName>
                  <StyledAddress>{ellipsAccount(info.address)}</StyledAddress>
                </>
              ) : (
                <StyledAddress style={{ fontSize: 32, fontWeight: 600 }}>{ellipsAccount(info.address)}</StyledAddress>
              )
            }
          </StyledNameWrapper>
        </StyledInfo>

      </StyledContent>
      <StyledBg />
      <StyledCircle />
    </StyledContainer>
  );
};

export default memo(UserInfo);
