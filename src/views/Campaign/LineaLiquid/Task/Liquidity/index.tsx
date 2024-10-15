import { useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';
import lynex from '@/config/pool/dapps/lynex';
import { linea } from '@/config/tokens/linea';
import Slippage from '@/modules/swap/components/Slippage';
import Chart from '@/views/Pool/AddLiquidity/components/Chart';
import Empty from '@/views/Pool/AddLiquidity/components/Empty';
import OutRangeHints from '@/views/Pool/AddLiquidity/components/OutRangeHints';
import SelectPriceRange from '@/views/Pool/AddLiquidity/components/SelectPriceRange';
import useData from '@/views/Pool/AddLiquidity/hooks/useData';
import DepositAmounts from '@/views/Pool/components/DepositAmounts/V3';
import TokenSwitcher from '@/views/Pool/components/TokenSwitcher';
import { LiquidityContext } from '@/views/Pool/context';
import AddButton from '@/views/Pool/IncreaseLiquidity/components/Button';
import useIncrease from '@/views/Pool/IncreaseLiquidity/hooks/useIncrease';

import { StyledTitle } from '../Swap/styles';

function LynexLiquidity({ show, onClose }: any) {
  const [errorTips, setErrorTips] = useState('');
  const {
    token0,
    token1,
    value0,
    value1,
    noPair,
    fee,
    loading,
    currentPrice,
    lowerPrice,
    upperPrice,
    reverse,
    rangeType,
    info,
    onSelectToken,
    onCleanAll,
    onSelectFee,
    onExchangeTokens,
    onPriceChange,
    onPointChange,
    setValue0,
    setValue1,
    onSetPriceByTick
  } = useData(true);

  const { loading: adding, onIncrease } = useIncrease({
    token0,
    token1,
    value0,
    value1,
    fee,
    noPair,
    currentPrice,
    lowerPrice,
    upperPrice,
    info,
    onSuccess() {
      onClose?.(true);
    }
  });
  return (
    <Modal
      display={show}
      width={500}
      onClose={onClose}
      title={
        <StyledTitle>
          <div>Provide LYNX/WETH</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="97" height="21" viewBox="0 0 97 21" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.54457 6.48658L4.38679 9.89322C4.23738 9.99482 4.23738 10.216 4.38679 10.3176L9.59238 13.7541C9.85534 13.9274 10.0167 14.2262 10.0167 14.543V19.9398C10.0167 20.155 9.77167 20.2865 9.59238 20.1609L0.3825 13.7361C0.143437 13.5688 0 13.2999 0 13.007V7.20975C0 6.91689 0.143437 6.64795 0.3825 6.48061L9.59238 0.0498287C9.77167 -0.075679 10.0167 0.0498287 10.0167 0.270961V5.61401C10.0167 5.96662 9.83742 6.29533 9.54457 6.49256V6.48658ZM89.7383 13.4494L92.1469 16.856C92.2365 16.9815 92.3859 17.0592 92.5413 17.0592H96.5157C96.9102 17.0592 97.1373 16.6169 96.9102 16.2942L92.5832 10.1862L96.6054 3.89882C96.8146 3.57608 96.5815 3.15175 96.199 3.15175H92.3919C92.2186 3.15175 92.0632 3.24139 91.9735 3.39081L90.073 6.6301L87.7601 3.36093C87.6704 3.23542 87.521 3.15772 87.3656 3.15772H83.3912C82.9968 3.15772 82.7696 3.59999 82.9967 3.92272L87.2282 9.8933L83.1282 16.3181C82.9191 16.6408 83.1522 17.0652 83.5347 17.0652H87.3417C87.515 17.0652 87.6704 16.9755 87.7601 16.8261L89.7383 13.4494ZM31.796 13.7601H35.5135C35.7824 13.7601 35.9976 13.9753 35.9976 14.2442V16.5751C35.9976 16.844 35.7824 17.0592 35.5135 17.0592H27.9232C27.6543 17.0592 27.4391 16.844 27.4391 16.5751V3.64182C27.4391 3.37288 27.6543 3.15772 27.9232 3.15772H31.3119C31.5809 3.15772 31.796 3.37288 31.796 3.64182V13.7601ZM51.74 3.86295L47.1141 12.8397V16.5751C47.1141 16.844 46.899 17.0592 46.63 17.0592H43.2413C42.9724 17.0592 42.7572 16.844 42.7572 16.5751V12.8397L38.1314 3.86295C37.964 3.54022 38.1971 3.15772 38.5617 3.15772H42.4405C42.6317 3.15772 42.805 3.27128 42.8827 3.4446L44.9745 8.08838L47.0663 3.4446C47.144 3.27128 47.3173 3.15772 47.5086 3.15772H51.3097C51.6742 3.15772 51.9073 3.54022 51.74 3.86295ZM63.6988 17.0592H67.3086C67.5776 17.0592 67.7927 16.844 67.7927 16.5751V3.64182C67.7927 3.37288 67.5776 3.15772 67.3086 3.15772H63.9199C63.651 3.15772 63.4358 3.37288 63.4358 3.64182V10.2698L58.9654 3.37885C58.8757 3.24139 58.7263 3.15772 58.559 3.15772H54.9491C54.6802 3.15772 54.465 3.37288 54.465 3.64182V16.5811C54.465 16.85 54.6802 17.0652 54.9491 17.0652H58.3378C58.6068 17.0652 58.8219 16.85 58.8219 16.5811V10.0726L63.2924 16.844C63.382 16.9755 63.5374 17.0592 63.6988 17.0592ZM75.4974 6.6301V8.3394H79.3343C79.6033 8.3394 79.8184 8.55455 79.8184 8.8235V11.1305C79.8184 11.3994 79.6033 11.6146 79.3343 11.6146H75.4974V13.5808H79.92C80.189 13.5808 80.4041 13.796 80.4041 14.0649V16.5691C80.4041 16.8381 80.189 17.0532 79.92 17.0532H71.6186C71.3497 17.0532 71.1345 16.8381 71.1345 16.5691V3.64182C71.1345 3.37288 71.3497 3.15772 71.6186 3.15772H79.92C80.189 3.15772 80.4041 3.37288 80.4041 3.64182V6.146C80.4041 6.41495 80.189 6.6301 79.92 6.6301H75.4974ZM21.9334 13.0071V7.20985C21.9334 6.917 21.79 6.64805 21.5509 6.48071L12.3351 0.0499302C12.1558 -0.0755776 11.9108 0.0559067 11.9108 0.271063V5.61411C11.9108 5.96672 12.09 6.29543 12.3829 6.49266L17.5407 9.8993C17.6901 10.0009 17.6901 10.222 17.5407 10.3236L12.3351 13.7602C12.0721 13.9335 11.9108 14.2323 11.9108 14.5491V19.9459C11.9108 20.167 12.1558 20.2925 12.3351 20.167L21.5509 13.7362C21.79 13.5689 21.9334 13.3 21.9334 13.0071Z"
              fill="white"
            />
          </svg>
        </StyledTitle>
      }
      content={
        // @ts-ignore
        <div className="text-white px-[30px] pb-[30px]" style={{ '--button-text-color': '#000' }}>
          <div className="pt-[27px] pb-[10px] flex justify-between">
            <div className="flex items-center gap-[10px]">
              <div className="flex items-center gap-[10px]">
                <img src="/assets/tokens/eth.png" className="w-[36px] h-[36px] rounded-[50%]" />
                <img src="/assets/tokens/lynx.png" className="w-[36px] h-[36px] rounded-[50%] ml-[-18px]" />
                <div className="text-[18px] font-bold">LYNX/ETH</div>
              </div>
              {fee && (
                <div className="bg-[#373A53] px-[6px] py-[2px] rounded-[6px] text-[12px] text-[#fff]">{fee / 1e4}%</div>
              )}
            </div>
            <div className="flex items-center gap-[10px]">
              {onCleanAll && (
                <button className="text-[#FE6360] text-[14px] underline bg-transparent" onClick={onCleanAll}>
                  Clear all
                </button>
              )}
              <Slippage panelStyle={{ left: -258, top: 24 }} />
            </div>
          </div>
          {loading ? (
            <div className="h-[300px] flex justify-center items-center">
              <Loading size={30} />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="text-[16px] font-semibold">Set Price Range</div>
                {token0 && token1 && (
                  <TokenSwitcher
                    token0={token0}
                    token1={token1}
                    reverse={!reverse}
                    onExchangeTokens={onExchangeTokens}
                  />
                )}
              </div>
              {currentPrice && token0 && token1 && fee && !noPair ? (
                <Chart
                  currentPrice={currentPrice}
                  fee={fee}
                  lowerPrice={lowerPrice}
                  highPrice={upperPrice === '∞' ? 2 ** 96 : upperPrice}
                  token0={token0}
                  token1={token1}
                  onPriceChange={onPriceChange}
                  width={438}
                />
              ) : (
                <Empty />
              )}

              <SelectPriceRange
                lowerPrice={lowerPrice}
                upperPrice={upperPrice}
                currentPrice={currentPrice}
                token0={token0}
                token1={token1}
                reverse={reverse}
                noPair={noPair}
                rangeType={rangeType}
                from="campaign"
                onExchangeTokens={() => {
                  onExchangeTokens();
                }}
                onPointChange={onPointChange}
                onPriceChange={onPriceChange}
                onSetPriceByTick={onSetPriceByTick}
              />
              {[1, 2].includes(rangeType) && !noPair && <OutRangeHints type={rangeType} />}
            </>
          )}

          <DepositAmounts
            label="Deposit amounts"
            token0={token0}
            token1={token1}
            value0={value0}
            value1={value1}
            setValue0={setValue0}
            setValue1={setValue1}
            rangeType={rangeType}
            upperPrice={upperPrice}
            lowerPrice={lowerPrice}
            currentPrice={currentPrice}
            onError={(tips: string) => {
              setErrorTips(tips);
            }}
          />
          <AddButton
            text="Add Liquidity"
            errorTips={errorTips}
            loading={loading || adding}
            onClick={() => {
              onIncrease();
            }}
            value0={value0}
            value1={value1}
            token0={token0}
            token1={token1}
            spender={info?.positionManager}
          />
        </div>
      }
    />
  );
}

export default function Liquidity(props: any) {
  return (
    <LiquidityContext.Provider
      value={{
        currentChain: { chain_id: 59144, logo: 'https://assets.dapdap.net/images/linea-chainicon.png', name: 'Linea' },
        defaultTokens: [linea['eth'], linea['lynx']],
        dapp: {
          name: 'Lynex'
        },
        ...lynex
      }}
    >
      <LynexLiquidity {...props} />
    </LiquidityContext.Provider>
  );
}
