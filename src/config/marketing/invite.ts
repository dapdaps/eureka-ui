export type InviteConfigType = {
  okx: Wallet;
  coin68: Wallet;
  bitget: Wallet;
  namlongdao: Wallet;
  kol: Wallet;
  coin98: Wallet;
};

export type Wallet = {
  logo: string;
  name: string;
  platform: keyof InviteConfigType;
  tips: string[];
  logoSize?: LogoSize;
  medals?: string[];
};

export type LogoSize = {
  width: number;
  height: number;
};

export const InviteConfig: InviteConfigType = {
  okx: {
    logo: '/images/marketing/okx.png',
    name: 'OKX Wallet',
    platform: 'okx',
    tips: [
      'Unlock the exclusive OKX Wallet Pioneer Medal by connecting your wallet through this page!',
      "Welcome Bonus: If you connect with OKX Wallet for the first time, you'll receive a one-time reward of 10 Gems as a special welcome gift.",
      "Don't miss out on maximizing your rewards!"
    ],
    medals: ['/images/marketing/okx-wallet-pioneer.png']
  },
  coin68: {
    logo: '/images/marketing/coin68.svg',
    name: 'Coin68',
    platform: 'coin68',
    tips: [
      'Unlock the exclusive Coin 68 Pioneer Medal by connecting your wallet through this page!',
      "Don't miss out on maximizing your rewards!"
    ],
    logoSize: {
      width: 90,
      height: 47
    },
    medals: ['/images/marketing/coin68-wallet-pioneer.png']
  },
  bitget: {
    logo: '/images/marketing/bitget.png',
    name: 'Bitget Wallet',
    platform: 'bitget',
    tips: [
      'Unlock the exclusive Bitget Wallet Pioneer Medal by connecting your wallet through this page!',
      "Welcome Bonus: If you connect with Bitget Wallet for the first time, you'll receive a one-time reward of 10 Gems as a special welcome gift.",
      "Don't miss out on maximizing your rewards!"
    ],
    logoSize: {
      width: 52,
      height: 52
    },
    medals: ['/images/marketing/bitget-wallet-pioneer.png']
  },
  namlongdao: {
    logo: '/images/marketing/namlong-logo-2.png',
    name: 'NamLongDAO',
    platform: 'namlongdao',
    tips: [
      'You have been invited by [NamLondDAO] to join DapDap! ',
      'Connect your wallet and receive 10 Gems reward.',
      'To claim this reward, you need to complete an on-chain transaction within DapDap. Please note that this excludes wrap transactions like wETH-ETH, ETH-wETH, and stablecoin swaps.'
    ],
    logoSize: {
      width: 80,
      height: 80
    }
  },
  coin98: {
    logo: '/images/marketing/coin98.png',
    name: 'Coin98 Wallet',
    platform: 'coin98',
    tips: [
      'Unlock the exclusive Coin98 Wallet Pioneer Medal by connecting your wallet through this page!',
      "Welcome Bonus: If you connect with Coin98 Wallet for the first time, you'll receive a one-time reward of 10 Gems as a special welcome gift.",
      "Don't miss out on maximizing your rewards!"
    ],
    logoSize: {
      width: 60,
      height: 60
    },
    medals: ['/images/marketing/coin98-wallet-pioneer.png']
  },
  kol: {
    logo: '',
    name: 'Kol',
    platform: 'kol',
    tips: [
      'You have been invited by [Stardapps] to join DapDap! ',
      'Connect your wallet and receive 10 Gems reward.',
      'To claim this reward, you need to complete an on-chain transaction within DapDap. Please note that this excludes wrap transactions like wETH-ETH, ETH-wETH, and stablecoin swaps.'
    ],
    logoSize: {
      width: 80,
      height: 80
    }
  }
};
