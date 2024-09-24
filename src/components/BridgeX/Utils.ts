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
        if (item.tx_id === '0xdf8eb94e3d4889ba4e0da74deb6d523aa329cdb88b1c5230f43c6a6b827547d7') {
          jsonItem.status = 3;
        } else {
          jsonItem.status = Number(item.bridge_status);
        }
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

export function timeFormate(value: number | string) {
  if (!value) {
    return '~min';
  }

  const _value = Number(value);

  const h = Math.floor(_value / 60);
  const m = _value % 60;

  if (h >= 1) {
    if (h > 24) {
      const d = Math.floor(h / 24);
      return `~${h}h${m}min`;
    }
    if (m > 0) {
      return `~${h}h${m}min`;
    }
    return `~${h}h`;
  }

  return `~${m}min`;
}

export default {
  balanceFormated,
  addressFormated,
  saveTransaction,
  getTransaction,
  saveAllTransaction
};
