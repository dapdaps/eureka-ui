import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import abi from '@/views/lrts/config/abi/ether-fi';
import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

const UNSTAKE_ADDRESS = "0x62De59c08eB5dAE4b7E6F7a8cAd3006d6965ec16"
const STAKE_ADDRESS = "0x9FFDF407cDe9a93c47611799DA23924Af3EF764F"
const LIQUIDITY_POOL = "0x308861A430be4cce5502d0A12724771Fc6DaF216"
const {
  UNSTAKE_ADDRESS_ABI,
  STAKE_ADDRESS_ABI,
  LIQUIDITY_POOL_ABI,
  FIRST_TOKEN_ABI,
  SECOND_TOKEN_ABI
} = abi

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

  console.log('=inToken', inToken, '=outToken', outToken)
  const isInSufficient = useMemo(() => {
    if (['stake', 'restake'].includes(actionType)) {
      return Number(inAmount) > Number(data?.availableAmount)
    } else {
      return Number(inAmount) > Number(data?.stakedAmount)
    }
  }, [data?.availableAmount, data?.stakedAmount, inAmount])

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
      const availableAmountResult = await handleQueryAvailableAmount()
      const stakedAmountResult = await handleQueryStakedAmount()
      setData({
        availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
        stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
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
            action: actionType,
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
  useEffect(() => {
    provider && handleQueryData()
  }, [provider])

  return {
    data,
    inAmount,
    setInAmount,
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
  }
}