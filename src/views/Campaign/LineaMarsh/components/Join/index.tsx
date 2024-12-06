import Link from 'next/link';
import { useRouter } from 'next/router';

import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';

import { useBonus } from '../../hooks/useBonus';
import TwitterTask from '../TwitterTask';

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
      <div className="font-Montserrat font-bold text-[36px] w-full text-center mt-[90px] mb-[30px] text-white">
        JOIN THE CAMPAIGN
      </div>
      <div className="w-full bg-[#1E2028] rounded-xl border border-[#373A53] p-[14px] flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <img src="/svg/campaign/linea-marsh/efrog.svg" className="w-[50px] h-[50px]" alt="" />
          <div className="font-bold font-Montserrat text-base text-white">
            Verify if you are holder of <span className="text-[#EBF479]">efrog</span> or{' '}
            <span className="text-[#EBF479]">froglets NFT</span>, get +20% boost.
          </div>
        </div>
        {status ? (
          <div className="bg-[#00FFD1] bg-opacity-20 rounded-lg w-[132px] h-[40px] text-center text-[#00FFD1] flex items-center justify-center gap-2 cursor-pointer">
            <img src="/svg/campaign/linea-marsh/checked.svg" className="w-[18px] h-[18px]" alt="" />
            <span>Verify</span>
          </div>
        ) : (
          <button
            onClick={isLinea ? handleBonus : handleSwitchChain}
            disabled={loading}
            className="bg-[#EBF479] flex items-center gap-1 justify-center rounded-lg w-[132px] h-[40px] leading-[40px] text-center text-black cursor-pointer hover:bg-opacity-40 disabled:opacity-40"
          >
            {loading && <Loading />}
            {isLinea ? 'Verify' : 'Switch Chain'}
          </button>
        )}
      </div>
      <div className="flex items-center gap-[20px] justify-between mt-[20px]">
        <div className="w-[490px] h-[570px] rounded-[20px] overflow-hidden bg-[#1E2028]">
          <div className="border-b border-[#373A53] px-[30px] h-[70px] flex items-center gap-[10px]">
            <img src="/svg/campaign/linea-marsh/bridge.svg" alt="" />
            <span className="text-white">Super Bridge</span>
          </div>
          <div className="px-[20px]">
            <img
              src="/images/campaign/linea-marsh/bridge-info.png"
              className="w-[255px] h-[70px] mt-[57px] mx-auto mb-[30px]"
              alt=""
            />
            <div className="font-Montserrat text-white">
              2. Choose <span className="font-bold text-[#EBF479]">Across</span> as bridge route
            </div>
            <img src="/images/campaign/linea-marsh/bridge.png" className="w-[300px] h-[236px] mx-auto" alt="" />
            <button
              onClick={() => router.push('/super-bridge')}
              className="mt-[5px] w-full h-[54px] rounded-lg flex items-center justify-center gap-1 bg-[#EBF479]"
            >
              <span>Super Bridge</span>
              <img src="/svg/campaign/linea-marsh/goto.svg" alt="" />
            </button>
          </div>
        </div>
        <div className="w-[490px] h-[570px] rounded-[20px] overflow-hidden bg-[#1E2028]">
          <div className="border-b border-[#373A53] px-[30px] h-[70px] flex items-center gap-[10px]">
            <img src="/svg/campaign/linea-marsh/swap.svg" alt="" />
            <span className="text-white">Super Swap</span>
          </div>
          <div className="px-[20px]">
            <img
              src="/images/campaign/linea-marsh/swap-info.png"
              className="w-[124px] h-[70px] mt-[57px] mx-auto mb-[30px]"
              alt=""
            />
            <div className="font-Montserrat text-white">
              2. Choose <span className="font-bold text-[#EBF479]">Lynex</span> as swap route
            </div>
            <img src="/images/campaign/linea-marsh/swap.png" className="w-[300px] h-[236px] mx-auto" alt="" />
            <button
              onClick={() => router.push('/super-swap')}
              className="mt-[5px] w-full h-[54px] rounded-lg flex items-center justify-center gap-1 bg-[#EBF479]"
            >
              <span>Super Swap</span>
              <img src="/svg/campaign/linea-marsh/goto.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <TwitterTask />
      <Modal
        display={openBalanceModal}
        portal={true}
        title="Oops!"
        headerStyle={{ padding: '22px 18px 0' }}
        headerCenter
        width={310}
        onClose={() => setCheckBalanceModal(false)}
        content={
          <div
            style={{
              padding: '0 18px 22px',
              color: '#FFF',
              textAlign: 'left',
              fontFamily: 'Montserrat',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '140%'
            }}
          >
            You are not a holder of efrog / froglets NFT yet. Trade on{' '}
            <Link
              style={{ textDecoration: 'underline', color: '#EBF479' }}
              href={'https://www.baidu.com'}
              target="_blank"
            >
              [Marketplace]
            </Link>
          </div>
        }
      />
      <Modal
        display={croakModal}
        portal={true}
        title="Croak!"
        headerStyle={{ padding: '22px 18px 0' }}
        headerCenter
        width={310}
        onClose={() => setCroakModal(false)}
        content={
          <div
            style={{
              padding: '0 18px 22px',
              color: '#FFF',
              textAlign: 'left',
              fontFamily: 'Montserrat',
              fontSize: '16px',
              lineHeight: '140%'
            }}
          >
            You are an efrog or froglets NFT holder. You've received a{' '}
            <span style={{ fontWeight: 700, color: '#EBF479' }}>+20%</span> boost in this competition.
          </div>
        }
      />
    </div>
  );
};

export default Join;
