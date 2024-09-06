import Big from 'big.js';

export const formatBorrowLimit = (digits: any, round: any, data: any) => {
  if (!data || !data.config) return '0.00';

  if (data.config.name === 'Ionic') {
    const currentTokenCollateralUSD = Big(data.userCollateralUSD || 0).times(Big(data.COLLATERAL_FACTOR));

    const _borrowLimit = Big(data.totalCollateralUsd)
      .minus(currentTokenCollateralUSD)
      .div(1.07)
      .minus(Big(data.userTotalBorrowUsd));
    return _borrowLimit.lte(0) ? 0 : _borrowLimit.toFixed(6);
  }

  if (Big(data.totalCollateralUsd).gt(data.userTotalBorrowUsd)) {
    return Big(data.totalCollateralUsd)
      .minus(data.userTotalBorrowUsd)
      .toFixed(digits || 2, round || 1);
  }

  return '0.00';
};
