import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'Sturdy',
  data: 'bluebiu.near/widget/Lending.Data.Sturdy',
  // handler: '',
  type: '',
};

const networks = {
  //  mode
  34443: {
    rawMarkets: [
      {
        POOL_NAME: 'ezETH-WETH',
        TOKEN_A: { ...mode['ezeth'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0xb93B53CA8a51A78348a9B22718ca7fe77D13B900',
      },
      {
        POOL_NAME: 'weETH.mode-WETH',
        TOKEN_A: { ...mode['we-eth.mode'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0xC8F05Ad2Eb7fc894b822EDb9C07234149375C7A3',
      },
      {
        POOL_NAME: 'wrsETH-WETH',
        TOKEN_A: { ...mode['wrseth'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0xFd5BdCfFD891F746FbC168cB3c7ea0EFDcE8B6bA',
      },
      {
        POOL_NAME: 'MODE-WETH',
        TOKEN_A: { ...mode['mode'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0xd056dfd960A69Fa983c9DFb20eDD28f1fd70fc8C',
        // MAX_LTV: 0.85,
        // Rate: 0.02,
        // APY: 0.02,
      },
      {
        POOL_NAME: 'WETH-USDC',
        TOKEN_A: { ...mode['weth'] },
        TOKEN_B: { ...mode['usdc'] },
        POOL_MANAGER: '0x9c896B5fc1b8b7d322e6F15826D150b7d0ACb140',
      },
      {
        POOL_NAME: 'USDC-WETH',
        TOKEN_A: { ...mode['usdc'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0x810539C09B61112Fb7Aa749a0D17dD2A60c8E00a',
      },
    ],
    TOKENS: [mode['weth'], mode['wrseth'], mode['ezeth'], mode['usdc'], mode['mode']],
  },
};

export default { basic, networks };
