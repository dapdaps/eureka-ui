import { blast } from '@/config/tokens/blast';

const basic = {
  name: 'Duo',
  data: 'bluebiu.near/widget/Staking.Duo.Data'
};

const networks = {
  // Blast
  81457: {
    DepositPool: '0x337827814155ECBf24D20231fCA4444F530C0555', // exchange address
    WithdrawalContract: '0x4Df34134222cC20D23a511c7576812eD94BaF3CF',
    StakeTokens: [{ ...blast['eth'] }, { ...blast['weth'] }, { ...blast['usdb'] }],
    ExchangeToken: [{ ...blast['deth'] }, { ...blast['dusd'] }],
    PointsAndYield: {
      BoostPoints: {
        key: 1,
        label: 'Boost Points',
        type: 'PointOptimized',
        name: 'pointOptimizeds',
        tvlKey: 'pointOptimizedTvl',
        [blast['eth'].symbol]: '0xd89dcc88acfc6ef78ef9602c2bf006f0026695ef',
        [blast['weth'].symbol]: '0xd89dcc88acfc6ef78ef9602c2bf006f0026695ef',
        [blast['usdb'].symbol]: '0xf2050acf080ee59300e3c0782b87f54fdf312525'
      },
      BoostYield: {
        key: 2,
        label: 'Boost Yield',
        type: 'YieldOptimized',
        name: 'yieldOptimizeds',
        tvlKey: 'yieldOptimizedTvl',
        [blast['eth'].symbol]: '0xd89dcc88acfc6ef78ef9602c2bf006f0026695ef',
        [blast['weth'].symbol]: '0xd89dcc88acfc6ef78ef9602c2bf006f0026695ef',
        [blast['usdb'].symbol]: '0xf2050acf080ee59300e3c0782b87f54fdf312525'
      },
      PointsYield: {
        key: 3,
        label: 'Points & Yield ',
        type: 'PointYieldBalanced',
        name: 'variableRates',
        tvlKey: 'variableRateTvl',
        [blast['eth'].symbol]: '0x7B4b51b482e874B3109ba618B0CA9cc1A75210dF',
        [blast['weth'].symbol]: '0x7B4b51b482e874B3109ba618B0CA9cc1A75210dF',
        [blast['usdb'].symbol]: '0xd32A76755BeB19A514FBFE1aa534d1808C925B09'
      },
      PointsFixedYield: {
        key: 4,
        label: 'Points & Fixed Yield',
        type: 'FixedTerm90D',
        name: 'fixedRates',
        tvlKey: 'fixedRateTvl',
        [blast['eth'].symbol]: '0x7B4b51b482e874B3109ba618B0CA9cc1A75210dF',
        [blast['weth'].symbol]: '0x7B4b51b482e874B3109ba618B0CA9cc1A75210dF',
        [blast['usdb'].symbol]: '0xd32A76755BeB19A514FBFE1aa534d1808C925B09'
      }
    }
  }
};

export default { basic, networks };
