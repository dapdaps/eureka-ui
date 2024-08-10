import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding-top: 20px;
  width: 1244px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-family: Montserrat;
`;

export const StyledItem = styled.div<{ $bgColor: string; $color: string; $key: string; }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #333648;
  background: #18191e;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  opacity: 0.8;
  transition: all linear 0.2s;
  
  ${({ $key, $bgColor, $color }) => {
    const styles: any = {
      cursor: 'pointer',
    };
    if ($key === 'Chain-Navi') {
      styles.width = '420px';
      styles.border = 'none';
      styles.background = $bgColor;
      styles.color = $color;
    } else {
      styles.flex = 1;
    }
    return styles;
  }};

  &:hover {
    opacity: 1;
  }
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
