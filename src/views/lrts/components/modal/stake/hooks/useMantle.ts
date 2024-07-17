import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
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
export default function useMantle(props: any) {
  const { dapp, token0, token1, addAction, chainId } = props;
  const toast = useToast()
  const { account, provider } = useAccount();
  const [{ }, setChain] = useSetChain();
  const [data, setData] = useState<any>(null)
  const [inAmount, setInAmount] = useState<number | string>("")
  const [outAmount, setOutAmount] = useState<number | string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [approved, setApproved] = useState(true)
  const [approving, setApproving] = useState(false)

  const [actionType, setActionType] = useState("stake")

  const leastAmount = ['stake', 'restake'].includes(actionType) ? 0.02 : 0.01

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
    const res = await fetch("/mantle/api/stats/apy")
    return res.json() as any
  }
  const handleQueryAvailableAmount = async function () {
    return await provider.getBalance(account)
  }
  const handleQueryStakedAmount = async function () {
    const contract = new ethers.Contract(token1.address, mETH_ABI, provider?.getSigner())
    return await contract.balanceOf(account)
  }
  const handleQueryData = async function () {
    const apyResult = await handleQueryApy()
    const availableAmountResult = await handleQueryAvailableAmount()
    const stakedAmountResult = await handleQueryStakedAmount()
    setData({
      availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
      stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
      apy: Big(apyResult?.data[0]?.FiveDayAPY).times(100).toFixed(),
      exchangeRate: apyResult?.data[0]?.METHtoETH
    })
  }
  const handleCheckApproval = async function (amount: number | string) {
    const contract = new ethers.Contract(token1.address, mETH_ABI, provider?.getSigner())
    const wei = ethers.utils.parseUnits(
      Big(amount).toFixed(18),
      18
    );
    const allowance = await contract.allowance(account, LSP_STAKING)
    setApproved(!new Big(allowance.toString()).lt(wei.toString()))
  }
  const handleApprove = async function () {
    const contract = new ethers.Contract(token1.address, mETH_ABI, provider?.getSigner())
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
      .approve(LSP_STAKING, wei)
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
      const wei = Big(amount)
        .mul(Big(10).pow(18))
        .toFixed(0)
      const contract = new ethers.Contract(LSP_STAKING, LSP_STAKING_ABI, provider?.getSigner())
      if (['stake', 'restake'].includes(actionType)) {
        const result = await contract.ethToMETH(wei)
        setOutAmount(ethers.utils.formatUnits(result, 18))
      } else {
        const result = await contract.mETHToETH(wei)
        setOutAmount(ethers.utils.formatUnits(result, 18))
        handleCheckApproval(ethers.utils.formatUnits(result, 18))
      }
    } catch (error) {
      console.error('error: ', error)
    }
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
    console.log('=contractArguments', contractArguments)
    contractMethord(...contractArguments)
      .then((tx: any) => {
        return tx.wait()
      })
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
          token0: inToken.symbol,
          token1: outToken.symbol,
          template: dapp.name,
          status,
          transactionHash,
          chain_id: chainId,
          extra_data: JSON.stringify({
            action: actionType,
            amount0: inAmount,
            amount1: outAmount,
            // requestID: 
          })
        })
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
  const handleChangeActionType = function (_actionType) {
    setActionType(_actionType)
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
    actionType,
    inToken,
    outToken,
    isInSufficient,
    handleApprove,
    handleAmountChange,
    handleStake,
    handleAddMetaMask,
    handleChangeActionType
  }
}