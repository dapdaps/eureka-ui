import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 1000px;
  margin: 77px auto 150px;
`;
export const StyledTitle = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 36px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
`;
export const StyledTitlePrimary = styled.span`
  background: linear-gradient(116deg, #C8FF7C 11.9%, #FFA5DB 64.92%, #7A78FF 104.11%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 80px;
  font-style: italic;
  font-weight: 700;
  line-height: 100%;
  text-transform: capitalize;
  padding: 0 10px;
`;
export const StyledDesc = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 17px;
`;
export const StyledContent = styled.div`
  margin-top: 49px;
  position: relative;
  
  &::after {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
  }
`;
export const StyledTable = styled.div`
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #1E2028;
`;
export const StyledTableHeader = styled.div`
  border-bottom: 1px solid #373A53;
`;
export const StyledTableBody = styled.div``;
export const StyledTableRow = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: nowrap;
  color: #FFF;
  text-align: right;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledTableHeaderRow = styled(StyledTableRow)`
  height: 68px;
  color: #979ABE;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledTableCol = styled.div<{ $width?: string; $align?: 'left' | 'center' | 'right'; }>`
  height: 100%;
  display: flex;
  justify-content: ${({ $align }) => {
    if ($align === 'center') return 'center';
    if ($align === 'left') return 'flex-start';
    if ($align === 'right') return 'flex-end';
  }};
  align-items: center;
  padding: 0 35px;
  flex: 1;

  ${({ $width }) => {
    if (!$width) {
      return {
        flex: 1,
      };
    }
    return {
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: $width,
    };
  }};
`;
export const StyledTableTitle = styled.div`
  color: #FFF;
  text-align: left;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding: 27px 0 16px;
`;

export const StyledUser = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  color: #FFF;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledUserAddress = styled.div``;
export const StyledUserAvatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  transform: rotate(-75deg);
  flex-shrink: 0;
  background: conic-gradient(from 180deg at 50% 50%, #00D1FF 0deg, #FF008A 360deg);
`;

export const StyledRankIcon = styled.div`
  width: 25px;
  height: 25px;
`;
