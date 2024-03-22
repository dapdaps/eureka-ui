import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 30px;
  width: 1244px;
  margin: 0 auto;
  position: relative;
`;

export const StyledContent = styled.div`
  position: relative;
  z-index: 5;
  padding-top: 325px;
`;

export const StyledGirl = styled.img<{ $show: boolean }>`
  width: 455.122px;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  transition: 0.3s;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`;

export const StyledMain = styled.div`
  width: 792px;
  margin: 0 auto;
  position: relative;
`;

export const StyledTitle = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #fff 0%, #afafaf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const StyledSubtitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
  margin-top: 9px;
  text-align: center;
`;

export const StyledBg = styled.div`
  width: 360.834px;
  height: 398.334px;
  position: absolute;
  z-index: 1;
  background-image: url(/images/shush/bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
`;

export const StyledBg1 = styled(StyledBg)`
  transform: rotate(-75deg);
  right: -52px;
  top: -200px;
`;

export const StyledBg2 = styled(StyledBg)`
  transform: rotate(-77.957deg);
  left: -106px;
  top: 286px;
`;

export const StyledBack = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  padding: 28px 16px 12px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
