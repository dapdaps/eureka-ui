import styled from 'styled-components';

export const StyledLeaderboard = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: -62px;
  width: 988px;
  height: 706px;
`;
export const StyledContainer = styled.div`
  margin: 0 auto;
  overflow: hidden;
  width: 988px;
  height: 706px;
  position: absolute;
  background: url('/svg/campaign/linea-marsh/pixel.svg') no-repeat center;
  z-index: 0;
`;

export const StyledContent = styled.div`
  width: 100%;
  margin-top: 4px;
  position: relative;
  z-index: 1;
`;
export const StyledTable = styled.div`
  box-sizing: border-box;
  font-family: 'Jersey';
  font-size: 26px;
`;
export const StyledTableHeader = styled.div`
  height: 60px;
  font-size: 26px;
  color: #000;
`;
export const StyledTableBody = styled.div``;

export const StyledTableRow = styled.div`
  height: 46px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: nowrap;
  text-align: right;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;
export const StyledTableHeaderRow = styled(StyledTableRow)`
  height: 60px;
  color: #000;
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledTableCol = styled.div<{ $width?: string; $align?: 'left' | 'center' | 'right' }>`
  height: 100%;
  display: flex;
  justify-content: ${({ $align }) => {
    if ($align === 'center') return 'center';
    if ($align === 'left') return 'flex-start';
    if ($align === 'right') return 'flex-end';
  }};
  align-items: center;
  padding: 0 35px;
  font-size: 26px;
  flex: 1;

  ${({ $width }) => {
    if (!$width) {
      return {
        flex: 1
      };
    }
    return {
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: $width
    };
  }};
`;
export const StyledTableTitle = styled.div`
  color: #000;
  text-align: left;
  font-size: 26px;
  line-height: 100%;
  padding: 0 35px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'Jersey';
`;

export const StyledUser = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  color: #000;
`;
export const StyledUserAddress = styled.div``;
export const StyledUserAvatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  transform: rotate(-75deg);
  flex-shrink: 0;
  background: conic-gradient(from 180deg at 50% 50%, #00d1ff 0deg, #ff008a 360deg);
`;

export const StyledRankIcon = styled.div`
  width: 25px;
  height: 25px;
`;

export const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Montserrat';
  font-size: 26px;
  color: #000;
  padding: 0 35px;
`;

export const StyledTips = styled.div`
  font-family: 'Montserrat';
  font-size: 14px;
  color: #000;
  line-height: 1;
  flex: 1;
`;

export const StyledPaginationSelector = styled.div``;

export const StyledYours = styled.div`
  clip-path: path(
    'M921.636 0L9.03636 7.37924e-05V4.3698H4.51818L4.51818 9H0V51.6975H3.93582V55.6303H7.9361V60L921.636 59.9999V55.6302H926.154V50.6975H930V9.30249H926.154V4.36973H921.636V0Z'
  );
  width: 930px;
  height: 60px;
  background-color: #000;
  color: #fff;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Jersey';
  font-size: 26px;
`;

export const StyledEndTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: 'Jersey';
  font-size: 20px;
  position: absolute;
  bottom: -72px;
  right: -80px;
  color: #fff;
  img {
    width: 147px;
    height: 107px;
  }
`;
