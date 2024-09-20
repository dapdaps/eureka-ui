// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';
const AvatarGroupWrap = styled.div`
  display: flex;
  padding: 0 10px 0 12px;
`;
const AvatarItem = styled.span`
  margin-left: ${(props) => (props.gap ? props.gap : -10)}px;
`;

export default memo(function AvatarGroup(props) {
  const { icons, size, gap } = props;
  return (
    <AvatarGroupWrap gap={gap}>
      {icons?.map((icon, index) => {
        return (
          <AvatarItem key={index}>
            <Avatar src={icon} size={size} />
          </AvatarItem>
        );
      })}
    </AvatarGroupWrap>
  );
});
