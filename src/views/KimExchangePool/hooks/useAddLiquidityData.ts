import Big from 'big.js';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Token } from '@/types';
import useDappConfig from '@/views/Pool/hooks/useDappConfig';
import { priceToUsablePrice, priceToUsableTick,tickToPrice } from '@/views/Pool/utils/tickMath';
import { sortTokens } from '@/views/Pool/utils/token';

import { getPairByTokens, revertTokenAddress } from '../token';
import usePoolInfo from './usePoolInfo';

export default function useAddLiquidityData() {
  const { token0: _token0, token1: _token1, tokens: _tokens, pairs, currentChain } = useDappConfig();
  const [value0, setValue0] = useState<any>();
  const [value1, setValue1] = useState<any>();
  const [noPair, setNoPair] = useState(false);
  const [lowerPrice, setLowerPrice] = useState<any>();
  const [upperPrice, setUpperPrice] = useState<any>();
  const [currentPrice, setCurrentPrice] = useState<any>();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [range, setRange] = useState('');

  const tokens = useMemo(() => _tokens[currentChain.chain_id], [currentChain]);

  const token0 = useMemo(() => tokens[_token0], [_token0]);

  const token1 = useMemo(() => tokens[_token1], [_token1]);

  const pair = useMemo(
    () =>
      token0 && token1
        ? getPairByTokens({
            token0: token0.address,
            token1: token1.address,
            pairs: Object.values(pairs),
            chainId: currentChain.chain_id,
          })
        : null,
    [token0, token1],
  );

  const { info, loading: infoLoading } = usePoolInfo(pair?.address);

  const changeToken = ({ t0, t1 }: any) => {
    const params = new URLSearchParams(searchParams);

    if (t0) {
      params.set('token0', revertTokenAddress(t0, currentChain.chain_id));
    } else {
      params.delete('token0');
    }

    if (t1) {
      params.set('token1', revertTokenAddress(t1, currentChain.chain_id));
    } else {
      params.delete('token1');
    }

    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  };

  const onCleanAll = () => {
    onPriceChange('upper', '');
    onPriceChange('lower', '');
    setValue0('');
    setValue1('');
    setCurrentPrice('');
    setNoPair(false);
    changeToken({
      t0: null,
      t1: null,
    });
  };

  const onSelectToken = (token: Token, type: number) => {
    let t0 = token0?.address;
    let t1 = token1?.address;

    if (type === 0) {
      t0 = token.address;
      if (token === token1?.address) {
        t1 = null;
      }
    } else {
      t1 = token.address;
      if (token === token0?.address) {
        t0 = null;
      }
    }

    changeToken({ t0, t1 });
  };

  const onExchangeTokens = () => {
    const [_token1, _token0] = [token0, token1];
    changeToken({ t0: _token0?.address, t1: _token1?.address });
    setValue0('');
    setValue1('');
  };

  const reverse = useMemo(() => {
    if (!token0 || !token1) return false;
    const [_token0, _token1] = sortTokens(token0, token1);

    return _token0.address === token1.address;
  }, [token0, token1]);

  const rangeType = useMemo(() => {
    if (!token0 || !token1 || !lowerPrice || !upperPrice || !currentPrice || !info) return 0;
    if (lowerPrice === '0' || upperPrice === '∞') return 3;
    const lowerTick = priceToUsableTick({ price: lowerPrice, token0, token1, fee: 3000 });
    const upperTick = priceToUsableTick({ price: upperPrice, token0, token1, fee: 3000 });
    const currentTick = info.currentTick || priceToUsableTick({ price: currentPrice, token0, token1, fee: 3000 });
    const [_lowerTick, _upperTick] = lowerTick > upperTick ? [upperTick, lowerTick] : [lowerTick, upperTick];

    if (currentTick < _lowerTick) return 1;
    if (currentTick > _upperTick) return 2;
    return 0;
  }, [lowerPrice, upperPrice, currentPrice, info]);

  const onPriceChange = useCallback(
    (type: 'upper' | 'lower', price: any) => {
      if (!price) {
        type === 'upper' ? setUpperPrice('') : setLowerPrice('');
        return;
      }
      if (price === '0' || price === '∞') {
        type === 'upper' ? setUpperPrice(price) : setLowerPrice(price);
        return;
      }
      const _price = priceToUsablePrice({ price, token0, token1, fee: 3000 });

      type === 'upper' ? setUpperPrice(_price) : setLowerPrice(_price);
    },
    [token0, token1],
  );

  const onPointChange = useCallback(
    (stepType: 'add' | 'minus', type: 'upper' | 'lower') => {
      if (!token0 || !token1) return;

      const tickLower = priceToUsableTick({ price: lowerPrice, token0, token1, fee: 3000 });

      const tickUpper = priceToUsableTick({ price: upperPrice, token0, token1, fee: 3000 });

      let tick = type === 'lower' ? tickLower : tickUpper;

      const space = pair.tickSpacing;

      if (reverse) {
        stepType === 'add' ? (tick -= space) : (tick += space);
      } else {
        stepType === 'add' ? (tick += space) : (tick -= space);
      }

      const price = tickToPrice({ tick, token0, token1 });

      type === 'upper' ? setUpperPrice(price) : setLowerPrice(price);
    },
    [token0, token1, reverse, lowerPrice, upperPrice],
  );

  useEffect(() => {
    if (!range) {
      return;
    }
    if (range === 'Full') {
      setLowerPrice('0');
      setUpperPrice('∞');
      return;
    }
    let _lowerPrice = Big(0);
    let _upperPrice = Big(0);

    if (range === 'Narrow') {
      _lowerPrice = Big(currentPrice).mul(1 - 0.02);
      _upperPrice = Big(currentPrice).mul(1 + 0.03);
    }
    if (range === 'Common') {
      _lowerPrice = Big(currentPrice).mul(1 - 0.03);
      _upperPrice = Big(currentPrice).mul(1 + 0.06);
    }
    if (range === 'Wide') {
      _lowerPrice = Big(currentPrice).mul(1 - 0.07);
      _upperPrice = Big(currentPrice).mul(1 + 0.11);
    }

    setLowerPrice(priceToUsablePrice({ price: _lowerPrice, token0, token1, fee: 3000 }));
    setUpperPrice(priceToUsablePrice({ price: _upperPrice, token0, token1, fee: 3000 }));
  }, [range]);

  useEffect(() => {
    if (infoLoading) {
      setLoading(true);
      return;
    }
    if (!token0 || !token1) return;
    setNoPair(!info);

    if (!info) {
      setLoading(false);
      return;
    }

    const { currentTick } = info;
    const _currentPrice = tickToPrice({ token0, token1, tick: currentTick });
    setCurrentPrice(_currentPrice);
    const nearestLowTick = Math.floor(currentTick / 60) * 60;
    const nearestHighTick = Math.floor(currentTick / 60) * 60 + 60;
    const _lowerPrice = tickToPrice({ token0, token1, tick: reverse ? nearestHighTick : nearestLowTick });
    const _upperPrice = tickToPrice({ token0, token1, tick: reverse ? nearestLowTick : nearestHighTick });
    setLowerPrice(_lowerPrice);
    setUpperPrice(_upperPrice);
    setLoading(false);
  }, [info, infoLoading, reverse]);

  return {
    token0,
    token1,
    value0,
    value1,
    currentPrice,
    lowerPrice,
    upperPrice,
    noPair,
    loading,
    info,
    reverse,
    rangeType,
    range,
    onCleanAll,
    onSelectToken,
    onExchangeTokens,
    onPriceChange,
    onPointChange,
    setValue0,
    setValue1,
    setCurrentPrice,
    setNoPair,
    setRange,
  };
}
