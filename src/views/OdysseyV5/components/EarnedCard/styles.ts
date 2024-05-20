import { styled } from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
  background: #1A1A1A;
  border-radius: 16px;
  padding: 46px 34px 34px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 17px;
  transition: all .3s linear;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
export const StyledHead = styled.div``;
export const StyledContent = styled.div`
  flex: 1;
`;
export const StyledFoot = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 14px;
`;
export const StyledTitle = styled.div`
  font-size: 26px;
  font-weight: 500;
  line-height: 31px;
  text-align: center;
  color: ${() => 'var(--odyssey-primary-color)'};
`;
export const StyledIcon = styled.div<{ borderColor?: string }>`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: ${({ borderColor }) => `3px solid ${borderColor || '#1A1A1A'}`};
  background: ${({ borderColor }) => `${borderColor || '#1A1A1A'}`};
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  top: -30px;
  overflow: hidden;
`;
export const StyledBtn = styled.button`
  flex: 1;
  width: 0;
  height: 56px;
  line-height: 56px;
  border-radius: 6px;
  text-align: center;
  background: ${() => 'var(--odyssey-primary-color)'};
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  padding: 0 15px;
  transition: all .3s linear;
  
  &:hover {
    filter: brightness(0.85);
  }
`;
export const StyledReloadBtn = styled.button`
  flex-basis: 36px;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  line-height: 34px;
  text-align: center;
  border: 1px solid #363940;
  flex-shrink: 0;
  flex-grow: 0;
  background: none;
`;
