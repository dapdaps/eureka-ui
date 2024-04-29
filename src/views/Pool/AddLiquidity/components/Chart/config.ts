export default {
  100: {
    initialMin: 0.999,
    initialMax: 1.001,
    zoomMin: 0.00001,
    zoomMax: 1.5,
  },
  400: {
    initialMin: 0.999,
    initialMax: 1.001,
    zoomMin: 0.00001,
    zoomMax: 1.5,
  },
  500: {
    initialMin: 0.999,
    initialMax: 1.001,
    zoomMin: 0.00001,
    zoomMax: 3,
  },
  2000: {
    initialMin: 0.5,
    initialMax: 2,
    zoomMin: 0.00001,
    zoomMax: 20,
  },
  3000: {
    initialMin: 0.5,
    initialMax: 2,
    zoomMin: 0.00001,
    zoomMax: 20,
  },
  10000: {
    initialMin: 0.5,
    initialMax: 2,
    zoomMin: 0.00001,
    zoomMax: 20,
  },
} as {
  [key: number]: {
    initialMin: number;
    initialMax: number;
    zoomMin: number;
    zoomMax: number;
  };
};
