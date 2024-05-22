export default {
  1: {
    path: '/odyssey/home?id=1',
    video: '',
    chainsImg: '/images/compass/v1_chains.png',
    chainsHeight: '69px',
    reward: '10,000',
    rewardDisableIcon: '/images/odyssey/v1/rewardDisable.svg',
    rewardEnableIcon: '/images/odyssey/v1/rewardEnable.svg',
    tips: 'Effortlessly sift through a curated selection of dApps and identify your favourites.',
  },
  2: {
    path: '/odyssey/home?id=2',
    video: '/videos/odyssey2.mp4',
    chainsImg: '/images/odyssey/v2/chains.png',
    chainsHeight: '56px',
    reward: '',
    tips: "Venture into Linea's Expansive DeFi Ecosystem",
  },
  3: {
    path: '/odyssey/home?id=3',
    video: '/videos/odyssey3.mp4',
    chainsImg: '/images/odyssey/v3/chains.png',
    chainsHeight: '56px',
    reward: '8,500',
    rewardDisableIcon: '/images/odyssey/v3/rewardDisable.svg',
    rewardEnableIcon: '/images/odyssey/v3/rewardEnable.svg',
    tips: "Venture into Scroll's Expansive DeFi Ecosystem.",
  },
  4: {
    path: '/odyssey/home?id=4',
    video: '',
    chainsImg: '/images/odyssey/v4/chains.png',
    chainsHeight: '56px',
    reward: '6,900',
    rewardDisableIcon: '/images/odyssey/v4/rewardDisable.svg',
    rewardEnableIcon: '/images/odyssey/v4/rewardEnable.svg',
    tips: 'Explore, Trade, Earn - Go for Gold!',
  },
  7: {
    // fot v4 test
    path: '/odyssey/home?id=7',
    video: '',
    chainsImg: '/images/odyssey/v4/chains.png',
    chainsHeight: '56px',
    reward: '6,900',
    rewardDisableIcon: '/images/odyssey/v4/rewardDisable.svg',
    rewardEnableIcon: '/images/odyssey/v4/rewardEnable.svg',
    tips: 'Explore, Trade, Earn - Go for Gold!',
  },
} as {
  [key: string]: {
    path: string;
    video: string;
    chainsImg: string;
    reward: string;
    rewardDisableIcon?: string;
    rewardEnableIcon?: string;
    chainsHeight: string;
    tips: string;
  };
};
