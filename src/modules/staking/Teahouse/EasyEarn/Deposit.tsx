import { useEffect, useState } from 'react';

import Modal from '@/components/Modal';
import Button from '@/modules/staking/Teahouse/EasyEarn/Button';
import Chains from '@/modules/staking/Teahouse/EasyEarn/Chains';
import Input from '@/modules/staking/Teahouse/EasyEarn/Input';

const DepositModal = (props: Props) => {
  const { visible, data, onClose } = props;

  const { chainList, icon, symbol } = data;

  const [currentChain, setCurrentChain] = useState();
  const [amount, setAmount] = useState('');

  const handleCurrentChain = (chain: any) => {
    setCurrentChain(chain);
  };

  useEffect(() => {
    if (!visible) return;
    setCurrentChain(chainList[0]);
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      display={visible}
      title={`Deposit ${symbol}`}
      width={500}
      onClose={onClose}
      portal={true}
      headerStyle={{
        paddingLeft: 20,
        paddingRight: 20
      }}
      content={
        <div className="py-[20px]">
          <div className="px-[20px]">
            <div className="text-[16px] text-white font-[500]">Select chain</div>
            <Chains selected={currentChain} onSelect={handleCurrentChain} list={chainList} />
            <div className="text-[16px] text-white font-[500] mt-[30px] mb-[12px]">Deposit</div>
            <Input
              amount={amount}
              data={data}
              onAmountChange={(value: string) => {
                setAmount(value);
              }}
            />
            <div className="flex flex-col items-stretch gap-[12px] mt-[20px]">
              <Button>Approve</Button>
              <Button disabled>Deposit</Button>
            </div>
          </div>
          <div className="relative w-full h-[1px] bg-[#373A53] mt-[34px]">
            <svg
              className="absolute top-[-21px] left-[50%] translate-x-[-50%]"
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
            >
              <rect x="2" y="2" width="38" height="38" rx="10" fill="#2E3142" stroke="#262836" strokeWidth="4" />
              <path
                d="M21.4999 15.5V26M21.4999 26L16 20.5M21.4999 26L27 20.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="px-[20px] mt-[21px] flex justify-between items-center">
            <div className="text-[#979ABE] text-[16px] font-[500] underline decoration-dashed leading-[20px]">
              Pending
            </div>
            <div className="flex justify-end items-center gap-[6px]">
              <img src={icon} alt="" className="w-[20px] h-[20px] rounded-full" />
              <span className="text-white text-[14px] font-[400]">0</span>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default DepositModal;

interface Props {
  visible: boolean;
  data: any;

  onClose(): void;
}
