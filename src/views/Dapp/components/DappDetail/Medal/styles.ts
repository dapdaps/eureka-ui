import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-family: Montserrat;
  padding-bottom: 50px;
  border-bottom: 1px solid #202329;
`;

export const StyledTitle = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 27px;
`;

export const StyledMedalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 158px;
  min-height: 176px;
  flex-shrink: 0;
  background-color: #18191E;
  padding: 28px 0 14px 0;
  border-radius: 20px;
  position: relative;
  border: 1px solid #202329;
`;

export const StyledMedalLogo = styled.div<{url: string}>`
  width: 80px;
  height: 80px;
  background: ${(props) => props.url ? `url(${props.url}) no-repeat center`: ''};
  background-size: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.dark {
    filter: grayscale(1);
  }
`;

export const StyledMedalInner = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

export const StyledMedalTag = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 34px;
  background: #21222B;
  color: #979ABE;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  padding: 7px 15px;
  white-space: nowrap;
  &.default {
    filter: grayscale(1);
  }
  &.active {
    color: #EBF479;
  }
`;

export const StyledMedalName = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 14px;
  padding: 8px 10px 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display:-webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient:vertical;
`;

export const StyledMedals = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 23px 13px;
  justify-content: flex-start;
`;

export const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;