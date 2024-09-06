import styled from 'styled-components';

export const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  &.display {
    display: block;
  }
`;
export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  z-index: 8000;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    align-items: flex-end;
  }
`;
export const Content = styled.div`
  background-color: var(--agg-secondary-color, #273046);
  border: 1px solid var(--agg-primary-color, transparent);
  border-radius: 16px;
  width: 396px;
  @media (max-width: 640px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--agg-primary-color, #fff);
  display: flex;
  align-items: center;
`;
export const Apy = styled.span`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 400;
  color: var(--agg-primary-color, #fff);
  &.supply-color {
    color: var(--supply-color);
  }
  &.borrow-color {
    color: var(--borrow-color);
  }
`;
export const StyledCloseIcon = styled.div`
  color: #979abe;
`;
export const AssetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
export const Token = styled.div`
  display: flex;
  flex-shrink: 0;
`;
export const TokenLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 4px;
`;
export const TokenSymbol = styled.div`
  font-size: 16px;
  color: var(--agg-primary-color, #fff);
  font-weight: 400;
`;
export const InputWrapper = styled.div`
  height: 55px;
  border-radius: 10px;
  background-color: var(--agg-secondary-color, rgba(22, 24, 38, 0.5));
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0px 10px;
  border: 1px solid var(--agg-primary-color, transparent);
`;
export const Input = styled.input`
  font-size: 18px;
  color: var(--agg-primary-color, #fff);
  font-weight: 500;
  background-color: transparent;
  outline: none;
  border: none;
  height: 22px;
  vertical-align: bottom;
  flex-grow: 1;

  &::placeholder {
    color: #979abe;
  }
`;
export const InputBalance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: #979abe;
  margin-top: 4px;
  margin-bottom: 10px;
`;
export const BalanceValue = styled.div``;
export const BalanceWrapper = styled.div`
  text-align: right;
  cursor: pointer;
`;
export const Balance = styled.span`
  font-weight: 400;
  text-decoration: underline;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  font-size: 16px;
  font-weight: 400;
  &.justfiy-start {
    justify-content: flex-start;
    gap: 10px;
  }
`;
export const Label = styled.div`
  color: #979abe;
`;
export const Value = styled.div`
  color: var(--agg-primary-color, #fff);
  text-align: right;
  &.range {
    text-decoration: line-through;
  }
`;
export const Tips = styled.div`
  height: 28px;
  border-radius: 6px;
  background-color: var(--switch-color);
  display: flex;
  align-items: center;
  color: var(--agg-primary-color, #fff);
  padding: 0px 20px;
  margin-top: 10px;
  .icon {
    margin-right: 4px;
    flex-shrink: 0;
    margin-top: -1px;
  }
`;
export const ValuesWrapper = styled.div`
  display: flex;
  align-items: center;
  .mx_5 {
    margin: 0px 5px;
  }
`;
export const CollateralToken = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: var(--agg-primary-color, #fff);
  display: flex;
  gap: 4px;
  padding-top: 20px;
`;
export const AssetLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #979abe;
`;
export const Dapp = styled.div`
  padding: 0px 6px;
  height: 26px;
  border-radius: 6px;
  background-color: rgba(151, 154, 190, 0.2);
  gap: 6px;
  display: flex;
  align-items: center;
  padding: 10px;
`;
export const DappIcon = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
export const DappName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--agg-primary-color, #fff);
`;
export const TokenSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--agg-primary-color, #fff);
`;
export const TopBox = styled.div`
  padding: 30px 20px 10px;
  border-bottom: 1px dashed #454967;

  &.none-border {
    border-bottom: none;
  }
`;
export const BottomBox = styled.div`
  padding: 10px 20px 20px;
`;
export const RewardApyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
`;
export const RewardIcon = styled.img`
  width: 14px;
  height: 14px;
`;
export const RewardApy = styled.div`
  font-weight: 400;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`;
