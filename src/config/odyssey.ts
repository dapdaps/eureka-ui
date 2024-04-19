export default {
  1: {
    path: '/odyssey/home?id=1',
    chainsImg: '/images/compass/v1_chains.png',
    chainsHeight: '69px',
    reward: '10,000',
  },
  2: {
    path: '/odyssey/home?id=2',
    chainsImg: '/images/odyssey/v2/chains.png',
    chainsHeight: '56px',
    reward: '',
  },
  3: {
    path: '/odyssey/home?id=3',
    chainsImg: '/images/odyssey/v3/chains.png',
    chainsHeight: '56px',
    reward: '8,500',
  },
} as {
  [key: string]: {
    path: string;
    chainsImg: string;
    reward: string;
    chainsHeight: string;
  };
};
