import Big from 'big.js';

const formateAddress = (address: string) => {
  if (!address) return '-';

  if (address.indexOf('.near') > -1) return address;

  return address.slice(0, 6) + '...' + address.slice(-4);
};

function addThousandSeparator(numberString: string) {
  const parts = numberString.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1] ? `.${parts[1]}` : '';
  return integerPart + decimalPart;
}

const formateValue = (value: string | number, precision: number) => {
  if (Big(value || 0).eq(0)) return '0';

  if (Big(value).lt(Big(10).pow(-precision))) {
    return `< ${Big(10).pow(-precision).toFixed(precision)}`;
  } else {
    return parseFloat(Big(value).toFixed(precision));
  }
};

const formateValueWithThousandSeparator = (value: string | number | Big.Big | undefined, precision: number) => {
  if (!value) return '0';
  if (Big(value).eq(0)) return '0';

  if (Big(value).lt(Big(10).pow(-precision))) {
    return `< ${Big(10).pow(-precision).toFixed(precision)}`;
  } else {
    return addThousandSeparator(Big(value).toFixed(precision));
  }
};

const formateValueWithThousandSeparatorAndFont = (
  value: string | number | Big.Big | undefined,
  precision: number,
  isSimple?: boolean,
  options?: {
    // resolve the issue of displaying values like $< 0.01
    // it should display as < $0.01
    prefix?: string;
    // when it is less than a certain value
    // 0 should be displayed in the integer part
    // not in the decimal part
    isLTIntegerZero?: boolean;
    // should zeros be added at the end
    isZeroPrecision?: boolean;
    isShort?: boolean;
  },
): any => {

  const { prefix = '', isLTIntegerZero, isZeroPrecision, isShort } = options || {};

  if (!value || Big(value).eq(0)) {
    if (isSimple) {
      if (isZeroPrecision) {
        return `${prefix}${Big(0).toFixed(precision)}`;
      }
      return `${prefix}0`;
    }
    if (isZeroPrecision) {
      return {
        integer: `${prefix}0`,
        decimal: Big(0).toFixed(precision).replace(/^\d/, ''),
      };
    }
    return {
      integer: `${prefix}0`,
      decimal: '',
    };
  }

  if (Big(value).lt(Big(10).pow(-precision))) {
    if (isSimple) {
      return `< ${prefix}${Big(10).pow(-precision).toFixed(precision)}`;
    }
    if (isLTIntegerZero) {
      return {
        integer: `< ${prefix}0`,
        decimal: Big(10).pow(-precision).toFixed(precision).replace(/^\d/, ''),
      };
    }
    return {
      integer: '',
      decimal: `< ${prefix}${Big(10).pow(-precision).toFixed(precision)}`,
    };
  }

  const finalValue = addThousandSeparator(Big(value).toFixed(precision));
  const firstPart = finalValue.split('.')[0];
  let secondPart = finalValue.split('.')[1] || '';
  if (secondPart) {
    secondPart = '.' + secondPart;
  }
  if (isSimple) {
    if (isShort) {
      const formatter = (split: number, unit: string): string => {
        const _num = Big(value).div(split).toFixed(precision, 0).replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
        const inter = _num.split('.')?.[0]?.replace(/\d(?=(\d{3})+\b)/g, '$&,');
        const decimal = _num.split('.')?.[1] ?? '';
        return `${prefix}${inter}${decimal ? '.' + decimal : ''}${unit}`;
      };
      if (Big(value).gte(1e9)) {
        return formatter(1e9, 'b');
      }
      if (Big(value).gte(1e6)) {
        return formatter(1e6, 'm');
      }
      if (Big(value).gte(1e3)) {
        return formatter(1e3, 'k');
      }
    }
    if (isZeroPrecision) {
      return `${prefix}${firstPart}${secondPart}`;
    }
    return `${prefix}${firstPart}${secondPart.replace(/[.]?0*$/, '')}`;
  }
  if (isZeroPrecision) {
    return {
      integer: `${prefix}${firstPart}`,
      decimal: secondPart,
    };
  }
  return {
    integer: `${prefix}${firstPart}`,
    decimal: secondPart.replace(/[.]?0*$/, ''),
  };
};

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const simplifyNumber = function (number: number, decimal: number) {
  if (typeof Number(number) !== 'number') return 0;
  if (isNaN(Number(number))) return 0;
  if (number >= 1E3 && number < 1E6) {
    return Math.round(number / 1E3) + 'K';
  } else if (number >= 1E6) {
    return Math.round(number / 1E6) + 'M';
  } else {
    return Big(number).toFixed(decimal);
  }
}
const formatValueDecimal = function (value: any, unit = '', decimal = 0, simplify = false) {
  const target = Big(1).div(Math.pow(10, decimal))
  if (Big(value).eq(0)) {
    return '-'
  } else if (Big(value).gt(0)) {
    if (Big(value).lt(target)) {
      return `<${unit}${target}`
    } else {
      return unit + (simplify ? simplifyNumber(value, decimal) : Big(value).toFixed(decimal))
    }
  } else {
    return unit + (simplify ? simplifyNumber(value, decimal) : Big(value).toFixed(decimal))
  }
}


/**
 * Extracts the path from a given URL.
 *
 * @param url - The URL from which to extract the path.
 * @returns The extracted path from the URL.
 */
const extractPathFromUrl = (url: string): string => {
  try {
    const urlObject = new URL(url);
    return urlObject.pathname + urlObject.search + urlObject.hash;
  } catch (error) {
    return '';
  }
};

export const isExternalUrl = (url: string): boolean => {
  try {
    const urlObject = new URL(url);
    return urlObject.origin !== window.location.origin;
  } catch (error) {
    return false;
  }
};

export {
  formateAddress,
  formateValue,
  formateValueWithThousandSeparator,
  formateValueWithThousandSeparatorAndFont,
  getRandomInt,
  formatValueDecimal,
  extractPathFromUrl,
};
