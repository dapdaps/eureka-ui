import Big from 'big.js';

export const ROUND_DOWN = 0;
export const NATIVE_SYMBOL_ADDRESS_MAP_KEY = '0x0';
export const ACTUAL_BORROW_AMOUNT_RATE = 0.99;

export function isValid(a: any) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === '') return false;
  return true;
}

export function formatHealthFactor(hf: any) {
  try {
    if (hf === '∞') return hf;

    if (!hf || !isValid(hf)) return '-';

    if (Big(hf).gt(10000)) return '∞';
    if (Number(hf) === -1) return '∞';
    return Big(hf).toFixed(2, ROUND_DOWN);
  } catch (error) {
    console.log('CATCH_formatHealthFactor:', error);
  }
}

export function unifyNumber(num: any) {
  if (isNaN(Number(num))) return '-';
  if (Number(num) === 0) return '0';
  if (num < 0.01) return '<0.01';
  return parseFloat(Number(num).toFixed(2));
}

export function chunk(arr: any, size: any) {
  const result: any[] = [];

  let temp = [];
  for (let i = arr.length - 1; i > -1; i--) {
    temp.unshift(arr[i]);
    if (temp.length === size) {
      result.push(temp);

      temp = [];
    }
  }
  if (temp.length !== 0) result.push(temp);
  return result;
}


export function formatRate(_value: any) {
  if (isNaN(Number(_value))) return '';
  const value = (Number(_value) * 100).toFixed();
  return Big(value || 0).lt(0.01) ? '<0.01%' : `${Number(value).toFixed(2)}%`;
}
