import Big from 'big.js';
import type { Signer } from 'ethers';
import { Contract, providers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import useToast from '@/hooks/useToast';

import approve from '../approve';

interface Request {
  amount: string | number;
  account: string;
  provider: any;
  isError: boolean;
  chainId: number;
}

interface Result {
  rate: number;
  recived: string;
  exchangeRate: string;
  transactionCost: string;
  deposit: any;
  isLoading: boolean;
}

const regErrMsg = /([^(]+)\(/;
export function formatException(errMsg: string): string {
  let _msg = '';
  const res = errMsg.match(regErrMsg);
  if (res && res.length > 1) {
    _msg = res[1];
    return _msg;
  }

  return errMsg;
}

const rateAbi = [
  {
    inputs: [],
    name: 'getRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

const ethereumAbi = [
  {
    inputs: [],
    name: 'depositETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

const BNBAbi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amountIn',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_minOut',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256'
      }
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const L2Abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_minOut',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_deadline',
        type: 'uint256'
      }
    ],
    name: 'depositETH',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  }
];

function getTimeAfter(miniteAfter: number) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + miniteAfter);
  return now.getTime();
}

async function getRate(): Promise<number> {
  const provider = new providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
  const RateContract = new Contract('0xf25484650484DE3d554fB0b7125e7696efA4ab99', rateAbi, provider);

  const v = await RateContract.getRate();
  if (v._hex) {
    return new Big(Number(v._hex)).div(10 ** 18).toNumber();
  }

  return 0;
}

async function getEstimateGas(value: string, chainId: number, minOut: string, signer: any) {
  try {
    const _minOut = new Big(minOut)
      .mul(10 ** 18)
      .toString()
      .split('.')[0];
    const transactionData = await getTransactionData(value, chainId, _minOut, signer);

    const gasPrice = await signer.getGasPrice();

    const gasEstimate = await signer.estimateGas({
      ...transactionData,
      value: transactionData?.value?.toString(),
      gasPrice: gasPrice.toString()
    });

    return {
      gasEstimate,
      gasPrice
    };
    // new Big(gasEstimate.mul(gasPrice).toString()).div(10 ** 18).toString()
  } catch (e) {
    console.log(e);
  }

  return null;
}

async function getTransactionData(value: string, chainId: number, minOut: string, signer: Signer) {
  let transactionData, DepositContract;
  let contractAddress;
  switch (chainId) {
    case 1:
      DepositContract = new Contract('0x74a09653A083691711cF8215a6ab074BB4e99ef5', ethereumAbi, signer);

      transactionData = await DepositContract.populateTransaction.depositETH({
        value
      });
      break;
    case 56:
      DepositContract = new Contract('0xf25484650484DE3d554fB0b7125e7696efA4ab99', BNBAbi, signer);

      transactionData = await DepositContract.populateTransaction.deposit(value, minOut, getTimeAfter(20));
      break;
    case 42161:
      contractAddress = '0xf25484650484de3d554fb0b7125e7696efa4ab99';
      DepositContract = new Contract(contractAddress as string, L2Abi, signer);

      transactionData = await DepositContract.populateTransaction.depositETH(minOut, getTimeAfter(20), {
        value
      });
      break;
    case 59144:
      contractAddress = '0x4D7572040B84b41a6AA2efE4A93eFFF182388F88';
      DepositContract = new Contract(contractAddress as string, L2Abi, signer);

      transactionData = await DepositContract.populateTransaction.depositETH(minOut, getTimeAfter(20), {
        value
      });
      break;
    case 8453:
      contractAddress = '0xf25484650484de3d554fb0b7125e7696efa4ab99';
      DepositContract = new Contract(contractAddress as string, L2Abi, signer);

      transactionData = await DepositContract.populateTransaction.depositETH(minOut, getTimeAfter(20), {
        value
      });
      break;
    case 34443:
      contractAddress = '0x4D7572040B84b41a6AA2efE4A93eFFF182388F88';
      DepositContract = new Contract(contractAddress as string, L2Abi, signer);

      transactionData = await DepositContract.populateTransaction.depositETH(minOut, getTimeAfter(20), {
        value
      });
      break;
    // default:
    //     DepositContract = new Contract(
    //         contractAddress as string,
    //         L2Abi,
    //         signer,
    //     );

    //     transactionData = await DepositContract.populateTransaction.depositETH(
    //         minOut,
    //         getTimeAfter(20),
    //         {
    //             value,
    //         },
    //     )
    //     break;
  }

  return transactionData;
}

export default function useTrade({ amount, provider, account, isError, chainId }: Request): Result {
  const { fail, success } = useToast();
  const [rate, setRate] = useState(0);
  const [recived, setRecived] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');
  const [transactionCost, setTransactionCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gasEstimate, setGasEstimate] = useState(1920000);

  async function deposit(value: string, signer: Signer) {
    try {
      const _value = new Big(value)
        .mul(10 ** 18)
        .toNumber()
        .toFixed();
      setIsLoading(true);
      const tx = await ethereumDeposit(_value, signer);
      success({
        title: 'Transaction successed'
      });

      setIsLoading(false);
      return tx.transactionHash;
    } catch (error: any) {
      console.log(error);

      fail({
        title: 'Deposit Failed!',
        text: error?.message?.includes('user rejected transaction')
          ? 'User rejected transaction'
          : (error?.message ?? '')
      });
      setIsLoading(false);
    }

    return null;
  }

  async function ethereumDeposit(value: string, signer: Signer) {
    const _minOut = new Big(recived)
      .mul(10 ** 18)
      .toString()
      .split('.')[0];
    const transactionData = await getTransactionData(value, chainId, _minOut, signer);

    if (chainId === 56) {
      await approve(
        '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        new Big(value),
        '0xf25484650484DE3d554fB0b7125e7696efA4ab99',
        signer
      );
    }

    let gasLimit = 1920000;
    if (chainId === 1 && gasEstimate) {
      gasLimit = gasEstimate;
    } else if (chainId === 56) {
      gasLimit = 1920000;
    } else {
      gasLimit = 1920000;
    }

    const tx = await signer.sendTransaction({
      ...transactionData,
      gasLimit
    });

    return tx.wait();
  }

  useEffect(() => {
    getRate().then(setRate);
  }, []);

  useEffect(() => {
    if (rate && Number(rate) > 0) {
      setExchangeRate((1 / rate).toString());
    }
  }, [rate]);

  useEffect(() => {
    if (amount && !isNaN(Number(amount)) && rate) {
      const recived = new Big(amount).div(new Big(rate)).mul(new Big(0.9)).toString();
      setRecived(recived);
    } else {
      setRecived('');
    }
  }, [amount, rate]);

  useEffect(() => {
    if (amount && !isNaN(Number(amount)) && !isError && provider) {
      const _amount = new Big(amount.toString()).mul(10 ** 18).toString();
      getEstimateGas(_amount, chainId, recived, provider?.getSigner()).then((res) => {
        if (res) {
          setGasEstimate(res.gasEstimate);
          setTransactionCost(new Big(res.gasEstimate.mul(res.gasPrice).toString()).div(10 ** 18).toString());
        } else {
          setTransactionCost('');
          setGasEstimate(1920000);
        }
      });
    } else {
      setTransactionCost('');
    }
  }, [amount, isError, recived]);

  return {
    rate,
    recived,
    exchangeRate,
    deposit,
    transactionCost,
    isLoading
  };
}
