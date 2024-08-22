import Big from 'big.js';
import type { Signer } from 'ethers';
import { Contract, providers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import useToast from '@/hooks/useToast';
import type { Chain } from '@/types';

interface Request {
  amount: string | number;
  account: string;
  provider: any;
  isError: boolean;
  chain: Chain;
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

const EtherfiL2ExchangeRateProviderAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
    ],
    name: 'getConversionAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const EtherfiL2ModeSyncPoolETHAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenIn',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAmountOut',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
];

const amountTokenAddress: any = {
  81457: '0xc42853c0C6624F42fcB8219aCeb67Ad188087DCB',
  59144: '0x241a91F095B2020890Bc8518bea168C195518344',
  34443: '0xc42853c0C6624F42fcB8219aCeb67Ad188087DCB',
  8453: '0xF2c5519c634796B73dE90c7Dc27B4fEd560fC3ca',
};

async function getConversionAmount(amount: string, chain: Chain): Promise<string> {
  const provider = new providers.JsonRpcProvider(chain.rpcUrls[0]);
  const RateContract = new Contract(amountTokenAddress[chain.chainId], EtherfiL2ExchangeRateProviderAbi, provider);

  const v = await RateContract.getConversionAmount('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', amount);

  if (v._hex) {
    return new Big(Number(v._hex)).div(10 ** 18).toString();
  }

  return '';
}

async function getEstimateGas(value: string, chain: Chain, signer: any) {
  try {
    const transactionData = await getTransactionData(value, chain, signer);

    const gasPrice = await signer.getGasPrice();

    const gasEstimate = await signer.estimateGas({
      ...transactionData,
      value: transactionData?.value?.toString(),
      gasPrice: gasPrice.toString(),
    });

    return {
      gasEstimate,
      gasPrice,
    };
    // new Big(gasEstimate.mul(gasPrice).toString()).div(10 ** 18).toString()
  } catch (e) {
    console.log(e);
  }

  return null;
}

const tokenAddress: any = {
  81457: '0x52c4221cb805479954cde5accff8c4dcaf96623b',
  59144: '0x823106E745A62D0C2FC4d27644c62aDE946D9CCa',
  34443: '0x52c4221Cb805479954CDE5accfF8C4DcaF96623B',
  8453: '0xc38e046dFDAdf15f7F56853674242888301208a5',
};

async function getTransactionData(value: string, chain: Chain, signer: Signer) {
  if (!tokenAddress[chain.chainId]) {
    return;
  }

  const DepositContract = new Contract(tokenAddress[chain.chainId], EtherfiL2ModeSyncPoolETHAbi, signer);

  const transactionData = await DepositContract.populateTransaction.deposit(
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    value,
    new Big(value).mul(new Big(0.9)).toNumber().toFixed(),
    {
      value,
    },
  );

  return transactionData;
}

export default function useTrade({ amount, provider, account, isError, chain }: Request): Result {
  const { fail, success } = useToast();
  const [rate, setRate] = useState(0);
  const [recived, setRecived] = useState('');
  const [exchangeRate, setExchangeRate] = useState('1');
  const [transactionCost, setTransactionCost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gasEstimate, setGasEstimate] = useState(19200);

  async function deposit(value: string, signer: Signer) {
    try {
      const _value = new Big(Number(value).toFixed(18)).mul(10 ** 18).toString();
      setIsLoading(true);
      const tx = await ethereumDeposit(_value, signer);
      success({
        title: 'Transaction successed',
      });

      setIsLoading(false);
      return tx.transactionHash;
    } catch (err: any) {
      console.log(err);
      fail({
        title: err.name ? err.name : 'Transaction failed',
        text: formatException(err.message),
      });
      setIsLoading(false);
    }
  }

  async function ethereumDeposit(value: string, signer: Signer) {
    const transactionData = await getTransactionData(value, chain, signer);
    const tx = await signer.sendTransaction({
      ...transactionData,
      // gasLimit: 19200,
    });
    return tx.wait();
  }

  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      const _amount = new Big(Number(amount).toFixed(18)).mul(10 ** 18).toString();
      getConversionAmount(_amount, chain).then(setRecived);
    } else {
      setRecived('');
    }
  }, [amount, rate]);

  useEffect(() => {
    if (amount && !isNaN(Number(amount)) && !isError && provider) {
      const _amount = new Big(Number(amount).toFixed(18)).mul(10 ** 18).toString();
      getEstimateGas(_amount, chain, provider?.getSigner()).then((res) => {
        if (res) {
          setGasEstimate(res.gasEstimate);
          setTransactionCost(new Big(res.gasEstimate.mul(res.gasPrice).toString()).div(10 ** 18).toString());
        } else {
          setTransactionCost('');
        }
      });
    } else {
      setTransactionCost('');
    }
  }, [amount, isError, recived]);

  useEffect(() => {
    const _amount = new Big(1).mul(10 ** 18).toString();
    getConversionAmount(_amount, chain).then(setExchangeRate);
  }, []);

  return {
    rate,
    recived,
    exchangeRate,
    deposit,
    transactionCost,
    isLoading,
  };
}
