import styled from 'styled-components';

export const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
    z-index: 1000;

  &.display {
    display: block;
  }
`;
export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;
export const Content = styled.div`
  width: 460px;
  border-radius: 16px;
  border: 1px solid #2c334b;
  background-color: #181a27;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 30px 30px 0px 30px;
`;
export const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #332c4b;
  padding: 14px 30px 6px;
`;
export const Input = styled.input`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
`;
export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
export const CurrencyList = styled.div`
  padding: 0px 30px 20px;
  max-height: calc(60vh - 120px);
  overflow-x: auto;
  @media (max-width: 900px) {
    max-height: 50vh;
  }
`;
export const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #fff;
`;

export const CurrencyRow = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 10px 0px;
  border-radius: 16px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.active {
    background-color: #004bfc;
    pointer-events: none;
  }
`;

export const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
`;
export const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
`;
export const CurrencyName = styled.div`
  font-size: 14px;
  color: #fff;
`;
export const CurrencyIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 20px;
`;
export const CurrencyAmount = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
`;
