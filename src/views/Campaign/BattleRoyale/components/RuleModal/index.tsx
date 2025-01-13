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
        className="relative w-[808px] h-[627px] z-[1] rule-modal bg-[#1F2229] border border-[#373A53] rounded-2xl"
      >
        <button className="absolute top-3 right-3 z-[12]">
          <img
            onClick={onClose}
            src="/images/campaign/battle-royale/close.svg"
            className="hover:cursor-pointer"
            alt="close"
          />
        </button>
        <div className="relative z-10 w-full h-full px-8 pt-8 text-white">
          <h2 className="font-Montserrat text-[26px] leading-[31px] font-bold mb-8">Trading Rules Explanation</h2>

          <div className="space-y-8">
            <div>
              <p className="mb-4 font-Montserrat">
                The following types of trades will be calculated with a negative multiplier of 0.25x:
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 font-Montserrat">1. Trades between stablecoins</h3>
                <p className="font-Montserrat">Includes: USDC, USDT, DAI, usdc.e, TUSD, USDe, USDS, sUSDe, USD0.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 font-Montserrat">2. Trades between ETH/WETH and LRT</h3>
                <ul className="space-y-1 font-Montserrat">
                  <li>• ETH/WETH → LRT</li>
                  <li>• LRT → ETH/WETH</li>
                </ul>
                <p className="mt-2 font-Montserrat">LRT includes: WSTETH, weETH, RSETH.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 font-Montserrat">3. Trades between LRT tokens</h3>
                <ul className="space-y-1 font-Montserrat">
                  <li>• WSTETH ↔ weETH</li>
                  <li>• weETH ↔ RSETH</li>
                  <li>• RSETH ↔ WSTETH</li>
                </ul>
              </div>
            </div>

            <p className="mt-8 font-Montserrat">Please consider these rules when planning your trading strategy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleModal;
