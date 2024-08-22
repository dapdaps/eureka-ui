import { memo } from 'react';
import styled from 'styled-components';

import { getTokenLogo } from '../../helpers';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
`;
const StyledIcons = styled.div`
  display: flex;
  align-items: center;
`;
const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;
const StyleSymbol = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const Position = ({ lists, name }: any) => {
  return (
    <StyledContainer>
      <StyledIcons>
        {lists.map((item: any, i: number) => (
          <StyledIcon key={item.logo + i} src={getTokenLogo(item.symbol)} style={{ marginLeft: i > 0 ? '-4px' : 0 }} />
        ))}
      </StyledIcons>
      <StyleSymbol>
        {lists.map((item: any, i: number) => (
          <span key={item.symbol}>
            {i > 0 && '+'} {item.symbol}
          </span>
        ))}
      </StyleSymbol>
    </StyledContainer>
  );
};

export default memo(Position);
