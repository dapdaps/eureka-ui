import Big from 'big.js'

export function getBalance(address: any, account: any, rpcUrl: any, decimals: any) {
//     const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

//     if (address === "native") {
//         return provider.getBalance(account).then((rawBalance) => {
//             return ethers.utils.formatUnits(rawBalance._hex, decimals).toString()
//         });
//     }

//     const TokenContract = new ethers.Contract(
//         address,
//         [
//             {
//                 constant: true,
//                 inputs: [
//                     {
//                         name: "_owner",
//                         type: "address",
//                     },
//                 ],
//                 name: "balanceOf",
//                 outputs: [
//                     {
//                         name: "balance",
//                         type: "uint256",
//                     },
//                 ],
//                 payable: false,
//                 stateMutability: "view",
//                 type: "function",
//             },
//         ],
//         provider
//     );

//     return TokenContract.balanceOf(account)
//         .then((rawBalance: any) => {
//             return ethers.utils.formatUnits(rawBalance._hex, decimals).toString()
//         })
//         .catch((err) => {
//             console.log(err)
//             return '0.0'
//         });
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
    return address.replace(addressReg, (_1: string, _2: string, _3: string, _4: string) => {
        return `${_2}...${_4}`
    })
}

export function saveTransaction(transaction_key: any, config: any) {
    const transactionObj = getTransaction(transaction_key)
    transactionObj[config.hash] = config
    saveAllTransaction(transaction_key, transactionObj)
}

export function saveAllTransaction(transaction_key: any, transactionObj: any) {
    localStorage.setItem(transaction_key, JSON.stringify(transactionObj))
}

export function getTransaction(transaction_key: any): any {
    console.log('transaction_key: ', transaction_key)
    let transactionObj: any = localStorage.getItem(transaction_key)

    if (!transactionObj) {
        transactionObj = {}
    } else {
        transactionObj = JSON.parse(transactionObj)
    }

    return transactionObj
}

export default {
    getBalance,
    balanceFormated,
    addressFormated,
    saveTransaction,
    getTransaction,
    saveAllTransaction,
}
