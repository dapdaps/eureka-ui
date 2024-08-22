import { memo } from 'react';

import {
  StyledContainer,
  StyledInput,
  StyledInputBox,
  StyledLabel} from './styles';

const StartingPrice = ({ price, setPrice, token0, token1 }: any) => {
  return (
    <StyledContainer>
      <StyledLabel>Starting {token0?.symbol} Price:</StyledLabel>
      <StyledInputBox>
        <StyledInput
          placeholder="0"
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          value={price}
          onChange={(ev) => {
            if (isNaN(Number(ev.target.value))) return;
            setPrice(ev.target.value);
          }}
        />
        <StyledLabel>
          {token1?.symbol} per {token0?.symbol}
        </StyledLabel>
      </StyledInputBox>
    </StyledContainer>
  );
};

export default memo(StartingPrice);
