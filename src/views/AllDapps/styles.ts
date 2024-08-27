import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const AllDappsWrapper = styled.div`
  --container-width: 1247px;
  width: var(--container-width);
  margin: 0 auto;
`;

export const StyledContainer = styled.div`
  --container-width: 1247px;
  font-family: Montserrat;
  background: #000 url("/images/alldapps/bg.svg") no-repeat center top / 1451px 512px;
  min-height: 100vh;
  color: #FFF;
  padding-top: 59px;
  .category-fixed {
    position: fixed;
    left: 0;
    width: 100%;
    padding-left: calc((100% - var(--container-width)) / 2);
    padding-right: calc((100% - var(--container-width)) / 2);
    justify-content: flex-start;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      height: 170px;
      background: #000 url("/images/alldapps/bg.svg") no-repeat center top/1471px 512px;
      z-index: -1;
      left: 0;
    }
  }
  //.category-title {
  //  &::before {
  //    content: '';
  //    position: absolute;
  //    top: 0;
  //    width: 100%;
  //    height: 170px;
  //    background: #000 url("/images/alldapps/bg.svg") no-repeat center top/1471px 512px;
  //    z-index: -1;
  //    left: 0;
  //  }
  //}
`;
export const StyledBody = styled(AllDappsWrapper)`
  padding-bottom: 150px;
`;
export const StyledFilters = styled(motion.div)<{$fixed?: boolean}>`
  margin-top: 66px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 36px;
  position: ${({$fixed}) => $fixed ? 'fixed' : 'relative'};
  top: 0;
  width:  ${({$fixed}) => $fixed ? 'var(--container-width)' : 'auto'};
`;
export const StyledNetworkDropdownItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;
export const StyledRadio = styled.div<{ $selected?: boolean; }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-left: 13px;
  padding-right: 15px;
  height: 40px;
  border-radius: 10px;
  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  cursor: pointer;
  border: 1px solid #333648;
  background: ${({ $selected }) => $selected ? '#1F2229' : '#18191E'};
  transition: all .3s ease;

  .radio-control {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      display: block;
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #EBF479;
      border: 1px solid #18191E;
      transition: all .3s ease;
      opacity: ${({ $selected }) => $selected ? 1 : 0};
    }
  }
  .radio-text {
    flex: 1;
  }
`;

export const StyledRewardNow = styled(StyledRadio)`
  width: 142px;
  border: 0;
  background: ${({ $selected }) => {
    if ($selected) {
      return 'linear-gradient(90deg, #FFAF65 3.39%, #FF84EB 50.73%, #9B82FF 100%)';
    }
    return '#18191E url("/images/alldapps/btn-border.svg") no-repeat center center / 142px 40px';
  }};
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


export const StyledFiltersBackdrop = styled(motion.div)`
  position: fixed;
  top: 70px;
  width: 100%;
  height: 170px;
  background: #000 url("/images/alldapps/bg.svg") no-repeat center top/1471px 512px;
  z-index: 40;
  left: 0;
`;