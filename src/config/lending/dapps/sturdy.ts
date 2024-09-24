import { mode } from '@/config/tokens/mode';

const basic = {
  name: 'Sturdy',
  icon: 'https://s3.amazonaws.com/dapdap.prod/images/sturdy.png',
  data: 'bluebiu.near/widget/Lending.Sturdy.Data',
  // handler: '',
  type: 'borrow and earn',
  loaderName: 'Sturdy'
};

const networks = {
  //  mode
  34443: {
    markets: {
      '0xb93B53CA8a51A78348a9B22718ca7fe77D13B900': {
        name: 'ezETH-WETH',
        address: '0xb93B53CA8a51A78348a9B22718ca7fe77D13B900',
        rate: '0xAE610460522F3e71c40Ad6a2c70f486341B88Daf',
        protocolFee: 0.1,
        underlyingToken: { ...mode['ezeth'] },
        borrowToken: { ...mode['weth'] }
      },
      '0xC8F05Ad2Eb7fc894b822EDb9C07234149375C7A3': {
        name: 'weETH.mode-WETH',
        address: '0xC8F05Ad2Eb7fc894b822EDb9C07234149375C7A3',
        rate: '0xfd364c4f8E03b76F4D8f0f8121A0A31D05F49372',
        protocolFee: 0.1,
        underlyingToken: { ...mode['we-eth.mode'] },
        borrowToken: { ...mode['weth'] }
      },
      '0xFd5BdCfFD891F746FbC168cB3c7ea0EFDcE8B6bA': {
        name: 'wrsETH-WETH',
        address: '0xFd5BdCfFD891F746FbC168cB3c7ea0EFDcE8B6bA',
        rate: '0xcDE573EE42c64e297A842eEEF81eEcECA93A887C',
        protocolFee: 0,
        underlyingToken: { ...mode['wrseth'] },
        borrowToken: { ...mode['weth'] }
      },
      '0xd056dfd960A69Fa983c9DFb20eDD28f1fd70fc8C': {
        name: 'MODE-WETH',
        address: '0xd056dfd960A69Fa983c9DFb20eDD28f1fd70fc8C',
        rate: '0x90832de4D1915c6e5906F4605bABE7C84a08A0C2',
        protocolFee: 0.1,
        underlyingToken: { ...mode['mode'] },
        borrowToken: { ...mode['weth'] }
      },
      '0x810539C09B61112Fb7Aa749a0D17dD2A60c8E00a': {
        name: 'USDC-WETH',
        address: '0x810539C09B61112Fb7Aa749a0D17dD2A60c8E00a',
        rate: '0x39d9DBEBBA50b8dC89c2819e863C1E146235BFEF',
        protocolFee: 0,
        underlyingToken: { ...mode['usdc'] },
        borrowToken: { ...mode['weth'] }
      }
    },
    rawMarkets: [
      {
        POOL_NAME: 'ezETH-WETH',
        TOKEN_A: { ...mode['ezeth'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0xb93B53CA8a51A78348a9B22718ca7fe77D13B900',
        RATE_CONTRACT: '0xAE610460522F3e71c40Ad6a2c70f486341B88Daf',
        protocolFee: 0.1
      },
      {
        POOL_NAME: 'weETH.mode-WETH',
        TOKEN_A: { ...mode['we-eth.mode'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0xC8F05Ad2Eb7fc894b822EDb9C07234149375C7A3',
        RATE_CONTRACT: '0xfd364c4f8E03b76F4D8f0f8121A0A31D05F49372',
        protocolFee: 0.1
      },
      {
        POOL_NAME: 'wrsETH-WETH',
        TOKEN_A: { ...mode['wrseth'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0xFd5BdCfFD891F746FbC168cB3c7ea0EFDcE8B6bA',
        RATE_CONTRACT: '0xcDE573EE42c64e297A842eEEF81eEcECA93A887C',
        protocolFee: 0
      },
      {
        POOL_NAME: 'MODE-WETH',
        TOKEN_A: { ...mode['mode'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0xd056dfd960A69Fa983c9DFb20eDD28f1fd70fc8C',
        RATE_CONTRACT: '0x90832de4D1915c6e5906F4605bABE7C84a08A0C2',
        protocolFee: 0.1
        // MAX_LTV: 0.85,
        // Rate: 0.02,
        // APY: 0.02,
      },
      // {
      //   POOL_NAME: 'WETH-USDC',
      //   TOKEN_A: { ...mode['weth'] },
      //   TOKEN_B: { ...mode['usdc'] },
      //   POOL_MANAGER: '0x9c896B5fc1b8b7d322e6F15826D150b7d0ACb140',
      // },
      {
        POOL_NAME: 'USDC-WETH',
        TOKEN_A: { ...mode['usdc'] },
        TOKEN_B: { ...mode['weth'] },
        POOL_MANAGER: '0x810539C09B61112Fb7Aa749a0D17dD2A60c8E00a',
        RATE_CONTRACT: '0x39d9DBEBBA50b8dC89c2819e863C1E146235BFEF',
        protocolFee: 0
      }
    ],
    TOKENS: [mode['we-eth.mode'], mode['weth'], mode['wrseth'], mode['ezeth'], mode['usdc'], mode['mode']]
  }
};

export default { basic, networks };
