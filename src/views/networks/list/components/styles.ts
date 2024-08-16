import { styled } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import hexToRgba from '@/utils/hexToRgba';


export const StyledCardContainer = styled.div<{$bgColor?: string}>`
  width: 405px;
  padding: 30px 20px 28px 30px;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191E;
  backdrop-filter: blur(10px);
  overflow: hidden;
  position: relative;
  cursor: default;
  transition: opacity .2s ease;
  
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
    &-image {
      width: 72px;
      height: 72px;
    }
    &-name-container {
      justify-content: space-between;
    }
  }
`;

export const StyledCardHead = styled.div``;
export const StyledCardLogo = styled(Image)`
  width: 72px;
  height: 72px;
`;
export const StyledInfo = styled.div``;
export const StyledNameContainer = styled.div``;
export const StyledName = styled.div``;
export const StyledTag = styled.div``;
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
  row-gap: 36px;
  margin-top: 44px;
  margin-bottom: 36px;
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
  margin-bottom: 36px;
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
`;

export const ChainName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  height: 100%;
  width: 100%;
`;
export const LogoGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  position: relative;
  z-index: 1;
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
    .tag-icon {
      width: 35px;
      height: 35px;
      transform: rotate(-15deg);
      top: -24%;
    }
  }
  
  &.tag-hot {
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
  }
  
  &.list-view {
    
  }
`;