// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
const StyledSlippage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledSlippageL = styled.div`
  position: relative;
`;
const StyledSlippageLBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
const StyledSlippageTxt = styled.div`
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledSlippageR = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledMaxSlippageCover = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;
const StyledMaxSlippageContainer = styled.div`
  position: absolute;
  top: -6px;
  right: -10px;
  transform: translateX(100%);
  width: 173px;
  height: 91px;
  flex-shrink: 0;
  padding: 13px 16px;
  border-radius: 8px;
  border: 1px solid #454968;
  background: #313447;
  z-index: 9999;
`;
const StyledMaxSlippageTop = styled.div`
  margin-bottom: 18px;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledMaxSlippageBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledMaxSlippageAutoButton = styled.div`
  width: 42px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #454968;
  background: #313447;
  cursor: pointer;
  color: #979abe;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledMaxSlippageInputContainer = styled.div`
  width: 85px;
  height: 30px;
  flex-shrink: 0;
  padding: 7px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #373a53;
  background: #1b1e27;

  &.error {
    background: rgb(153, 27, 27);
    border-color: rgb(220, 38, 38);
  }
`;
const StyledMaxSlippagePercentage = styled.div`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledMaxSlippageInput = styled.input`
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default memo(function Slippage(props: any) {
  const { value, onChange } = props;

  const [state, updateState] = useMultiState({
    visible: false,
    value: value
  });

  const { visible } = state;

  const formatValue = (_value) => {
    if (isNaN(Number(_value))) return 0;
    let val = _value.replace(/\s+/g, '');
    if (Big(val).gt(50)) {
      val = 50;
    }
    if (Big(val).lt(0.01)) {
      val = 0.01;
    }
    return Big(val).toFixed(2);
  };

  const handleChange = (ev) => {
    updateState({
      value: ev.target.value
    });
  };

  const handleBlur = (ev) => {
    onChange(formatValue(ev.target.value));
  };

  const handleVisible = (_visible) => {
    updateState({
      visible: _visible
    });
  };

  const handleAuto = () => {
    onChange(formatValue('50'));
  };
  useEffect(() => {
    updateState({
      value: value
    });
  }, [value]);

  return (
    <StyledSlippage>
      <StyledSlippageL>
        <StyledSlippageLBox onClick={() => handleVisible(true)}>
          <StyledSlippageTxt>Slippage</StyledSlippageTxt>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
            <path
              d="M5.5781 0.172943C5.77394 0.059646 5.99609 0 6.22222 0C6.44836 0 6.67051 0.059646 6.86634 0.172943L11.8003 3.02769C11.9962 3.14098 12.1588 3.30393 12.2718 3.50016C12.3849 3.69639 12.4444 3.91899 12.4444 4.14558V9.85442C12.4444 10.081 12.3849 10.3036 12.2718 10.4998C12.1588 10.6961 11.9962 10.859 11.8003 10.9723L6.86634 13.8271C6.67051 13.9404 6.44836 14 6.22222 14C5.99609 14 5.77394 13.9404 5.5781 13.8271L0.644122 10.9723C0.448289 10.859 0.285667 10.6961 0.1726 10.4998C0.0595335 10.3036 5.74368e-06 10.081 0 9.85442V4.14558C5.74368e-06 3.91899 0.0595335 3.69639 0.1726 3.50016C0.285667 3.30393 0.448289 3.14098 0.644122 3.02769L5.5781 0.172943ZM6.22222 1.29083L1.28824 4.14558V9.85442L6.22222 12.7092L11.1562 9.85442V4.14558L6.22222 1.29083ZM6.22222 4.41827C6.90555 4.41827 7.56089 4.69027 8.04408 5.17444C8.52726 5.65861 8.79871 6.31528 8.79871 7C8.79871 7.68472 8.52726 8.34139 8.04408 8.82556C7.56089 9.30973 6.90555 9.58173 6.22222 9.58173C5.5389 9.58173 4.88355 9.30973 4.40037 8.82556C3.91718 8.34139 3.64573 7.68472 3.64573 7C3.64573 6.31528 3.91718 5.65861 4.40037 5.17444C4.88355 4.69027 5.5389 4.41827 6.22222 4.41827ZM6.22222 5.70914C6.05305 5.70914 5.88553 5.74253 5.72923 5.8074C5.57294 5.87227 5.43092 5.96735 5.3113 6.08722C5.19167 6.20709 5.09678 6.34939 5.03204 6.50601C4.9673 6.66262 4.93398 6.83048 4.93398 7C4.93398 7.16952 4.9673 7.33738 5.03204 7.49399C5.09678 7.65061 5.19167 7.79291 5.3113 7.91278C5.43092 8.03265 5.57294 8.12773 5.72923 8.1926C5.88553 8.25748 6.05305 8.29086 6.22222 8.29086C6.56389 8.29086 6.89156 8.15486 7.13315 7.91278C7.37474 7.6707 7.51047 7.34236 7.51047 7C7.51047 6.65764 7.37474 6.32931 7.13315 6.08722C6.89156 5.84514 6.56389 5.70914 6.22222 5.70914Z"
              fill="#979ABE"
            />
          </svg>
        </StyledSlippageLBox>
        {visible && (
          <>
            <StyledMaxSlippageContainer>
              <StyledMaxSlippageTop>Max. Slippage</StyledMaxSlippageTop>
              <StyledMaxSlippageBottom>
                <StyledMaxSlippageAutoButton onClick={handleAuto}>Auto</StyledMaxSlippageAutoButton>
                <StyledMaxSlippageInputContainer>
                  <StyledMaxSlippageInput
                    type="number"
                    value={state.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <StyledMaxSlippagePercentage>%</StyledMaxSlippagePercentage>
                </StyledMaxSlippageInputContainer>
              </StyledMaxSlippageBottom>
            </StyledMaxSlippageContainer>
            <StyledMaxSlippageCover onClick={() => handleVisible(false)} />
          </>
        )}
      </StyledSlippageL>
      <StyledSlippageR>{state.value}%</StyledSlippageR>
    </StyledSlippage>
  );
});
