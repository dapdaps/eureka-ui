// @ts-nocheck
import styled from 'styled-components';
export const StyledFont = styled.div`
  color: ${(props) => props.color || '#000'};
  font-family: ${(props) => props.fontFamily || 'Gantari'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || '400'};
  line-height: ${(props) => props.lineHeight || 'normal'};
  white-space: ${(props) => props.whiteSpace || 'normal'};
`;
export const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
`;
export const StyledDashedUndeline = styled.div`
  padding: 2px 0;
  border-bottom: 1px dashed #979abe;
`;

export const TitleText = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #ffffff;
  @media (max-width: 900px) {
    display: none;
  }
`;
export const ContainerLogin = styled.div`
  display: flex;
  max-width: 500px;

  flex-direction: column;
  margin: 80px auto auto auto;

  .web3-connect {
    width: 480px;
    height: 60px;
    border-radius: 10px;
    background-color: #fff;
    color: #0f1126;
    font-size: 18px;
    font-weight: 500;
    border: none;
    margin-top: 20px;
  }

  @media (max-width: 736px) {
    max-width: 100%;
    .web3-connect {
      width: 100%;

      font-size: 16px;
      height: 40px;
    }
  }
`;
// List
export const ListWrapper = styled.div`
  margin-top: 20px;
`;
export const SvgIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.icon-right {
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);

    &.rotate {
      transform: translateY(-50%) rotate(90deg);
    }
  }
`;
export const Table = styled.div``;
export const THead = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 30px;
`;
export const Th = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:first-of-type {
    width: 40%;
  }
  &:nth-of-type(2) {
    width: 10%;
  }
  &:nth-of-type(3) {
    width: 10%;
  }
  &:nth-of-type(4) {
    width: 10%;
  }
  &:nth-of-type(5) {
    width: 10%;
  }
  &:nth-of-type(6) {
    width: 10%;
  }
  &:nth-of-type(7) {
    width: 10%;
  }
`;
export const TBody = styled.div``;
export const TrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #373a53;
  margin-bottom: 8px;
  overflow: hidden;
`;
export const Tr = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 84px;
  background: #262836;
  padding: 0 24px;
`;
export const Td = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  &.column {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  &:first-of-type {
    width: 40%;
  }
  &:nth-of-type(2) {
    width: 10%;
  }
  &:nth-of-type(3) {
    width: 10%;
  }
  &:nth-of-type(4) {
    width: 10%;
  }
  &:nth-of-type(5) {
    width: 10%;
  }
  &:nth-of-type(6) {
    width: 10%;
  }
  &:nth-of-type(7) {
    width: 10%;
  }
`;
export const TdTxt = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &.gray {
    color: #979abe;
    font-size: 12px;
  }
`;
export const PoolPercentage = styled.div`
  padding: 3px 8px;
  border-radius: 24px;
  background: rgba(151, 154, 190, 0.1);
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StrategyTxt = styled.div`
  padding: 7px 10px;
  border-radius: 6px;
  background: rgba(151, 154, 190, 0.1);
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledVaultImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
`;
// Detail

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  &.price-input {
    width: 500px;
    margin: 0 auto 20px;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const DetailWrapper = styled.div`
  background: #262836;
`;
export const FilterButtonList = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #373a53;
  border-bottom: 1px solid #373a53;
`;
export const FilterButton = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 48px;
  border-left: 1px solid #373a53;
  border-right: 1px solid #373a53;
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  &:first-of-type {
    border-right: none;
  }
  &.isActive {
    color: #fff;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      bottom: -2px;
      height: 5px;
      flex-shrink: 0;
      background: #1362e4;
    }
  }
`;
export const InputWrapList = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const InputWrap = styled.div`
  position: relative;
  height: 46px;
  background: #33364b;
  border-radius: 12px;
  border: 1px solid #33364b;
  overflow: hidden;
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  input::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  &.inSufficient {
    border-color: #ff547d;
  }
`;
export const Input = styled.input`
  border: none;
  outline: none;
  background: #1b1e27;
  margin: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  font-family: Gantari;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  padding: 0 80px 0 10px;
  border-radius: 8px;
  border: 1px solid #33364b;
`;
export const InputSuffix = styled.div`
  position: absolute;
  top: 13px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  span {
    color: #fff;
    text-align: right;
    font-family: Gantari;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  img {
    width: 20px;
    border-radius: 50%;
  }
`;
export const StyledImageList = styled.div`
  display: flex;
  align-items: center;
`;
export const PriceWrap = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TotalPrice = styled.span`
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  opacity: 0.3;
`;
export const BalancePrice = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #979abe;
  text-align: right;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    color: #fff;
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

export const StyledButtonList = styled.div`
  width: 500px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;
export const StyledButton = styled.button`
  outline: none;
  border: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  border-radius: 8px;
  background-color: var(--button-color);
  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 16px;
  font-weight: 500;
  &[disabled] {
    opacity: 0.5 !important;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 1.5s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const StyledEmptyTips = styled.div`
  text-align: center;
  padding-top: 82px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
