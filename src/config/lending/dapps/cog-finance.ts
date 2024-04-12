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
    // StabilityPool: '0x6afA834Bf44fF8aB7eF89Fd417853e9B13FBfB52',
    // borrowTokenAddress: '0xC19669A405067927865B40Ea045a2baabbbe57f5',
    // VesselManager: '0x5208c0c4c95A4636eFC403960969a4a4b4CCDFC5',
    // VesselManagerOperations: '0x7A004E02177DA08dF4e4eEC15a0F75Fb5DE6Af04',
    // BorrowerOperations: '0xbffC680a9aA46b8B19228497E77888dA6B944B2D',
    // markets: {
    //   // [scroll['wsteth'].address]: {
    //   //   decimals: 18,
    //   //   underlyingToken: scroll['wst-eth'],
    //   //   BORROW_TOKEN,
    //   //   BORROW_URL,
    //   //   MAX_LTV,
    //   //   ONE_TIME_FEE: 8,
    //   //   MIN_DEBT,
    //   //   MINTED: 0,
    //   //   MINTED_CAP: 500000,
    //   // },
    // },
    rawMarkets: [
      {
        POOL_NAME: 'WETH-wrsETH',
        TotalCollateral: '',
        TOKEN_A: { ...scroll['weth'] },
        TOKEN_B: { ...scroll['wrseth'] },
        POOL_MANAGER: '0x6ace91e105cd5288dc46598e96538e9ad0e421aa',
      },
      {
        POOL_NAME: 'USDT-WETH',
        TotalCollateral: '',
        TOKEN_A: { ...scroll['usdt'] },
        TOKEN_B: { ...scroll['weth'] },
        POOL_MANAGER: '0x4ac126e5dd1cd496203a7e703495caa8112a20ca',
      },
      {
        POOL_NAME: 'USDC-WETH',
        TotalCollateral: '',
        TOKEN_A: { ...scroll['usdc'] },
        TOKEN_B: { ...scroll['weth'] },
        POOL_MANAGER: '0x63FdAFA50C09c49F594f47EA7194b721291ec50f',
      },
      {
        POOL_NAME: 'DAI-WETH',
        TotalCollateral: '',
        TOKEN_A: { ...scroll['dai'] },
        TOKEN_B: { ...scroll['weth'] },
        POOL_MANAGER: '0x43187A6052A4BF10912CDe2c2f94953e39FcE8c7',
      },
      {
        POOL_NAME: 'USDT-wstETH',
        TotalCollateral: '',
        TOKEN_A: { ...scroll['usdt'] },
        TOKEN_B: { ...scroll['wsteth'] },
        POOL_MANAGER: '0x5c121db888aD212670017080047Ed16CE99a2a96',
      },
      {
        POOL_NAME: 'wstETH-USDT',
        TotalCollateral: '',
        TOKEN_A: { ...scroll['wsteth'] },
        TOKEN_B: { ...scroll['usdt'] },
        POOL_MANAGER: '0x04BB9Bca2F8955051966B6dA5398AD1B3a832762',
      },
    ],
  },
};

export default { basic, networks };
