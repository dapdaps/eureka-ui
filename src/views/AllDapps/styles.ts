import { styled } from 'styled-components';

export const AllDappsWrapper = styled.div`
  width: 1247px;
  margin: 0 auto;
`;

export const StyledContainer = styled.div`
  font-family: Montserrat;
  background: #000 url("/images/alldapps/bg.svg") no-repeat center top / 1451px 512px;
  min-height: 100vh;
  color: #FFF;
  padding-top: 59px;
`;
export const StyledBody = styled(AllDappsWrapper)``;
export const StyledFilters = styled.div`
  margin-top: 66px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;
export const StyledNetworkDropdownItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;
export const StyledRewardNow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 156px;
  height: 38px;
  border-radius: 10px;
  color: #FFF;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding: 0 16px 0 13px;
  cursor: pointer;
  background: #18191E url("/images/alldapps/btn-border.svg") no-repeat center center / contain;
  
  .reward-now-radio {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &::after {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #fff;
      display: none;
    }
  }
  .reward-now-text {
    flex: 1;
  }
  
  &.selected {
    .reward-now-radio::after {
      display: block;
    }
  }
`;
export const StyledSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-radius: 24px;
  border: 1px solid #333648;
  background: #18191E;
  height: 36px;
  width: 268px;
  margin-left: auto;
  padding: 0 12px;
`;
export const StyledSearchIcon = styled.div`
  flex-shrink: 0;
`;
export const StyledSearchInput = styled.input`
  flex: 1;
  border: 0;
  outline: none;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  caret-color: #fff;
  
  &::placeholder {
    color: #5E617E;
  }
`;

export const StyledDappList = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 16px;
  row-gap: 20px;
  flex-wrap: wrap;
  margin-top: 36px;
`;

export const StyledFoot = styled(AllDappsWrapper)`
  padding-top: 50px;
  padding-bottom: 150px;
`;
