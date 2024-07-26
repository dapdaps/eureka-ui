import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
// import { ethereum } from '@/config/tokens/ethereum';
import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import abi from '@/views/lrts/config/abi/lido'
const {
  stETH_ABI,
  WITHDRAWAL_QUEUE_ABI
} = abi
const WITHDRAWAL_QUEUE = '0x889edC2eDab5f40e902b864aD4d7AdE8E412F9B1';
export default function useLido({ gem, dapp, token0, token1, addAction, actionType, chainId, onSuccess }: any) {
  const toast = useToast();
  const { account, provider } = useAccount();
  const [{ }, setChain] = useSetChain();
  const [data, setData] = useState<any>(null);
  const [inAmount, setInAmount] = useState<number | string>('');
  const [outAmount, setOutAmount] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [approved, setApproved] = useState(true);
  const [approving, setApproving] = useState(false);

  const [requestLoading, setRequestsLoading] = useState(false);
  const [requests, setRequests] = useState<any>();

  const leastAmount = ['stake', 'restake'].includes(actionType) ? 0.02 : 0;
  const inToken = ['stake', 'restake'].includes(actionType) ? token0 : token1;
  const outToken = ['stake', 'restake'].includes(actionType) ? token1 : token0;

  const isInSufficient = useMemo(() => {
    if (['stake', 'restake'].includes(actionType)) {
      return Number(inAmount) > Number(data?.availableAmount);
    } else {
      return Number(inAmount) > Number(data?.stakedAmount);
    }
  }, [data?.availableAmount, data?.stakedAmount, inAmount]);
  const handleQueryAvailableAmount = async function () {
    return await provider.getBalance(account);
  };
  const handleQueryStakedAmount = async function () {
    const contract = new ethers.Contract(token1?.address, stETH_ABI, provider?.getSigner());
    return await contract.balanceOf(account);
  };
  const handleQueryData = async function () {
    try {
      const availableAmountResult = await handleQueryAvailableAmount();
      const stakedAmountResult = await handleQueryStakedAmount();
      setData({
        availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
        stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
        exchangeRate: 1
      });
    } catch (error) {
      console.log('error:', error)
    }
  };
  const handleApprove = async function () {
  };
  const handleAmountChange = async function (amount: number | string) {
    setInAmount(amount);
    setOutAmount(amount);
  };
  const handleGetNonce = async function () {
    const contract = new ethers.Contract(token1.address, stETH_ABI, provider?.getSigner());
    return await contract.nonces(account)
  };
  const handleGetSignPermit = async function () {
    const signer = provider?.getSigner();
    const owner = account;
    const spender = WITHDRAWAL_QUEUE;
    const value = ethers.utils.parseUnits(inAmount as string, inToken.decimals);
    const nonce = await handleGetNonce();
    const deadline = Math.floor(new Date().getTime() / 1000) + 3600;
    const domain = {
      name: 'Liquid staked Ether 2.0',
      version: '2',
      chainId: 1,
      verifyingContract: token1.address,
    };
    const types = {
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
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
      ...values,
    };
  };
  const handleMax = function () {
    const _amount = ['stake', 'restake'].includes(actionType) ? data?.availableAmount ?? 0 : data?.stakedAmount
    handleAmountChange(_amount)
  }
  const handleStake = async function () {
    setIsLoading(true);
    const contract = ['stake', 'restake'].includes(actionType)
      ? new ethers.Contract(token1.address, stETH_ABI, provider?.getSigner())
      : new ethers.Contract(WITHDRAWAL_QUEUE, WITHDRAWAL_QUEUE_ABI, provider?.getSigner());

    const amount = Big(inAmount).mul(Big(10).pow(18)).toFixed(0);
    const contractMethord = ['stake', 'restake'].includes(actionType)
      ? contract.submit
      : contract.requestWithdrawalsWithPermit;
    let contractArguments = null;
    if (['stake', 'restake'].includes(actionType)) {
      contractArguments = ['0x0000000000000000000000000000000000000000', { value: amount }];
    } else {
      try {
        const { value, deadline, v, r, s } = await handleGetSignPermit();
        contractArguments = [[amount], account, [value, deadline, v, r, s]];
      } catch (error) {
        console.log('=error', error)
        setIsLoading(false)
        return
      }
    }
    const toastId = toast?.loading({
      title: ['stake', 'restake'].includes(actionType) ? `Staking...` : 'UnStaking...',
    });
    contractMethord(...contractArguments)
      .then((tx: any) => {
        console.log('====tx', tx)
        return tx.wait()
      })
      .then((result: any) => {
        console.log('====result', result)
        const { status, transactionHash } = result;
        setIsLoading(false);
        handleQueryData();
        toast?.dismiss(toastId);
        toast?.success({
          title: ['stake', 'restake'].includes(actionType) ? 'Stake Successfully!' : 'UnStake Successfully',
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
        console.log('===error', error)
        setIsLoading(false);
        toast?.dismiss(toastId);
        toast?.fail({
          title: ['stake', 'restake'].includes(actionType) ? 'Stake Failed!' : 'UnStake Failed!',
        });
      });
  };
  useEffect(() => {
    provider && handleQueryData();
  }, [provider]);
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