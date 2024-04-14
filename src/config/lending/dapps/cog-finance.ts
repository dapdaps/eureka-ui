import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Cog Finance',
  data: 'bluebiu.near/widget/Lending.Data.Cog',
  // handler: 'bluebiu.near/widget/Lending.Handler.Liquity',
  type: 'Cog',
};

const networks = {
  //  scroll
  534352: {
    rawMarkets: [
      {
        POOL_NAME: 'WETH-wrsETH',
        TOKEN_A: { ...scroll['weth'] },
        TOKEN_B: { ...scroll['wrseth'] },
        POOL_MANAGER: '0x6ace91e105cd5288dc46598e96538e9ad0e421aa',
        MAX_LTV: 0.85,
        Rate: 0.02,
        APY: 0.02,
      },
      {
        POOL_NAME: 'USDT-WETH',
        TOKEN_A: { ...scroll['usdt'] },
        TOKEN_B: { ...scroll['weth'] },
        POOL_MANAGER: '0x4ac126e5dd1cd496203a7e703495caa8112a20ca',
        MAX_LTV: 0.85,
        Rate: 0.02,
        APY: 0.02,
      },
      {
        POOL_NAME: 'USDC-WETH',
        TOKEN_A: { ...scroll['usdc'] },
        TOKEN_B: { ...scroll['weth'] },
        POOL_MANAGER: '0x63FdAFA50C09c49F594f47EA7194b721291ec50f',
        MAX_LTV: 0.85,
        Rate: 0.02,
        APY: 0.02,
      },
      {
        POOL_NAME: 'DAI-WETH',
        TOKEN_A: { ...scroll['dai'] },
        TOKEN_B: { ...scroll['weth'] },
        POOL_MANAGER: '0x43187A6052A4BF10912CDe2c2f94953e39FcE8c7',
        MAX_LTV: 0.85,
        Rate: 0.02,
        APY: 0.02,
      },
      {
        POOL_NAME: 'USDT-wstETH',
        TOKEN_A: { ...scroll['usdt'] },
        TOKEN_B: { ...scroll['wsteth'] },
        POOL_MANAGER: '0x5c121db888aD212670017080047Ed16CE99a2a96',
        MAX_LTV: 0.85,
        Rate: 0.35,
        APY: 0.35,
      },
      {
        POOL_NAME: 'wstETH-USDT',
        TOKEN_A: { ...scroll['wsteth'] },
        TOKEN_B: { ...scroll['usdt'] },
        POOL_MANAGER: '0x04BB9Bca2F8955051966B6dA5398AD1B3a832762',
        MAX_LTV: 0.85,
        Rate: 0.02,
        APY: 0.02,
      },
    ],
    TOKENS: [scroll['weth'], scroll['wrseth'], scroll['wsteth'], scroll['usdt'], scroll['usdc'], scroll['dai']],
  },
};

export default { basic, networks };
