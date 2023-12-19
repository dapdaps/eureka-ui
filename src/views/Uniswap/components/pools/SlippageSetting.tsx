import { useState } from 'react';
import styled from 'styled-components';

import { useSettingsStore } from '@/stores/settings';

const Layer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;
const StyledContainer = styled.div`
  width: 280px;
  height: 129px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background-color: #ffffff;
  padding: 20px;
  position: absolute;
  z-index: 20;
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #101010;
`;
const Inputs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;
const SlippageActions = styled.div`
  background-color: #ffe6c7;
  border-radius: 12px;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
`;
const SlippageAction = styled.div`
  padding: 6px;
  border-radius: 10px;
  color: #101010;
  cursor: pointer;
  height: 36px;
  box-sizing: border-box;
  &.active {
    background-color: #ffffff;
  }
`;
const InputWrapper = styled.div`
  width: 103px;
  height: 45px;
  border-radius: 12px;
  border: 1px solid #473935;
  background-color: #fff;
  color: #101010;
  display: flex;
  gap: 5px;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  line-height: 44px;
  padding-left: 20px;
  background-color: transparent;
  outline: none;
  width: 68px;
  color: #fff;
  text-align: center;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const TYPES = ['Auto', 'Custom'];

export default function SlippageSetting(props?: any) {
  const settingStore: any = useSettingsStore();
  const [type, setType] = useState(settingStore.getSlippage() ? 'Custom' : 'Auto');
  return (
    <>
      <Layer
        onClick={() => {
          props.onClose?.();
        }}
      />
      <StyledContainer
        style={{
          left: props.clientX - 270 + 'px',
          top: props.clientY - 54 + 'px',
        }}
      >
        <Label>Slippage Setting</Label>
        <Inputs>
          <SlippageActions>
            {TYPES.map((_type) => (
              <SlippageAction
                key={_type}
                className={_type === type ? 'active' : ''}
                onClick={() => {
                  setType(_type);
                  settingStore.setSlippage(_type === 'Auto' ? '' : '0.5');
                }}
              >
                {_type}
              </SlippageAction>
            ))}
          </SlippageActions>
          <InputWrapper>
            <Input
              placeholder="0.5"
              value={settingStore.getSlippage()}
              onChange={(ev) => {
                settingStore.setSlippage(ev.target.value);
                setType(Number(ev.target.value) !== 0.5 ? 'Custom' : 'Auto');
              }}
              type="number"
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
            <div style={{ fontWeight: 500 }}>%</div>
          </InputWrapper>
        </Inputs>
      </StyledContainer>
    </>
  );
}
