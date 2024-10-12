import Big from 'big.js';

export default function getZoomDataByFee(fee: number) {
  const BFee = Big(fee || 0);

  if (BFee.lt(500)) return { initialMin: 0.999, initialMax: 1.001, zoomMin: 0.00001, zoomMax: 1.5 };
  if (BFee.lt(2000)) return { initialMin: 0.999, initialMax: 1.001, zoomMin: 0.00001, zoomMax: 3 };
  return {
    initialMin: 0.5,
    initialMax: 2,
    zoomMin: 0.00001,
    zoomMax: 20
  };
}
