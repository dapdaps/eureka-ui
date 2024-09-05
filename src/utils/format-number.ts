import Big from 'big.js';

export function formatThousandsSeparator(n: number | string, precision?: number): string {
  if (isNaN(Number(n))) return '';
  const strSplit = n.toString().split('.');
  const integer = strSplit[0].split('');
  integer.reverse();
  const decimal = strSplit[1];
  const newInteger = [];
  for (let i = 0; i < integer.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      newInteger.push(',');
    }
    newInteger.push(integer[i]);
  }
  newInteger.reverse();
  let s = newInteger.join('');
  if (decimal) {
    if (typeof precision === 'number') {
      const fixedDecimal = Big(`0.${decimal}`).toFixed(precision, 0).replace(/^\d/, '');
      return s + fixedDecimal;
    }
    s += `.${decimal}`;
  }
  return s;
}

export const simplifyNum = (number: number) => {
  if (typeof Number(number) !== 'number') return 0;
  if (isNaN(Number(number))) return 0;

  let str_num;
  if (number >= 1e3 && number < 1e6) {
    str_num = number / 1e3;
    return Math.floor(str_num) + 'K';
  } else if (number >= 1e6) {
    str_num = number / 1e6;
    return Math.floor(str_num) + 'M';
  } else {
    return Number(number).toFixed(2);
  }
};

interface Options {
  type?: 'simplify' | 'thousand';
  isFullDecimal?: boolean;
}

export const formatIntegerThousandsSeparator = (integer?: number | string, precision: number = 2, options?: Options): string => {
  options = options || {};
  const zero = options.isFullDecimal ? Big(0).toFixed(precision) : '0';
  if (!integer) {
    return zero;
  }
  if (typeof Number(integer) !== 'number') {
    return zero;
  }
  if (isNaN(Number(integer))) {
    return zero;
  }
  const _type = options.type ?? 'simplify';
  if (_type === 'thousand') {
    return formatThousandsSeparator(integer, precision);
  }
  if (_type === 'simplify') {
    const formatter = (split: number, unit: string): string => {
      const _num = Big(integer).div(split).toFixed(precision, 0).replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
      const inter = _num.split('.')?.[0]?.replace(/\d(?=(\d{3})+\b)/g, '$&,');
      const decimal = _num.split('.')?.[1] ?? '';
      return `${inter}${decimal ? '.' + decimal : ''}${unit}`;
    };
    if (Big(integer).gte(1e9)) {
      return formatter(1e9, 'b');
    }
    if (Big(integer).gte(1e6)) {
      return formatter(1e6, 'm');
    }
    if (Big(integer).gte(1e3)) {
      return formatter(1e3, 'k');
    }
    if (options.isFullDecimal) {
      return Big(integer).toFixed(precision, 0);
    }
    return Big(Big(integer).toFixed(precision, 0)).toString();
  }
  return '';
};

export function formatAmount(props: { amount?: string | number | Big.Big; digits?: number; prev?: string; }) {
  const { amount } = props;
  const digits = props.digits || 2;
  const prev = props.prev || '';
  if (!amount) return '-';
  const total = Big(amount);
  if (total.eq(0)) return prev + '0';
  const digitSplit = 1 / Math.pow(10, digits);

  if (total.lt(digitSplit)) return '<' + prev + digitSplit;

  return prev + Number(total.toFixed(digits)).toLocaleString('en-US');
}
