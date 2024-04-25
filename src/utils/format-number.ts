export function formatThousandsSeparator(n: number): string {
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
