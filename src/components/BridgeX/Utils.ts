import Big from 'big.js'
import { SuperBridgeStore } from 'super-bridge-sdk'

let gloabalSbs: SuperBridgeStore
async function initDb() {
    const sbs = new SuperBridgeStore('dapdap', 'transaction')
    await sbs.init()
    gloabalSbs = sbs
    return sbs
}

async function getDb(): Promise<SuperBridgeStore> {
    if (!gloabalSbs) {
        return initDb()
    }
    return gloabalSbs
}

if (typeof window !== 'undefined') {
    initDb()
}


export function balanceFormated(balance: any, digits?: any) {
    digits = digits || 4
    if (!balance) return '0';
    const _balance = new Big(balance);
    if (_balance.eq(0)) return '0';
    if (_balance.lt(0.0001)) return `<${0.0001}`;
    return _balance.toFixed(digits);
}

const addressReg = /(\w{6})(.*)(\w{4})/

export function addressFormated(address: string) {
    if (!address) {
        return ''
    }
    return address.replace(addressReg, (_1: string, _2: string, _3: string, _4: string) => {
        return `${_2}...${_4}`
    })
}

export async function saveTransaction(item: any) {
    const sbs = await getDb()
    await sbs.update(item)
}

export function saveAllTransaction(transaction_key: any, transactionObj: any) {
    // localStorage.setItem(transaction_key, JSON.stringify(transactionObj))
}

export async function getTransaction(tool?: string) {
    const sbs = await getDb()
    const list: any = await sbs.readAll()
    
    if (!list) {
        return []
    }
    
    if (!tool) {
        return list
    }

    return list.filter((item: any) => item.tool.toLowerCase() === tool.toLowerCase()) || []
}

export function isNumeric(value: any): boolean {
    return /^[0-9]+(\.)?([0-9]+)?$/.test(value);
}

export default {
    balanceFormated,
    addressFormated,
    saveTransaction,
    getTransaction,
    saveAllTransaction,
}
