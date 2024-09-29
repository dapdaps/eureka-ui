import styled from 'styled-components';
export const StyledMedalCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 401px;
  height: 150px;
  padding: 26px 12px 20px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
`;
export const StyledMedalImage = styled.img`
  width: 78px;
  &.disabled {
    /* transform: translateX(-100vw); */
    filter: sepia(1) hue-rotate(210deg) saturate(0.5);
    opacity: 0.5;
  }
`;
export const StyledMark = styled.div`
  position: absolute;
  right: 20px;
  top: 0;
  /* width: 52px; */
  padding: 0 8.2px 0 11px;
  height: 26px;
  flex-shrink: 0;
  background-color: #222430;
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const StyledSpecifiedContainer = styled.div`
  border-radius: 16px;
  border: 3px solid rgba(87, 219, 100, 0.2);
`;
export const StyledSpecified = styled.div`
  width: 92px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid #6c00f6;
  background: rgba(32, 34, 47, 0.8);

  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledAmaInputContainer = styled.div`
  margin-top: 6px;
  position: relative;
`;
export const StyledAmaInput = styled.input<{ $error: boolean }>`
  padding: 0;
  width: 100%;
  display: block;
  color: #fff;
  font-size: 14px;
  padding-left: 10px;
  color: ${(props) => (props.$error ? '#FF547D' : '#FFF')};
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.$error ? '#FF547D' : '#373A53')};

  line-height: 28px;
  &::placeholder {
    color: #979abe;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
export const StyledAmaConfirmButton = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  position: absolute;
  right: 0;
  top: 0;
  width: 78px;
  height: 100%;
  border-radius: 6px;
  background: #7371fc;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
`;
export const StyledStatus = styled.div<{ $expired: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 21px;
  top: 0;
  width: 73px;
  height: 26px;
  border-radius: 0 0 6px 6px;
  background-color: ${(props) => (props?.$expired ? '#3D405A' : '#7371FC')};
  font-size: 14px;
  font-family: 'Montserrat';
  color: ${(props) => (props?.$expired ? '#9DA0C2' : '#FFF')};
`;
