import { memo } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div<{ $error: boolean }>`
  margin-top: 19px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid ${({ $error }) => ($error ? '#FF547D' : '#373a53')};
  background: #2e3142;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const StyledInputWrapper = styled.div`
  flex-grow: 1;
`;

const StyledInput = styled.input`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  width: 100%;

  &::placeholder {
    color: #979abe;
    opacity: 0.5;
  }
`;

const StyledPaste = styled.div`
  color: #979abe;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const Address = ({ isAddressCorrect, to, address, onAddressChange }: any) => {
  return (
    <StyledContainer $error={!isAddressCorrect}>
      <StyledInputWrapper>
        <StyledInput
          value={address}
          placeholder={`Receiving Wallet ${to.displayName} Address`}
          onChange={(ev) => {
            onAddressChange(ev.target.value);
          }}
        />
      </StyledInputWrapper>
      <StyledPaste
        onClick={async () => {
          const text = await navigator.clipboard.readText();
          if (text) {
            onAddressChange(text);
          }
        }}
      >
        Paste
      </StyledPaste>
    </StyledContainer>
  );
};

export default memo(Address);
