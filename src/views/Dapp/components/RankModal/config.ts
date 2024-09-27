export const columns = [
  {
    key: 'rank',
    label: 'Rank',
    width: '30%'
  },
  {
    key: 'account',
    label: 'User address',
    width: '30%'
  },
  {
    key: 'trading_volume',
    label: 'Trading Volume',
    width: '20%'
  },
  {
    key: 'rewards',
    label: 'Rewards',
    width: '20%'
  }
];

export const RANK_COLORS: { [key: number]: [string, string] } = {
  1: ['#FFEE98', '#E9AE45'],
  2: ['#D8E7FF', '#85628A'],
  3: ['#E7BA9A', '#805F48']
};
