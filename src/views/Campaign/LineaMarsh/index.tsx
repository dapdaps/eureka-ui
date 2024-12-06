import BackgroundMusic from './components/BackgroundMusic';
import Frogs from './components/Frogs';
import Join from './components/Join';
import Leaderboard from './components/Leaderboard';
import TradingData from './components/TradingData';

const LineaMarsh = () => {
  return (
    <div className="w-full min-h-screen">
      <div
        className="w-[100vw] h-[1284px] overflow-hidden"
        style={{
          background: 'url(/images/campaign/linea-marsh/bg.png) no-repeat center',
          backgroundSize: '100% 100%',
          position: 'relative'
        }}
      >
        <BackgroundMusic />
        <div className="w-[1244px] h-auto mt-[40px] mx-auto flex flex-col justify-center items-center">
          <img src="/images/campaign/linea-marsh/brand.png" className="w-[891px] h-[273px]" alt="brand" />
          <TradingData />
          <div className="absolute bottom-[66px] w-[900px] left-1/2 translate-x-[-50%]">
            <div className="flex gap-2">
              <div
                className="w-[420px] font-Jersey text-[50px] text-white leading-[1]"
                style={{ textShadow: '6px 6px 0 #000' }}
              >
                Climb to Top <span className="text-[#FF33A1] text-[100px]">100</span> Win{' '}
                <span className="text-[#FFCC00] text-[100px]">$5,000+</span> Rewards
              </div>
              <img src="/images/campaign/linea-marsh/nfts.png" className="w-[434px] h-[103px] self-end" alt="" />
            </div>
            <div className="w-[900px] mx-auto mt-2">
              <img src="/images/campaign/linea-marsh/slogen.png" alt="" />
            </div>
          </div>
        </div>
        <Frogs />
      </div>
      <Leaderboard />
      <Join />
    </div>
  );
};
export default LineaMarsh;
