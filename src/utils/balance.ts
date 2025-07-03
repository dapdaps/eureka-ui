import Big from 'big.js';

export function balanceFormated(balance?: string | number, digits = 4) {
  if (!balance || balance === Infinity) return '0';
  const _balance = new Big(balance);
  if (_balance.eq(0)) return '0';
  if (_balance.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  return _balance.toFixed(digits).replace(/\.?0+$/, '');
}

export function balanceFormatedFloor(balance?: string | number, digits = 4) {
  if (!balance) return '0';
  const _balance = new Big(balance);
  if (_balance.eq(0)) return '0';
  if (_balance.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  return _balance.toFixed(digits, 0);
}

export function valueFormated(balance?: string, price?: string, digits = 2) {
  if (!balance || !price) return '0';
  const _balance = new Big(balance);
  const _price = new Big(price);
  if (_balance.eq(0) || _price.eq(0)) return '0';
  const total = _balance.mul(_price);
  if (total.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  return total.toFixed(digits).replace(/\.?0+$/, '');
}

export function balanceShortFormated(balance?: string | number, digits = 1) {
  if (!balance) return '0';
  const _balance = new Big(balance);
  if (_balance.eq(0)) return '0';
  if (_balance.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  if (_balance.lt(1e3)) return _balance.toFixed(digits);
  if (_balance.lt(1e6)) return _balance.div(1e3).toFixed(digits) + 'K';
  return _balance.div(1e6).toFixed(digits) + 'M';
}

export function percentFormated(value: string | number, needMul = false): string {
  return (Number(value) * (needMul ? 100 : 1)).toFixed(2) + '%';
}

const addressReg = /(\w{6})(.*)(\w{4})/;
export function addressFormated(address: string) {
  if (!address) {
    return '';
  }
  return address.replace(addressReg, (_1: string, _2: string, _3: string, _4: string) => {
    return `${_2}...${_4}`;
  });
}

export function timeDurationFormated(time: number) {
  return Math.floor((Date.now() - time) / 1000 / 60) + ' min ago';
}

export function errorFormated(error: any) {
  if (error.toString().indexOf('user rejected transaction') > -1) {
    return 'user rejected transaction';
  }

  return error.title || error.message;
}

export function getFullNum(value: any) {
  try {
    let x = value;
    if (Math.abs(x) < 1.0) {
      const e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = '0.' + new Array(e).join('0') + x.toString().substring(2);
      }
    } else {
      let e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join('0');
      }
    }
    return x;
  } catch (e) {}

  return value;
}

export function formatPrice(price: number) {
  if (!price || isNaN(price)) return '';
  let digits = 0;
  if (Big(price).gt(10000)) digits = 1;
  if (Big(price).gt(100) && Big(price).lt(9999)) digits = 2;
  if (Big(price).gt(10) && Big(price).lt(99)) digits = 3;
  if (Big(price).gt(1) && Big(price).lt(10)) digits = 4;
  if (digits === 0) digits = 7;
  return balanceFormated(price, digits);
}
