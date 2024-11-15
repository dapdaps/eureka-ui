import Big from 'big.js';
const NON_STABLE_FACTOR: any = {
  '0x51AB74f8B03F0305d8dcE936B473AB587911AEC4': [0.9, 1.07],
  '0x9c9F28672C4A8Ad5fb2c9Aca6d8D68B02EAfd552': [0.85, 1.1],
  '0x44949636f778fAD2b139E665aee11a2dc84A2976': [0.85, 1.1],
  '0x5071c003bB45e49110a905c1915EbdD2383A89dF': [0.85, 1.1]
};
const STABLE_FACTOR: any = {
  '0x00A55649E597d463fD212fBE48a3B40f0E227d06': [0.95, 1.05],
  '0xadA66a8722B5cdfe3bC504007A5d793e7100ad09': [0.92, 1.08]
};

export default function () {
  const getWeightedAverageAPY = ({ type, prices, tokens, markets, usdcPrice, totalBalanceUSD }: any) => {
    let weightedAverageAPY = Big(0);
    tokens?.forEach((token: any) => {
      const [address, amount] = token;
      const market = markets[address];
      const positionBalanceUSD = Big(amount).times(prices[address]).div(usdcPrice);
      const positionAPY = Big(type === 'deposit' ? market?.supplyApy : market?.borrowApy);

      weightedAverageAPY = Big(weightedAverageAPY).plus(
        Big(totalBalanceUSD).eq(0) ? 0 : Big(positionBalanceUSD).times(positionAPY).div(totalBalanceUSD)
      );
    });
    return weightedAverageAPY.toFixed();
  };
  const getNetApy = (collaterals: any, borrows: any, markets: any, prices: any) => {
    if (collaterals?.length > 0) {
      const usdcPrice = prices?.['0x00A55649E597d463fD212fBE48a3B40f0E227d06'];

      const totalSuppliedUSD = collaterals?.reduce(
        (accumulator: any, curr: any) =>
          Big(accumulator).plus(
            Big(curr?.[1] ?? 0)
              .times(prices[curr?.[0]])
              .div(usdcPrice)
          ),
        0
      );
      const weightedAverageSupplyAPY = getWeightedAverageAPY({
        prices,
        markets,
        usdcPrice,
        tokens: collaterals,
        type: 'deposit',
        totalBalanceUSD: totalSuppliedUSD
      });

      console.log('====borrows', borrows);
      const totalBorrowedUSD =
        borrows?.reduce(
          (accumulator: any, curr: any) =>
            Big(accumulator).plus(
              Big(curr?.[1] ?? 0)
                .times(prices[curr?.[0]])
                .div(usdcPrice)
            ),
          0
        ) ?? 0;

      if (Big(totalSuppliedUSD).eq(0)) {
        return NaN;
      } else if (Big(totalBorrowedUSD).eq(0)) {
        return Big(weightedAverageSupplyAPY).toFixed();
      } else {
        const weightedAverageBorrowAPY = getWeightedAverageAPY({
          prices,
          markets,
          usdcPrice,
          tokens: borrows,
          type: 'borrow',
          totalBalanceUSD: totalBorrowedUSD
        });
        return Big(weightedAverageSupplyAPY)
          .minus(Big(weightedAverageBorrowAPY).times(Big(totalBorrowedUSD).div(totalSuppliedUSD)))
          .toFixed();
      }
    } else {
      return NaN;
    }
  };
  const getFactorsMode = (_depositDataList: any, _borrowDataList: any, factors: any) => {
    if (_depositDataList?.length > 0 && _borrowDataList?.length > 0) {
      const keys = Object.keys(factors);
      for (let i = 0; i < _depositDataList?.length; i++) {
        if (!keys.includes(_depositDataList[i]?.address)) return false;
      }
      for (let i = 0; i < _borrowDataList?.length; i++) {
        if (!keys.includes(_borrowDataList[i]?.address)) return false;
      }
      return true;
    } else {
      return false;
    }
  };
  const getMode = (_depositDataList: any, _borrowDataList: any) => {
    console.log('=_depositDataList', _depositDataList);
    console.log('=_borrowDataList', _borrowDataList);
    console.log(
      '=getFactorsMode(_depositDataList, _borrowDataList, STABLE_FACTOR)',
      getFactorsMode(_depositDataList, _borrowDataList, STABLE_FACTOR)
    );
    if (getFactorsMode(_depositDataList, _borrowDataList, STABLE_FACTOR)) {
      return 'stable';
    }
    if (getFactorsMode(_depositDataList, _borrowDataList, NON_STABLE_FACTOR)) {
      return 'nonStable';
    }
    return 'general';
  };
  const getCollateralCredit = (_depositDataList: any, _mode: any, _prices: any) => {
    let total: any = 0;
    _depositDataList?.forEach((currentData: any, index: number) => {
      const _collateralFactorMapping: any = {
        stable: STABLE_FACTOR?.[currentData?.address]?.[0],
        nonStable: NON_STABLE_FACTOR?.[currentData?.address]?.[0]
      };
      const _collateralFactor = _collateralFactorMapping[_mode] || currentData?.collateralFactor;
      total = Big(total).plus(Big(currentData?.amount).times(_prices[currentData?.address]).times(_collateralFactor));
    });
    return total;
  };
  const getBorrowCredit = (_borrowDataList: any, _mode: any, _prices: any) => {
    let total: any = 0;
    _borrowDataList?.forEach((currentData: any, index: number) => {
      const _borrowFactorMapping: any = {
        stable: STABLE_FACTOR?.[currentData?.address]?.[1],
        nonStable: NON_STABLE_FACTOR?.[currentData?.address]?.[1]
      };
      const _borrowFactor = _borrowFactorMapping[_mode] || currentData?.borrowFactor;

      console.log('==_borrowFactor', _borrowFactor);
      total = Big(total).plus(Big(currentData?.amount).times(_prices[currentData?.address]).times(_borrowFactor));
    });
    return total;
  };
  const getHealthFactor = (depositDataList: any, borrowDataList: any, prices: any) => {
    if (depositDataList?.length > 0 && borrowDataList?.length > 0) {
      const mode = getMode(depositDataList, borrowDataList);
      const CollateralCredit = getCollateralCredit(depositDataList, mode, prices);

      console.log('===CollateralCredit', CollateralCredit.toString());
      const BorrowCredit = getBorrowCredit(borrowDataList, mode, prices);
      console.log('===borrowDataList', borrowDataList);
      console.log('=BorrowCredit', BorrowCredit.toString());
      return Big(CollateralCredit)
        .div(BorrowCredit ? BorrowCredit : 1)
        .toFixed();
    } else {
      return Infinity;
    }
  };

  return {
    getNetApy,
    getMode,
    getCollateralCredit,
    getBorrowCredit,
    getHealthFactor
  };
}
