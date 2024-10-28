import Big from 'big.js';
import { SuperBridgeStore } from 'super-bridge-sdk';

import { AUTH_TOKENS, get, post } from '@/utils/http';

let gloabalSbs: SuperBridgeStore;
async function initDb() {
  const sbs = new SuperBridgeStore('dapdap', 'transaction');
  await sbs.init();
  gloabalSbs = sbs;
  return sbs;
}

async function getDb(): Promise<SuperBridgeStore> {
  if (!gloabalSbs) {
    return initDb();
  }
  return gloabalSbs;
}

if (typeof window !== 'undefined') {
  initDb();
}

export function balanceFormated(balance: any, digits?: any) {
  digits = digits || 4;
  if (!balance) return '0';
  const _balance = new Big(balance);
  if (_balance.eq(0)) return '0';
  if (_balance.lt(0.0001)) return `<${0.0001}`;
  return _balance.toFixed(digits);
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

export async function saveTransaction(item: any) {
  // const sbs = await getDb()
  // await sbs.update(item)
}

export async function updateTransaction(item: any) {
  await post('/api/action/bridge/status', {
    tx_id: item.hash,
    status: item.status.toString()
  });
}

export async function sleep(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export function saveAllTransaction(transaction_key: any, transactionObj: any) {
  // localStorage.setItem(transaction_key, JSON.stringify(transactionObj))
}

export async function getTransaction(tool?: string) {
  // const sbs = await getDb()
  // const list: any = await sbs.readAll()

  if (typeof window !== 'undefined') {
    let tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || '{}');
    while (!tokens.access_token) {
      await sleep(3000);
      tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || '{}');
    }
  }

  const storeData = await get(`/api/action/get-actions-by-type?action_type=Bridge&page=1&page_size=99999`);
  if (storeData.code !== 0) {
    return [];
  }

  const storeList = storeData.data.data;
  const _list = storeList.filter((item: any) => item.extra_data.length > 100);

  let __list = [];
  if (_list) {
    __list = _list.map((item: any) => {
      const jsonItem = JSON.parse(item.extra_data);
      if (item.bridge_status) {
        jsonItem.status = Number(item.bridge_status);
      } else {
        jsonItem.status = 3;
      }

      return jsonItem;
    });
  }

  if (!__list) {
    return [];
  }

  if (!tool) {
    return __list;
  }

  return __list.filter((item: any) => item.tool.toLowerCase() === tool.toLowerCase()) || [];
}

export function isNumeric(value: any): boolean {
  return /^[0-9]+(\.)?([0-9]+)?$/.test(value);
}

const timeReg = /^\d+\w+$/;

export function timeFormate(value: number | string) {
  if (!value) {
    return '~';
  }

  const _value = Number(value);
  const m = Math.floor(_value / 60);
  const s = _value % 60;
  const h = Math.floor(m / 60);

  if (h > 0) {
    if (m > 0) {
      return `~${h}h${m}m`;
    }

    if (m > 0 && s > 0) {
      return `~${h}h${m}m${s}s`;
    }

    return `~${h}h`;
  }

  if (m > 0) {
    if (s > 0) {
      return `~${m}m${s}s`;
    }

    return `~${m}m`;
  }

  return `~${value}s`;
}

export const tokenSelector = {
  get() {
    const tokenSelectorStr = localStorage.getItem('bridge-token-selector');
    if (tokenSelectorStr) {
      return JSON.parse(tokenSelectorStr);
    }

    return null;
  },
  save(params: { fromChainId: number; toChainId: number; fromToken: string; toToken: string }) {
    localStorage.setItem('bridge-token-selector', JSON.stringify(params));
  }
};

export async function report(params: any) {
  try {
    const query = Object.keys(params)
      .map((key: string) => `${key}=${JSON.stringify(params[key])}`)
      .join('&');
    if (query && query.length > 0) {
      const url = `/api/log?${query}`;
      await navigator.sendBeacon(url);
    }
  } catch (e) {}
}

const tokenSortList = [
  'ETH',
  'WETH',
  'USDT',
  'USDC',
  'USDC.E',
  'DAI',
  'OP',
  'ARB',
  'AVAX',
  'BLAST',
  'MANTA',
  'MNT',
  'MODE',
  'METIS',
  'POL',
  'MATIC',
  'BNB',
  'XDAI'
];

export function tokenSort(a: any, b: any, balances: any) {
  if (Object.keys(balances).length === 0) {
    return 0;
  }

  const aAddress = a.isNative ? 'native' : a.address;
  const bAddress = b.isNative ? 'native' : b.address;

  const aNumber = Number(balances[aAddress] || 0);
  const bNumber = Number(balances[bAddress] || 0);

  if (bNumber === 0 && aNumber === 0) {
    const indexOfA = tokenSortList.indexOf(a.symbol.toUpperCase());
    const indexOfB = tokenSortList.indexOf(b.symbol.toUpperCase());
    if (indexOfA === -1 && indexOfB === -1) {
      return 0;
    }

    if (indexOfA === -1 && indexOfB > -1) {
      return 1;
    }

    if (indexOfA > -1 && indexOfB === -1) {
      return -1;
    }

    if (indexOfA > -1 && indexOfB > -1) {
      return indexOfA - indexOfB;
    }
  }

  return bNumber - aNumber;
}

export function tokenSortBalance(a: any, b: any, balanceA: any, balanceB: any) {
  const aNumber = Number(balanceA || 0);
  const bNumber = Number(balanceB || 0);

  if (bNumber === 0 && aNumber === 0) {
    const indexOfA = tokenSortList.indexOf(a.symbol.toUpperCase());
    const indexOfB = tokenSortList.indexOf(b.symbol.toUpperCase());
    if (indexOfA === -1 && indexOfB === -1) {
      return 0;
    }

    if (indexOfA === -1 && indexOfB > -1) {
      return 1;
    }

    if (indexOfA > -1 && indexOfB === -1) {
      return -1;
    }

    if (indexOfA > -1 && indexOfB > -1) {
      return indexOfA - indexOfB;
    }
  }

  return bNumber - aNumber;
}

export default {
  balanceFormated,
  addressFormated,
  saveTransaction,
  getTransaction,
  saveAllTransaction
};
