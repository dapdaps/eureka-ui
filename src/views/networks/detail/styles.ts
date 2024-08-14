import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-bottom: 50px;
  --container-width: 1247px;
  width: var(--container-width);
  margin: 0 auto;
  font-family: Montserrat;
  
  .category-filter {
    justify-content: flex-start;
  }
`;
export const DappTitle = styled.div`
  margin: 100px auto 30px;
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  .highlight {
    color: #ebf479;
  }
`;

export const StyledCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 30px auto 0;
`;

export const StyledDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1244px;
  margin: 80px auto 0;
  column-gap: 68px;
`;

export const TabHead = styled.div`
  display: flex;
  align-items: center;
  gap: 52px;
  padding-left: 30px;
  .line {
    width: 1px;
    height: 21px;
    background: #979abe;
  }
  .tab-item {
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    height: 44px;
    line-height: normal;
    background: linear-gradient(90deg, #fff 0%, #979abe 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    &.active {
      border-bottom: 4px solid #ebf479;
    }
  }
`;
export const TabBody = styled.div`
  width: 720px;
  height: 716px;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191e;
  backdrop-filter: blur(10px);
  .intro-title {
    padding: 50px 30px 20px;
    color: #fff;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 27px */
  }
  .intro-desc {
    padding: 8px 30px 40px;
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
  }
  .pj-title {
    margin-top: 30px;
    padding: 0 30px;
    color: #fff;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
  }
  .pj-value {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    padding: 0 30px;
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
  }
  .pj-detail {
    display: flex;
    align-items: center;
    gap: 8px;
    svg {
      cursor: pointer;
    }
  }
`;

export const SubTitle = styled.div`
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background: linear-gradient(90deg, #fff 0%, #979abe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const MedalWrap = styled.div`
  border-bottom: 1px solid #202329;
  margin-bottom: 30px;
  padding-bottom: 50px;
`;

export const CompaginWrap = styled.div`
  padding-top: 19px;
`;
export const CompaginBanner = styled.div`
  height: 250px;
  border-radius: 20px;
  padding-top: 160px;
  /* background: rgba(0, 0, 0, 0.5); */
  background-color: #18191e;
  margin-bottom: 20px;
`;
export const CompaginBtn = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 286px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #ebf479;
  color: #02051e;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const CompaginTitle = styled.div`
  display: flex;

  justify-content: space-between;
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 30px;

  .tag {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 26px;
    padding: 0 8px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(32, 34, 47, 0.8);
    color: #979abe;
    font-family: Gantari;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 12px */
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      background-color: #979abe;
      border-radius: 50%;
    }
  }
`;

export const CompaginVolume = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px;
  color: #979abe;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  border-radius: 12px;
  border: 1px solid #979abe;
  opacity: 0.8;
  background: #18191e;
`;
export const IconGroup = styled.div`
  svg {
    width: 26px;
    height: 26px;
    margin-left: -10px;
  }
`;

export const StyledRecordContainer = styled.div`
  flex: 1;
`;
export const StyledRelatedOdyssey = styled.div`
  width: 500px;
  flex-shrink: 0;
`;