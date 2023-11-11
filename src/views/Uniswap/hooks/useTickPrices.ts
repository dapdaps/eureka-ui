import { useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import Big from 'big.js';
import { getPoolInfo } from '../utils/getPool';
import { getTokenAddress } from '../utils';
import { getTickAtSqrtRatio } from '../utils/getTick';
import { sortTokens } from '../utils/sortTokens';

export default function useTicks({ fee = 3000, token0, token1, price }: any) {
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
        const NearestLowTick = Math.floor(currentTick / tickSpacing) * tickSpacing;
        const NearestHighTick = Math.floor(currentTick / tickSpacing) * tickSpacing + tickSpacing;
        setLowerTick(NearestLowTick);
        setHighTick(NearestHighTick);
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

  const getTicksFromPrice = async (price: any) => {
    const [_token0, _token1] = sortTokens(token0, token1);
    const isReverse = _token0.address !== token0.address;

    const mathPrice = (isReverse ? price : 1 / price) / 10 ** (_token0.decimals - _token1.decimals);
    const _sqrtPriceX96 = new Big(mathPrice)
      .sqrt()
      .mul(2 ** 96)
      .toFixed(0);
    const tick = await getTickAtSqrtRatio(_sqrtPriceX96, provider);
    const _lowerTick = Math.floor(tick / 60) * 60;
    const _higherTick = Math.floor(tick / 60) * 60 + 60;
    setLowerTick(_lowerTick);
    setCurrentTick(tick);
    setHighTick(_higherTick);
  };

  useEffect(() => {
    if (noPair && price && !new Big(price).eq(0)) getTicksFromPrice(price);
  }, [price]);
  return {
    loading,
    noPair,
    lowerTick,
    highTick,
    currentTick,
    reverse,
    setReverse,
    setLowerTick,
    setHighTick,
  };
}
