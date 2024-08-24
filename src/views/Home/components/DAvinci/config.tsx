import { StyledBadge } from '@/views/Home/components/DAvinci/styles';

export const SwiperList: SwiperItem[] = [
  {
    key: 1,
    img: '/images/home/d-avinci/banner-1.png',
    title: (
      <>
        What is DapDap <StyledBadge>d’Avinci</StyledBadge> ?
      </>
    ),
    article: 'DapDap d\'Avinci—Next-gen DeFi consumer app. This update brings a brand-new UI, smoother user experience, and introduces exciting features like SuperSwap, Medal, Portfolio. Dive into DeFi journey with DapDap—where innovation meets the future of decentralized finance.',
  },
  {
    key: 2,
    img: '/images/home/d-avinci/banner-2.png',
    background: '#7371FC',
    title: 'Gems & Medals is coming!',
    article: 'We\'re upgrading the DapDap PTS system to a new Medals and Gems! Your PTS, past interactions, and transaction volume will now unlock unique medals and earn Gems. This upgrade is coming soon...',
  },
];

export interface SwiperItem {
  key: number; img: string; title: any; background?: string; article: any;
}
