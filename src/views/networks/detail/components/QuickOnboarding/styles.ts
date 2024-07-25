import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 20px;
  width: 1244px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledItem = styled.div<{ $active: boolean; $bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: ${(props) => (props.$active ? '420px' : '260px')};
  height: 60px;
  border-radius: 10px;
  border: ${(props) => (props.$active ? 'none' : '1px solid #333648')};
  background: ${(props) => (props.$active ? props.$bgColor : '#18191e')};
  color: ${(props) => (props.$active ? '#02051E' : '#fff')};
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 10px;
  opacity: 0.8;
  cursor: pointer;
`;

export const StyledItemBg = styled.div`
  background-image: url(/images/onboarding/card_bg.png);
  background-repeat: no-repeat;
  z-index: 1;
  opacity: 0.1;
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 160px;
  height: 160px;
`;

export const StyledItemColorBg = styled.div`
  position: absolute;
  left: 10px;
  top: 0px;
  z-index: 2;
  width: 223px;
  height: 72px;
`;

export const StyledItemComing = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
`;
