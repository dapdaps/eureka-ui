import React from 'react';

interface RuleModalProps {
  show: boolean;
  onClose: () => void;
}

const RuleModal: React.FC<RuleModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-[10px]">
      <div
        style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' }}
        className="relative w-[1100px] h-[624px] z-[1] rule-modal bg-[#1F2229] border border-[#373A53] rounded-2xl"
      >
        <button className="absolute top-3 right-3 z-[12]">
          <img
            onClick={onClose}
            src="/images/campaign/battle-royale/close.svg"
            className="hover:cursor-pointer"
            alt="close"
          />
        </button>
        <div className="relative z-10 w-full h-full px-[30px] pt-[33px] font-Montserrat">
          {/* Modal Content */}
          <h1 className="text-white font-Montserrat text-[26px] leading-[26px] my-3 capitalize font-bold text-center">
            ⚔️ TRADE! WELCOME TO THE #1 ARBITRUM TRADING BATTLE ROYALE ⚔️
          </h1>
          <div className="">
            <div>
              <h2 className="text-white font-Montserrat font-bold text-[20px] capitalize">⏳ Timeline:</h2>
              <p className="text-white text-[16px] leading-[1] mt-1">- 01.13.2025 - 01.26.2025 (13:00 UTC)</p>
            </div>
            <div>
              <h2 className="text-white font-Montserrat font-bold text-[20px] uppercase mt-[20px]">💰 Rewards:</h2>
              <p className="text-white text-[16px] leading-[1] capitalize mt-1">
                - $40,000+ in $ACX tokens, split among the top 100, proportional to your trading volume. Trade big to
                win big!
              </p>
            </div>
            <div>
              <h2 className="text-white font-Montserrat font-bold text-[20px]uppercase mt-[20px]">
                ⚡️ THE BATTLE BETWEEN THE GUILDS:
              </h2>
              <p className="text-white text-[16px] leading-[1] capitalize mt-1">
                - Trades involving any of the following tokens will receive a 1.1x multiplier on their volume: GRAIL,
                GMX, DMT, EQB, PEAR, PENDLE, BOOP, SMOL
              </p>
              <p className="text-white text-[16px] leading-[1.5] mt-2 capitalize mt-1">
                - Trades involving any of the listed action below will receive a negative multiplier of 0.25x:
                <br />
                1. Swapping stablecoins ↔ stablecoins: Including USDC, USDT, DAI, usdc.e, TUSD, USDe, USDS, sUSDe,
                USD0.
                <br />
                2. Swapping ETH/WETH ↔ LRTs: Including WSTETH, weETH, RSETH.
                <br />
                3. Swapping LRTs ↔ LRTs: Including WSTETH, weETH, RSETH.
              </p>
            </div>
            <div>
              <h2 className="text-white font-Montserrat font-bold text-[20px] uppercase mt-[20px]">
                🎁 SPECIAL OFFERS:
              </h2>
              <p className="text-white text-[16px] leading-[1.2] capitalize mt-1">
                - Holding BGB (Bitget token) will give you an extra 500$ one-time volume boost
                <br />- Connect Bitget wallet to DapDap and trade will gain you a whopping 1.5x on every trade!
              </p>
            </div>
            <div>
              <h2 className="text-white font-Montserrat font-bold text-[20px] uppercase mt-[20px]">⚠️ Remember:</h2>
              <p className="text-white text-[16px] leading-[1.2] capitalize mt-1">
                - Hopping onto the leaderboard isn't enough—your share of the prize pool depends on your total volume
                traded once the campaign ends. Out-trade the competition to maximize your rewards!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleModal;
