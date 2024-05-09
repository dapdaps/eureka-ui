import type { ChangeEvent } from "react";

type PropsType = {
  amount: number | string;
  disabled?: boolean;
  onAmountChange: (amount: number | string) => void;
}
const CurrencyInput = (props: PropsType) => {
  const { amount, disabled,  onAmountChange} = props;
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(ev.target.value))) return;
    onAmountChange?.(ev.target.value.replace(/\s+/g, ""));
  }
  return (
    <input value={amount} disabled={disabled} onChange={handleInputChange}/>
  )
}

export default CurrencyInput;