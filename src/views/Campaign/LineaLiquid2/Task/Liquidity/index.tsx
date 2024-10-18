import Link from 'next/link';
import { useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Modal from '@/components/Modal';
import nile from '@/config/pool/dapps/nile';
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

function LiquidityPanel({ show, onClose }: any) {
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
    onCleanAll,
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
          <div className="text-[16px]">Provide Liquidity ($ZERO/ETH)</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="93" height="20" viewBox="0 0 93 20" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.26505 2.88379L11.9855 0L14.706 2.88379L11.9855 5.76758L9.26505 2.88379ZM0 3.03964L2.898 5.97627C5.46068 8.5731 8.35812 10.77 11.5034 12.5011L11.5046 12.5018L11.5058 12.5024C11.9025 12.7216 12.3117 12.9369 12.7323 13.1475C15.2394 14.4049 17.8688 15.3607 20.5714 15.9988V6.61013H24V17.5286H22.3914L22.0051 20.0001C18.2881 19.3454 14.6745 18.1467 11.2677 16.4383C10.8089 16.2084 10.3609 15.9728 9.92389 15.7313C7.62842 14.4679 5.45386 12.9771 3.42857 11.2806V17.5286H0V3.03964Z"
              fill="#B8F2FA"
            />
            <path
              d="M84.8359 17.7776V5.27832H92.8671V7.24276H87.1085V10.5361H92.5204V12.5005H87.1085V15.7939H92.8671V17.7776H84.8359Z"
              fill="#B8F2FA"
            />
            <path d="M71.257 5.27832V15.7939H76.3992V17.7776H68.9844V5.27832H71.257Z" fill="#B8F2FA" />
            <path d="M56.7578 17.7776V5.27832H59.0304V17.7776H56.7578Z" fill="#B8F2FA" />
            <path
              d="M36.5625 5.27832H39.0469L44.7284 14.1954H44.5551V5.27832H46.8277V17.7776H44.5166L38.4692 8.32128H38.8351V17.7776H36.5625V5.27832Z"
              fill="#B8F2FA"
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
                <img src="/assets/tokens/zero.webp" className="w-[36px] h-[36px] rounded-[50%] ml-[-18px]" />
                <div className="text-[14px] font-bold">ZERO/ETH</div>
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
          <div className="text-center pt-[15px] text-[#979ABE] text-[14px]">
            Manage exist assets on{' '}
            <Link href="/dapp/nile" className="text-white underline">
              NEIL
            </Link>
          </div>
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
        defaultTokens: [linea['eth'], linea['zero']],
        dapp: {
          name: 'Nile'
        },
        basic: {
          name: 'Nile'
        },
        ...nile
      }}
    >
      <LiquidityPanel {...props} />
    </LiquidityContext.Provider>
  );
}
