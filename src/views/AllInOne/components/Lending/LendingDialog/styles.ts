import styled from 'styled-components';

const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  z-index: 2;
  &.display {
    display: block;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 8000;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    align-items: flex-end;
  }
`;
const Content = styled.div`
  border-radius: 16px;
  border: 1px #373a53;
  background: #262836;
  width: 420px;
  @media (max-width: 640px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
const Apy = styled.span`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  &.supply-color {
    color: var(--supply-color);
  }
  &.borrow-color {
    color: var(--borrow-color);
  }
`;
const CloseIcon = styled.div`
  color: #979abe;
`;
const AssetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
const Token = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
`;
const TokenLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 4px;
`;
const TokenSymbol = styled.div`
  font-size: 14px;
  color: #fff;
`;
const InputWrapper = styled.div`
  height: 50px;
  border-radius: 8px;
  border: 1px solid #33364b;
  background: #1b1e27;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-top: 20px;
`;
export const BoxItem = styled.div`
  border-radius: 10px;
  background-color: #1b1e27;
  border: 1px solid #33364b;
  padding: 12px;
  margin-bottom: 12px;

  &.no-bg {
    background-color: transparent;
    border: 1px solid #373a53;
  }
`;

export const InputFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
  font-size: 12px;
  color: #979abe;
`;

export const InputMain = styled(InputFoot)`
  margin-bottom: 8px;
`;
const Input = styled.input`
  font-size: 18px;
  color: #fff;
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
const InputBalance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: #979abe;
  padding: 6px 13px 10px 13px;
`;
const BalanceValue = styled.div``;
const BalanceWrapper = styled.div`
  text-align: right;
  cursor: pointer;
`;

const Balance = styled.span`
  font-weight: 400;
  text-decoration: underline;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
  &.justfiy-start {
    justify-content: flex-start;
    gap: 10px;
  }
  &:not(&:last-child) {
    margin-bottom: 16px;
  }
`;
const Label = styled.span`
  color: #979abe;
`;
const Value = styled.div`
  color: #fff;
  text-align: right;
  &.range {
    text-decoration: line-through;
    color: #979abe;
  }
`;
const Tips = styled.div`
  border-radius: 8px;
  background: rgba(235, 244, 121, 0.1);
  color: #ebf479;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  font-size: 14px;

  .icon {
    margin-right: 6px;
    flex-shrink: 0;
    margin-top: 4px;
  }
`;
const ValuesWrapper = styled.div`
  display: flex;
  align-items: center;
  .mx_5 {
    margin: 0 12px;
  }
`;
const CollateralToken = styled.div`
  font-size: 16px;
  font-weight: 400;
  display: flex;
  gap: 4px;
  align-items: center;
  color: #979abe;
`;
const AssetLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #979abe;
`;
const Dapp = styled.div`
  height: 26px;
  border-radius: 6px;
  background-color: rgba(151, 154, 190, 0.2);
  gap: 6px;
  display: flex;
  align-items: center;
  padding: 10px;
`;
const DappIcon = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
const DappName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;
const TokenSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
`;
const TopBox = styled.div`
  margin-bottom: 10px;
`;
const BottomBox = styled.div``;

const YourTopBox = styled.div`
  border-bottom: 1px dashed #454967;
  padding: 23px 23px 20px 23px;

  &.none-border {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const YourBottomBox = styled.div`
  padding: 23px;
`;

const RewardApyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
`;
const RewardIcon = styled.img`
  width: 14px;
  height: 14px;
`;
const RewardApy = styled.div`
  font-weight: 400;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
`;

const CollateralContent = styled.div`
  padding: 0 30px 30px;
`;

const LendingButton = styled.div`
  padding-top: 6px;
`;

export {
  Dialog,
  Overlay,
  Content,
  Header,
  Title,
  Apy,
  CloseIcon,
  AssetWrapper,
  Token,
  TokenLogo,
  TokenSymbol,
  InputWrapper,
  Input,
  InputBalance,
  BalanceValue,
  BalanceWrapper,
  Balance,
  Row,
  Label,
  Value,
  Tips,
  ValuesWrapper,
  CollateralToken,
  AssetLabel,
  Dapp,
  DappIcon,
  DappName,
  TokenSelect,
  TopBox,
  BottomBox,
  YourTopBox,
  YourBottomBox,
  RewardApyItem,
  RewardIcon,
  RewardApy,
  CollateralContent,
  LendingButton
};
