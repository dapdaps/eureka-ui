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

const formateValueWithThousandSeparator = (value: string | number, precision: number) => {
  if (Big(value).eq(0)) return '0';

  if (Big(value).lt(Big(10).pow(-precision))) {
    return `< ${Big(10).pow(-precision).toFixed(precision)}`;
  } else {
    return addThousandSeparator(Big(value).toFixed(precision));
  }
};

const formateValueWithThousandSeparatorAndFont = (
  value: string | number,
  precision: number,
  isSimple?: boolean,
): any => {
  if (Big(value).eq(0))
    return isSimple
      ? '0'
      : {
          integer: '0',
          decimal: '',
        };

  if (Big(value).lt(Big(10).pow(-precision))) {
    return isSimple
      ? `< ${Big(10).pow(-precision).toFixed(precision)}`
      : {
          integer: '',
          decimal: `< ${Big(10).pow(-precision).toFixed(precision)}`,
        };
  } else {
    const finalValue = addThousandSeparator(Big(value).toFixed(precision));
    return isSimple
      ? `${finalValue.split('.')[0]}.${finalValue.split('.')[1]}`
      : {
          integer: finalValue.split('.')[0],
          decimal: '.' + finalValue.split('.')[1],
        };
  }
};

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const simplifyNumber = function (number: number, decimal: number) {
  if (typeof Number(number) !== 'number') return 0;
  if (isNaN(Number(number))) return 0;
  if (number >= 1E3 && number < 1E6) {
    return Math.floor(number / 1E3) + 'K';
  } else if (number >= 1E6) {
    return Math.floor(number / 1E6) + 'M';
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

export {
  formateAddress,
  formateValue,
  formateValueWithThousandSeparator,
  formateValueWithThousandSeparatorAndFont,
  getRandomInt,
  formatValueDecimal
};
