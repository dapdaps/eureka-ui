// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

import Avatar from '@/modules/components/Avatar';
export default memo(function PoolIcons(props) {
  const { icons } = props;

  const StyledContainer = styled.div`
    display: inline-flex;
    align-items: center;
  `;

  return (
    <StyledContainer>
      {icons?.map((icon, i) => {
        return (
          <span key={i} style={{ marginRight: -12 }}>
            <Avatar src={icon || '/images/tokens/default_icon.png'} />
          </span>
        );
      })}
    </StyledContainer>
  );
});
