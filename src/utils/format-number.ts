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

export const setNumKMB = (num: any, digital: any) => {
  if (!num && num !== 0 && num !== '') return num;
  if (typeof num !== 'number' && typeof num !== 'string') return num;
  const _num = Number(num);
  let result: any = '',
    unit = '';
  // K M B
  if (_num <= 999) {
    result = _num;
  } else if (_num <= 999999) {
    result = _num / 1000;
    unit = 'K';
  } else if (_num <= 999999999) {
    result = _num / 1000000;
    unit = 'M';
  } else if (_num <= 999999999999) {
    result = _num / 1000000000;
    unit = 'B';
  } else {
    result = _num / 1000000000000;
    unit = 'T';
    return result.toExponential(2) + unit;
  }
  let _result;

  if (digital !== null) _result = result.toFixed(digital) + unit;
  else _result = result + unit;
  return _result;
};

export const unifyNumber = (num: string | number, digital: number = 2) => {
  if (isNaN(Number(num))) return '-';
  if (Number(num) === 0) return '0';
  if (Number(num) < 0.01) return '<0.01';

  return parseFloat(Number(num).toFixed(digital));
};
