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

export const formateInteger = (num: number | undefined, type?: 'simplify' | 'thousand') => {
  if (!num) {
    return 0;
  }
  if (typeof Number(num) !== 'number') return 0;
  if (isNaN(Number(num))) return 0;
  const _type = type ?? 'simplify';
  if (_type === 'thousand') {
    return num.toString().replace(/\d(?=(\d{3})+\b)/g, '$&,')
  }
  if (_type === 'simplify') {
    if (num > 1000) {
      const _num = Big(num).div(1000).toFixed(2).replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
      const inter = _num.split('.')?.[0]?.replace(/\d(?=(\d{3})+\b)/g, '$&,');
      const decimal = _num.split('.')?.[1] ?? '';
      return `${inter}${decimal ? '.' + decimal : ''}k`
    }
    return num;
  }
}