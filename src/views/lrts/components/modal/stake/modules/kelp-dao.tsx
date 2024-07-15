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
const UNSTAKE_REQUESTS_MANAGER = "0x38fDF7b489316e03eD8754ad339cb5c4483FDcf9"

const UNSTAKE_REQUESTS_MANAGER_ABI = []

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
}]

const KelpDao = function (props: any) {
  const { actionType, setShow } = props
  const toast = useToast()
  const { account, provider, chainId } = useAccount();
  const [{ }, setChain] = useSetChain();
  const [data, setData] = useState<any>(null)
  const [inAmount, setInAmount] = useState<number | string>("")
  const [outAmount, setOutAmount] = useState<number | string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [approved, setApproved] = useState(true)
  const [approving, setApproving] = useState(false)

  const leastAmount = ['stake', 'restake'].includes(actionType) ? 0.0001 : 0.01

  const firstToken = {
    icon: '',
    symbol: 'stETH',
    decimals: 18,
    address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'
  }
  const secondToken = {
    icon: '',
    symbol: 'rsETH',
    decimals: 18,
    address: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7'
  }

  const inToken = ['stake', 'restake'].includes(actionType) ? firstToken : secondToken
  const outToken = ['stake', 'restake'].includes(actionType) ? secondToken : firstToken

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
    const contract = new ethers.Contract(firstToken.address, FIRST_TOKEN_ABI, provider?.getSigner())
    return await contract.balanceOf(account)
  }
  const handleQueryStakedAmount = async function () {
    const contract = new ethers.Contract(secondToken.address, SECOND_TOKEN_ABI, provider?.getSigner())
    return await contract.balanceOf(account)
  }
  const handleQueryData = async function () {
    console.log('=====11111=====')
    const apyResult = await handleQueryApy()
    const exchangRateResult = await handleQueryExchangeRate()
    const availableAmountResult = await handleQueryAvailableAmount()
    const stakedAmountResult = await handleQueryStakedAmount()
    console.log('=Big(1).div(exchangRateResult?.value).toFixed()', Big(1).div(exchangRateResult?.value).toFixed())
    setData({
      availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
      stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
      apy: apyResult?.value,
      exchangeRate: Big(1).div(exchangRateResult?.value).toFixed(4)
    })
  }
  const handleCheckApproval = async function (amount: number | string) {
    const contract = new ethers.Contract(firstToken.address, FIRST_TOKEN_ABI, provider?.getSigner())
    const wei = ethers.utils.parseUnits(
      Big(amount).toFixed(18),
      18
    );
    const allowance = await contract.allowance(account, LRT_DEPOSIT_POOL)
    setApproved(!new Big(allowance.toString()).lt(wei.toString()))
  }
  const handleApprove = async function () {
    const contract = new ethers.Contract(LRT_DEPOSIT_POOL, LRT_DEPOSIT_POOL_ABI, provider?.getSigner())
    const wei = ethers.utils.parseUnits(
      Big(inAmount).toFixed(18),
      18
    );
    const toastId = toast?.loading({
      title: `Approve ${inAmount} ${inToken.symbol}`,
    });
    setApproving(true)
    setIsLoading(true)
    console.log('==firstToken.address', firstToken.address)
    console.log('==wei', firstToken.address)
    contract
      .depositAsset(firstToken.address, wei, 0, "0x00")
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
        // const result = await contract.mETHToETH(wei)
        // setOutAmount(ethers.utils.formatUnits(result, 18))
        // handleCheckApproval(ethers.utils.formatUnits(result, 18))
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
    const contract = new ethers.Contract(LSP_STAKING, LSP_STAKING_ABI, provider?.getSigner())
    const amount = Big(inAmount)
      .mul(Big(10).pow(18))
      .toFixed(0)
    const contractMethord = ['stake', 'restake'].includes(actionType) ?
      contract.stake :
      contract.unstakeRequest
    const otherAmount = Big(outAmount).times(0.995).mul(Big(10).pow(18)).toFixed(0)
    const contractArguments = ['stake', 'restake'].includes(actionType) ?
      [otherAmount, {
        value: amount
      }] :
      [amount, otherAmount]
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
        handleAddMetaMask
      }}
    />
  )
}
export default KelpDao