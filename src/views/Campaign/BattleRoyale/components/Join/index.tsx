import IconFlash from '@public/images/campaign/battle-royale/flash.svg';
import IconGoto from '@public/images/campaign/battle-royale/goto.svg';
import IconRight from '@public/images/campaign/battle-royale/right.svg';
import IconSwap from '@public/images/campaign/battle-royale/swap.svg';
import IconArrow from '@public/svg/campaign/linea-marsh/goto.svg';
import { useRouter } from 'next/router';

import Loading from '@/components/Icons/Loading';

import { useBonus } from '../../hooks/useBonus';

const Join = () => {
  const {
    status,
    loading,
    isLinea,
    openBalanceModal,
    setCheckBalanceModal,
    croakModal,
    setCroakModal,
    handleSwitchChain,
    handleBonus
  } = useBonus();
  const router = useRouter();

  return (
    <div className="w-[1000px] mx-auto">
      <div
        className="font-Buria text-[36px] w-full text-center mt-[90px] mb-[30px]"
        style={{
          background: 'linear-gradient(180deg, #FFF 0%, #999 100%)',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        JOIN THE CAMPAIGN
      </div>
      <div className="w-full h-[80px] bg-[#1E2028] rounded-xl border border-[#373A53] p-[14px] flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <img src="/images/campaign/battle-royale/bitget.png" className="w-[46px] h-[46px]" alt="" />
          <div className="font-bold font-Montserrat text-base text-white">
            Use <span className="text-[#EBF479]">Bitget wallet</span>& get <span className="text-[#EBF479]">1.5x</span>{' '}
            multiplier!
          </div>
        </div>
        {true ? (
          <div className="flex items-center gap-2">
            <span className="text-[#979ABE] font-[600]">Bitget Wallet Connected</span>
            <div className="flex items-center justify-center gap-[6px] w-[70px] h-[30px] bg-[#12AAFF] border border-[#134370] rounded-[6px] font-Montserrat font-[700] text-black shadow-battle-blue">
              <IconRight />
              1.5x
            </div>
          </div>
        ) : (
          <button
            onClick={isLinea ? handleBonus : handleSwitchChain} // check this connection is by Bitget
            disabled={loading}
            className="bg-[#EBF479] flex items-center gap-1 justify-center rounded-lg w-[132px] h-[40px] leading-[40px] text-center text-black cursor-pointer hover:bg-opacity-40 disabled:opacity-40"
          >
            {loading && <Loading />}
            {isLinea ? 'Verify' : 'Change Wallet'}
          </button>
        )}
      </div>

      <div className="mt-[20px] w-full h-[80px] bg-[#1E2028] rounded-xl border border-[#373A53] p-[14px] flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <IconFlash />
          <IconGoto />
          <img src="/images/campaign/battle-royale/across.png" className="w-[30px] h-[30px]" alt="" />
          <div className="font-bold font-Montserrat text-base text-white">
            Bridge to Arbitrum via <span className="text-[#EBF479]">Across</span> on Super Bridge!
          </div>
        </div>
        <button className="flex items-center justify-center gap-[6px] w-[177px] h-[42px] bg-[#12AAFF] border border-[#134370] rounded-[6px] font-Montserrat font-[700] text-black shadow-battle-blue">
          <span>Super Bridge</span>
          <IconArrow />
        </button>
      </div>

      <div
        className="w-[1000px] h-[509px] mt-5 overflow-hidden"
        style={{
          background: 'url(/images/campaign/battle-royale/frame.png) no-repeat center',
          backgroundSize: '100% 100%'
        }}
      >
        <div className="flex items-center justify-between pl-[30px] pr-[20px] mt-[30px]">
          <div className="flex items-center">
            <IconSwap />
            <span
              className="font-Burial text-[20px]"
              style={{
                background: 'linear-gradient(180deg, #FFF 0%, #999 100%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Super Swap
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-[6px] rounded-[18px] shadow-battle-blue bg-[#12AAFF]"></div>
            <div className="w-[130px] h-[6px] rounded-[18px] shadow-battle-blue bg-[#12AAFF]"></div>
          </div>
        </div>
        <div className="bg-[#1E2028] border-t-[1px] border-[#373A53] mt-[17px] p-[25px_30px] flex gap-4 text-white">
          <div className="flex-1">
            <div className="font-Montserrat font-[500]">
              1. Choose <span className="text-[#EBF479]">Arbitrum</span> network
            </div>
            <img
              className="w-[60px] h-[60px] mt-[32px] mb-[45px] mx-auto"
              src="/images/campaign/battle-royale/arb.png"
              alt=""
            />
            <div>2. Receive multiplier if you trade the following tokens:</div>
          </div>
          <div className="flex-1">
            <div>3. Swap on Arbitrum Via Camelot Routing through Unizen on Superswap.</div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
      {/* <TwitterTask /> */}
    </div>
  );
};

export default Join;
