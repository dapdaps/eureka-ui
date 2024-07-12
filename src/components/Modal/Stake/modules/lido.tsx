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
}, {
  "constant": false,
  "inputs": [
    {
      "name": "_referral",
      "type": "address"
    }
  ],
  "name": "submit",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [
    {
      "name": "owner",
      "type": "address"
    }
  ],
  "name": "nonces",
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
const WITHDRAWAL_QUEUE_ABI = [{
  "inputs": [
    {
      "internalType": "uint256[]",
      "name": "_amounts",
      "type": "uint256[]"
    },
    {
      "internalType": "address",
      "name": "_owner",
      "type": "address"
    },
    {
      "components": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "internalType": "struct WithdrawalQueue.PermitInput",
      "name": "_permit",
      "type": "tuple"
    }
  ],
  "name": "requestWithdrawalsWithPermit",
  "outputs": [
    {
      "internalType": "uint256[]",
      "name": "requestIds",
      "type": "uint256[]"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
}]

const Lido = function (props: any) {
  const actionType = 'unstake'
  const toast = useToast()
  const { account, provider, chainId } = useAccount();
  const [{ }, setChain] = useSetChain();
  const [data, setData] = useState<any>(null)
  const [inAmount, setInAmount] = useState<number | string>("")
  const [outAmount, setOutAmount] = useState<number | string>("")
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
    symbol: 'stETH',
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
    setOutAmount(amount)
  }
  const handleGetNonce = async function () {
    const contract = new ethers.Contract(stETH, stETH_ABI, provider?.getSigner())
    return await contract.nonces(account)
  }
  const handleGetSignPermit = async function () {
    const signer = provider?.getSigner()
    const owner = account
    const spender = WITHDRAWAL_QUEUE
    const value = ethers.utils.parseUnits(inAmount as string, inToken.decimals)
    const nonce = await handleGetNonce();
    console.log('=nonce', nonce)
    const deadline = Math.floor(new Date().getTime() / 1000) + 3600;
    const domain = {
      name: 'Liquid staked Ether 2.0',
      version: '2',
      chainId: 1,
      verifyingContract: stETH,
    };
    const types = {
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ]
    };
    const values = {
      owner,
      spender,
      value,
      nonce,
      deadline,
    };

    const signature = await signer._signTypedData(domain, types, values);
    const { v, r, s } = ethers.utils.splitSignature(signature);
    console.log(`v: ${v}, r: ${r}, s: ${s}`);
    console.log(values);
    console.log(signature);
    return {
      v,
      r,
      s,
      signature,
      ...values
    }
  }
  const handleStake = async function () {
    setIsLoading(true)
    const contract = ['stake', 'restake'].includes(actionType) ?
      new ethers.Contract(stETH, stETH_ABI, provider?.getSigner()) :
      new ethers.Contract(WITHDRAWAL_QUEUE, WITHDRAWAL_QUEUE_ABI, provider?.getSigner())

    const amount = Big(inAmount)
      .mul(Big(10).pow(18))
      .toFixed(0)
    const contractMethord = ['stake', 'restake'].includes(actionType) ?
      contract.submit :
      contract.requestWithdrawalsWithPermit
    let contractArguments = null
    if (['stake', 'restake'].includes(actionType)) {
      contractArguments = ["0x0000000000000000000000000000000000000000", { value: amount }]
    } else {
      const { value, deadline, v, r, s } = await handleGetSignPermit()
      contractArguments = [amount, account, [value, deadline, v, r, s]]
    }
    const toastId = toast?.loading({
      title: ['stake', 'restake'].includes(actionType) ? `Staking...` : 'UnStaking...',
    });
    console.log('===contractArguments', contractArguments)
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