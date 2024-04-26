export default {
  1: {
    path: '/odyssey/home?id=1',
    video: '',
    chainsImg: '/images/compass/v1_chains.png',
    chainsHeight: '69px',
    reward: '10,000',
    tips: 'Effortlessly sift through a curated selection of dApps and identify your favourites.',
  },
  2: {
    path: '/odyssey/home?id=2',
    video: '/videos/odyssey2.mp4',
    chainsImg: '/images/odyssey/v2/chains.png',
    chainsHeight: '56px',
    reward: '',
    tips: 'Venture into Linea\'s Expansive DeFi Ecosystem'
  },
  3: {
    path: '/odyssey/home?id=3',
    video: '/videos/odyssey3.mp4',
    chainsImg: '/images/odyssey/v3/chains.png',
    chainsHeight: '56px',
    reward: '8,500',
    tips: 'Venture into Scroll\'s Expansive DeFi Ecosystem.'
  },
} as {
  [key: string]: {
    path: string;
    video: string;
    chainsImg: string;
    reward: string;
    chainsHeight: string;
    tips: string;
  };
};
