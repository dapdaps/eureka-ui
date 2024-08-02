import Big from "big.js";

export function formatThousandsSeparator(n: number | string): string {
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

export const formatIntegerThousandsSeparator = (integer?: number, precision: number = 2, type?: 'simplify' | 'thousand') => {
  if (!integer) {
    return '0';
  }
  if (typeof Number(integer) !== 'number') return '0';
  if (isNaN(Number(integer))) return '0';
  const _type = type ?? 'simplify';
  if (_type === 'thousand') {
    return integer.toString().replace(/\d(?=(\d{3})+\b)/g, '$&,');
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
    return Big(Big(integer).toFixed(precision, 0)).toString();
  }
}
