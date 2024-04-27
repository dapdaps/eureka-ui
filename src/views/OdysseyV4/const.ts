export const GOLD_QUESTS = ['Particle', 'Ring Protocol', 'Ambient'];

export const ParticleLink = 'https://app.particle.trade/0xe557Fa3DA7c728E9c7e7E76555773BAF00205654';

export const GoldsMap = new Map([
  [
    'Particle',
    {
      logo: '/images/odyssey/v4/logo-particle.svg',
      link: ParticleLink,
      rank1: 1000,
      rank2: 500,
      rank3: 500,
      reward: '1%',
      desc: 'When you use Particle Trade by Particle on DapDap, you not only receive the same Blast Gold rewards as you would on other platforms but also an additional bonus from a pool of Gold allocated to DapDap.',
    },
  ],
  [
    'Ring Protocol',
    {
      logo: '/images/odyssey/v4/logo-thruster.svg',
      link: '',
      rank1: 1000,
      rank2: 500,
      rank3: 500,
      reward: '1%',
      desc: 'When you use Particle Trade by Particle on DapDap, you not only receive the same Blast Gold rewards as you would on other platforms but also an additional bonus from a pool of Gold allocated to DapDap.',
    },
  ],
  [
    'Ambient',
    {
      logo: '/images/odyssey/v4/logo-pac.svg',
      link: `${location.origin}/dapp/pac-finance`,
      rank1: 1000,
      rank2: 500,
      rank3: 500,
      reward: '1%',
      desc: 'When you use Particle Trade by Particle on DapDap, you not only receive the same Blast Gold rewards as you would on other platforms but also an additional bonus from a pool of Gold allocated to DapDap.',
    },
  ],
]);
