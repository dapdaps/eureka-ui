export const MAX_TICK = 887272;
export const MIN_TICK = -887272;

export const FEES: { [key: number]: any } = {
  500: {
    value: 500,
    space: 10,
    desc: 'Best for stable pairs'
  },
  3000: {
    value: 3000,
    space: 60,
    desc: 'Best for most pairs'
  },
  10000: {
    value: 10000,
    space: 200,
    desc: 'Best for exotic pairs'
  }
};
