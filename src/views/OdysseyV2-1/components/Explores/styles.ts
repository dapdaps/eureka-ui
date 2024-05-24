import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledContent = styled.div`
  margin: 47px auto 100px;
  width: 1188px;
`;

export const StyledItemWrap = styled.div<{ show: boolean }>`
  padding-top: 20px;
  position: relative;
  z-index: 1;
  &:before {
    display: ${(props) => props.show ? 'block' : 'none'};
    content: '';
    width: 480px;
    height: 480px;
    opacity: 0.3;
    position: absolute;
    top: -106px;
    left: -100px;
    background: radial-gradient(50% 50% at 50% 50%, #33C5F4 0%, rgba(51, 197, 244, 0.00) 100%);
    filter: blur(50px);
  }
`;

export const StyledItem = styled.div<{ $disabled: boolean }>`
  height: 70px;
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #1e2028;
  box-sizing: border-box;
  padding: 14px 28px 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  margin-bottom: 16px;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    content: '';
    background: url('/images/odyssey/v2-1/explore-mask.svg') center no-repeat;
    background-size: contain;
    width: 395px;
    height: 70px;
  }
`;

export const StyledItemTitle = styled.div`
  flex-shrink: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
`;

export const StyledItemLeft = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
`;

export const StyledItemRight = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const Unexplored = styled.div`
  color: #979abe;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledTitle = styled.div`
  background: linear-gradient(180deg, #FFF 39.2%, #33C5F4 80%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: Trans-America;
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
`;

export const StyledSubTitle = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  `;

export const StyledItemShadow = styled.div`
  .item-mask {
    position: absolute;
    top: 50%;
    right: -6px;
    transform: translateY(-50%);
    z-index: 0;
  }
`;

export const StyledTitleBox = styled.div`
  background: url('/images/odyssey/v2-1/explore-box.svg');
  width: 165px;
  height: 166px;
  background-size: contain;
  position: absolute;
  top: 0;
  right: 0;
`;

export const StyledArrowIcon = styled.div`
  color: #fff;
  transform: rotate(-90deg);
`;
