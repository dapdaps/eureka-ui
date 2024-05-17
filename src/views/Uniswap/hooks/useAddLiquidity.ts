import { useState } from 'react';
import { utils } from 'ethers';
import Big from 'big.js';
import useAccount from '@/hooks/useAccount';
import config from '@/config/uniswap';
import useTokens from './useTokens';
import positionAbi from '../abi/positionAbi';
import useRequestModal from '../../../hooks/useRequestModal';
import { sortTokens } from '../utils/sortTokens';
import { getTokenAddress } from '../utils';
import { nearestUsableTick } from '../utils/tickMath';
import { balanceFormated } from '@/utils/balance';

import useToast from '@/hooks/useToast';
import { useTransactionsStore } from '@/stores/transactions';

export default function useAddLiquidity(onSuccess: () => void, onError?: () => void) {
  const [loading, setLoading] = useState(false);
  const { account, provider } = useAccount();
  const { addHistoryToken } = useTokens();
  const { openRequestModal } = useRequestModal();
  const toast = useToast();
  const addTransaction = useTransactionsStore((store: any) => store.addTransaction);

  const onAdd = async ({
    token0,
    token1,
    value0,
    value1,
    fee,
    tickLower,
    tickUpper,
    noPair,
    isMint,
    tokenId,
    price,
  }: any) => {
    if (!account || !provider) return;
    const [_token0, _token1] = sortTokens(token0, token1);
    const _token0Address = getTokenAddress(_token0.address, true);
    const _token1Address = getTokenAddress(_token1.address, true);
    const useNative = _token0.address === 'native' ? _token0 : _token1.address === 'native' ? _token1 : undefined;
    const Interface = new utils.Interface(positionAbi);
    const calldatas: string[] = [];
    const isReverse = _token0.address !== token0.address;
    const _value0 = isReverse ? value1 : value0;
    const _value1 = isReverse ? value0 : value1;
    let _amount0 = new Big(_value0 || 0).mul(10 ** _token0.decimals).toFixed(0);
    let _amount1 = new Big(_value1 || 0).mul(10 ** _token1.decimals).toFixed(0);
    const _deadline = Math.ceil(Date.now() / 1000) + 60;
    if (noPair) {
      const _price = new Big(isReverse ? 1 / price : price).div(10 ** (_token0.decimals - _token1.decimals));
      const _sqrtPriceX96 = new Big(_price.toFixed())
        .sqrt()
        .mul(2 ** 96)
        .toFixed(0);
      calldatas.push(
        Interface.encodeFunctionData('createAndInitializePoolIfNecessary', [
          _token0Address,
          _token1Address,
          fee,
          _sqrtPriceX96,
        ]),
      );
    }
    if (isMint) {
      let _tickLower = tickLower > tickUpper ? tickUpper : tickLower;
      let _tickUpper = tickLower > tickUpper ? tickLower : tickUpper;
      _tickLower = nearestUsableTick(_tickLower, fee);
      _tickUpper = nearestUsableTick(_tickUpper, fee);
      calldatas.push(
        Interface.encodeFunctionData('mint', [
          {
            token0: _token0Address,
            token1: _token1Address,
            fee: fee,
            tickLower: _tickLower,
            tickUpper: _tickUpper,
            amount0Desired: _amount0,
            amount1Desired: _amount1,
            amount0Min: 0,
            amount1Min: 0,
            recipient: account,
            deadline: _deadline,
          },
        ]),
      );
    } else {
      calldatas.push(
        Interface.encodeFunctionData('increaseLiquidity', [
          {
            tokenId: tokenId,
            amount0Desired: _amount0,
            amount1Desired: _amount1,
            amount0Min: 0,
            amount1Min: 0,
            deadline: _deadline,
          },
        ]),
      );
    }
    let value = '0';
    if (useNative) {
      const wrappedValue = _token0.address === 'native' ? _amount0 : _amount1;
      if (new Big(wrappedValue).gt(0)) {
        calldatas.push(Interface.encodeFunctionData('refundETH'));
        value = wrappedValue;
      }
    }
    const tradeText = `Supplying ${balanceFormated(value0, 4)} ${token0.symbol} and ${balanceFormated(value1, 4)} ${
      token1.symbol
    }`;
    try {
      setLoading(true);
      openRequestModal({
        status: 1,
        text: tradeText,
        open: true,
      });
      let estimateGas = new Big(1000000);
      const txn: any = {
        to: config.contracts.positionAddress,
        data: calldatas.length === 1 ? calldatas[0] : Interface.encodeFunctionData('multicall', [calldatas]),
        value,
      };
      const signer = provider.getSigner(account);

      try {
        estimateGas = await signer.estimateGas(txn);
      } catch (err: any) {
        console.log('estimateGas err', err);
        if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
          estimateGas = new Big(3000000);
        }
      }
      console.log('estimateGas', estimateGas.toString());

      const gasPrice = await provider.getGasPrice();
      const newTxn = {
        ...txn,
        gasLimit: estimateGas.mul(120).div(100).toString(),
        gasPrice: gasPrice,
      };
      const tx = await signer.sendTransaction(newTxn);
      openRequestModal({
        text: tradeText,
        status: 0,
        tx: tx.hash,
        open: true,
        from: 'pool',
      });
      setLoading(false);
      const res = await tx.wait();
      if (res.status === 1) {
        addHistoryToken({
          [token0.address]: token0,
          [token1.address]: token1,
        });
        onSuccess();
        toast.success({
          title: 'Transaction Successful!',
          text: tradeText,
        });
      } else {
        onError?.();
        toast.fail({
          title: 'Transaction Failed!',
          text: tradeText,
        });
      }
      addTransaction({
        icons: [token0.icon, token1.icon],
        failed: res.status !== 1,
        tx: tx.hash,
        handler: isMint ? 'New Position' : 'Added Liquidity',
        desc: `${balanceFormated(value0, 4)} ${token0.symbol} and ${balanceFormated(value1, 4)} ${token1.symbol}`,
        time: Date.now(),
      });
    } catch (err: any) {
      onError?.();
      if (err.code !== 'ACTION_REJECTED') {
        openRequestModal({
          status: 3,
          open: true,
        });
      } else {
        openRequestModal({
          open: false,
        });
        toast.fail({
          title: 'Transaction Failed',
          text: `User rejected the request. Details: 
          MetaMask Tx Signature: User denied transaction signature. `,
        });
      }
      setLoading(false);
    }
  };

  return { loading, onAdd };
}
