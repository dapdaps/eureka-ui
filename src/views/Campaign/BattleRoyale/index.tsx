'use client';
import { useState } from 'react';

import Join from './components/Join';
import Leaderboard from './components/Leaderboard';
import RuleModal from './components/RuleModal';
import TradingData from './components/TradingData';

const BattleRoyale = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="w-full min-h-screen">
      <div
        className="w-[100vw] h-[1284px] overflow-hidden"
        style={{
          background: 'url(/images/campaign/battle-royale/battle-bg.png) no-repeat center',
          backgroundSize: '100% 100%'
        }}
      >
        <div className="w-[1244px] h-auto mt-[40px] mx-auto flex flex-col justify-center items-center">
          <img src="/images/campaign/battle-royale/header.png" className="w-[273px] h-[70px] mt-[60px]" alt="" />
          <img
            src="/images/campaign/battle-royale/title.png"
            className="w-[1127px] h-[121px] mt-[56px] object-contain"
            alt=""
          />
          <TradingData />
        </div>
      </div>
      <Leaderboard onRulesClick={() => setIsShow(true)} />
      <Join onRulesClick={() => setIsShow(true)} />
      <RuleModal show={isShow} onClose={() => setIsShow(false)} />
    </div>
  );
};
export default BattleRoyale;
