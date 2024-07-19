const LSP_STAKING_ABI = [{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "ethAmount",
      "type": "uint256"
    }
  ],
  "name": "ethToMETH",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "uint256",
      "name": "mETHAmount",
      "type": "uint256"
    }
  ],
  "name": "mETHToETH",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "uint256",
      "name": "minMETHAmount",
      "type": "uint256"
    }
  ],
  "name": "stake",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "uint128",
      "name": "methAmount",
      "type": "uint128"
    },
    {
      "internalType": "uint128",
      "name": "minETHAmount",
      "type": "uint128"
    }
  ],
  "name": "unstakeRequest",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "uint256",
      "name": "unstakeRequestID",
      "type": "uint256"
    }
  ],
  "name": "unstakeRequestInfo",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "uint256",
      "name": "unstakeRequestID",
      "type": "uint256"
    }
  ],
  "name": "claimUnstakeRequest",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]
const UNSTAKE_REQUESTS_MANAGER_ABI: any[] = []
const mETH_ABI = [{
  "inputs": [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }
  ],
  "name": "allowance",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "approve",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}]
export default {
  LSP_STAKING_ABI,
  UNSTAKE_REQUESTS_MANAGER_ABI,
  mETH_ABI
}