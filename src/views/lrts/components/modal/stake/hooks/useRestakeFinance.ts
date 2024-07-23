

import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

// const STAKE_ADDRESS = ""

const CONTRACT_ADDRESS_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'requestWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'getAllQueuePositionsForAddress',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'currentValue',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isRedeemable',
            type: 'bool',
          },
        ],
        internalType: 'struct StorageController.QueuePosition[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'withdrawalRequestId',
        type: 'uint256',
      },
    ],
    name: 'redeemUnderlying',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastRedeemableId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const FIRST_TOKEN_ABI = [
  {
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
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const SECOND_TOKEN_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const useRestakeFinance = function ({ gem, dapp, token0, token1, addAction, actionType, onSuccess }: any) {
  const toast = useToast();
  const { account, provider, chainId } = useAccount();
  const [{ }, setChain] = useSetChain();
  const [data, setData] = useState<any>(null);
  const [inAmount, setInAmount] = useState<number | string>('');
  const [outAmount, setOutAmount] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [approved, setApproved] = useState(true);
  const [approving, setApproving] = useState(false);

  const leastAmount = ['stake', 'restake'].includes(actionType) ? 0.0001 : 0.0001;

  const inToken = ['stake', 'restake'].includes(actionType) ? token0 : token1;
  const outToken = ['stake', 'restake'].includes(actionType) ? token1 : token0;

  const CONTRACT_ADDRESS = {
    stETH: '0xe384251B5f445A006519A2197bc6bD8E5fA228E5',
    mETH: '0x0448FddC3f4D666eC81DAc8172E60b8e5852386c',
    osETH: '0x357DEeD02020b73F8A124c4ea2bE3B6A725aaeC2',
    sfrxETH: '0xD7BC2FE1d0167BD2532587e991abE556E3a66f3b',
  }[token0?.symbol as string] as string;

  const isInSufficient = useMemo(() => {
    if (['stake', 'restake'].includes(actionType)) {
      return Number(inAmount) > Number(data?.availableAmount);
    } else {
      return Number(inAmount) > Number(data?.stakedAmount);
    }
  }, [data?.availableAmount, data?.stakedAmount, inAmount]);

  const handleQueryApy = async function () {
    const res = await fetch('https://universe.kelpdao.xyz/rseth/apy');
    return res.json() as any;
  };
  const handleQueryExchangeRate = async function () {
    const res = await fetch('https://universe.kelpdao.xyz/rseth/exchangeRate/?lrtToken=stETH');
    return res.json() as any;
  };
  const handleQueryAvailableAmount = async function () {
    const contract = new ethers.Contract(token0.address, FIRST_TOKEN_ABI, provider?.getSigner());
    return await contract.balanceOf(account);
  };
  const handleQueryStakedAmount = async function () {
    const contract = new ethers.Contract(token1.address, SECOND_TOKEN_ABI, provider?.getSigner());
    return await contract.balanceOf(account);
  };
  const handleQueryData = async function () {
    const apyResult = await handleQueryApy();
    const exchangRateResult = await handleQueryExchangeRate();
    const availableAmountResult = await handleQueryAvailableAmount();
    const stakedAmountResult = await handleQueryStakedAmount();
    setData({
      availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
      stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
      apy: apyResult?.value,
      exchangeRate: Big(1).div(exchangRateResult?.value).toFixed(4),
    });
  };
  const handleCheckApproval = async function (amount: number | string) {
    console.log('=token0.address', token0.address);
    const contract = new ethers.Contract(
      ['stake', 'restake'].includes(actionType) ? token0.address : token1.address,
      ['stake', 'restake'].includes(actionType) ? FIRST_TOKEN_ABI : SECOND_TOKEN_ABI,
      provider?.getSigner(),
    );
    const wei = ethers.utils.parseUnits(Big(amount).toFixed(18), 18);
    console.log('=CONTRACT_ADDRESS', CONTRACT_ADDRESS);
    const allowance = await contract.allowance(account, CONTRACT_ADDRESS);
    console.log('=allowance', allowance);
    console.log(
      '=!new Big(allowance.toString()).lt(wei.toString())',
      !new Big(allowance.toString()).lt(wei.toString()),
    );
    setApproved(!new Big(allowance.toString()).lt(wei.toString()));
  };
  const handleApprove = async function () {
    const contract = new ethers.Contract(
      ['stake', 'restake'].includes(actionType) ? token0.address : token1.address,
      ['stake', 'restake'].includes(actionType) ? FIRST_TOKEN_ABI : SECOND_TOKEN_ABI,
      provider?.getSigner(),
    );
    const wei = ethers.utils.parseUnits(Big(inAmount).toFixed(18), 18);
    const toastId = toast?.loading({
      title: `Approve ${inAmount} ${inToken.symbol}`,
    });
    setApproving(true);
    setIsLoading(true);
    contract
      .approve(CONTRACT_ADDRESS, wei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        setApproved(true);
        setApproving(false);
        setIsLoading(false);
        toast.dismiss(toastId);
        toast?.success({
          title: 'Approve Successfully!',
          text: `Approve ${inAmount} ${inToken.symbol}`,
          tx: receipt.transactionHash,
        });
      })
      .catch((error: any) => {
        console.log('=error', error);
        setIsLoading(false);
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Approve Failed!',
        });
      });
  };
  const handleAmountChange = async function (amount: number | string) {
    setInAmount(amount);
    try {
      const _amount = Big(amount).mul(Big(10).pow(18)).toFixed(0);
      setOutAmount(amount);
      handleCheckApproval(_amount);
    } catch (error) {
      console.log('error:', error);
    }
  };
  const handleMax = function () {
    // setInAmount(data?.availableAmount ?? 0);
    const _amount = ['stake', 'restake'].includes(actionType) ? data?.availableAmount ?? 0 : data?.stakedAmount
    handleAmountChange(_amount)
  };
  const handleStake = async function () {
    setIsLoading(true);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ADDRESS_ABI, provider?.getSigner());
    const amount = Big(inAmount).mul(Big(10).pow(18)).toFixed(0);
    const toastId = toast?.loading({
      title: ['stake', 'restake'].includes(actionType) ? `Staking...` : 'UnStaking...',
    });
    const contractMethord = ['stake', 'restake'].includes(actionType) ? contract.deposit : contract.requestWithdraw;
    const contractArguments = [amount];
    contractMethord(...contractArguments)
      .then((tx: any) => tx.wait())
      .then((result: any) => {
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
          template: dapp.name,
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
export default useRestakeFinance