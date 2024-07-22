const UNSTAKE_ADDRESS_ABI = [{
  "inputs": [
    {
      "internalType": "address",
      "name": "asset",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "rsETHUnstaked",
      "type": "uint256"
    }
  ],
  "name": "initiateWithdrawal",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "address",
      "name": "asset",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "user",
      "type": "address"
    }
  ],
  "name": "userAssociatedNonces",
  "outputs": [
    {
      "internalType": "uint128",
      "name": "_begin",
      "type": "uint128"
    },
    {
      "internalType": "uint128",
      "name": "_end",
      "type": "uint128"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "address",
      "name": "asset",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "userIndex",
      "type": "uint256"
    }
  ],
  "name": "getUserWithdrawalRequest",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "rsETHAmount",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "expectedAssetAmount",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "withdrawalStartBlock",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "userNonce",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "address",
      "name": "asset",
      "type": "address"
    }
  ],
  "name": "nextLockedNonce",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "requestNonce",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "withdrawalDelayBlocks",
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
      "name": "asset",
      "type": "address"
    }
  ],
  "name": "completeWithdrawal",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]
const LRT_DEPOSIT_POOL_ABI = [{
  "inputs": [
    {
      "internalType": "address",
      "name": "asset",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "depositAmount",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "minRSETHAmountExpected",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "referralId",
      "type": "string"
    }
  ],
  "name": "depositAsset",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]
const FIRST_TOKEN_ABI = [{
  constant: true,
  inputs: [
    {
      name: '_account',
      type: 'address',
    },
  ],
  name: 'balanceOf',
  outputs: [
    {
      name: '',
      type: 'uint256',
    },
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  "constant": true,
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    },
    {
      "name": "_spender",
      "type": "address"
    }
  ],
  "name": "allowance",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [
    {
      "name": "_spender",
      "type": "address"
    },
    {
      "name": "_amount",
      "type": "uint256"
    }
  ],
  "name": "approve",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}]
const SECOND_TOKEN_ABI = [{
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
  UNSTAKE_ADDRESS_ABI,
  LRT_DEPOSIT_POOL_ABI,
  FIRST_TOKEN_ABI,
  SECOND_TOKEN_ABI
}