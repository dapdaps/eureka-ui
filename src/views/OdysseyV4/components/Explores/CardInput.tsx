import { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 340px;
  height: 48px;
  padding-right: 5px;
  border-radius: 6px;
  border: 1px solid #3d405a;
  background: #171717;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 8px 14px;
  flex-grow: 1;
  box-sizing: border-box;
  color: #fff;
`;

const StyledButton = styled.button`
  width: 84px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: #ebf479;
  color: #000;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  transition: 0.3s;
  &:not(:disabled):hover {
    opacity: 0.9;
  }
  &:not(:disabled):active {
    opacity: 0.8;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

export default function CardInput({ onConfirm }: any) {
  const [val, setVal] = useState();
  return (
    <StyledContainer>
      <StyledInput
        onChange={(ev: any) => {
          setVal(ev.target.value);
        }}
      />
      <StyledButton
        disabled={!val}
        onClick={(ev) => {
          ev.stopPropagation();
          onConfirm(val);
        }}
      >
        Confirm
      </StyledButton>
    </StyledContainer>
  );
}
