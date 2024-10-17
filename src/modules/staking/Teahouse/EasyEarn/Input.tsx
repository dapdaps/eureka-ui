const Input = (props: Props) => {
  const { amount, data, onAmountChange } = props;

  const handleChange = (ev: any) => {
    if (isNaN(Number(ev.target.value))) {
      return;
    }
    const _amount = ev.target.value.replace(/\s+/g, '');
    onAmountChange(_amount);
  };

  const handleBalance = () => {};

  return (
    <div className="h-[72px] rounded-[10px] border border-[#373A53!important] bg-[#2E3142] p-[12px_14px]">
      <div className="flex justify-between items-center">
        <input
          value={amount}
          type="text"
          className="flex-1 border-[0] text-white text-[20px] font-[500]"
          placeholder="0.00"
          onChange={handleChange}
        />
        <div className="flex-grow-0 flex justify-end items-center gap-[6px]">
          <img src={data.icon} alt="" className="w-[20px] h-[20px] rounded-full" />
          <span className="text-[16px] text-white font-[500]">{data.symbol}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-[#979ABE] text-[12px] font-[400]">$100.00</div>
        <div className="text-[#979ABE] text-[12px] font-[400]">
          <span>Balance: </span>
          <span className="underline text-white" onClick={handleBalance}>
            234.35
          </span>
        </div>
      </div>
    </div>
  );
};

export default Input;

interface Props {
  amount: string;
  data: any;
  onAmountChange(amount: string): void;
}
