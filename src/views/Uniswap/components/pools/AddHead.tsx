import { memo } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .arrow {
    cursor: pointer;
  }
`;
// const StyledNavWrapper = styled.div`
//   display: flex;
//   gap: 10px;
// `;
// const StyledLogo = styled.img`
//   width: 32.78px;
//   height: 27px;
//   margin-top: -5px;
// `;
// const StyledNavs = styled.div`
//   display: flex;
//   align-items: center;
// `;
// const StyledNav = styled.div<{ active?: boolean }>`
//   padding: 0px 20px;
//   font-size: 16px;
//   font-weight: 500;
//   color: ${({ active }) => (active ? '#fff' : '#8E8E8E')};
//   cursor: pointer;
// `;

const AddLiquidityHeader = () => {
  return (
    <StyledHeader>
      <ReturnArrowButton className="arrow" />
    </StyledHeader>
  );
};

const ReturnArrowButton = (props: any) => {
  return (
    <svg {...props} width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 6.49992L2 6.49992M2 6.49992L7.5 1M2 6.49992L7.5 12"
        stroke="#8E8E8E"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default memo(AddLiquidityHeader);
