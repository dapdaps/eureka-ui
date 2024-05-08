const CurrencyInput = (props) => {
  const { amount, disabled,  onAmountChange} = props;
  const handleInputChange = (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    onAmountChange?.(ev.target.value.replace(/\s+/g, ""));
  }
  return <input value={amount} disabled={disabled} onChange={handleInputChange}/>
}

export default CurrencyInput;