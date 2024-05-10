import type { ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  flex: 1;
  width: 0;
`;

type PropsType = {
  amount: number | string;
  disabled?: boolean;
  onAmountChange: (amount: number | string) => void;
}

const CurrencyInput = (props: PropsType) => {
  const { amount, disabled, onAmountChange } = props;
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(ev.target.value))) return;
    onAmountChange?.(ev.target.value.replace(/\s+/g, ''));
  };
  return (
    <StyledInput value={amount} disabled={disabled} onChange={handleInputChange} />
  );
};

export default CurrencyInput;
