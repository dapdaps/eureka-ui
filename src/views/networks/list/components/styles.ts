import Image from 'next/image';
import Link from 'next/link';
import { styled } from 'styled-components';

import hexToRgba from '@/utils/hexToRgba';


export const StyledCardContainer = styled.div<{$bgColor?: string}>`
  width: 405px;
  padding: 30px 20px 30px 30px;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191E;
  backdrop-filter: blur(10px);
  overflow: hidden;
  position: relative;
  cursor: default;
  transition: opacity .2s ease;
  
  &.card-shadow::before {
    content: '';
    opacity: 0;
  }

  
  &:hover {
    &.card-shadow::before {
      opacity: 0.1;
      content: '';
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 380px;
      height: 380px;
      border-radius: 380px;
      z-index: 0;
      background: ${({ $bgColor }) => `radial-gradient(50% 50% at 50% 50%, ${hexToRgba($bgColor, 1)}  0%, ${hexToRgba($bgColor, 0)} 100%)`}
    }
  }
  
  .card-head {
    width: 100%;
    &-image {
      width: 72px;
      height: 72px;
    }
    &-name-container {
      justify-content: space-between;
      .chain-name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &-info {
      width: calc(100% - 88px);
    }
  }
`;

export const StyledAdImage = styled(Image)`
  
`;

export const StyledCardHead = styled.div`
  margin-bottom: 44px;
`;

export const StyledBtnGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

export const StyledDataItem = styled.div`
  &:nth-child(even) {
    width: calc(40% - 10px);
  }
  
  &:nth-child(odd) {
    width: calc(60% - 10px);
  }
`;
export const StyledData = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  row-gap: 32px;
  margin-bottom: 28px;
  .list-card-data {
    &-value {
      font-size: 20px;
    }
  }
`;

export const StyledItemLabel = styled.div`
  color: #979ABE;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 6px;
`;
export const StyledItemValue = styled.div<{ $underline?: boolean }>`
  color: #FFF;
  font-size: 20px;
  font-weight: 600;
  text-decoration: ${({$underline}) => $underline ? 'underline' : 'unset'};
  
  &.gray-text {
    color: #979ABE;
  }
`;

export const StyledReward = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Wrap = styled.div<{ $bgColor: string }>`
  width: 1260px;
  height: 186px;
  padding: 30px 30px 0;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191e;
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
  transition: border 0.2s ease-in;
  cursor: pointer;
  position: relative;
  font-family: Montserrat;
  overflow: hidden;
  
    &.item-hover {
      transition: opacity .2s ease;
      &::before {
        opacity: 0;
        content: '';
      }
    }
  
    &:hover {
      &.item-shadow::before {
        opacity: 0.1;
        content: '';
        position: absolute;
        top: -50%;
        left: 6px;
        width: 186px;
        height: 186px;
        border-radius: 50%;
        background: ${({ $bgColor }) => `radial-gradient(50% 50% at 50% 50%, ${$bgColor} 0%, ${hexToRgba($bgColor, 0)} 100%);`}
      }
    }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  overflow: hidden;
  column-gap: 30px;
`;

export const ChainName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const ChainDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  
  .network-native {
    .currency-name {
      font-size: 12px;
    }
    .native-logo {
      width: 16px;
      height: 16px;
    }
  }
`;
export const ChainInfo = styled.div`
  flex-grow: 1;
  width: calc(100% - 90px);
`;
export const LogoGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 50%;
  flex-shrink: 0;
  overflow: hidden;
  flex-grow: 1;
`;
export const BtnGroup = styled.div`
  display: flex;
  gap: 16px;
  //width: 250px;
  white-space: nowrap;
`;
export const Btn = styled(Link)<{ $bgColor?: string, $color?: string }>`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
 
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  padding: 12px 22px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #45475C;
  
  &.allinone-btn {
    width: 229px;
    font-weight: 600; 
    border: none;
  }

  ${({ $bgColor, $color }) => {
  return {
    background: $bgColor ?? '#21222B',
    color:  $color ?? '#ffffff',
    opacity: 0.8
  };
}}

  &:hover {
    text-decoration: none;
    background: ${({ $bgColor }) => $bgColor ?? 'linear-gradient(180deg, #eef3bf 0%, #e9f456 100%)'};
    opacity: 1;
    color:  ${({ $color }) => $color ?? '#000000' }
  }

  @media (max-width: 1478px) {
    font-size: 14px;
  }
`;
export const DataList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  font-family: Montserrat;
  position: relative;
  z-index: 1;

  .item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    &.rewards {
      width: 229px;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }

  .key {
    color: #979abe;
    text-align: left;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  
  .value {
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
  }
`;

export const ChainNameContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 9px;
`;

export const StyledChainTag = styled.div<{$bgColor: string}>`
  position: relative;
  border-radius: 6px;
  border: 2px #101115;
  background-color: ${({$bgColor}) => $bgColor ?? '#ffffff'};
  padding: 6px 14px;
  white-space: nowrap;

  &.tag-top {
    margin-left: 10px;
    width: 108px;
    .tag-icon {
      width: 35px;
      height: 35px;
      transform: rotate(-15deg);
      top: -24%;
    }
  }
  
  &.tag-hot {
    width: 78px;
    .tag-icon {
      width: 43px;
      height: 43px;
      top: -46%;
    }
  }
`;

export const StyledChainTagIcon = styled.div<{$url: string}>`
  position: absolute;

  left: -20px;
  background: ${({$url}) => $url ? ('url(' + $url + ') no-repeat center') : 'unset'};
  background-size: contain;

`;

export const StyledChainTagText = styled.div`
  color: #000;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  
`;

export const ChainOdyssey = styled.img`
  width: 104px;
  height: 14px;
  object-fit: contain;
`;

export const StyledChainOdyssey = styled.div`
  border-radius: 10px;
  border: 1px solid #45475C;
  background: #21222B;
  backdrop-filter: blur(10px);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 13px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const ListContainer = styled.div`
  margin-bottom: 100px;
  
  &.card-view {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-wrap: wrap;
    gap: 30px 20px;
    
    .advertise {
      width: 405px;
      &-card {
        width: 405px;
        height: 475px;
      }
    }
  }
  
  &.list-view {
    
  }
`;