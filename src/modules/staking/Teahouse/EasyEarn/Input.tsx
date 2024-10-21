import Big from 'big.js';
import { useMemo } from 'react';

import Loading from '@/components/Icons/Loading';
import { usePriceStore } from '@/stores/price';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

const Input = (props: Props) => {
  const { amount, data, balance, balanceLoading, onAmountChange } = props;

  const prices = usePriceStore((store) => store.price);

  const amountUsd = useMemo(() => {
    if (!amount || Big(amount).lte(0)) return 0;
    return Big(amount).times(prices[data.symbol] || '1');
  }, [prices, amount]);

  const handleChange = (ev: any) => {
    if (isNaN(Number(ev.target.value))) {
      return;
    }
    const _amount = ev.target.value.replace(/\s+/g, '');
    onAmountChange(_amount);
  };

  const handleBalance = () => {
    handleChange({ target: { value: balance } });
  };

  return (
    <div className="h-[72px] rounded-[10px] border border-[#373A53!important] bg-[#2E3142] p-[12px_14px]">
      <div className="flex justify-between items-center">
        <input
          value={amount}
          type="text"
          className="flex-1 border-[0] text-white text-[20px] font-[500]"
          placeholder="0.00"
          onChange={handleChange}
          disabled={balanceLoading}
        />
        <div className="flex-grow-0 flex justify-end items-center gap-[6px]">
          <img src={data.icon} alt="" className="w-[20px] h-[20px] rounded-full" />
          <span className="text-[16px] text-white font-[500]">{data.symbol}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-[#979ABE] text-[12px] font-[400]">
          {formateValueWithThousandSeparatorAndFont(amountUsd, 2, true, { prefix: '$' })}
        </div>
        <div className="text-[#979ABE] text-[12px] font-[400] flex items-center gap-[4px]">
          <span>Balance: </span>
          {balanceLoading ? (
            <Loading size={12} />
          ) : (
            <span className="underline text-white cursor-pointer" onClick={handleBalance}>
              {formateValueWithThousandSeparatorAndFont(balance || 0, 2, true, { isZeroPrecision: true })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;

interface Props {
  amount: string;
  data: any;
  balance: string;
  balanceLoading?: boolean;
  onAmountChange(amount: string): void;
}
