import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';


const UNSTAKE_ADDRESS = "0x62De59c08eB5dAE4b7E6F7a8cAd3006d6965ec16"
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

const STAKE_ADDRESS = "0x9FFDF407cDe9a93c47611799DA23924Af3EF764F"
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


const LIQUIDITY_POOL = "0x308861A430be4cce5502d0A12724771Fc6DaF216"
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

export default function useEtherFi({ gem, dapp, token0, token1, addAction, actionType, chainId, onSuccess }: any) {
  const toast = useToast()
  const { account, provider } = useAccount();
  const [{ }, setChain] = useSetChain();
  const [data, setData] = useState<any>(null)
  const [inAmount, setInAmount] = useState<number | string>("")
  const [outAmount, setOutAmount] = useState<number | string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [approved, setApproved] = useState(true)
  const [approving, setApproving] = useState(false)

  const leastAmount = ['stake', 'restake'].includes(actionType) ? 0.0001 : 0.0001

  const inToken = ['stake', 'restake'].includes(actionType) ? token0 : token1
  const outToken = ['stake', 'restake'].includes(actionType) ? token1 : token0

  const isInSufficient = useMemo(() => {
    if (['stake', 'restake'].includes(actionType)) {
      return Number(inAmount) > Number(data?.availableAmount)
    } else {
      return Number(inAmount) > Number(data?.stakedAmount)
    }
  }, [data?.availableAmount, data?.stakedAmount, inAmount])

  const handleQueryApy = async function () {
    const res = await fetch("https://universe.kelpdao.xyz/rseth/apy")
    return res.json() as any
  }

  const handleQueryAvailableAmount = async function () {
    const contract = new ethers.Contract(token0.address, FIRST_TOKEN_ABI, provider?.getSigner())
    return await contract.balanceOf(account)
  }
  const handleQueryStakedAmount = async function () {
    const contract = new ethers.Contract(token1.address, SECOND_TOKEN_ABI, provider?.getSigner())
    return await contract.balanceOf(account)
  }

  const handleQueryData = async function () {
    try {
      console.log('333333')
      const apyResult = await handleQueryApy()
      const availableAmountResult = await handleQueryAvailableAmount()
      const stakedAmountResult = await handleQueryStakedAmount()
      setData({
        availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
        stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
        apy: apyResult?.value,
        exchangeRate: 1
      })
    } catch (error) {
      console.log('error:', error)
    }
  }
  const handleCheckApproval = async function (amount: number | string) {
    const contract = new ethers.Contract(
      ['stake', 'restake'].includes(actionType) ? token0.address : token1.address,
      ['stake', 'restake'].includes(actionType) ? FIRST_TOKEN_ABI : SECOND_TOKEN_ABI,
      provider?.getSigner()
    )
    const wei = ethers.utils.parseUnits(
      Big(amount).toFixed(18),
      18
    );
    const allowance = await contract.allowance(account, ['stake', 'restake'].includes(actionType) ? STAKE_ADDRESS : LIQUIDITY_POOL)
    setApproved(!new Big(allowance.toString()).lt(wei.toString()))
  }
  const handleApprove = async function () {
    const contract = new ethers.Contract(
      ['stake', 'restake'].includes(actionType) ? token0.address : token1.address,
      ['stake', 'restake'].includes(actionType) ? FIRST_TOKEN_ABI : SECOND_TOKEN_ABI,
      provider?.getSigner()
    )
    const wei = ethers.utils.parseUnits(
      Big(inAmount).toFixed(18),
      18
    );
    const toastId = toast?.loading({
      title: `Approve ${inAmount} ${inToken.symbol}`,
    });
    setApproving(true)
    setIsLoading(true)
    contract
      .approve(['stake', 'restake'].includes(actionType) ? STAKE_ADDRESS : LIQUIDITY_POOL, wei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        setApproved(true)
        setApproving(false)
        setIsLoading(false)
        toast.dismiss(toastId)
        toast?.success({
          title: "Approve Successfully!",
          text: `Approve ${inAmount} ${inToken.symbol}`,
          tx: receipt.transactionHash,
        });
      })
      .catch((error: any) => {
        console.log('=error', error)
        setIsLoading(false)
        toast?.dismiss(toastId);
        toast?.fail({
          title: "Approve Failed!",
        });
      })
  }
  const handleAmountChange = async function (amount: number | string) {
    setInAmount(amount)
    try {
      const _outAmount = amount
      setOutAmount(_outAmount)
      handleCheckApproval(_outAmount)
    } catch (error) {
      console.error('error: ', error)
    }
  }
  const handleMax = function () {
    const _amount = ['stake', 'restake'].includes(actionType) ? data?.availableAmount ?? 0 : data?.stakedAmount
    handleAmountChange(_amount)
  }
  const handleStake = async function () {
    setIsLoading(true)
    const contract = ['stake', 'restake'].includes(actionType) ?
      new ethers.Contract(STAKE_ADDRESS, STAKE_ADDRESS_ABI, provider?.getSigner()) :
      new ethers.Contract(LIQUIDITY_POOL, LIQUIDITY_POOL_ABI, provider?.getSigner())
    const amount = Big(inAmount)
      .mul(Big(10).pow(18))
      .toFixed(0)
    const contractMethord = ['stake', 'restake'].includes(actionType) ?
      contract.depositWithERC20 :
      contract.requestWithdraw
    const contractArguments = ['stake', 'restake'].includes(actionType) ?
      ["0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", amount, "0x0000000000000000000000000000000000000000"] :
      [account, amount]
    const toastId = toast?.loading({
      title: ['stake', 'restake'].includes(actionType) ? `Staking...` : 'UnStaking...',
    });
    console.log('=contractArguments', contractArguments)
    contractMethord(...contractArguments)
      .then((tx: any) => tx.wait())
      .then((result: any) => {
        const { status, transactionHash } = result;
        setIsLoading(false)
        handleQueryData()
        toast?.dismiss(toastId);
        toast?.success({
          title: ['stake', 'restake'].includes(actionType) ? "Stake Successfully!" : "UnStake Successfully",
        });
        addAction({
          type: "Staking",
          action: actionType,
          token: [inToken.symbol, outToken.symbol],
          amount: inAmount,
          template: gem ? gem?.dapp?.name : dapp.name,
          status,
          transactionHash,
          chain_id: chainId,
          extra_data: JSON.stringify({
            fromTokenSymbol: inToken.symbol,
            fromTokenAmount: inAmount,
            toTokenSymol: outToken.symbol,
            toTokenAmount: outAmount,
          })
        })
        setInAmount("")
        onSuccess && onSuccess(actionType)
      })
      .catch((error: any) => {
        console.log('=error', error)
        setIsLoading(false)
        toast?.dismiss(toastId);
        toast?.fail({
          title: ['stake', 'restake'].includes(actionType) ? "Stake Failed!" : "UnStake Failed!",
        });
      })
  }
  const handleAddMetaMask = function () {

  }
  useEffect(() => {
    provider && handleQueryData()
  }, [provider])

  return {
    data,
    inAmount,
    outAmount,
    isLoading,
    approved,
    approving,
    leastAmount,
    inToken,
    outToken,
    isInSufficient,
    handleApprove,
    handleAmountChange,
    handleMax,
    handleStake,
    handleAddMetaMask,
  }
}