import IconFlash from '@public/images/campaign/battle-royale/flash.svg';
import IconGoto from '@public/images/campaign/battle-royale/goto.svg';
import IconRight from '@public/images/campaign/battle-royale/right.svg';
import IconSwap from '@public/images/campaign/battle-royale/swap.svg';
import IconArrow from '@public/svg/campaign/linea-marsh/goto.svg';
import { useRouter } from 'next/navigation';

import Loading from '@/components/Icons/Loading';

import { useBonus } from '../../hooks/useBonus';
import TwitterTask from '../TwitterTask';

const Join = () => {
  const { loading, verifyLoading, walletStatus, handleBonus, handleBitgetVerify, isBonused, connectWallet } =
    useBonus();

  const router = useRouter();

  const tokens = [
    {
      icon: '/images/campaign/battle-royale/tokens/grail.png',
      name: 'GRAIL',
      buff: '1.1'
    },
    {
      icon: '/images/campaign/battle-royale/tokens/gmx.png',
      name: 'GMX',
      buff: '1.1'
    },
    {
      icon: '/images/campaign/battle-royale/tokens/dmt.png',
      name: 'DMT',
      buff: '1.1'
    },
    {
      icon: '/images/campaign/battle-royale/tokens/eqb.png',
      name: 'EQB',
      buff: '1.1'
    },
    {
      icon: '/images/campaign/battle-royale/tokens/pear.png',
      name: 'PEAR',
      buff: '1.1'
    },
    {
      icon: '/images/campaign/battle-royale/tokens/pendle.png',
      name: 'PENDLE',
      buff: '1.1'
    },
    {
      icon: '/images/campaign/battle-royale/tokens/boop.png',
      name: 'BOOP',
      buff: '1.1'
    },
    {
      icon: '/images/campaign/battle-royale/tokens/smol.png',
      name: 'SMOL',
      buff: '1.1'
    }
  ];

  const getBitgetButtonContent = () => {
    if (walletStatus === 'BITGET_CONNECTED') {
      return (
        <div className="flex items-center gap-2">
          <span className="text-[#979ABE] font-[600]">Bitget Wallet Connected</span>
          <div className="flex items-center justify-center gap-[6px] w-[70px] h-[30px] bg-[#12AAFF] border border-[#134370] rounded-[6px] font-Montserrat font-[700] text-black shadow-battle-blue">
            <IconRight />
            1.5x
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={handleBitgetVerify}
        disabled={verifyLoading}
        className="bg-[#12AAFF] shadow-battle-blue font-bold flex items-center gap-1 justify-center rounded-lg w-[132px] h-[40px] leading-[40px] text-center text-black cursor-pointer hover:bg-opacity-40 disabled:opacity-40"
      >
        {verifyLoading ? <Loading /> : walletStatus === 'DISCONNECTED' ? 'Connect Wallet' : 'Verify'}
      </button>
    );
  };

  const getSecondButtonContent = () => {
    if (isBonused) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-[#979ABE] font-[600]">Verified holder</span>
          <div className="flex items-center justify-center gap-[6px] w-[89px] h-[30px] bg-[#12AAFF] border border-[#134370] rounded-[6px] font-Montserrat font-[700] text-black shadow-battle-blue">
            <IconRight />
            +$500
          </div>
        </div>
      );
    }

    const isDisconnected = walletStatus === 'DISCONNECTED';
    return (
      <button
        onClick={isDisconnected ? connectWallet : handleBonus}
        disabled={loading}
        className="bg-[#12AAFF] font-bold flex items-center gap-1 justify-center rounded-lg w-[132px] h-[40px] leading-[40px] text-center text-black shadow-battle-blue cursor-pointer hover:bg-opacity-40 disabled:opacity-40"
      >
        {loading && <Loading />}
        {isDisconnected ? 'Connect Wallet' : 'Verify'}
      </button>
    );
  };

  return (
    <div className="w-[1000px] mx-auto">
      <div
        className="font-Burial text-[36px] w-full text-center mt-[90px] mb-[30px]"
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
            Use <span className="text-[#EBF479]">Bitget wallet</span> & get <span className="text-[#EBF479]">1.5x</span>{' '}
            multiplier!
          </div>
        </div>
        {getBitgetButtonContent()}
      </div>
      <div className="mt-5 w-full h-[80px] bg-[#1E2028] rounded-xl border border-[#373A53] p-[14px] flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <img src="/images/campaign/battle-royale/bitget.png" className="w-[46px] h-[46px]" alt="" />
          <div className="font-bold font-Montserrat text-base text-white">
            Holding <span className="text-[#EBF479]">$BGB</span> will increase trading volume by{' '}
            <span className="text-[#EBF479]">+$500</span>
          </div>
        </div>
        {getSecondButtonContent()}
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
        <button
          onClick={() => router.push('/super-bridge')}
          className="flex items-center justify-center gap-[6px] w-[177px] h-[42px] bg-[#12AAFF] border border-[#134370] rounded-[6px] font-Montserrat font-[700] text-black shadow-battle-blue"
        >
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
        <div className="bg-[#1E2028] border-t-[1px] border-[#373A53] p-[25px_30px] flex gap-4 text-white">
          <div className="flex-1">
            <div className="font-Montserrat font-[500]">
              1. Choose <span className="text-[#EBF479] font-bold">Arbitrum</span> network
            </div>
            <img
              className="w-[60px] h-[60px] mt-[32px] mb-[45px] mx-auto"
              src="/images/campaign/battle-royale/arb.png"
              alt=""
            />
            <div>2. Receive a multiplier if you swap into the following tokens</div>
            <div className="w-full flex flex-wrap gap-y-2 mt-[25px]">
              {tokens.map((token, index) => (
                <div className="w-[48%] flex items-center gap-2" key={index}>
                  <img src={token.icon} className="w-[30px] h-[30px] rounded-full" alt="" />
                  <div className="whitespace-nowrap font-bold">{token.name}</div>
                  <div className="w-[32px] h-[20px] flex items-center justify-center bg-[#12AAFF] rounded-[6px] font-Montserrat font-[700] text-black shadow-battle-blue text-[12px]">
                    {token.buff}x
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div>
              3. Swap on Arbitrum Via <span className="text-[#EBF479] font-bold">Camelot</span> Routing through{' '}
              <span className="text-[#EBF479] font-bold">Unizen</span> on Superswap. Minimum trade amount: $1
            </div>
            <img
              src="/images/campaign/battle-royale/camlot.png"
              className="mx-auto w-[300px] h-[213px] mt-[15px] mb-[50px]"
              alt=""
            />
            <button
              onClick={() => router.push('/super-swap')}
              className="w-full flex items-center justify-center gap-2 h-[52px] bg-[#12AAFF] border border-[#134370] rounded-[6px] font-Montserrat font-[700] text-black shadow-battle-blue hover:bg-opacity-80"
            >
              <span>Super Swap</span>
              <IconArrow />
            </button>
          </div>
        </div>
      </div>
      <TwitterTask />
    </div>
  );
};

export default Join;
