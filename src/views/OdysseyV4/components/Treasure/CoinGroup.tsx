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
    &:hover{
      color: rgba(235, 244, 121,0.8);
    };
    &:active{
      color: rgba(235, 244, 121,0.6);
    }
    `}
`;
