import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import BaseComponent from '../components/base-component';

const stETH = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
const stETH_ABI = [{
  "constant": true,
  "inputs": [
    {
      "name": "_account",
      "type": "address"
    }
  ],
  "name": "balanceOf",
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

const WITHDRAWAL_QUEUE = "0x889edC2eDab5f40e902b864aD4d7AdE8E412F9B1"
const WITHDRAWAL_QUEUE_ABI = []

const Lido = function (props: any) {
  const actionType = 'stake'
  const toast = useToast()
  const { account, provider, chainId } = useAccount();
  const [{ }, setChain] = useSetChain();
  const [data, setData] = useState<any>(null)
  const [inAmount, setInAmount] = useState<number | string>("")
  const [outAmount, setOutAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [approved, setApproved] = useState(true)
  const [approving, setApproving] = useState(false)

  const leastAmount = ['stake', 'restake'].includes(actionType) ? 0.02 : 0.01

  const firstToken = {
    icon: '',
    symbol: 'ETH',
    decimals: 18,
  }
  const secondToken = {
    icon: '',
    symbol: 'mETH',
    decimals: 18
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
    const res = await fetch("https://eth-api.lido.fi/v1/protocol/steth/apr/sma")
    return res.json() as any
  }
  const handleQueryAvailableAmount = async function () {
    return await provider.getBalance(account)
  }
  const handleQueryStakedAmount = async function () {
    const contract = new ethers.Contract(stETH, stETH_ABI, provider?.getSigner())
    return await contract.balanceOf(account)
  }
  const handleQueryData = async function () {
    const apyResult = await handleQueryApy()
    const availableAmountResult = await handleQueryAvailableAmount()
    const stakedAmountResult = await handleQueryStakedAmount()
    setData({
      availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
      stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
      apy: apyResult?.data?.smaApr
    })
  }
  const handleApprove = async function () {
    // const contract = new ethers.Contract(mETH, mETH_ABI, provider?.getSigner())
    // const wei = ethers.utils.parseUnits(
    //   Big(inAmount).toFixed(18),
    //   18
    // );
    // const toastId = toast?.loading({
    //   title: `Approve ${inAmount} ${inToken.symbol}`,
    // });
    // setApproving(true)
    // setIsLoading(true)
    // contract
    //   .approve(LSP_STAKING, wei)
    //   .then(tx => tx.wait())
    //   .then(receipt => {
    //     setApproved(true)
    //     setApproving(false)
    //     setIsLoading(false)
    //     toast.dismiss(toastId)
    //     toast?.success({
    //       title: "Approve Successfully!",
    //       text: `Approve ${inAmount} ${inToken.symbol}`,
    //       tx: receipt.transactionHash,
    //     });
    //   })
    //   .catch(error => {
    //     setIsLoading(false)
    //     toast?.dismiss(toastId);
    //     toast?.fail({
    //       title: "Approve Failed!",
    //     });
    //   })
  }
  const handleAmountChange = async function (amount: number | string) {
    setInAmount(amount)
    // try {
    //   const wei = Big(amount)
    //     .mul(Big(10).pow(18))
    //     .toFixed(0)
    //   const contract = new ethers.Contract(LSP_STAKING, LSP_STAKING_ABI, provider?.getSigner())
    //   if (['stake', 'restake'].includes(actionType)) {
    //     const result = await contract.ethToMETH(wei)
    //     setOutAmount(ethers.utils.formatUnits(result, 18))
    //   } else {
    //     const result = await contract.mETHToETH(wei)
    //     setOutAmount(ethers.utils.formatUnits(result, 18))
    //     handleCheckApproval(ethers.utils.formatUnits(result, 18))
    //   }
    // } catch (error) {
    //   console.error('error: ', error)
    // }
  }
  const handleStake = async function () {
    // const contract = new ethers.Contract(LSP_STAKING, LSP_STAKING_ABI, provider?.getSigner())
    // const amount = Big(inAmount)
    //   .mul(Big(10).pow(18))
    //   .toFixed(0)
    // const contractMethord = ['stake', 'restake'].includes(actionType) ?
    //   contract.stake :
    //   contract.unstakeRequest
    // const otherAmount = Big(outAmount).times(0.995).mul(Big(10).pow(18)).toFixed(0)
    // const contractArguments = ['stake', 'restake'].includes(actionType) ?
    //   [otherAmount, {
    //     value: amount
    //   }] :
    //   [amount, otherAmount]
    // const toastId = toast?.loading({
    //   title: `Staking...`,
    // });
    // setIsLoading(true)
    // contractMethord(...contractArguments)
    //   .then(tx => tx.wait())
    //   .then(result => {
    //     const { status, transactionHash } = result;
    //     setIsLoading(false)
    //     handleQueryData()
    //     toast?.dismiss(toastId);
    //     toast?.success({
    //       title: "Stake Successfully!",
    //     });
    //   })
    //   .catch(error => {
    //     setIsLoading(false)
    //     toast?.dismiss(toastId);
    //     toast?.fail({
    //       title: "Stake Failed!",
    //     });
    //   })
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
        handleAddMetaMask
      }}
    />
  )
}
export default Lido