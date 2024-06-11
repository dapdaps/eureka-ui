import Image from 'next/image';
import { styled } from 'styled-components';

import { StyledFlex } from '@/styled/styles';

const CoinGroup = (props: any) => {
  const { icon, name, style, onClick } = props;

  return (
    <StyledContainer style={style} $clickable={!!onClick} onClick={onClick}>
      <StyledFlex justifyContent="flex-start" alignItems="center" className="coin-icon-wrap">
        <Image className="coin-icon" src={icon[0]} width={26} height={26} alt="" />
        <Image className="coin-icon" src={icon[1]} width={26} height={26} alt="" />
      </StyledFlex>
      <div className="coin-name">
        {name[0]}/{name[1]}
      </div>
    </StyledContainer>
  );
};

export default CoinGroup;

const StyledContainer = styled.div<{ $clickable: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 6px;
  color: #fff;
  height: 42px;
  padding: 6px;
  border-radius: 4px;
  .coin-icon-wrap {
  }
  .coin-icon {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    flex-shrink: 0;
    flex-grow: 0;

    &:last-child {
      margin-left: -7px;
    }
  }
  .coin-name {
    flex: 1;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    white-space: nowrap;
  }

  ${({ $clickable }) =>
    $clickable &&
    `
    cursor: pointer; 
    transition: 0.5s;
    border: 1px solid #EBF479;
    position: relative;
    &::before{
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      border-right: 1px solid #EBF479;
      background-color: #000000;
      top: -7px;
      left: -7px;
      transform: rotate(45deg);
    }
    &::after{
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      border-left: 1px solid #EBF479;
      background-color: #000000;
      bottom: -7px;
      right: -7px;
      transform: rotate(45deg);
    }
    &:hover{
      background-color: #EBF479;
      color: #1E202F;
    };
    &:active{
     opacity: 0.9;
    }
    `}
`;
