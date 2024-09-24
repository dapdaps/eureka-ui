// @ts-nocheck
import Big from 'big.js';
import { memo } from 'react';
import styled from 'styled-components';

import CheckAllowance from '@/modules/lending/components/CompoundV3/CheckAllowance';

import CloseIcon from './CloseIcon';
import V2Button from './V2Button';
const Dialog = styled.div`
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
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 8000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(33, 35, 42, 0.6);
  @media (max-width: 640px) {
    align-items: flex-end;
  }
`;
const Content = styled.div`
  background-color: #3d4159;
  border-radius: 16px;
  width: 396px;
  padding: 20px;
  @media (max-width: 640px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
  .button {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: center;
`;
const InputWrapper = styled.div`
  height: 55px;
  border-radius: 10px;
  background-color: rgba(22, 24, 38, 0.5);
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0px 10px;
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
  margin-top: 4px;
  margin-bottom: 10px;
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
const TokenSymbol = styled.div`
  font-size: 16px;
  color: #fff;
  font-weight: 400;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledCloseIcon = styled.div`
  color: #979abe;
`;
export default memo(function StakeOrWithdraw(props) {
  const { title, id, display, token0, token1, price, balance, account, handler, toast, dexConfig, onClose, onSuccess } =
    props;

  const formatBalance = (_balance) => {
    if (!_balance) return '-';
    if (Big(_balance).eq(0)) return '0';
    if (Big(_balance).lt(0.0001)) return '<0.0001';
    return Big(_balance).toFixed(4, 0);
  };

  return (
    <Dialog className={display ? 'display' : ''}>
      <Overlay
        onClick={() => {
          onClose();
        }}
      >
        <Content
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
          <Header>
            <Title>{title}</Title>
            <StyledCloseIcon>
              <CloseIcon
                {...{
                  onClose,
                  size: 18
                }}
              />
            </StyledCloseIcon>
          </Header>
          <InputWrapper>
            <Input
              value={state.amount || ''}
              onChange={(ev) => {
                if (isNaN(Number(ev.target.value))) return;
                updateState({
                  amount: ev.target.value
                });
              }}
              placeholder="0.0"
            />
            <TokenSymbol>
              {token0.symbol}-{token1.symbol}
            </TokenSymbol>
          </InputWrapper>
          <InputBalance>
            <BalanceValue>
              ≈ $
              {state.amount
                ? Big(state.amount)
                    .mul(price || 0)
                    .toFixed(2)
                : '-'}
            </BalanceValue>
            <BalanceWrapper
              onClick={(ev) => {
                if (isNaN(balance)) return;

                updateState({
                  amount: balance
                });
              }}
            >
              Available
              <Balance>{formatBalance(balance)}</Balance>
            </BalanceWrapper>
          </InputBalance>
          <V2Button
            {...{
              amount: state.amount,
              title,
              account,
              id,
              symbol: `${token0.symbol}-${token1.symbol}`,
              price,
              handler,
              handleApprove: state.handleApprove,
              checkAllowance: state.checkAllowance,
              onSuccess: () => {
                onClose();
                onSuccess();
              },
              onError: () => {}
            }}
          />
          <CheckAllowance
            {...{
              account,
              spender: dexConfig.v2Address,
              token: {
                address: id,
                decimals: 18,
                symbol: `${token0.symbol}/${token1.symbol}`
              },
              toast,
              onLoad: (data) => {
                updateState({ ...data });
              }
            }}
          />
        </Content>
      </Overlay>
    </Dialog>
  );
});
