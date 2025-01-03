import Join from './components/Join';
import Leaderboard from './components/Leaderboard';
import TradingData from './components/TradingData';

const LineaMarsh = () => {
  return (
    <div className="w-full min-h-screen">
      <div
        className="w-[100vw] h-[1284px] overflow-hidden"
        style={{
          background: 'url(/images/campaign/battle-royale/battle-bg.png) no-repeat center',
          backgroundSize: '100% 100%',
          position: 'relative'
        }}
      >
        <div className="w-[1244px] h-auto mt-[40px] mx-auto flex flex-col justify-center items-center">
          <img src="/images/campaign/battle-royale/header.png" className="w-[273px] h-[70px] mt-[60px]" alt="" />
          <img src="/images/campaign/battle-royale/title.png" className="w-[1127px] h-[121px] mt-[56px]" alt="" />
          <TradingData />
        </div>
      </div>
      <Join />
    </div>
  );
};
export default LineaMarsh;
