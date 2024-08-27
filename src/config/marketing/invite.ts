
export type InviteConfigType = {
  okx: Wallet;
  coin68: Wallet;
  bitget: Wallet;
  namlongdao: Wallet;
  kol: Wallet;
  coin98: Wallet;
}

export type Wallet = {
  logo: string;
  name: string;
  platform: keyof InviteConfigType;
  tips: string[];
  logoSize?: LogoSize;
}

export type LogoSize = {
  width: number;
  height: number;
}

export const InviteConfig: InviteConfigType = {
  okx: {
    logo: '/images/marketing/okx.png',
    name: 'OKX Wallet',
    platform: "okx",
    tips: [
      "You are visiting a invitation link from DadDap partener OKX Wallet.",
      "Connect your wallet to keep visiting.",
    ],
  },
  coin68: {
    logo: '/images/marketing/coin68.svg',
    name: 'Coin68',
    platform: "coin68",
    tips: [
      "You are visiting a invitation link from DadDap partener Coin68 Wallet.",
      "Connect your wallet to keep visiting.",
    ],
    logoSize: {
      width: 90,
      height: 47,
    }
  },
  bitget: {
    logo: '/images/marketing/bitget.png',
    name: 'Bitget Wallet',
    platform: "bitget",
    tips: [
      "You are visiting a invitation link from DadDap partener Bitget Wallet.",
      "Connect your wallet to keep visiting.",
    ],
    logoSize: {
      width: 52,
      height: 52,
    },
  },
  namlongdao: {
    logo: '/images/marketing/namlong-logo-2.png',
    name: 'NamLongDAO',
    platform: "namlongdao",
    tips: [
      "You are visiting a invitation link from DadDap partener NamLongDAO.",
      "Connect your wallet to keep visiting.",
    ],
    logoSize: {
      width: 80,
      height: 80,
    },
  },
  coin98: {
    logo: '/images/marketing/coin98.png',
    name: 'Coin98 Wallet',
    platform: "coin98",
    tips: [
      "You are visiting a invitation link from DadDap partener Coin98 Wallet. ",
      "Connect your wallet to keep visiting.",
    ],
    logoSize: {
      width: 60,
      height: 60,
    },
  },
  kol: {
    logo: '',
    name: 'Kol',
    platform: "kol",
    tips: [
      "You are visiting a invitation link from DadDap Kol Stardapps.",
      "Connect your wallet to keep visiting.",
    ],
    logoSize: {
      width: 80,
      height: 80,
    },
  },

};
