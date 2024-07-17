import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import BaseComponent from '../components/base-component';
const LSP_STAKING = "0xe3cBd06D7dadB3F4e6557bAb7EdD924CD1489E8f"
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
}]
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

const LRT_DEPOSIT_POOL = "0x036676389e48133B63a802f8635AD39E752D375D"

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

const KelpDao = function (props: any) {
  const { actionType, handleChangeActionType, setShow, token0, token1 } = props
  const toast = useToast()
  const { account, provider, chainId } = useAccount();
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
  const handleQueryExchangeRate = async function () {
    const res = await fetch("https://universe.kelpdao.xyz/rseth/exchangeRate/?lrtToken=stETH")
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
    const apyResult = await handleQueryApy()
    const exchangRateResult = await handleQueryExchangeRate()
    const availableAmountResult = await handleQueryAvailableAmount()
    const stakedAmountResult = await handleQueryStakedAmount()
    setData({
      availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
      stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
      apy: apyResult?.value,
      exchangeRate: Big(1).div(exchangRateResult?.value).toFixed(4)
    })
  }
  const handleCheckApproval = async function (amount: number | string) {
    const contract = new ethers.Contract(['stake', 'restake'].includes(actionType) ?
      token0.address : token1.address,
      ['stake', 'restake'].includes(actionType) ? FIRST_TOKEN_ABI : SECOND_TOKEN_ABI, provider?.getSigner())
    const wei = ethers.utils.parseUnits(
      Big(amount).toFixed(18),
      18
    );
    const allowance = await contract.allowance(account, ['stake', 'restake'].includes(actionType) ? LRT_DEPOSIT_POOL : UNSTAKE_ADDRESS)
    setApproved(!new Big(allowance.toString()).lt(wei.toString()))
  }
  const handleApprove = async function () {
    const contract = new ethers.Contract(['stake', 'restake'].includes(actionType) ?
      token0.address : token1.address,
      ['stake', 'restake'].includes(actionType) ? FIRST_TOKEN_ABI : SECOND_TOKEN_ABI, provider?.getSigner())
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
      .approve(['stake', 'restake'].includes(actionType) ? LRT_DEPOSIT_POOL : UNSTAKE_ADDRESS, wei)
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
      if (['stake', 'restake'].includes(actionType)) {
        const _outAmount = Big(amount).times(data?.exchangeRate).toFixed()
        setOutAmount(_outAmount)
        handleCheckApproval(_outAmount)
      } else {
        const _outAmount = Big(amount).div(data?.exchangeRate).toFixed()
        setOutAmount(_outAmount)
        handleCheckApproval(_outAmount)
      }
    } catch (error) {
      console.error('error: ', error)
    }
  }
  const handleMax = function () {
    setInAmount(data?.availableAmount ?? 0)
  }
  const handleStake = async function () {
    setIsLoading(true)
    const contract = ['stake', 'restake'].includes(actionType) ?
      new ethers.Contract(LRT_DEPOSIT_POOL, LRT_DEPOSIT_POOL_ABI, provider?.getSigner()) :
      new ethers.Contract(UNSTAKE_ADDRESS, UNSTAKE_ADDRESS_ABI, provider?.getSigner())
    const amount = Big(inAmount)
      .mul(Big(10).pow(18))
      .toFixed(0)
    const contractMethord = ['stake', 'restake'].includes(actionType) ?
      contract.depositAsset :
      contract.initiateWithdrawal
    const contractArguments = ['stake', 'restake'].includes(actionType) ?
      [token0.address, amount, 0, "0x00"] :
      [outToken.address, amount]
    const toastId = toast?.loading({
      title: ['stake', 'restake'].includes(actionType) ? `Staking...` : 'UnStaking...',
    });
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
      })
      .catch((error: any) => {
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
  return (
    <BaseComponent
      componentProps={{
        data,
        setShow,
        inAmount,
        outAmount,
        isLoading,
        approved,
        approving,
        leastAmount,
        actionType,
        inToken,
        outToken,
        handleMax,
        isInSufficient,
        handleApprove,
        handleAmountChange,
        handleStake,
        handleAddMetaMask,
        handleChangeActionType,
      }}
    />
  )
}
export default KelpDao