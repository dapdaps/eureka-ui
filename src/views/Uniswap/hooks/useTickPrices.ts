import { useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import Big from 'big.js';
import { getPoolInfo } from '../utils/getPool';
import { getTokenAddress } from '../utils';
import { getTickFromPrice } from '../utils/getTick';

export default function useTicks({ fee = 3000, token0, token1 }: any) {
  const { provider } = useAccount();
  const [loading, setLoading] = useState(false);
  const [noPair, setNoPair] = useState(false);
  const [lowerTick, setLowerTick] = useState<number>();
  const [highTick, setHighTick] = useState<number>();
  const [currentTick, setCurrentTick] = useState<number>();
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (!token0 || !token1 || !fee || !provider) return;
    const getTicks = async () => {
      try {
        setLoading(true);
        const {
          currentTick,
          tickSpacing,
          token0: _token0,
          token1: _token1,
        } = await getPoolInfo({
          token0: getTokenAddress(token0.address, true),
          token1: getTokenAddress(token1.address, true),
          fee,
          provider,
        });
        if (!_token0 && !_token1) {
          setNoPair(true);
          setLoading(false);
          return;
        }
        if (currentTick !== 0) {
          const NearestLowTick = Math.floor(currentTick / tickSpacing) * tickSpacing;
          const NearestHighTick = Math.floor(currentTick / tickSpacing) * tickSpacing + tickSpacing;
          setLowerTick(NearestLowTick);
          setHighTick(NearestHighTick);
        }
        setCurrentTick(currentTick);
        setLoading(false);
        setNoPair(false);
        const _reverse = token0.address.toLowerCase() !== getTokenAddress(_token0, false).toLowerCase();
        setReverse(_reverse);
      } catch (err) {
        setLoading(false);
      }
    };
    getTicks();
  }, [token0, token1, fee, provider]);

  const setCurrentTickFromPrice = async (price: any, _token0?: any, _token1?: any) => {
    // const TICK_SPACING: any = {
    //   100: 1,
    //   500: 10,
    //   3000: 60,
    //   10000: 200,
    // };
    // const tickSpacing = TICK_SPACING[fee];

    const tick = await getTickFromPrice({ token0: _token0 || token0, token1: _token1 || token1, price, provider, fee });
    // const _lowerTick = Math.floor(tick / tickSpacing) * tickSpacing;
    // const _higherTick = Math.floor(tick / tickSpacing) * tickSpacing + tickSpacing;
    // setLowerTick(_lowerTick);
    setCurrentTick(tick);
    // setHighTick(_higherTick);
  };

  return {
    loading,
    noPair,
    lowerTick,
    highTick,
    currentTick,
    reverse,
    setNoPair,
    setReverse,
    setLowerTick,
    setHighTick,
    setCurrentTickFromPrice,
  };
}
