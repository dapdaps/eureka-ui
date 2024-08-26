import { mode } from '@/config/tokens/mode';

import { formatToken,formatTokenKey } from '../helpers';

const contracts: { [key: number]: any } = {
  34443: {
    PositionManager: '0x2e8614625226D26180aDf6530C3b1677d3D7cf10',
    Factory: '0xB5F00c2C5f8821155D8ed27E31932CFD9DB3C5D5',
  },
};

const tokens: { [key: number]: any } = {
  34443: [mode['kim'], mode['mode'], mode['eth'], mode['usdc'], mode['ezeth'], mode['we-eth.mode'], mode['wrseth']]
    .map((token) => formatToken(token))
    .reduce((acc, curr) => ({ ...acc, [formatTokenKey(curr)]: curr }), {}),
};

const pairs = {
  '0x86d9d9dd7a2c3146c6fad51646f210cb2e5fc12f': {
    tokens: [formatTokenKey(mode['kim']), formatTokenKey(mode['mode'])],
    address: '0x86d9d9dd7a2c3146c6fad51646f210cb2e5fc12f',
    tickSpacing: 60,
    boost: ['5x Mode points'],
    event: ['1 million in May'],
    kim: '8.7K',
    xkim: '108.9K',
  },
  '0x3c3a173984e3152fed868345904ec0c9325fa516': {
    tokens: [formatTokenKey(mode['eth']), formatTokenKey(mode['kim'])],
    address: '0x3c3a173984e3152fed868345904ec0c9325fa516',
    tickSpacing: 60,
    boost: ['5x Mode points'],
    event: ['1 million in May'],
    xkim: '138.6K',
  },
  '0x468cc91df6f669cae6cdce766995bd7874052fbc': {
    tokens: [formatTokenKey(mode['eth']), formatTokenKey(mode['usdc'])],
    address: '0x468cc91df6f669cae6cdce766995bd7874052fbc',
    tickSpacing: 60,
    boost: ['5x Mode points'],
    event: ['1 million in May'],
    kim: '13.9K',
    xkim: '55.4K',
  },
  '0x8cfe2a02dfbabc56ae7e573170e35f88a38bea55': {
    tokens: [formatTokenKey(mode['eth']), formatTokenKey(mode['mode'])],
    address: '0x8cfe2a02dfbabc56ae7e573170e35f88a38bea55',
    tickSpacing: 60,
    boost: ['5x Mode points'],
    event: ['1 million in May'],
    kim: '2.8K',
    xkim: '13.9K',
  },
  '0xd9a06f63e523757973ffd1a4606a1260252636d2': {
    tokens: [formatTokenKey(mode['ezeth']), formatTokenKey(mode['eth'])],
    address: '0xd9a06f63e523757973ffd1a4606a1260252636d2',
    tickSpacing: 60,
    boost: ['4x Mode points', 'ETH staking APR', 'EL staking APR', '4x ezPoints', '1x EL points'],
    kim: '4.0K',
    xkim: '20.2K',
  },
  '0xe24c8feb38ca2b18b542994bfba7e70880171035': {
    tokens: [formatTokenKey(mode['we-eth.mode']), formatTokenKey(mode['eth'])],
    address: '0xe24c8feb38ca2b18b542994bfba7e70880171035',
    tickSpacing: 60,
    boost: ['4x Mode points', 'ETH staking APR', 'EL staking APR', '3x Etherfi points', '1x EL points'],
    kim: '5.5K',
    xkim: '27.7K',
  },
  '0x27f0976b26194c448d987c275bb409eab6083964': {
    tokens: [formatTokenKey(mode['wrseth']), formatTokenKey(mode['eth'])],
    address: '0x27f0976b26194c448d987c275bb409eab6083964',
    tickSpacing: 60,
    boost: ['4x Mode points', '2x Kelp Miles', '1x EL points'],
    kim: '5.5K',
    xkim: '27.7K',
  },
};

export default {
  contracts,
  tokens,
  pairs,
};
