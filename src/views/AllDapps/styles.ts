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
export const StyledBody = styled(AllDappsWrapper)`
  padding-bottom: 150px;
`;
export const StyledFilters = styled.div`
  margin-top: 66px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 36px;
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
  transition: background .2s ease;
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
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #EBF479;
      display: none;
      border: 1px solid #18191E;
    }
  }
  .reward-now-text {
    flex: 1;
  }
  
  &.selected {
    background: linear-gradient(90deg, #FFAF65 3.39%, #FF84EB 50.73%, #9B82FF 100%);
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

export const StyledSelectorLoading = styled.div`
  width: 100px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgb(51, 54, 72);
  background: rgb(24, 25, 30);
`;