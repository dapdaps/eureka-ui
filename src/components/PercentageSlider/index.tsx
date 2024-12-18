import * as Slider from '@radix-ui/react-slider';
import Big from 'big.js';
import { useEffect, useState } from 'react';

import { balanceFormated } from '@/utils/balance';

interface PercentageSliderProps {
  balance: string;
  amount: string;
  currency: {
    decimals: number;
  };
  onAmountChange: (amount: string) => void;
}

const isValidNumber = (value: string) => {
  return value && !isNaN(Number(value)) && Number(value) > 0;
};

const PercentageSlider = ({ balance, amount, currency, onAmountChange }: PercentageSliderProps) => {
  const [percent, setPercent] = useState(0);

  const handlePercentChange = (newPercent: number) => {
    if (!isValidNumber(balance)) return;

    setPercent(newPercent);
    const newAmount = Big(balance).times(newPercent).div(100);
    onAmountChange(balanceFormated(newAmount.toFixed(currency?.decimals), currency?.decimals));
  };

  useEffect(() => {
    if (!isValidNumber(balance) || !isValidNumber(amount)) {
      setPercent(0);
      return;
    }
    const currentPercent = Big(amount).div(balance).times(100);
    setPercent(Number(currentPercent.toFixed(0)));
  }, [amount, balance]);

  return (
    <div className="flex justify-between text-white mt-2 items-center">
      <div>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-[230px] cursor-pointer"
          value={[percent]}
          min={0}
          max={100}
          aria-label="Amount Percentage"
          onValueChange={(values) => handlePercentChange(values[0])}
        >
          <Slider.Track className="relative flex-grow h-2 bg-[#1B1E27] border border-[#373A53] rounded-xl">
            <Slider.Range className="absolute bg-[#979ABE] rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-3.5 h-3.5 bg-[#979ABE] rounded-lg border border-black focus:outline-none" />
        </Slider.Root>
      </div>
      <div className="flex items-center gap-1">
        {[25, 50, 75, 100].map((value) => (
          <div
            key={value}
            className={`w-[48px] h-[22px] text-[14px] text-center leading-[22px] border border-[#373A53] 
              ${percent === value ? 'bg-[#373A53] text-white' : 'bg-[#2E3142] text-[#979ABE]'}
              rounded cursor-pointer`}
            onClick={() => handlePercentChange(value)}
          >
            {value}%
          </div>
        ))}
      </div>
    </div>
  );
};

export default PercentageSlider;
