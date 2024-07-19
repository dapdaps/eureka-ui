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
}]
const STAKE_ADDRESS_ABI = [{
  "inputs": [
    {
      "internalType": "address",
      "name": "_token",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "_referral",
      "type": "address"
    }
  ],
  "name": "depositWithERC20",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}]
const LIQUIDITY_POOL_ABI = [{
  "inputs": [],
  "name": "deposit",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [
    {
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "requestWithdraw",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
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
      "name": "_user",
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
      "name": "_owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_spender",
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
      "name": "_spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_amount",
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
const WITHDRAW_REQUEST_NFT_ABI = [{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "getClaimableAmount",
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
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "claimWithdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]

export default {
  UNSTAKE_ADDRESS_ABI,
  STAKE_ADDRESS_ABI,
  LIQUIDITY_POOL_ABI,
  FIRST_TOKEN_ABI,
  SECOND_TOKEN_ABI,
  WITHDRAW_REQUEST_NFT_ABI
}